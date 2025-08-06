// Cookie Consent Manager for NuWave Gaming
class CookieManager {
    constructor() {
        this.cookieName = 'nuwavegaming_cookie_consent';
        this.cookieExpiry = 365; // days
        this.init();
    }

    init() {
        // Check if user has already made a choice
        if (!this.hasConsent()) {
            this.showBanner();
        }
        
        // Add event listeners
        this.addEventListeners();
    }

    hasConsent() {
        return this.getCookie(this.cookieName) !== null;
    }

    showBanner() {
        // Remove existing banner if any
        this.hideBanner();

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-4 shadow-2xl';
        banner.innerHTML = `
            <div class="container mx-auto max-w-7xl">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div class="flex-1">
                        <div class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-cyan-400 flex-shrink-0 mt-0.5">
                                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                                <path d="M8.5 8.5v.01"></path>
                                <path d="M16 15.5v.01"></path>
                                <path d="M12 12v.01"></path>
                                <path d="M11 17v.01"></path>
                                <path d="M7 14v.01"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold text-slate-100 mb-1">We use cookies to enhance your experience</h3>
                                <p class="text-sm text-slate-300">
                                    We use cookies to analyze website traffic, personalize content, and provide social media features. 
                                    <a href="legal/cookies-policy/" class="text-cyan-400 hover:text-cyan-300 underline">Learn more about our cookies policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <button id="cookie-settings" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-100">
                            Customize
                        </button>
                        <button id="cookie-reject" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-100">
                            Reject All
                        </button>
                        <button id="cookie-accept" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add slide-up animation
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 100);
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    showSettings() {
        // Remove existing modal if any
        this.hideSettings();

        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4';
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-slate-100">Cookie Preferences</h2>
                        <button id="close-settings" class="text-slate-400 hover:text-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="border border-slate-700 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-slate-100">Essential Cookies</h3>
                                <span class="text-sm text-slate-400 bg-slate-800 px-2 py-1 rounded">Always Active</span>
                            </div>
                            <p class="text-sm text-slate-300">These cookies are necessary for the website to function and cannot be switched off.</p>
                        </div>

                        <div class="border border-slate-700 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-slate-100">Performance Cookies</h3>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="performance-cookies" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                </label>
                            </div>
                            <p class="text-sm text-slate-300">These cookies help us understand how visitors interact with our website.</p>
                        </div>

                        <div class="border border-slate-700 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-slate-100">Functionality Cookies</h3>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="functionality-cookies" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                </label>
                            </div>
                            <p class="text-sm text-slate-300">These cookies enable enhanced functionality and personalization.</p>
                        </div>

                        <div class="border border-slate-700 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-slate-100">Marketing Cookies</h3>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="marketing-cookies" class="sr-only peer">
                                    <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                </label>
                            </div>
                            <p class="text-sm text-slate-300">These cookies are used to deliver personalized advertisements.</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 mt-8 sm:flex-row sm:justify-end">
                        <button id="save-settings" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-6 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                            Save Preferences
                        </button>
                        <button id="accept-all-settings" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-6 border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    hideSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.remove();
        }
    }

    acceptAll() {
        const consent = {
            essential: true,
            performance: true,
            functionality: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpiry);
        this.hideBanner();
        this.hideSettings();
        this.loadCookies(consent);
    }

    rejectAll() {
        const consent = {
            essential: true,
            performance: false,
            functionality: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpiry);
        this.hideBanner();
        this.hideSettings();
        this.loadCookies(consent);
    }

    saveSettings() {
        const consent = {
            essential: true,
            performance: document.getElementById('performance-cookies')?.checked || false,
            functionality: document.getElementById('functionality-cookies')?.checked || false,
            marketing: document.getElementById('marketing-cookies')?.checked || false,
            timestamp: new Date().toISOString()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpiry);
        this.hideSettings();
        this.hideBanner();
        this.loadCookies(consent);
    }

    loadCookies(consent) {
        // Load essential cookies (always loaded)
        this.loadEssentialCookies();

        // Load optional cookies based on consent
        if (consent.performance) {
            this.loadPerformanceCookies();
        }

        if (consent.functionality) {
            this.loadFunctionalityCookies();
        }

        if (consent.marketing) {
            this.loadMarketingCookies();
        }

        console.log('Cookie consent updated:', consent);
    }

    loadEssentialCookies() {
        // Load essential cookies (session management, security, etc.)
        console.log('Loading essential cookies...');
    }

    loadPerformanceCookies() {
        // Load analytics cookies (Google Analytics, etc.)
        console.log('Loading performance cookies...');
        
        // Example: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    loadFunctionalityCookies() {
        // Load functionality cookies (preferences, etc.)
        console.log('Loading functionality cookies...');
    }

    loadMarketingCookies() {
        // Load marketing cookies (advertising, social media, etc.)
        console.log('Loading marketing cookies...');
        
        // Example: Google Analytics marketing
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted'
            });
        }
    }

    addEventListeners() {
        // Use event delegation for dynamically created elements
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-accept') {
                this.acceptAll();
            } else if (e.target.id === 'cookie-reject') {
                this.rejectAll();
            } else if (e.target.id === 'cookie-settings') {
                this.showSettings();
            } else if (e.target.id === 'close-settings') {
                this.hideSettings();
            } else if (e.target.id === 'save-settings') {
                this.saveSettings();
            } else if (e.target.id === 'accept-all-settings') {
                this.acceptAll();
            }
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-settings-modal') {
                this.hideSettings();
            }
        });
    }

    // Utility functions for cookie management
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    getConsent() {
        const consent = this.getCookie(this.cookieName);
        return consent ? JSON.parse(consent) : null;
    }

    // Public method to show settings (can be called from anywhere)
    showCookieSettings() {
        this.showSettings();
    }
}

// Initialize cookie manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieManager = new CookieManager();
});

// Global function to show cookie settings
function showCookieSettings() {
    if (window.cookieManager) {
        window.cookieManager.showCookieSettings();
    }
}
