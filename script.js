// Language translations
const translations = {
    en: {
        title: "Helping Hand - Lend a Hand, Change a Life",
        tagline: "Lend a hand, change a life",
        donateNow: "Donate Now",
        findNGO: "Find an NGO",
        login: "Login",
        register: "Register",
        home: "Home",
        about: "About",
        howItWorks: "How It Works",
        forDonors: "For Donors",
        forPeopleInNeed: "For People in Need",
        featuredNGOs: "Featured NGOs",
        storiesOfImpact: "Stories of Impact",
        contact: "Get in Touch",
        searchPlaceholder: "Search for NGOs, causes, or locations...",
        learnMore: "Learn More"
    },
    es: {
        title: "Manos Ayudadoras - Extiende una Mano, Cambia una Vida",
        tagline: "Extiende una mano, cambia una vida",
        donateNow: "Donar Ahora",
        findNGO: "Buscar ONG",
        login: "Iniciar Sesión",
        register: "Registrarse",
        home: "Inicio",
        about: "Acerca de",
        howItWorks: "Cómo Funciona",
        forDonors: "Para Donantes",
        forPeopleInNeed: "Para Personas Necesitadas",
        featuredNGOs: "ONG Destacadas",
        storiesOfImpact: "Historias de Impacto",
        contact: "Contacto",
        searchPlaceholder: "Buscar ONG, causas o ubicaciones...",
        learnMore: "Saber Más"
    },
    fr: {
        title: "Main Secourrice - Tendez une Main, Changez une Vie",
        tagline: "Tendez une main, changez une vie",
        donateNow: "Faire un Don",
        findNGO: "Trouver une ONG",
        login: "Connexion",
        register: "S'inscrire",
        home: "Accueil",
        about: "À Propos",
        howItWorks: "Comment Ça Marche",
        forDonors: "Pour les Donateurs",
        forPeopleInNeed: "Pour les Personnes dans le Besoin",
        featuredNGOs: "ONG en Vedette",
        storiesOfImpact: "Histoires d'Impact",
        contact: "Contact",
        searchPlaceholder: "Rechercher des ONG, causes ou lieux...",
        learnMore: "En Savoir Plus"
    },
    hi: {
        title: "मदद का हाथ - हाथ बढ़ाएं, जीवन बदलें",
        tagline: "हाथ बढ़ाएं, जीवन बदलें",
        donateNow: "अभी दान करें",
        findNGO: "एनजीओ खोजें",
        login: "लॉगिन",
        register: "रजिस्टर",
        home: "होम",
        about: "के बारे में",
        howItWorks: "यह कैसे काम करता है",
        forDonors: "दानदाताओं के लिए",
        forPeopleInNeed: "जरूरतमंद लोगों के लिए",
        featuredNGOs: "विशेष एनजीओ",
        storiesOfImpact: "प्रभाव की कहानियां",
        contact: "संपर्क करें",
        searchPlaceholder: "एनजीओ, कारण या स्थान खोजें...",
        learnMore: "और जानें"
    }
};

// Sample NGO data with coordinates (in a real app, this would come from a database)
const ngos = [
    {
        id: 1,
        name: 'Cardiac Care Foundation',
        type: 'Healthcare',
        address: '123 Health St, Agartala',
        phone: '+91 98765 43210',
        distance: null,
        coordinates: { lat: 23.8315, lng: 91.2868 },
        services: ['Cardiac Care', 'Health Checkups', 'Emergency Services'],
        image: 'Cardiac care.png'
    },
    {
        id: 2,
        name: 'Healthcare Heroes',
        type: 'Healthcare',
        address: '456 Care Ave, Agartala',
        phone: '+91 98765 43211',
        distance: null,
        coordinates: { lat: 23.8415, lng: 91.2768 },
        services: ['General Medicine', 'Pediatrics', 'Women\'s Health'],
        image: 'Health Care Heroes.png'
    },
    {
        id: 3,
        name: 'Elderly Care Network',
        type: 'Senior Care',
        address: '789 Senior Plaza, Agartala',
        phone: '+91 98765 43212',
        distance: null,
        coordinates: { lat: 23.8515, lng: 91.2668 },
        services: ['Elderly Care', 'Home Visits', 'Rehabilitation'],
        image: 'Elderly.png'
    },
    {
        id: 4,
        name: 'Hope Medical Center',
        type: 'Healthcare',
        address: '101 Hope Lane, Agartala',
        phone: '+91 98765 43213',
        distance: null,
        coordinates: { lat: 23.8015, lng: 91.2968 },
        services: ['General Medicine', 'Dental Care', 'Pharmacy'],
        image: 'Cardiac care.png'
    },
    {
        id: 5,
        name: 'Community Health Initiative',
        type: 'Healthcare',
        address: '202 Wellness Rd, Agartala',
        phone: '+91 98765 43214',
        distance: null,
        coordinates: { lat: 23.8215, lng: 91.3068 },
        services: ['Community Health', 'Preventive Care', 'Vaccinations'],
        image: 'Health Care Heroes.png'
    }
];

// DOM Elements
const languageSwitcher = document.getElementById('language-switcher');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const searchInput = document.getElementById('search-input');
const donateBtn = document.getElementById('donate-btn');
const findNGOBtn = document.getElementById('find-ngo-btn');
const findNearestNGOBtn = document.getElementById('find-nearest-ngo');
const nearestNgosSection = document.getElementById('nearest-ngos');
const ngosList = document.getElementById('ngos-list');

// Chat DOM elements
const chatRoleSelect = document.getElementById('chat-role');
const chatNgoSelect = document.getElementById('chat-ngo-select');
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatMessageInput = document.getElementById('chat-message-input');
let map;
let userMarker;
let infoWindow;
let markers = [];

// Mobile menu toggle
mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
});

// Language switcher
languageSwitcher?.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
});

function updateLanguage(lang) {
    const trans = translations[lang];
    if (!trans) return;

    // Update page title
    document.title = trans.title;

    // Update translatable elements
    const elements = {
        '[data-translate="tagline"]': trans.tagline,
        '[data-translate="donateNow"]': trans.donateNow,
        '[data-translate="findNGO"]': trans.findNGO,
        '[data-translate="login"]': trans.login,
        '[data-translate="register"]': trans.register,
        '[data-translate="home"]': trans.home,
        '[data-translate="about"]': trans.about,
        '[data-translate="howItWorks"]': trans.howItWorks,
        '[data-translate="forDonors"]': trans.forDonors,
        '[data-translate="forPeopleInNeed"]': trans.forPeopleInNeed,
        '[data-translate="featuredNGOs"]': trans.featuredNGOs,
        '[data-translate="storiesOfImpact"]': trans.storiesOfImpact,
        '[data-translate="contact"]': trans.contact,
        '[data-translate="learnMore"]': trans.learnMore
    };

    Object.entries(elements).forEach(([selector, text]) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    });

        // Update placeholder
    if (searchInput) {
        searchInput.placeholder = trans.searchPlaceholder;
    }
}

// Calculate distance between two coordinates in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// Initialize and display the map
function initMap(userLat, userLng) {
    const userLocation = { lat: userLat, lng: userLng };
    
    // Create map centered on user's location
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: userLocation,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    // Add user location marker
    userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location',
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + 
                 encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%233B82F6"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
            scaledSize: new google.maps.Size(32, 32)
        }
    });

    // Add info window for user location
    infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(userLocation);
    infoWindow.setContent('Your Location');
    infoWindow.open(map);
    map.setCenter(userLocation);

    // Add markers for each NGO
    ngos.forEach(ngo => {
        const distance = calculateDistance(userLat, userLng, ngo.coordinates.lat, ngo.coordinates.lng);
        ngo.distance = distance.toFixed(1);
        
        const marker = new google.maps.Marker({
            position: ngo.coordinates,
            map: map,
            title: ngo.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + 
                     encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%22%23EF4444"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`),
                scaledSize: new google.maps.Size(32, 32)
            }
        });

        // Add click event for each marker
        marker.addListener('click', () => {
            infoWindow.setContent(`
                <div class="p-2">
                    <h3 class="font-bold">${ngo.name}</h3>
                    <p>${ngo.distance} km away</p>
                    <p>${ngo.address}</p>
                    <p>${ngo.phone}</p>
                </div>
            `);
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });

    // Sort NGOs by distance
    ngos.sort((a, b) => a.distance - b.distance);
    
    // Display NGOs list
    displayNGOsList(ngos);
}

// Display NGOs in the list
function displayNGOsList(ngos) {
    ngosList.innerHTML = '';
    
    ngos.slice(0, 4).forEach(ngo => {
        const ngoCard = document.createElement('div');
        ngoCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
        ngoCard.innerHTML = `
            <div class="h-48 bg-gray-200 overflow-hidden">
                <img src="${ngo.image}" alt="${ngo.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-trust">${ngo.name}</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">${ngo.distance} km</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">${ngo.type}</p>
                <p class="text-sm text-gray-700 mb-3">${ngo.address}</p>
                <div class="flex flex-wrap gap-1 mb-3">
                    ${ngo.services.slice(0, 3).map(service => 
                        `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${service}</span>`
                    ).join('')}
                </div>
                <div class="flex justify-between items-center">
                    <a href="tel:${ngo.phone}" class="text-primary hover:text-primary-dark font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Call
                    </a>
                    <a href="#chat" class="text-primary hover:text-primary-dark font-medium">Chat →</a>
                </div>
            </div>
        `;
        ngosList.appendChild(ngoCard);
    });
}

// Handle errors with geolocation
function handleLocationError(error) {
    let errorMessage = 'Error: Unknown error occurred';
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
    }
    
    // Show error message to user
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
    errorDiv.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> ${errorMessage}</span>
    `;
    ngosList.parentNode.insertBefore(errorDiv, ngosList);
}

// Demo location in Agartala (Ujjayanta Palace)
const DEMO_LOCATION = {
    lat: 23.8315, 
    lng: 91.2868,
    name: 'Demo Location (Ujjayanta Palace, Agartala)'
};

// Find nearest NGOs button click handler - Demo version
if (findNearestNGOBtn) {
    findNearestNGOBtn.addEventListener('click', () => {
        // Show loading state
        findNearestNGOBtn.disabled = true;
        findNearestNGOBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding nearby NGOs...
        `;

        // Show the nearest NGOs section
        nearestNgosSection.classList.remove('hidden');
        nearestNgosSection.scrollIntoView({ behavior: 'smooth' });

        // Use demo location
        const userLat = DEMO_LOCATION.lat;
        const userLng = DEMO_LOCATION.lng;
        
        // Check if Google Maps is already loaded
        if (typeof google === 'undefined') {
            // For demo, we'll use a simple map with Leaflet.js instead of Google Maps
            loadLeafletMap(userLat, userLng);
        } else {
            // If Google Maps is loaded somehow, use it
            initMap(userLat, userLng);
        }
        
        // Reset button
        findNearestNGOBtn.disabled = false;
        findNearestNGOBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            Find Nearest NGOs
        `;
    });
}

// Load Leaflet.js for the demo map
function loadLeafletMap(userLat, userLng) {
    // Add Leaflet CSS
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);
    
    // Add Leaflet JS
    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.onload = function() {
        // Initialize the map
        const map = L.map('map').setView([userLat, userLng], 13);
        
        // Add OpenStreetMap tiles (no API key needed)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add user location marker
        L.marker([userLat, userLng], {
            icon: L.divIcon({
                html: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#3B82F6"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
                className: 'bg-transparent border-none',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            })
        })
        .addTo(map)
        .bindPopup('Your Location (Demo)');
        
        // Add NGO markers
        ngos.forEach(ngo => {
            const distance = calculateDistance(userLat, userLng, ngo.coordinates.lat, ngo.coordinates.lng);
            ngo.distance = distance.toFixed(1);
            
            L.marker([ngo.coordinates.lat, ngo.coordinates.lng], {
                icon: L.divIcon({
                    html: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#EF4444"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
                    className: 'bg-transparent border-none',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                })
            })
            .addTo(map)
            .bindPopup(`
                <div class="p-2">
                    <h3 class="font-bold">${ngo.name}</h3>
                    <p>${ngo.distance} km away</p>
                    <p>${ngo.address}</p>
                    <p>${ngo.phone}</p>
                </div>
            `);
        });
        
        // Sort NGOs by distance and display the list
        ngos.sort((a, b) => a.distance - b.distance);
        displayNGOsList(ngos);
    };
    document.head.appendChild(leafletJS);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu?.classList.add('hidden');
        }
    });
});

// Search functionality
searchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput?.value.trim();
    if (searchTerm) {
        // In a real application, this would search the NGO database
        console.log('Searching for:', searchTerm);
        // For demo purposes, show an alert
        alert(`Searching for "${searchTerm}"... In a real application, this would show search results.`);
    }
}

// CTA button handlers
donateBtn?.addEventListener('click', () => {
    // In a real application, this would navigate to donation page
    console.log('Donate Now clicked');
    alert('Donation page would open here in a real application.');
});

findNGOBtn?.addEventListener('click', () => {
    // In a real application, this would navigate to NGO directory
    console.log('Find NGO clicked');
    alert('NGO directory would open here in a real application.');
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header?.classList.add('shadow-md');
    } else {
        header?.classList.remove('shadow-md');
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput?.focus();
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        mobileMenu?.classList.add('hidden');
    }
});

// Add loading animation for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Accessibility: Add focus indicators
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels dynamically if needed
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });

    // Initialize chat NGO dropdown
    if (chatNgoSelect) {
        ngos.forEach(ngo => {
            const option = document.createElement('option');
            option.value = String(ngo.id);
            option.textContent = ngo.name;
            chatNgoSelect.appendChild(option);
        });
    }

    // Load initial chat if any NGO is preselected
    if (chatNgoSelect && chatNgoSelect.value) {
        renderChat();
    }
});

// Chat storage helpers
const CHAT_STORAGE_KEY = 'helping_hand_chats_v1';

function loadChats() {
    try {
        const raw = localStorage.getItem(CHAT_STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch (e) {
        console.error('Failed to load chats', e);
        return {};
    }
}

function saveChats(chats) {
    try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
    } catch (e) {
        console.error('Failed to save chats', e);
    }
}

function getCurrentNgoId() {
    if (!chatNgoSelect) return null;
    const id = chatNgoSelect.value;
    return id ? id : null;
}

function getCurrentRole() {
    return chatRoleSelect ? chatRoleSelect.value : 'user';
}

function renderChat() {
    if (!chatWindow) return;
    const ngoId = getCurrentNgoId();
    if (!ngoId) {
        chatWindow.innerHTML = '<p class="text-center text-gray-400 text-xs">Select an NGO to start chatting.</p>';
        return;
    }

    const chats = loadChats();
    const messages = chats[ngoId] || [];

    if (!messages.length) {
        chatWindow.innerHTML = '<p class="text-center text-gray-400 text-xs">No messages yet. Say hello!</p>';
        return;
    }

    chatWindow.innerHTML = '';
    messages.forEach(msg => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex mb-1 ' + (msg.role === 'user' ? 'justify-end' : 'justify-start');

        const bubble = document.createElement('div');
        bubble.className = 'inline-block max-w-[80%] px-3 py-2 rounded-lg text-xs md:text-sm ' +
            (msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none');

        const roleLabel = msg.role === 'user' ? 'You (User)' : 'NGO';
        bubble.innerHTML = `<div class="text-[10px] uppercase tracking-wide opacity-70 mb-0.5">${roleLabel}</div><div>${msg.text}</div>`;

        wrapper.appendChild(bubble);
        chatWindow.appendChild(wrapper);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addMessage(text) {
    const ngoId = getCurrentNgoId();
    if (!ngoId) {
        alert('Please select an NGO first.');
        return;
    }

    const role = getCurrentRole();
    const trimmed = text.trim();
    if (!trimmed) return;

    const chats = loadChats();
    if (!Array.isArray(chats[ngoId])) chats[ngoId] = [];
    chats[ngoId].push({
        role,
        text: trimmed,
        ts: Date.now()
    });
    saveChats(chats);
    renderChat();
}

if (chatForm && chatMessageInput) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addMessage(chatMessageInput.value || '');
        chatMessageInput.value = '';
        chatMessageInput.focus();
    });
}

if (chatNgoSelect) {
    chatNgoSelect.addEventListener('change', () => {
        renderChat();
    });
}

if (chatRoleSelect) {
    chatRoleSelect.addEventListener('change', () => {
        renderChat();
    });
}

// Form validation (for future forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Track event:', eventName, properties);
    // In a real application, this would send to analytics service
}

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
