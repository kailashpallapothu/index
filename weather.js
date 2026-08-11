/* ==========================================================================
   FARMSAFE AI — LIVE WEATHER INTELLIGENCE & AGRICULTURAL ADVISORY ENGINE
   ========================================================================== */

const presetLocations = {
    guntur: { name: "Guntur (Andhra Pradesh)", lat: 16.3067, lon: 80.4365 },
    vijayawada: { name: "Vijayawada (Andhra Pradesh)", lat: 16.5062, lon: 80.6480 },
    hyderabad: { name: "Hyderabad (Telangana)", lat: 17.3850, lon: 78.4867 },
    warangal: { name: "Warangal (Telangana)", lat: 17.9689, lon: 79.5941 },
    kurnool: { name: "Kurnool (Andhra Pradesh)", lat: 15.8281, lon: 78.0373 },
    visakhapatnam: { name: "Visakhapatnam (Andhra Pradesh)", lat: 17.6868, lon: 83.2185 },
    delhi: { name: "New Delhi (NCR)", lat: 28.6139, lon: 77.2090 },
    punjab: { name: "Ludhiana (Punjab)", lat: 30.9010, lon: 75.8573 }
};

let currentWeatherState = {
    temp: 28,
    humidity: 72,
    windSpeed: 14,
    rainProb: 35,
    uvIndex: 6,
    conditionCode: 1, // 0: Sunny, 1-3: Cloudy, 51-67: Rain, 71+: Snow, 95+: Storm
    conditionText: "Partly Cloudy",
    locationName: "Guntur (Andhra Pradesh)"
};

document.addEventListener('DOMContentLoaded', () => {
    initWeatherModule();
});

function initWeatherModule() {
    // Default load Guntur agricultural hub weather
    fetchWeatherData(presetLocations.guntur.lat, presetLocations.guntur.lon, presetLocations.guntur.name);

    // Setup location search & Geolocation listeners
    const btnGeo = document.getElementById('btn-use-location');
    const searchInput = document.getElementById('weather-search-input');
    const btnSearch = document.getElementById('btn-weather-search');

    if (btnGeo) {
        btnGeo.addEventListener('click', getUserGeolocation);
    }

    if (btnSearch && searchInput) {
        btnSearch.addEventListener('click', () => handleSearchLocation(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearchLocation(searchInput.value);
        });
    }
}

function getUserGeolocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            fetchWeatherData(lat, lon, `My Farm (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`);
        },
        () => {
            alert("Could not access your location. Loaded default farm location.");
        }
    );
}

function handleSearchLocation(query) {
    if (!query || query.trim() === '') return;
    const cleanQuery = query.toLowerCase().trim();

    // Check presets first
    for (let key in presetLocations) {
        if (presetLocations[key].name.toLowerCase().includes(cleanQuery) || key.includes(cleanQuery)) {
            fetchWeatherData(presetLocations[key].lat, presetLocations[key].lon, presetLocations[key].name);
            return;
        }
    }

    // Geocoding fallback using Open-Meteo Geocoding API
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`)
        .then(res => res.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const res = data.results[0];
                const locName = `${res.name}, ${res.country || ''}`;
                fetchWeatherData(res.latitude, res.longitude, locName);
            } else {
                alert(`Location "${query}" not found. Try searching Guntur, Vijayawada, Hyderabad, or Punjab.`);
            }
        })
        .catch(() => {
            alert("Weather search service unreachable.");
        });
}

async function fetchWeatherData(lat, lon, locationName) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.current_weather) {
            const curr = data.current_weather;
            const hourly = data.hourly || {};

            const code = curr.weathercode;
            const temp = Math.round(curr.temperature);
            const wind = Math.round(curr.windspeed);
            const humidity = hourly.relativehumidity_2m ? hourly.relativehumidity_2m[0] : 70;
            const rainProb = hourly.precipitation_probability ? hourly.precipitation_probability[0] : 20;

            let conditionText = mapWeatherCodeToText(code);
            let themeName = mapWeatherCodeToTheme(code);

            currentWeatherState = {
                temp: temp,
                humidity: humidity,
                windSpeed: wind,
                rainProb: rainProb,
                uvIndex: temp > 32 ? 8 : 5,
                conditionCode: code,
                conditionText: conditionText,
                locationName: locationName,
                hourly: hourly
            };

            renderWeatherUI(currentWeatherState);
            // Trigger dynamic background theme change!
            if (window.setWeatherTheme) {
                window.setWeatherTheme(themeName);
            }
        }
    } catch (err) {
        console.warn("Using fallback weather state due to network fetch error", err);
        renderWeatherUI(currentWeatherState);
    }
}

function mapWeatherCodeToText(code) {
    if (code === 0) return "Clear Sunny Sky";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy & Humid";
    if (code >= 51 && code <= 67) return "Light Rain & Showers";
    if (code >= 71 && code <= 77) return "Cold Snow Flurry";
    if (code >= 80 && code <= 82) return "Heavy Rain Showers";
    if (code >= 95) return "Thunderstorm Alert";
    return "Partly Cloudy";
}

function mapWeatherCodeToTheme(code) {
    if (code === 0) return "sunny";
    if (code >= 1 && code <= 3) return "cloudy";
    if (code >= 51 && code <= 67) return "rain";
    if (code >= 71 && code <= 77) return "cold";
    if (code >= 95) return "storm";
    return "sunny";
}

function renderWeatherUI(state) {
    const isTe = currentLang === 'te';

    // Location & Temp Card
    const locNameEl = document.getElementById('weather-loc-name');
    const tempEl = document.getElementById('weather-big-temp');
    const conditionEl = document.getElementById('weather-condition-text');
    const weatherIconEl = document.getElementById('weather-main-icon');

    if (locNameEl) locNameEl.textContent = state.locationName;
    if (tempEl) tempEl.textContent = `${state.temp}°C`;
    if (conditionEl) conditionEl.textContent = isTe ? translateConditionTe(state.conditionText) : state.conditionText;
    if (weatherIconEl) weatherIconEl.textContent = getWeatherIconEmoji(state.conditionCode);

    // Quick Stats Dashboard Cards
    const quickTemp = document.getElementById('stat-temp-val');
    const quickHum = document.getElementById('stat-humidity-val');

    if (quickTemp) quickTemp.textContent = `${state.temp}°C`;
    if (quickHum) quickHum.textContent = `${state.humidity}%`;

    // Metrics Grid
    const humEl = document.getElementById('weather-humidity-val');
    const windEl = document.getElementById('weather-wind-val');
    const rainEl = document.getElementById('weather-rain-val');
    const uvEl = document.getElementById('weather-uv-val');

    if (humEl) humEl.textContent = `${state.humidity}%`;
    if (windEl) windEl.textContent = `${state.windSpeed} km/h`;
    if (rainEl) rainEl.textContent = `${state.rainProb}%`;
    if (uvEl) uvEl.textContent = `${state.uvIndex} (Moderate)`;

    // Generate Agricultural Recommendations
    renderAgriAdvice(state);

    // Render Hourly Forecast Timeline
    renderHourlyTimeline(state);
}

function getWeatherIconEmoji(code) {
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "🌥️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 95) return "⛈️";
    return "☀️";
}

function translateConditionTe(text) {
    if (text.includes("Sunny")) return "ఎండతో కూడిన ఆకాశం";
    if (text.includes("Cloudy")) return "పాక్షికంగా మేఘావృతం";
    if (text.includes("Rain")) return "సన్నని వర్షం ప్రవాహం";
    if (text.includes("Storm")) return "ఉరుములు మెరుపులతో కూడిన వర్షం";
    return text;
}

function renderAgriAdvice(state) {
    const adviceContainer = document.getElementById('agri-advice-cards');
    if (!adviceContainer) return;

    const isTe = currentLang === 'te';
    const advices = [];

    if (state.rainProb > 40 || state.conditionCode >= 51) {
        advices.push({
            icon: "🌧️",
            type: "warning",
            titleEn: "Rain Forecast Alert",
            titleTe: "వర్షపాత సూచన హెచ్చరిక",
            textEn: "Avoid spraying pesticides or applying fertilizer before rainfall to prevent chemical runoff.",
            textTe: "వర్షం పడే ముందు మందులు పిచికారీ చేయడం నిలిపివేయండి."
        });
    }

    if (state.temp >= 32) {
        advices.push({
            icon: "☀️",
            type: "warning",
            titleEn: "High Heat & Thermal Stress",
            titleTe: "అధిక ఉష్ణోగ్రత & ఎండ తీవ్రత",
            textEn: "Increase crop irrigation frequency. Irrigate early morning (5-8 AM) or evening to reduce evapotranspiration.",
            textTe: "పంటలకు ఉదయం లేదా సాయంత్రం వేళల్లో తడి అందించండి."
        });
    }

    if (state.humidity >= 75) {
        advices.push({
            icon: "💧",
            type: "danger",
            titleEn: "High Humidity & Fungal Threat",
            titleTe: "అధిక తేమ & ఆకు తెగులు ముప్పు",
            textEn: "High moisture levels favor fungal spore germination. Inspect leaf undersides for blight or rust.",
            textTe: "అధిక తేమ వల్ల శిలీంధ్ర తెగుళ్లు వచ్చే అవకాశం ఉంది. ఆకులను నిరంతరం పరిశీలించండి."
        });
    }

    if (state.windSpeed >= 20) {
        advices.push({
            icon: "💨",
            type: "warning",
            titleEn: "Strong Wind Warning",
            titleTe: "ఈదురు గాలుల హెచ్చరిక",
            textEn: "Avoid pesticide spray operations during high winds to eliminate drift onto non-target crops.",
            textTe: "ఈదురు గాలులు ఉన్నప్పుడు పిచికారీ చేయడం ఆపివేయండి."
        });
    }

    if (advices.length === 0) {
        advices.push({
            icon: "🟢",
            type: "success",
            titleEn: "Optimal Farming Conditions",
            titleTe: "అనుకూలమైన వ్యవసాయ సమయం",
            textEn: "Weather parameters are ideal for crop spraying, weeding, and routine field management operations.",
            textTe: "పిచికారీ మరియు పొలం పనులకు వాతావరణం చాలా అనుకూలంగా ఉంది."
        });
    }

    adviceContainer.innerHTML = advices.map(a => `
        <div class="agri-advice-card ${a.type}">
            <div class="advice-icon">${a.icon}</div>
            <div class="agri-advice-text">
                <h4>${isTe ? a.titleTe : a.titleEn}</h4>
                <p>${isTe ? a.textTe : a.textEn}</p>
            </div>
        </div>
    `).join('');
}

function renderHourlyTimeline(state) {
    const timelineContainer = document.getElementById('hourly-timeline-grid');
    if (!timelineContainer) return;

    const times = ["NOW", "3 PM", "5 PM", "7 PM", "9 PM", "11 PM"];
    const baseTemp = state.temp;

    timelineContainer.innerHTML = times.map((t, idx) => {
        const offset = idx % 2 === 0 ? 0 : -1;
        const hourTemp = baseTemp + offset;
        const icon = idx > 3 ? "🌧️" : "☀️";
        const pop = idx > 3 ? "60%" : "15%";

        return `
            <div class="hourly-card ${idx === 0 ? 'active' : ''}">
                <span class="hourly-time">${t}</span>
                <span class="hourly-icon">${icon}</span>
                <span class="hourly-temp">${hourTemp}°C</span>
                <span class="hourly-pop">💧 ${pop}</span>
            </div>
        `;
    }).join('');
}

window.addEventListener('languageChanged', () => {
    renderWeatherUI(currentWeatherState);
});
