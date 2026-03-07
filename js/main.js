// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Contact Links and Text
    document.querySelectorAll('[data-site-phone]').forEach(el => {
        if (el.tagName === 'A') el.href = `tel:${SITE_DATA.contact.phoneLink}`;
        else el.textContent = SITE_DATA.contact.phone;
    });

    document.querySelectorAll('[data-site-whatsapp]').forEach(el => {
        if (el.tagName === 'A') {
            // Check if it's the floating button or hero button which might need a custom message
            if (el.hasAttribute('data-wa-message')) {
                const msg = el.getAttribute('data-wa-message');
                el.href = `https://wa.me/${SITE_DATA.contact.whatsappLink}?text=${encodeURIComponent(msg)}`;
            } else {
                el.href = `https://wa.me/${SITE_DATA.contact.whatsappLink}`;
            }
        }
        else el.textContent = SITE_DATA.contact.whatsapp;
    });

    document.querySelectorAll('[data-site-email]').forEach(el => {
        if (el.tagName === 'A') {
            if (el.hasAttribute('data-email-subject')) {
                const sub = el.getAttribute('data-email-subject');
                el.href = `mailto:${SITE_DATA.contact.email}?subject=${encodeURIComponent(sub)}`;
            } else {
                el.href = `mailto:${SITE_DATA.contact.email}`;
            }
        }
        else el.textContent = SITE_DATA.contact.email;
    });

    document.querySelectorAll('[data-site-address-street]').forEach(el => el.textContent = SITE_DATA.contact.address.street);
    document.querySelectorAll('[data-site-address-city]').forEach(el => el.textContent = SITE_DATA.contact.address.city);
    // Combined address for footer
    document.querySelectorAll('[data-site-address-full]').forEach(el => {
        el.innerHTML = `${SITE_DATA.contact.address.street}<br>${SITE_DATA.contact.address.city}, ${SITE_DATA.contact.address.country}`;
    });

    // 2. Inject Socials
    document.querySelectorAll('[data-social-facebook]').forEach(el => el.href = SITE_DATA.socials.facebook);
    document.querySelectorAll('[data-social-instagram]').forEach(el => el.href = SITE_DATA.socials.instagram);
    document.querySelectorAll('[data-social-linkedin]').forEach(el => el.href = SITE_DATA.socials.linkedin);

    // 3. Inject Brand Info
    document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_DATA.brand.name);
    document.querySelectorAll('[data-brand-accent]').forEach(el => el.textContent = SITE_DATA.brand.accent);
    document.querySelectorAll('[data-brand-tagline]').forEach(el => el.textContent = SITE_DATA.brand.tagline);


    // 4. Render Fleet Cards
    function renderCarCard(car) {
        // Build the specs grid dynamically
        let specsHtml = '';
        if (car.specs.power) {
            specsHtml += `
                <div class="flex flex-col items-center gap-1 text-slate-500">
                    <i class="ph-fill ph-gauge text-brand-600 text-lg"></i>
                    <span class="text-xs font-medium">${car.specs.power}</span>
                </div>
            `;
        }
        if (car.specs.transmission) {
            specsHtml += `
                <div class="flex flex-col items-center gap-1 text-slate-500">
                    <i class="ph-fill ph-gear text-brand-600 text-lg"></i>
                    <span class="text-xs font-medium">${car.specs.transmission}</span>
                </div>
            `;
        }
        if (car.specs.fuel) {
            specsHtml += `
                <div class="flex flex-col items-center gap-1 text-slate-500">
                    <i class="ph-fill ph-gas-pump text-brand-600 text-lg"></i>
                    <span class="text-xs font-medium">${car.specs.fuel}</span>
                </div>
            `;
        }
        if (car.specs.seats) {
            specsHtml += `
                <div class="flex flex-col items-center gap-1 text-slate-500">
                    <i class="ph-fill ph-users text-brand-600 text-lg"></i>
                    <span class="text-xs font-medium">${car.specs.seats}</span>
                </div>
            `;
        }

        // Adjust HTML slightly based on how many specs there are (grid-cols-3 vs grid-cols-4)
        const specsCount = Object.keys(car.specs).length;
        const gridColsClass = specsCount === 3 ? 'grid-cols-3' : 'grid-cols-4';

        const bgCategory = car.category === 'suv' ? 'bg-brand-100 text-brand-700' : 'bg-accent-500/10 text-accent-500';

        return `
            <div class="fleet-card group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 card-hover" data-category="${car.category}">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <span class="inline-block px-2 py-1 ${bgCategory} text-xs font-bold rounded-full mb-2">${car.categoryLabel}</span>
                        <h3 class="text-xl font-bold text-slate-900">${car.name}</h3>
                        <p class="text-sm text-slate-500 mt-1">${car.description}</p>
                    </div>
                    <div class="text-right">
                        <span class="block text-2xl font-bold text-brand-600">${car.price} DH</span>
                        <span class="text-xs text-slate-400">/ jour</span>
                    </div>
                </div>
                <div class="img-zoom-container h-44 flex items-center justify-center my-4 bg-slate-50 rounded-2xl">
                    <img src="${car.image}" class="w-full h-full object-cover mix-blend-multiply" alt="${car.name}">
                </div>
                <div class="grid ${gridColsClass} gap-2 py-4 border-t border-slate-100">
                    ${specsHtml}
                </div>
                <a href="reservation.html?car=${encodeURIComponent(car.name)}&img=${encodeURIComponent(car.image)}" class="block text-center w-full mt-2 py-3.5 rounded-xl border-2 border-brand-600 text-brand-600 font-bold hover:bg-brand-600 hover:text-white transition-colors duration-200 btn-press">
                    Réserver
                </a>
            </div>
        `;
    }

    // Render Featured Fleet (Home Page)
    const featuredFleetGrid = document.getElementById('featured-fleet-grid');
    if (featuredFleetGrid) {
        const featuredCars = SITE_DATA.fleet.filter(c => c.featured);
        featuredFleetGrid.innerHTML = featuredCars.map(renderCarCard).join('');
    }

    // Render Full Fleet (Vehicles Page)
    const fullFleetGrid = document.getElementById('fleet-grid');
    if (fullFleetGrid) {
        fullFleetGrid.innerHTML = SITE_DATA.fleet.map(renderCarCard).join('');

        // Ensure filtering logic knows about the new cards
        const resultsCountEl = document.getElementById('results-count');
        if (resultsCountEl) {
            resultsCountEl.textContent = SITE_DATA.fleet.length;
        }
    }
});
