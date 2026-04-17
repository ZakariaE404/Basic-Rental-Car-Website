// js/main.js

/**
 * Prestige Auto - Core Functionality
 * Handles dynamic rendering of car fleet, contact links, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if SITE_DATA is available
    if (typeof SITE_DATA === 'undefined') {
        console.error('SITE_DATA is not defined. Ensure data.js is loaded before main.js.');
        return;
    }

    // 2. Initialize Scroll Reveal Observer
    initScrollReveal();

    // 3. Render Fleet Grids
    renderFeaturedFleet();
    renderFullFleet();

    // 4. Inject Dynamic Information
    injectContactDetails();
    injectBrandDetails();
    injectSocialLinks();

    // 5. Initialize Mobile Menu
    initMobileMenu();
});

/**
 * Initialize IntersectionObserver for scroll-reveal animations.
 * Provides a global window.observer that can be used by dynamic rendering functions.
 */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    window.observer = observer;

    // Observe existing static reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Renders the featured cars on the homepage.
 */
function renderFeaturedFleet() {
    const grid = document.getElementById('featured-fleet-grid');
    if (!grid) return;

    const featuredCars = SITE_DATA.fleet.filter(car => car.featured);
    grid.innerHTML = featuredCars.map(renderCarCard).join('');

    // Observe newly added cards
    if (window.observer) {
        grid.querySelectorAll('.reveal').forEach(el => window.observer.observe(el));
    }
}

/**
 * Renders the full fleet on the collection page.
 */
function renderFullFleet() {
    const grid = document.getElementById('fleet-grid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.fleet.map(renderCarCard).join('');
    
    // Update results count
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = SITE_DATA.fleet.length;

    // Observe newly added cards
    if (window.observer) {
        grid.querySelectorAll('.reveal').forEach(el => window.observer.observe(el));
    }
}

/**
 * Component: Render a single car card
 */
function renderCarCard(car) {
    // Generate Specs HTML
    const specs = [
        { icon: 'ph-gear', value: car.specs.transmission },
        { icon: 'ph-engine', value: car.specs.power },
        { icon: 'ph-users', value: car.specs.seats }
    ].filter(s => s.value).map(s => `
        <div class="flex items-center gap-2 text-gray-400">
            <i class="ph-light ${s.icon} text-accent-500 text-lg"></i>
            <span class="text-xs uppercase tracking-widest">${s.value}</span>
        </div>
    `).join('');

    return `
        <div class="fleet-card group relative luxury-glass rounded-2xl overflow-hidden transition-all duration-500 glow-hover reveal" data-category="${car.category}">
            <div class="relative h-64 overflow-hidden bg-gradient-to-b from-surface to-base flex items-center justify-center p-6">
                <img src="${car.image}" class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out" alt="${car.name}" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop'">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-accent-500 text-[10px] uppercase tracking-widest rounded-full">${car.categoryLabel}</span>
                </div>
            </div>
            <div class="p-8">
                <h3 class="font-serif text-2xl text-white mb-2">${car.name}</h3>
                <p class="text-sm text-gray-500 font-sans mb-6 line-clamp-2">${car.description}</p>
                <div class="flex flex-wrap gap-4 mb-8">${specs}</div>
                <div class="flex items-end justify-between border-t border-white/10 pt-6">
                    <div>
                        <span class="block text-xs uppercase tracking-widest text-gray-500 mb-1">À partir de</span>
                        <span class="text-2xl font-serif text-accent-500">${car.price} <span class="text-sm font-sans text-gray-400">DH/Jour</span></span>
                    </div>
                    <a href="reservation.html?car=${encodeURIComponent(car.name)}&img=${encodeURIComponent(car.image)}" class="inline-flex items-center justify-center px-6 py-3 border border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-black transition-colors rounded-full text-sm uppercase tracking-widest btn-press">
                        Réserver
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Inject contact phone, email, and whatsapp links
 */
function injectContactDetails() {
    // Phone
    document.querySelectorAll('[data-site-phone]').forEach(el => {
        if (el.tagName === 'A') el.href = `tel:${SITE_DATA.contact.phoneLink}`;
        else el.textContent = SITE_DATA.contact.phone;
    });

    // WhatsApp
    document.querySelectorAll('[data-site-whatsapp]').forEach(el => {
        if (el.tagName === 'A') {
            const msg = el.getAttribute('data-wa-message') || "Bonjour, je souhaite plus d'informations sur vos véhicules.";
            el.href = `https://wa.me/${SITE_DATA.contact.whatsappLink}?text=${encodeURIComponent(msg)}`;
        } else {
            el.textContent = SITE_DATA.contact.whatsapp;
        }
    });

    // Email
    document.querySelectorAll('[data-site-email]').forEach(el => {
        if (el.tagName === 'A') {
            const subject = el.getAttribute('data-email-subject') || "Demande de location de véhicule";
            el.href = `mailto:${SITE_DATA.contact.email}?subject=${encodeURIComponent(subject)}`;
        } else {
            el.textContent = SITE_DATA.contact.email;
        }
    });

    // Address
    document.querySelectorAll('[data-site-address-full]').forEach(el => {
        el.innerHTML = `${SITE_DATA.contact.address.street}<br>${SITE_DATA.contact.address.city}, ${SITE_DATA.contact.address.country}`;
    });
}

/**
 * Inject brand identity details
 */
function injectBrandDetails() {
    document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_DATA.brand.name);
    document.querySelectorAll('[data-brand-accent]').forEach(el => el.textContent = SITE_DATA.brand.accent);
    document.querySelectorAll('[data-brand-tagline]').forEach(el => el.textContent = SITE_DATA.brand.tagline);
}

/**
 * Inject social media links
 */
function injectSocialLinks() {
    document.querySelectorAll('[data-social-facebook]').forEach(el => el.href = SITE_DATA.socials.facebook);
    document.querySelectorAll('[data-social-instagram]').forEach(el => el.href = SITE_DATA.socials.instagram);
    document.querySelectorAll('[data-social-linkedin]').forEach(el => el.href = SITE_DATA.socials.linkedin);
}

/**
 * Mobile Menu Toggle Logic
 */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (!btn || !menu || !icon) return;

    btn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        if (isOpen) {
            menu.classList.add('hidden');
            icon.classList.replace('ph-x', 'ph-list');
        } else {
            menu.classList.remove('hidden');
            icon.classList.replace('ph-list', 'ph-x');
        }
    });

    // Close menu when clicking links
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            icon.classList.replace('ph-x', 'ph-list');
        });
    });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.remove('glass-nav', 'py-4');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}

/**
 * Fleet Filtering Logic (For Vehicule page)
 */
function initFleetFilters() {
    const filters = document.querySelectorAll('.fleet-filter');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    if (filters.length === 0) return;

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');
            
            // Update Active State
            filters.forEach(btn => {
                btn.classList.remove('active', 'bg-accent-500', 'text-black', 'shadow-xl', 'shadow-accent-500/20');
                btn.classList.add('text-gray-400', 'luxury-glass');
            });
            filter.classList.add('active', 'bg-accent-500', 'text-black', 'shadow-xl', 'shadow-accent-500/20');
            filter.classList.remove('text-gray-400', 'luxury-glass');

            // Filter Cards
            let visibleCount = 0;
            document.querySelectorAll('.fleet-card').forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (resultsCount) resultsCount.textContent = visibleCount;
            if (noResults) {
                if (visibleCount === 0) noResults.classList.remove('hidden');
                else noResults.classList.add('hidden');
            }
        });
    });
}

/**
 * Button Press Visual Effect
 */
function initButtonEffects() {
    document.querySelectorAll('.btn-press').forEach(button => {
        button.addEventListener('mousedown', () => button.style.transform = 'scale(0.95)');
        button.addEventListener('mouseup', () => button.style.transform = '');
        button.addEventListener('mouseleave', () => button.style.transform = '');
    });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (typeof SITE_DATA === 'undefined') return;

    initScrollReveal();
    renderFeaturedFleet();
    renderFullFleet();
    injectContactDetails();
    injectBrandDetails();
    injectSocialLinks();
    
    // Core UI
    initMobileMenu();
    initNavbarEffect();
    initFleetFilters();
    initButtonEffects();
});
