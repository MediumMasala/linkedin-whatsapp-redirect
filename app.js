/**
 * Tal WhatsApp Redirect - app.js
 * Handles WhatsApp deep linking for Android LinkedIn in-app browser
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    defaultPhone: '919224262682',
    defaultText: 'hey tal',
    redirectDelay: 650 // ms before redirecting to retry.html
};

// ============================================
// URL PARAMETER HELPERS
// ============================================
function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        phone: urlParams.get('phone') || CONFIG.defaultPhone,
        text: urlParams.get('text') || CONFIG.defaultText,
        company: urlParams.get('company') || null
    };
}

function preserveQueryString() {
    return window.location.search || '';
}

// ============================================
// WHATSAPP URL BUILDERS
// ============================================
function buildIntentUrl(phone, text) {
    const encodedText = encodeURIComponent(text);
    return `intent://send?phone=${phone}&text=${encodedText}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
}

function buildDeepLinkUrl(phone, text) {
    const encodedText = encodeURIComponent(text);
    return `whatsapp://send?phone=${phone}&text=${encodedText}`;
}

function buildWaUrl(phone, text) {
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${phone}?text=${encodedText}`;
}

// ============================================
// OPEN WHATSAPP (tries multiple methods)
// ============================================
function openWhatsApp() {
    const params = getParams();
    const phone = params.phone;
    const text = params.text;

    // Detect Android
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isAndroid) {
        // Try Android Intent first (most reliable for in-app browsers)
        const intentUrl = buildIntentUrl(phone, text);
        window.location.href = intentUrl;
    } else {
        // iOS / Desktop: use wa.me
        const waUrl = buildWaUrl(phone, text);
        window.location.href = waUrl;
    }
}

// Fallback function that uses wa.me directly
function openWhatsAppFallback() {
    const params = getParams();
    const waUrl = buildWaUrl(params.phone, params.text);
    window.open(waUrl, '_blank');
}

// ============================================
// NAVIGATION WITH VISIBILITY CHECK
// ============================================
let navigationTimer = null;

function navigateToRetryIfVisible() {
    navigationTimer = setTimeout(function() {
        if (document.visibilityState === 'visible') {
            // Page is still visible, WhatsApp probably didn't open
            window.location.href = 'retry.html' + preserveQueryString();
        }
    }, CONFIG.redirectDelay);
}

function cancelNavigationTimer() {
    if (navigationTimer) {
        clearTimeout(navigationTimer);
        navigationTimer = null;
    }
}

// Cancel timer if page becomes hidden (WhatsApp opened)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        cancelNavigationTimer();
    }
});

// ============================================
// COMPANY PILL
// ============================================
function showCompanyPill() {
    const params = getParams();
    if (params.company) {
        const pill = document.getElementById('companyPill');
        if (pill) {
            pill.textContent = 'For ' + params.company + ' folks';
            pill.classList.add('show');
        }
    }
}

// ============================================
// SCREEN 1: INDEX.HTML HANDLER
// ============================================
function handleIndexButton() {
    openWhatsApp();
    navigateToRetryIfVisible();
}

// ============================================
// SCREEN 2: RETRY.HTML HANDLER
// ============================================
let retryState = 'initial'; // 'initial' or 'final'

function handleRetryButton() {
    openWhatsApp();

    if (retryState === 'initial') {
        // Swap UI to final state
        swapToFinalState();
        retryState = 'final';
    }
}

function swapToFinalState() {
    // Hide initial elements
    const initialHeading = document.getElementById('initialHeading');
    const initialSubtext = document.getElementById('initialSubtext');
    const initialBtnText = document.getElementById('retryBtnText');

    // Show final elements
    const finalHeading = document.getElementById('finalHeading');
    const finalSubtext = document.getElementById('finalSubtext');
    const fallbackLink = document.getElementById('fallbackLink');

    if (initialHeading) initialHeading.classList.add('hidden');
    if (initialSubtext) initialSubtext.classList.add('hidden');
    if (finalHeading) finalHeading.classList.remove('hidden');
    if (finalSubtext) finalSubtext.classList.remove('hidden');
    if (fallbackLink) fallbackLink.classList.remove('hidden');
    if (initialBtnText) initialBtnText.textContent = 'Open WhatsApp again';
}

function handleFallbackClick(e) {
    e.preventDefault();
    openWhatsAppFallback();
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Show company pill if param exists
    showCompanyPill();

    // Bind button handlers based on page
    const indexBtn = document.getElementById('indexOpenBtn');
    if (indexBtn) {
        indexBtn.addEventListener('click', handleIndexButton);
    }

    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) {
        retryBtn.addEventListener('click', handleRetryButton);
    }

    const fallbackLink = document.getElementById('fallbackLink');
    if (fallbackLink) {
        fallbackLink.addEventListener('click', handleFallbackClick);
    }
});
