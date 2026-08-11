/* ==========================================================================
   FARMSAFE AI — MAIN APPLICATION COORDINATOR & VIEW ROUTER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLandingPage();
    initAppNavigation();
    initMobileDrawer();
    initNotificationCenter();
    renderInsightsCharts();
    setupLanguageControls();
    initAuthModal();
});

function initLandingPage() {
    const landingWrapper = document.getElementById('landing-page-wrapper');
    const btnGetStartedArr = document.querySelectorAll('.btn-trigger-getstarted');
    const btnTalkField = document.getElementById('btn-talk-field');
    const btnLandingLogin = document.getElementById('btn-landing-login');

    function enterDashboard() {
        if (landingWrapper) {
            landingWrapper.classList.add('hidden');
        }
        // Ensure Dashboard tab is active
        const dashNav = document.querySelector('.nav-item[data-target-section="dashboard-section"]');
        if (dashNav) dashNav.click();
    }

    btnGetStartedArr.forEach(btn => {
        btn.addEventListener('click', enterDashboard);
    });

    if (btnTalkField) {
        btnTalkField.addEventListener('click', () => {
            enterDashboard();
            const botTrigger = document.getElementById('chatbot-trigger-btn');
            if (botTrigger) botTrigger.click();
        });
    }

    if (btnLandingLogin) {
        btnLandingLogin.addEventListener('click', () => {
            const btnOpenLogin = document.getElementById('btn-header-login');
            if (btnOpenLogin) btnOpenLogin.click();
        });
    }
}

function initAuthModal() {
    const modalBackdrop = document.getElementById('auth-modal-backdrop');
    const btnOpenLogin = document.getElementById('btn-header-login');
    const btnOpenSignup = document.getElementById('btn-header-signup');
    const btnCloseModal = document.getElementById('btn-close-auth-modal');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabSignup = document.getElementById('auth-tab-signup');
    const authForm = document.getElementById('auth-form');
    const formSubmitBtn = document.getElementById('btn-auth-submit');
    const signupFieldsGroup = document.getElementById('signup-extra-fields');
    const modalTitle = document.getElementById('auth-modal-title');

    if (!modalBackdrop) return;

    let currentAuthMode = 'login';

    function openModal(mode = 'login') {
        currentAuthMode = mode;
        switchTab(mode);
        modalBackdrop.style.display = 'flex';
    }

    function closeModal() {
        modalBackdrop.style.display = 'none';
    }

    function switchTab(mode) {
        currentAuthMode = mode;
        if (mode === 'login') {
            if (tabLogin) tabLogin.classList.add('active');
            if (tabSignup) tabSignup.classList.remove('active');
            if (signupFieldsGroup) signupFieldsGroup.style.display = 'none';
            if (modalTitle) modalTitle.textContent = window.getText('modalTitleLogin');
            if (formSubmitBtn) formSubmitBtn.textContent = window.getText('btnSubmitLogin');
        } else {
            if (tabSignup) tabSignup.classList.add('active');
            if (tabLogin) tabLogin.classList.remove('active');
            if (signupFieldsGroup) signupFieldsGroup.style.display = 'flex';
            if (modalTitle) modalTitle.textContent = window.getText('modalTitleSignup');
            if (formSubmitBtn) formSubmitBtn.textContent = window.getText('btnSubmitSignup');
        }
    }

    if (btnOpenLogin) btnOpenLogin.addEventListener('click', () => openModal('login'));
    if (btnOpenSignup) btnOpenSignup.addEventListener('click', () => openModal('signup'));
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });

    if (tabLogin) tabLogin.addEventListener('click', () => switchTab('login'));
    if (tabSignup) tabSignup.addEventListener('click', () => switchTab('signup'));

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = window.getText('loginSuccessMsg');
            alert(`✅ ${msg}`);
            closeModal();
        });
    }
}

function initAppNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.app-section');

    function switchSection(targetSectionId) {
        if (!targetSectionId) return;

        // Highlight active sidebar item
        navItems.forEach(n => {
            if (n.dataset.targetSection === targetSectionId) {
                n.classList.add('active');
            } else {
                n.classList.remove('active');
            }
        });

        // Switch active view section
        sections.forEach(sec => {
            if (sec.id === targetSectionId) {
                sec.style.display = 'block';
                sec.classList.add('animate-fade-in');
            } else {
                sec.style.display = 'none';
                sec.classList.remove('animate-fade-in');
            }
        });

        // Close mobile drawer if open
        closeMobileDrawer();

        // Scroll top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchSection(item.dataset.targetSection);
        });
    });

    // Add Weather Navigation Trigger for all weather buttons/cards across dashboard
    document.querySelectorAll('.btn-goto-weather').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            switchSection('weather-section');
        });
    });

    // Handle hash links if opening specific anchor (e.g. index.html#weather)
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        switchSection(`${hash}-section`);
    }
}

function initMobileDrawer() {
    const hamburger = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!hamburger || !sidebar) return;

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
        overlay.addEventListener('click', closeMobileDrawer);
    }
}

function closeMobileDrawer() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

function setupLanguageControls() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang && window.setLanguage) {
                window.setLanguage(lang);
            }
        });
    });
}

function initNotificationCenter() {
    const notifBtn = document.getElementById('notification-btn');
    if (!notifBtn) return;

    notifBtn.addEventListener('click', () => {
        alert("🔔 FarmAlerts:\n1. 🟡 High Humidity alert: fungal infection risk in Tomato crops.\n2. 🟢 Weather Window: Optimal spraying conditions tomorrow morning.");
    });
}

function renderInsightsCharts() {
    // Populate Crop Health Insights Progress Bars
    const chartBars = [
        { id: 'bar-healthy', width: '70%' },
        { id: 'bar-at-risk', width: '20%' },
        { id: 'bar-diseased', width: '10%' }
    ];

    setTimeout(() => {
        chartBars.forEach(b => {
            const el = document.getElementById(b.id);
            if (el) el.style.width = b.width;
        });
    }, 500);

    // Populate Recent Scans History Table
    const historyContainer = document.getElementById('recent-scans-list');
    if (!historyContainer) return;

    const scans = [
        { plant: "Tomato Leaf", disease: "Early Blight", date: "Today, 10:30 AM", confidence: "94%", status: "badge-warning" },
        { plant: "Paddy Crop", disease: "Healthy", date: "Yesterday, 4:15 PM", confidence: "98%", status: "badge-success" },
        { plant: "Potato Leaf", disease: "Late Blight", date: "09 Aug 2026", confidence: "92%", status: "badge-danger" }
    ];

    historyContainer.innerHTML = scans.map(s => `
        <div class="scan-history-item">
            <div>
                <strong>${s.plant}</strong> — ${s.disease}
                <div style="font-size:0.75rem; color:var(--text-muted);">${s.date}</div>
            </div>
            <span class="badge ${s.status}">${s.confidence}</span>
        </div>
    `).join('');
}
