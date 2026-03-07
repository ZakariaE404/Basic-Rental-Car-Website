// js/data.js
const SITE_DATA = {
    brand: {
        name: "Prestige",
        accent: "Auto",
        tagline: "Votre partenaire de confiance pour la location de véhicules de prestige au Maroc.",
        established: 2010
    },
    contact: {
        phone: "+212 7 13 44 09 03",
        phoneLink: "212713440903", // For tel: links
        whatsapp: "+212 7 13 44 09 03",
        whatsappLink: "212713440903", // For wa.me links
        email: "prestigeauto@gmail.com",
        address: {
            street: "Boulevard d'Anfa",
            city: "Casablanca",
            country: "Maroc"
        }
    },
    socials: {
        facebook: "#",
        instagram: "#",
        linkedin: "#"
    },
    fleet: [
        {
            id: 1,
            name: "Hyundai New Tucson",
            category: "suv",
            categoryLabel: "SUV",
            description: "Confort et Espace",
            price: 600,
            image: "imgs/Hyundai New Tucson.jpg",
            specs: {
                power: "136 ch",
                transmission: "Auto",
                fuel: "Diesel",
                seats: "5 Places"
            },
            featured: true
        },
        {
            id: 2,
            name: "Kia Sportage",
            category: "suv",
            categoryLabel: "SUV",
            description: "Design Moderne",
            price: 550,
            image: "imgs/Ouv-kia.webp",
            specs: {
                power: "136 ch",
                transmission: "Auto",
                fuel: "Diesel",
                seats: "5 Places"
            },
            featured: false
        },
        {
            id: 3,
            name: "Volkswagen Golf",
            category: "compact",
            categoryLabel: "COMPACTE",
            description: "L'iconique allemande",
            price: 450,
            image: "imgs/Volkswagen-Golf.jpg",
            specs: {
                power: "115 ch",
                transmission: "Auto",
                fuel: "Diesel",
                seats: "5 Places"
            },
            featured: true
        },
        {
            id: 4,
            name: "Peugeot 208",
            category: "compact",
            categoryLabel: "CITADINE",
            description: "Dynamique",
            price: 300,
            image: "imgs/p208.webp",
            specs: {
                power: "100 ch",
                transmission: "Manu",
                fuel: "Essence",
                seats: "5 Places"
            },
            featured: false
        },
        {
            id: 5,
            name: "Renault Clio 5",
            category: "compact",
            categoryLabel: "CITADINE",
            description: "Pratique et stylée",
            price: 300,
            image: "imgs/renault-clio-5.jpg",
            specs: {
                power: "90 ch",
                transmission: "Manu",
                fuel: "Diesel",
                seats: "5 Places"
            },
            featured: true
        },
        {
            id: 6,
            name: "Hyundai i20",
            category: "compact",
            categoryLabel: "CITADINE",
            description: "Compacte idéale",
            price: 350,
            image: "imgs/hyundai-i20.webp",
            specs: {
                power: "100 ch",
                transmission: "Auto",
                fuel: "Essence",
                seats: "5 Places"
            },
            featured: false
        }
    ]
};
