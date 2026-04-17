const fs = require('fs');

const headStyles = `
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>

    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Montserrat"', 'sans-serif'],
                        serif: ['"Playfair Display"', 'serif'],
                    },
                    colors: {
                        base: '#050505',
                        surface: '#121212',
                        brand: {
                            50: '#f5f0e6',
                            100: '#e1d0a8',
                            600: '#D4AF37', // Kept for mapped values
                            900: '#121212',
                        },
                        accent: {
                            400: '#e1d0a8',
                            500: '#D4AF37', // Gold Accent
                            600: '#b08d29',
                        }
                    },
                    backgroundImage: {
                        'hero-gradient': 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.8) 100%)',
                        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    },
                    backgroundSize: {
                        'grid': '4rem 4rem',
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #050505;
            color: #e0e0e0;
        }

        /* Glassmorphism Classes */
        .glass-nav {
            background: rgba(5, 5, 5, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .luxury-glass {
            background: rgba(18, 18, 18, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Hover glows */
        .glow-hover:hover {
            box-shadow: 0 10px 40px -10px rgba(212, 175, 55, 0.15);
            border-color: rgba(212, 175, 55, 0.3);
            transform: translateY(-4px);
        }

        .ghost-glow:hover {
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
            background: rgba(212, 175, 55, 0.1);
        }
        
        .btn-press:active {
            transform: scale(0.98);
        }

        /* Scroll Reveal Animation */
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        /* Hide Scrollbar */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Gold text gradient */
        .text-gold-gradient {
            background: linear-gradient(135deg, #f5d67a 0%, #D4AF37 50%, #b08d29 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>`;

const headerContent = `
    <!-- ============================================ -->
    <!-- HEADER LAYER -->
    <!-- ============================================ -->
    <header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-nav py-4">
        <div class="max-w-[90rem] mx-auto px-6 md:px-12">
            <div class="flex justify-between items-center">
                <!-- Logo -->
                <a href="index.html" class="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                    <span class="font-serif text-2xl tracking-widest text-white uppercase"><span data-brand-name>Prestige</span> <span data-brand-accent class="text-gold-gradient italic font-normal ml-1">Auto</span></span>
                </a>

                <!-- Desktop Nav -->
                <nav class="hidden md:flex items-center space-x-12">
                    <a href="index.html" class="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-accent-500 transition-colors duration-300">Accueil</a>
                    <a href="vehicule.html" class="text-xs uppercase tracking-[0.2em] text-white hover:text-accent-500 transition-colors duration-300">Flotte</a>
                    <a href="index.html#services" class="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-accent-500 transition-colors duration-300">Services</a>
                    <a href="contact.html" class="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-accent-500 transition-colors duration-300">Contact</a>
                </nav>

                <!-- CTA -->
                <div class="hidden md:block">
                    <a href="reservation.html" data-site-whatsapp class="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white hover:text-accent-500 hover:border-accent-500 transition-all duration-300 rounded-none text-xs uppercase tracking-[0.2em] btn-press ghost-glow">
                        Réserver
                    </a>
                </div>

                <!-- Mobile Trigger -->
                <button id="mobile-menu-btn" class="md:hidden text-white hover:text-accent-500 transition-colors">
                    <i class="ph-light ph-list text-3xl" id="menu-icon"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden absolute top-full left-0 right-0 luxury-glass border-b border-white/10 mt-2">
            <div class="px-6 py-8 flex flex-col items-center space-y-6">
                <a href="index.html" class="text-sm uppercase tracking-widest text-gray-400 hover:text-accent-500 transition-colors">Accueil</a>
                <a href="vehicule.html" class="text-sm uppercase tracking-widest text-white hover:text-accent-500 transition-colors">Flotte</a>
                <a href="index.html#services" class="text-sm uppercase tracking-widest text-gray-400 hover:text-accent-500 transition-colors">Services</a>
                <a href="contact.html" class="text-sm uppercase tracking-widest text-gray-400 hover:text-accent-500 transition-colors">Contact</a>
                <a href="reservation.html" data-site-whatsapp class="w-full mt-4 py-4 border border-accent-500 text-accent-500 text-center uppercase tracking-widest text-xs hover:bg-accent-500 hover:text-black transition-colors">Réserver</a>
            </div>
        </div>
    </header>
`;

const footerContent = `
    <!-- ============================================ -->
    <!-- FOOTER LAYER -->
    <!-- ============================================ -->
    <footer class="border-t border-white/10 bg-base pt-24 pb-12 mt-20">
        <div class="max-w-[90rem] mx-auto px-6 md:px-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
                <!-- Branding -->
                <div class="lg:col-span-5">
                    <a href="index.html" class="inline-block mb-8">
                        <span class="font-serif text-3xl tracking-widest text-white uppercase"><span data-brand-name>Prestige</span> <span data-brand-accent class="text-gold-gradient italic font-normal ml-1">Auto</span></span>
                    </a>
                    <p class="text-gray-500 text-sm font-light leading-relaxed mb-10 max-w-sm" data-brand-tagline>
                        La référence de la location de véhicules d'exception au Maroc. L'élégance en mouvement.
                    </p>
                    <div class="flex gap-6">
                        <a href="#" data-social-facebook class="text-gray-500 hover:text-accent-500 transition-colors" aria-label="Facebook"><i class="ph-light ph-facebook-logo text-2xl"></i></a>
                        <a href="#" data-social-instagram class="text-gray-500 hover:text-accent-500 transition-colors" aria-label="Instagram"><i class="ph-light ph-instagram-logo text-2xl"></i></a>
                        <a href="#" data-social-linkedin class="text-gray-500 hover:text-accent-500 transition-colors" aria-label="LinkedIn"><i class="ph-light ph-linkedin-logo text-2xl"></i></a>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="lg:col-span-3">
                    <h4 class="text-white text-xs uppercase tracking-[0.2em] mb-8 font-semibold">Navigation</h4>
                    <ul class="space-y-4">
                        <li><a href="index.html" class="text-gray-500 hover:text-accent-500 text-sm font-light transition-colors">Accueil</a></li>
                        <li><a href="vehicule.html" class="text-gray-500 hover:text-accent-500 text-sm font-light transition-colors">La Collection</a></li>
                        <li><a href="index.html#services" class="text-gray-500 hover:text-accent-500 text-sm font-light transition-colors">Nos Services</a></li>
                        <li><a href="contact.html" class="text-gray-500 hover:text-accent-500 text-sm font-light transition-colors">Contact Réservation</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div class="lg:col-span-4">
                    <h4 class="text-white text-xs uppercase tracking-[0.2em] mb-8 font-semibold">Information</h4>
                    <ul class="space-y-6">
                        <li class="flex items-start gap-4">
                            <i class="ph-light ph-map-pin text-accent-500 text-xl mt-0.5"></i>
                            <span class="text-gray-400 text-sm font-light" data-site-address-full>Boulevard d'Anfa<br>Casablanca, Maroc</span>
                        </li>
                        <li class="flex items-center gap-4">
                            <i class="ph-light ph-phone text-accent-500 text-xl"></i>
                            <a href="tel:212713440903" data-site-phone class="text-gray-400 hover:text-accent-500 text-sm font-light transition-colors">+212 7 13 44 09 03</a>
                        </li>
                        <li class="flex items-center gap-4">
                            <i class="ph-light ph-envelope text-accent-500 text-xl"></i>
                            <a href="mailto:prestigeauto@gmail.com" data-site-email class="text-gray-400 hover:text-accent-500 text-sm font-light transition-colors">prestigeauto@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
                <p class="text-gray-600 text-xs tracking-widest uppercase">&copy; 2026 Prestige Auto. Tous droits réservés.</p>
                <div class="flex gap-8">
                    <a href="privacy.html" class="text-gray-600 hover:text-accent-500 text-xs tracking-widest uppercase transition-colors">Confidentialité</a>
                    <a href="terms.html" class="text-gray-600 hover:text-accent-500 text-xs tracking-widest uppercase transition-colors">Conditions</a>
                </div>
            </div>
        </div>
    </footer>
    <script>
        // Mobile Menu
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const icon = document.getElementById('menu-icon');
        let isOpen = false;

        if (btn) {
            btn.addEventListener('click', () => {
                isOpen = !isOpen;
                if (isOpen) {
                    menu.classList.remove('hidden');
                    icon.classList.replace('ph-list', 'ph-x');
                } else {
                    menu.classList.add('hidden');
                    icon.classList.replace('ph-x', 'ph-list');
                }
            });
        }
        
        // Scroll Reveal Animations
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
`;

function processFile(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    // Replace Head styles (removing old google fonts, tailwind, etc., and inserting new)
    content = content.replace(/(<!-- Google Fonts -->)(.*?)<\/head>/s, headStyles);
    
    // Add page-wide font classes and padding top (since we don't have hero video everywhere)
    content = content.replace(/<body[^>]*>/, '<body class="font-sans antialiased selection:bg-accent-500 selection:text-base cursor-default overflow-x-hidden pt-28 bg-base">');
    
    // Replace Header
    content = content.replace(/<nav[^>]*>.*?<\/nav>/s, ''); // Remove old nav if it existed.
    content = content.replace(/<header[^>]*>.*?<\/header>/s, headerContent); // Remove old header
    if (!content.includes('<header id="navbar"')) {
       // if there was no header, stick it after the body opening
       content = content.replace(/(<body[^>]*>)/, '$1\\n' + headerContent);
    }
    
    // Replace Footer
    content = content.replace(/<footer[^>]*>.*?<\/footer>/s, footerContent); // Remove old footer

    // Remove old scripts related to menu/navbar to prevent conflicts
    content = content.replace(/<script>[^<]*const navbar = document\.getElementById\('navbar'\);.*?<\/script>/s, '');
    
    // Some pages had "bg-slate-50" or "text-slate-900" applied to standard inner tags, we can globally rip those out
    content = content.replace(/text-slate-900/g, 'text-white').replace(/bg-slate-50/g, 'bg-surface').replace(/bg-white/g, 'luxury-glass').replace(/border-slate-100/g, 'border-white/10').replace(/text-slate-500/g, 'text-gray-400');
    
    // Update simple inputs and labels in contact & reservation globally
    content = content.replace(/text-slate-700/g, 'text-gray-300').replace(/border-slate-200/g, 'border-white/10').replace(/focus:border-brand-500/g, 'focus:border-accent-500');

    fs.writeFileSync(filename, content);
    console.log('Processed ' + filename);
}

['vehicule.html', 'contact.html', 'reservation.html', 'privacy.html', 'terms.html'].forEach(processFile);
