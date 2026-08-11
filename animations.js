/* ==========================================================================
   FARMSAFE AI — DYNAMIC WEATHER CANVAS BACKGROUND ENGINE
   ========================================================================== */

let canvas, ctx;
let activeTheme = 'sunny'; // 'sunny' | 'rain' | 'cloudy' | 'cold' | 'storm'
let particles = [];
let animFrameId = null;

document.addEventListener('DOMContentLoaded', () => {
    initWeatherCanvas();
    setupThemeOverrideButtons();
});

function initWeatherCanvas() {
    const container = document.getElementById('weather-canvas-container');
    if (!container) return;

    canvas = document.getElementById('weather-particles-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'weather-particles-canvas';
        container.appendChild(canvas);
    }
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    createParticlesForTheme(activeTheme);
    renderCanvasLoop();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticlesForTheme(activeTheme);
}

function setWeatherTheme(themeName) {
    if (!['sunny', 'rain', 'cloudy', 'cold', 'storm'].includes(themeName)) return;
    activeTheme = themeName;

    const container = document.getElementById('weather-canvas-container');
    if (container) {
        container.className = `weather-theme-${themeName}`;
    }

    // Update active state on manual theme selector buttons
    document.querySelectorAll('.theme-pill-btn').forEach(btn => {
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    createParticlesForTheme(themeName);
}
window.setWeatherTheme = setWeatherTheme;

function setupThemeOverrideButtons() {
    document.querySelectorAll('.theme-pill-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const theme = e.target.dataset.theme;
            setWeatherTheme(theme);
        });
    });
}

function createParticlesForTheme(theme) {
    particles = [];
    const width = canvas ? canvas.width : window.innerWidth;
    const height = canvas ? canvas.height : window.innerHeight;

    if (theme === 'rain' || theme === 'storm') {
        const count = theme === 'storm' ? 140 : 90;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 12 + 10,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    } else if (theme === 'cold') {
        for (let i = 0; i < 70; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 4 + 1,
                speedY: Math.random() * 1.5 + 0.5,
                sway: Math.random() * 0.02,
                opacity: Math.random() * 0.7 + 0.3
            });
        }
    } else if (theme === 'cloudy') {
        for (let i = 0; i < 8; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * (height * 0.5),
                radius: Math.random() * 120 + 80,
                speedX: Math.random() * 0.4 + 0.1,
                opacity: Math.random() * 0.15 + 0.05
            });
        }
    } else if (theme === 'sunny') {
        for (let i = 0; i < 25; i++) {
            particles.push({
                x: Math.random() * width,
                y: height + Math.random() * 100,
                radius: Math.random() * 6 + 2,
                speedY: -(Math.random() * 1 + 0.3),
                opacity: Math.random() * 0.4 + 0.1
            });
        }
    }
}

function renderCanvasLoop() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    if (activeTheme === 'rain' || activeTheme === 'storm') {
        ctx.strokeStyle = activeTheme === 'storm' ? 'rgba(180, 210, 245, 0.6)' : 'rgba(46, 204, 113, 0.4)';
        ctx.lineWidth = 1.5;

        particles.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 2, p.y + p.length);
            ctx.stroke();

            p.y += p.speed;
            p.x -= 0.5;

            if (p.y > h) {
                p.y = -20;
                p.x = Math.random() * w;
            }
        });

        // Occasional lightning flash in storm mode
        if (activeTheme === 'storm' && Math.random() < 0.015) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.fillRect(0, 0, w, h);
        }
    } else if (activeTheme === 'cold') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speedY;
            p.x += Math.sin(p.y * p.sway);

            if (p.y > h) {
                p.y = -10;
                p.x = Math.random() * w;
            }
        });
    } else if (activeTheme === 'cloudy') {
        ctx.fillStyle = 'rgba(200, 225, 210, 0.2)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            p.x += p.speedX;
            if (p.x - p.radius > w) {
                p.x = -p.radius;
            }
        });
    } else if (activeTheme === 'sunny') {
        ctx.fillStyle = 'rgba(244, 185, 66, 0.35)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speedY;
            if (p.y < -20) {
                p.y = h + 20;
                p.x = Math.random() * w;
            }
        });
    }

    animFrameId = requestAnimationFrame(renderCanvasLoop);
}
