/* ==========================================================================
   FARMSAFE AI — FLOATING FARMING ASSISTANT CHATBOT
   ========================================================================== */

const chatbotKnowledgeBase = {
    en: {
        greeting: "Hello Farmer! 🌿 I am FarmSafe AI, your personal agriculture assistant. How can I protect your crops today?",
        diseaseQuery: "Crop diseases occur due to fungal pathogens, bacterial leaf blights, or insect vectors. Upload a leaf photo to our **Scan Leaf** scanner for instantaneous AI diagnosis, organic remedies, and chemical spray guidance!",
        weatherQuery: "Weather plays a key role in crop protection! Always check wind speed before spraying pesticides (avoid if >20 km/h) and refrain from spraying before expected rainfall to avoid chemical runoff.",
        yellowQuery: "Yellowing leaves (chlorosis) usually signal Nitrogen deficiency, over-watering, or early fungal infection. Ensure root soil aeration and apply 5ml/L neem oil solution or mild N-P-K spray.",
        fertilizerQuery: "For optimal yield, balance your N-P-K application! Apply Basal dose at transplanting, Urea during tillering stage, and Micro-nutrients (Zinc & Boron) at early flowering stage.",
        treatmentQuery: "For eco-friendly farming, use Neem oil (10,000 PPM), Trichoderma bio-fungicide, or Pseudomonas fluorescens. If using chemical spray, strictly follow label safety and wear protective equipment!",
        default: "Thank you for asking! For specific crop diagnostics, please upload a leaf photo to our AI scanner or search our live Weather Intelligence module for spray timings."
    },
    te: {
        greeting: "నమస్కారం రైతు సోదరా! 🌿 నేను ఫార్మ్‌సేఫ్ AI వ్యవసాయ సహాయకుడిని. ఈరోజు మీ పంట రక్షణకు నేను ఏ విధంగా సహాయపడగలను?",
        diseaseQuery: "పంట తెగుళ్లు శిలీంధ్రాలు, బ్యాక్టీరియా లేదా కీటకాల ద్వారా వస్తాయి. తక్షణ AI నిర్ధారణ మరియు నివారణల కోసం **ఆకు స్కాన్** విభాగంలో మీ ఆకు ఫోటోను అప్‌లోడ్ చేయండి!",
        weatherQuery: "వాతావరణం పంట రక్షణలో కీలకం! ఈదురు గాలులు (గంటకు 20 కి.మీ మించి) ఉన్నప్పుడు మరియు వర్షం పడే ముందు మందుల పిచికారీని నిలిపివేయండి.",
        yellowQuery: "ఆకులు పసుపు రంగులోకి మారడానికి నత్రజని లోపం, పొలంలో ఎక్కువ నీరు నిలవడం లేదా తెగులు కారణం కావచ్చు. వేప నూనె 5 మి.లీ/లీ చొప్పున పిచికారీ చేయండి.",
        fertilizerQuery: "మంచి దిగుబడికి నత్రజని, భాస్వరం, పొటాష్ సమతుల్యంగా వేయండి. పూత దశలో జింక్ మరియు బోరాన్ సూక్ష్మ పోషకాలను చల్లుకోండి.",
        treatmentQuery: "సేంద్రీయ పద్ధతిలో వేప నూనె లేదా ట్రైకోడెర్మా ఉపయోగించండి. రసాయన మందులు చల్లేటప్పుడు రక్షణ మాస్క్ మరియు చేతి తొడుగులు ధరించండి!",
        default: "ధన్యవాదాలు! మీ పంట వివరాల ఆధారంగా మరింత ఖచ్చితమైన సలహా కోసం ఆకు చిత్రాన్ని స్కాన్ చేయండి లేదా వాతావరణ విభాగం పరిశీలించండి."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
});

function initChatbot() {
    const triggerBtn = document.getElementById('chatbot-trigger-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const panel = document.getElementById('chatbot-panel');
    const sendBtn = document.getElementById('btn-chat-send');
    const inputField = document.getElementById('chat-input-field');

    if (!triggerBtn || !panel) return;

    triggerBtn.addEventListener('click', () => {
        const isHidden = panel.style.display === 'none' || panel.style.display === '';
        panel.style.display = isHidden ? 'flex' : 'none';
        if (isHidden && getChatMessagesCount() === 0) {
            sendAiMessage(chatbotKnowledgeBase[currentLang].greeting);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.style.display = 'none';
        });
    }

    if (sendBtn && inputField) {
        sendBtn.addEventListener('click', () => handleUserSendMessage());
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserSendMessage();
        });
    }

    // Setup Quick Prompt Pills
    document.querySelectorAll('.quick-prompt-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            const promptText = e.target.textContent;
            addUserMessage(promptText);
            processBotResponse(promptText);
        });
    });
}

function handleUserSendMessage() {
    const inputField = document.getElementById('chat-input-field');
    if (!inputField) return;
    const text = inputField.value.trim();
    if (text === '') return;

    addUserMessage(text);
    inputField.value = '';
    processBotResponse(text);
}

function getChatMessagesCount() {
    const container = document.getElementById('chatbot-messages');
    return container ? container.children.length : 0;
}

function addUserMessage(text) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-bubble chat-bubble-user';
    msgDiv.textContent = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function sendAiMessage(text) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-bubble chat-bubble-ai';
    msgDiv.innerHTML = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function processBotResponse(queryText) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const q = queryText.toLowerCase();
    const kb = chatbotKnowledgeBase[currentLang];

    // Show Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-bubble chat-bubble-ai';
    typingDiv.id = 'chat-typing-indicator';
    typingDiv.textContent = currentLang === 'te' ? 'ఫార్మ్‌సేఫ్ AI జవాబు రాస్తోంది...' : 'FarmSafe AI is typing...';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const indicator = document.getElementById('chat-typing-indicator');
        if (indicator) indicator.remove();

        let response = kb.default;

        if (q.includes('weather') || q.includes('rain') || q.includes('వాతావరణం') || q.includes('వర్షం')) {
            response = kb.weatherQuery;
        } else if (q.includes('yellow') || q.includes('పసుపు') || q.includes('ఆకులు')) {
            response = kb.yellowQuery;
        } else if (q.includes('disease') || q.includes('blight') || q.includes('వ్యాధి') || q.includes('తెగులు')) {
            response = kb.diseaseQuery;
        } else if (q.includes('fertilizer') || q.includes('urea') || q.includes('ఎరువులు')) {
            response = kb.fertilizerQuery;
        } else if (q.includes('treatment') || q.includes('medicine') || q.includes('మందు') || q.includes('పిచికారీ')) {
            response = kb.treatmentQuery;
        }

        sendAiMessage(response);
    }, 1200);
}
