// Global Variables
let userName = '';
let userAddress = '';
let userKecamatan = null;
let deferredPrompt = null;
let pwaInstallNotificationShown = false;
let currentSlideIndex = 1;
let currentProductSlideIndex = 1;
let slideInterval;
let lainnyaCurrentPage = 1;
const lainnyaItemsPerPage = 12;
let currentProducts = []; // Stores products for the currently active detail page (nearby, bestseller, promo)
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 12;
let currentSection = ''; // 'nearby', 'bestseller', 'promo'

// Product Data (Dummy Data for demonstration)
const allProducts = [
    // List of 20 products
    { name: "Mie Ayam Spesial", store: "Warung Pak Kumis", category: "Makanan Berat", rating: "4.8", price: "Rp 15.000", originalPrice: "", discount: "", location: "Desa Lenek, Kec. Lenek", description: "Mie ayam dengan bumbu spesial, topping ayam melimpah, dan pangsit renyah." },
    { name: "Bakso Jumbo Komplit", store: "Bakso Bang Jali", category: "Makanan Berat", rating: "4.7", price: "Rp 20.000", originalPrice: "", discount: "", location: "Desa Pringgabaya, Kec. Pringgabaya", description: "Bakso ukuran jumbo dengan isian telur puyuh, mie, dan kuah kaldu sapi asli." },
    { name: "Nasi Goreng Mercon", store: "Gorengan Mak Nyus", category: "Makanan Berat", rating: "4.5", price: "Rp 18.000", originalPrice: "", discount: "", location: "Desa Masbagik Utara, Kec. Masbagik", description: "Nasi goreng pedas dengan campuran sosis, bakso, dan bumbu rempah rahasia." },
    { name: "Es Jeruk Peras", store: "Minuman Segar 88", category: "Minuman Segar", rating: "4.9", price: "Rp 8.000", originalPrice: "Rp 10.000", discount: "20%", location: "Desa Suela, Kec. Suela", description: "Jeruk peras murni dengan es batu, sangat menyegarkan di siang hari." },
    { name: "Sate Lilit Ayam", store: "Warung Bali", category: "Makanan Berat", rating: "4.6", price: "Rp 25.000", originalPrice: "", discount: "", location: "Desa Labuhan Haji, Kec. Labuhan Haji", description: "Sate lilit ayam khas Bali yang dibakar dengan bumbu rempah lengkap." },
    { name: "Kopi Susu Dingin", store: "Kopi Kuy", category: "Minuman Segar", rating: "4.4", price: "Rp 12.000", originalPrice: "", discount: "", location: "Desa Aikmel, Kec. Aikmel", description: "Perpaduan kopi robusta pilihan dengan susu creamy dan sedikit gula aren." },
    { name: "Cilok Kuah Pedas", store: "Jajanan Bunda", category: "Jajanan", rating: "4.7", price: "Rp 10.000", originalPrice: "Rp 12.000", discount: "15%", location: "Desa Wanasaba, Kec. Wanasaba", description: "Cilok kenyal dengan kuah pedas gurih, dilengkapi dengan toping pilus." },
    { name: "Roti Bakar Keju", store: "Cafe Santai", category: "Jajanan", rating: "4.3", price: "Rp 14.000", originalPrice: "", discount: "", location: "Desa Sembalun Lawang, Kec. Sembalun", description: "Roti bakar tebal dengan isian keju cheddar dan susu kental manis." },
    { name: "Keripik Singkong Balado", store: "Toko Snack Kita", category: "Snack", rating: "4.8", price: "Rp 15.000", originalPrice: "", discount: "", location: "Desa Sambelia, Kec. Sambelia", description: "Keripik singkong renyah dengan bumbu balado pedas manis yang bikin nagih." },
    { name: "Burger Sapi Keju", store: "Burger Heaven", category: "Makanan Berat", rating: "4.5", price: "Rp 30.000", originalPrice: "", discount: "", location: "Desa Lenek, Kec. Lenek", description: "Burger premium dengan patty sapi asli, keju meleleh, dan saus spesial." },
    { name: "Teh Tarik Hangat", store: "Warung Kopi Jaya", category: "Minuman Segar", rating: "4.2", price: "Rp 9.000", originalPrice: "", discount: "", location: "Desa Pringgabaya, Kec. Pringgabaya", description: "Teh hitam pekat yang ditarik hingga berbusa, manis dan hangat." },
    { name: "Pisang Nugget Cokelat", store: "Nugget Mania", category: "Jajanan", rating: "4.6", price: "Rp 18.000", originalPrice: "", discount: "", location: "Desa Masbagik, Kec. Masbagik", description: "Pisang yang dibalut tepung krispi, digoreng, dan diberi topping cokelat lumer." },
    { name: "Air Mineral 600ml", store: "Toko Sembako", category: "Minuman Segar", rating: "4.9", price: "Rp 3.000", originalPrice: "", discount: "", location: "Desa Suela, Kec. Suela", description: "Air mineral kemasan 600ml, segar dan menyehatkan." },
    { name: "Martabak Mini Manis", store: "Martabak Corner", category: "Jajanan", rating: "4.7", price: "Rp 16.000", originalPrice: "Rp 20.000", discount: "20%", location: "Desa Labuhan Haji, Kec. Labuhan Haji", description: "Martabak manis ukuran mini dengan berbagai pilihan topping." },
    { name: "Gado-Gado Betawi", store: "Pecel & Gado", category: "Makanan Berat", rating: "4.4", price: "Rp 17.000", originalPrice: "", discount: "", location: "Desa Aikmel, Kec. Aikmel", description: "Campuran sayuran segar dengan bumbu kacang khas Betawi." },
    { name: "Smoothie Mangga", store: "Fruit Bar", category: "Minuman Segar", rating: "4.8", price: "Rp 22.000", originalPrice: "", discount: "", location: "Desa Wanasaba, Kec. Wanasaba", description: "Jus mangga beku kental yang dicampur dengan yoghurt." },
    { name: "Tahu Isi Sayur", store: "Gorengan Barokah", category: "Jajanan", rating: "4.5", price: "Rp 1.500", originalPrice: "", discount: "", location: "Desa Sembalun Lawang, Kec. Sembalun", description: "Tahu pong yang diisi sayuran dan digoreng renyah." },
    { name: "Donat Kentang", store: "Sweet Treats", category: "Jajanan", rating: "4.6", price: "Rp 7.000", originalPrice: "", discount: "", location: "Desa Sambelia, Kec. Sambelia", description: "Donat lembut dari kentang, ditaburi gula halus." },
    { name: "Nasi Ayam Geprek", store: "Ayam Pedas", category: "Makanan Berat", rating: "4.9", price: "Rp 20.000", originalPrice: "Rp 25.000", discount: "20%", location: "Desa Pringgabaya, Kec. Pringgabaya", description: "Nasi dengan ayam goreng krispi yang digeprek dengan sambal pedas level 3." },
    { name: "Es Teh Manis", store: "Semua Toko", category: "Minuman Segar", rating: "4.0", price: "Rp 5.000", originalPrice: "", discount: "", location: "Desa Suela, Kec. Suela", description: "Minuman sejuta umat, es teh manis." },
];

// Function to shuffle array (Fisher-Yates)
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

// --- Data Initialization ---
// Separate products for each section based on criteria
const nearbyProducts = shuffleArray(allProducts); // Initialized with random products, later filtered by location
const promoProducts = shuffleArray(allProducts.filter(p => p.originalPrice));
const lainnyaProducts = shuffleArray(allProducts);
const allBestSellerProducts = shuffleArray(allProducts.filter(p => parseFloat(p.rating) >= 4.4));

// Function to extract kecamatan from user address input
function extractKecamatan(address) {
    const addressLower = address.toLowerCase();
    // Comprehensive database of all kecamatan in Lombok with variations
    const kecamatanMapping = {
        // === LOMBOK TIMUR (21 Kecamatan) ===
        'keruak': ['keruak', 'keruak timur', 'keruak barat'],
        'jerowaru': ['jerowaru', 'jerowaru timur', 'jerowaru barat'],
        'sakra': ['sakra', 'sakra tengah'],
        'sakra barat': ['sakra barat', 'sakrabarat'],
        'sakra timur': ['sakra timur', 'sakra tim', 'sakratimur'],
        'terara': ['terara', 'terara timur', 'terara barat'],
        'montong gading': ['montong gading', 'montonggading', 'montong', 'gading'],
        'sikur': ['sikur', 'sikur timur', 'sikur barat'],
        'masbagik': ['masbagik', 'masbagik timur', 'masbagik barat', 'masbagik utara', 'masbagik selatan'],
        'pringgasela': ['pringgasela', 'pringgasela timur', 'pringgasela barat'],
        'sukamulia': ['sukamulia', 'sukamulia timur', 'sukamulia barat'],
        'suralaga': ['suralaga', 'suralaga timur', 'suralaga barat'],
        'selong': ['selong', 'selong timur', 'selong barat'],
        'labuhan haji': ['labuhan haji', 'labuhan', 'haji', 'labuhanhaji', 'lab haji'],
        'pringgabaya': ['pringgabaya', 'pringgabayara', 'pringgabaya timur', 'pringgabaya barat', 'pringgabaya utara', 'pringgabaya selatan'],
        'suela': ['suela', 'suella', 'suela timur', 'suela barat'],
        'aikmel': ['aikmel', 'aikmel timur', 'aikmel barat', 'aikmel utara', 'aikmel selatan'],
        'wanasaba': ['wanasaba', 'wanasaba timur', 'wanasaba barat', 'wanasaba utara'],
        'sembalun': ['sembalun', 'sembalun lawang', 'sembalun bumbung', 'sembalun timur', 'sembalun barat', 'sembalun utara', 'sembalun selatan'],
        'sambelia': ['sambelia', 'sambelia timur', 'sambelia barat', 'sambelia utara', 'sambelia selatan'],
        'lenek': ['lenek', 'lenek timur', 'lenek barat', 'lenek utara', 'lenek selatan'],
    };

    // Remove common prefixes/suffixes and normalize
    const normalizedAddress = addressLower
        .replace(/kecamatan|kec|desa|dusun/g, '')
        .trim();

    // Search for a match in the variations
    for (const kecamatanName in kecamatanMapping) {
        for (const variation of kecamatanMapping[kecamatanName]) {
            if (normalizedAddress.includes(variation)) {
                return kecamatanName; // Return the standard name
            }
        }
    }

    // Fallback: Check for common Lombok region names
    if (addressLower.includes('lombok timur') || addressLower.includes('lotim')) {
        return 'lombok timur'; // Return a regional fallback
    }

    return null; // Not found
}

// Function to check if a specific kecamatan is served
function checkStoreAvailability(kecamatan) {
    const availableKecamatan = [
        'suela', 'lenek', 'sakra timur', 'pringgabaya', 
        'labuhan haji', 'masbagik', 'aikmel', 'wanasaba', 
        'sembalun', 'sambelia'
    ];
    const isAvailable = availableKecamatan.includes(kecamatan.toLowerCase());

    // Special handling for the regional fallback
    if (kecamatan.toLowerCase() === 'lombok timur') {
        return 'partial'; // Assume partial coverage if it's the regional name
    }

    return isAvailable ? 'full' : 'none';
}

// Function to show availability notification modal
function showStoreAvailabilityNotification(availability) {
    if (availability === 'full') {
        return; // No need to show modal if fully covered
    }
    if (window.currentAvailabilityModal) {
        return; // Modal already showing
    }

    const modal = document.createElement('div');
    modal.className = 'name-modal-overlay';
    modal.style.backdropFilter = 'blur(8px)';
    
    let modalContent;
    
    if (availability === 'partial') {
        // Show a friendly info for general Lombok Timur location
        modalContent = document.createElement('div');
        modalContent.className = 'name-modal';
        modalContent.innerHTML = `
            <h2 class="modal-title" style="color: #ff9800;">📍 Lokasi Umum Terdeteksi</h2>
            <img src="https://i.imghippo.com/files/g30xO2Q5.png" alt="Map" class="modal-image" style="width: 150px; height: 150px; border-radius: 50%; object-fit: contain; margin-bottom: 25px;">
            <p style="color: #666; margin-bottom: 15px; line-height: 1.5; font-size: 1rem;"> 
                Kami mendeteksi lokasi umum Anda adalah **Lombok Timur**.
                <br>
                Untuk tampilan produk yang lebih akurat (Dekat Saya), kami sarankan Anda untuk memastikan penulisan alamat mencakup nama **Kecamatan** Anda.
            </p>
            <div style="background: #e3f2fd; border: 1px solid #2196f3; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                <h4 style="color: #1976d2; margin: 0 0 8px 0; font-size: 1rem;"> 💡 Tips: </h4>
                <p style="color: #1976d2; margin: 0; font-size: 0.9rem;"> Coba ulangi konfirmasi nama/alamat, tambahkan nama Kecamatan (misal: 'Desa Pringgabaya, Kec. Pringgabaya'). </p>
            </div>
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button onclick="continueWithNearbyStores()" style="
                    background: linear-gradient(135deg, #0052cc, #0066ff); 
                    color: white; 
                    border: none; 
                    padding: 14px 20px; 
                    border-radius: 10px; 
                    font-size: 1rem; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.3s;
                " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'"> 
                    🛒 Tetap Lanjut & Tampilkan Semua Toko
                </button>
                <button onclick="window.location.reload();" style="
                    background: linear-gradient(135deg, #ffcc00, #ffa726); 
                    color: #333; 
                    border: none; 
                    padding: 14px 20px; 
                    border-radius: 10px; 
                    font-size: 1rem; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.3s;
                " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'"> 
                    ✏️ Perbaiki Alamat
                </button>
            </div>
        `;
    } else { // availability === 'none' or null (specific kecamatan not in service list)
        const kecamatanDisplay = userKecamatan ? userKecamatan.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Tidak Terdeteksi';
        const regionDisplay = userAddress.includes('lombok') ? 'Lombok Timur' : 'Luar Area Layanan';

        // Show the "Out of Service Area" modal
        modalContent = document.createElement('div');
        modalContent.className = 'name-modal';
        modalContent.innerHTML = `
            <h2 class="modal-title" style="color: #d9534f;">⚠️ Area Belum Tercover</h2>
            <img src="https://i.imghippo.com/files/oI7H02Gg.png" alt="No Service" class="modal-image" style="width: 150px; height: 150px; border-radius: 50%; object-fit: contain; margin-bottom: 25px;">
            <div style="background: #fff3cd; border: 1px solid #ffeeba; border-radius: 10px; padding: 15px; margin-bottom: 15px;">
                <p style="color: #856404; margin: 0; line-height: 1.5; font-size: 1rem;">
                    <strong>📍 Lokasi Anda:</strong><br>
                    Kec. ${kecamatanDisplay}, ${regionDisplay}
                </p>
            </div>
            <p style="color: #666; margin-bottom: 15px; line-height: 1.5; font-size: 1rem;"> 
                Maaf, saat ini belum ada toko atau seller yang tersedia di kecamatan Anda. Namun jangan khawatir! 🚀 
            </p>
            <div style="background: #e3f2fd; border: 1px solid #2196f3; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <h4 style="color: #1976d2; margin: 0 0 12px 0; font-size: 1.1rem;"> 🎯 Yang Bisa Anda Lakukan: </h4>
                <ul style="color: #1976d2; text-align: left; margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li>Lihat produk dari toko terdekat di Lombok Timur</li>
                    <li>Hubungi admin untuk informasi pengiriman ke lokasi Anda</li>
                    <li>Kami sedang menambah toko baru secara bertahap</li>
                </ul>
            </div>
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button onclick="continueWithNearbyStores()" style="
                    background: linear-gradient(135deg, #0052cc, #0066ff); 
                    color: white; 
                    border: none; 
                    padding: 14px 20px; 
                    border-radius: 10px; 
                    font-size: 1rem; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.3s;
                " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'"> 
                    🛒 Lihat Toko Terdekat 
                </button>
                <button onclick="contactAdmin()" style="
                    background: linear-gradient(135deg, #25D366, #128C7E); 
                    color: white; 
                    border: none; 
                    padding: 14px 20px; 
                    border-radius: 10px; 
                    font-size: 1rem; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.3s;
                " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'"> 
                    📱 Hubungi Admin 
                </button>
            </div>
        `;
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Store reference for closing
    window.currentAvailabilityModal = modal;
}

function continueWithNearbyStores() {
    // Close availability modal
    if (window.currentAvailabilityModal) {
        document.body.removeChild(window.currentAvailabilityModal);
        window.currentAvailabilityModal = null;
    }
    // Show toast message
    showToast('Menampilkan toko terdekat dari Lombok Timur untuk Anda! 🏪');
}

function contactAdmin() {
    // Close availability modal
    if (window.currentAvailabilityModal) {
        document.body.removeChild(window.currentAvailabilityModal);
        window.currentAvailabilityModal = null;
    }
    // Create WhatsApp message for admin contact
    const message = `Halo Admin ZELAP DELIVERY! 👋 Saya ingin menanyakan ketersediaan layanan delivery untuk lokasi saya: 
👤 Nama: ${userName || 'Customer'}
📍 Alamat: ${userAddress || 'Belum diisi'}
🏘️ Kecamatan: ${userKecamatan ? userKecamatan.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Tidak terdeteksi'}
Apakah ada kemungkinan untuk pengiriman ke lokasi saya? Terima kasih! 🙏`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6287831869260';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    showToast('Menghubungkan Anda dengan admin via WhatsApp... 📱');
}

// Function to save user name and address
function saveName() {
    const nameInput = document.getElementById('userName');
    const addressInput = document.getElementById('userAddress');
    userName = nameInput.value.trim();
    userAddress = addressInput.value.trim();

    if (userName === '') {
        alert('Yuk tulis nama kaka dulu dong! 😊');
        nameInput.focus();
        return;
    }

    if (userAddress === '') {
        alert('Alamat kaka juga perlu diisi ya! Biar kami bisa tampilkan toko terdekat 😊');
        addressInput.focus();
        return;
    }

    // Extract kecamatan from address
    userKecamatan = extractKecamatan(userAddress);

    // Save user data and timestamp to localStorage
    const userData = {
        name: userName,
        address: userAddress,
        kecamatan: userKecamatan,
        timestamp: Date.now()
    };
    localStorage.setItem('zelap-user-data', JSON.stringify(userData));

    // Hide modal and show main app
    document.getElementById('nameModal').style.display = 'none';

    // Check store availability before showing main app
    if (userKecamatan) {
        const availability = checkStoreAvailability(userKecamatan);
        console.log('🔍 Store availability check:', availability);

        // Show main app first
        showMainApp();

        // Then show availability notification if needed (with delay for better UX)
        setTimeout(() => {
            showStoreAvailabilityNotification(availability);
        }, 1000);
    } else {
        // If kecamatan not detected, show main app with default products
        console.log('⚠️ Kecamatan tidak terdeteksi dari alamat:', userAddress);
        showMainApp();
        
        // Show notification about undetected location
        setTimeout(() => {
            showToast('Lokasi kecamatan tidak terdeteksi. Menampilkan semua toko yang tersedia. 📍');
        }, 1500);
    }
}

// Function to update user location in header
function updateUserLocationHeader() {
    const headerElement = document.getElementById('userLocationHeader');
    if (headerElement && userAddress) {
        headerElement.textContent = `📍 ${userAddress}`;
    }
}

// Function to extract kecamatan from product location
function extractKecamatanFromProduct(productLocation) {
    const locationLower = productLocation.toLowerCase();

    // Direct kecamatan extraction from product location format: "Desa X, Kec. Y"
    const kecMatch = locationLower.match(/kec\.?\s*([a-z\s]+?)(?:,|$)/);
    if (kecMatch) {
        const extractedKec = kecMatch[1].trim();
        
        // Map common variations to standard kecamatan names
        const kecamatanMapping = {
            'suela': 'suela',
            'lenek': 'lenek',
            'sakra timur': 'sakra timur',
            'pringgabaya': 'pringgabaya',
            'labuhan haji': 'labuhan haji',
            'masbagik': 'masbagik',
            'aikmel': 'aikmel',
            'wanasaba': 'wanasaba',
            'sembalun': 'sembalun',
            'sambelia': 'sambelia'
        };

        // Find matching kecamatan
        for (const [key, value] of Object.entries(kecamatanMapping)) {
            // Check if extractedKec contains key or key contains extractedKec (fuzzy match)
            if (extractedKec.includes(key) || key.includes(extractedKec)) {
                return value;
            }
        }

        return extractedKec;
    }

    return null;
}

// Function to get nearby products based on user location with accurate kecamatan matching
function getNearbyProductsByLocation() {
    if (!userKecamatan || userKecamatan === 'lombok timur') {
        // If no specific kecamatan detected, return random products from available stores
        console.log('⚠️ Tidak ada kecamatan terdeteksi, menampilkan produk random');
        return shuffleArray(allProducts).slice(0, 10);
    }

    console.log(`🔍 Mencari produk untuk kecamatan user: "${userKecamatan}"`);

    // Filter products by exact kecamatan matching
    const exactMatches = allProducts.filter(product => {
        const productKecamatan = extractKecamatanFromProduct(product.location);
        const isMatch = productKecamatan && productKecamatan.toLowerCase() === userKecamatan.toLowerCase();
        if (isMatch) {
            console.log(`✅ Match found: ${product.name} dari ${product.store} (${product.location})`);
        }
        return isMatch;
    });

    console.log(`📊 Ditemukan ${exactMatches.length} produk dari kecamatan ${userKecamatan}`);

    // If we have exact kecamatan matches, prioritize them
    if (exactMatches.length >= 10) {
        return shuffleArray(exactMatches).slice(0, 10);
    }

    // If we have some matches but less than 10, supplement with nearby kecamatan
    let nearbyProducts = [...exactMatches];

    // Define neighboring kecamatan for better recommendations
    const neighboringKecamatan = {
        'suela': ['lenek', 'masbagik'],
        'lenek': ['suela', 'masbagik', 'aikmel'],
        'sakra timur': ['masbagik', 'aikmel'],
        'pringgabaya': ['suela', 'lenek'],
        'labuhan haji': ['masbagik', 'sambelia'],
        'masbagik': ['suela', 'lenek', 'sakra timur', 'aikmel', 'labuhan haji'],
        'aikmel': ['lenek', 'sakra timur', 'masbagik', 'wanasaba'],
        'wanasaba': ['aikmel', 'sembalun'],
        'sembalun': ['wanasaba', 'sambelia'],
        'sambelia': ['sembalun', 'labuhan haji']
    };

    // Add products from neighboring kecamatan if needed
    if (nearbyProducts.length < 10) {
        const neighbors = neighboringKecamatan[userKecamatan] || [];
        for (const neighborKec of neighbors) {
            if (nearbyProducts.length >= 10) break;

            const neighborProducts = allProducts.filter(product => {
                const productKecamatan = extractKecamatanFromProduct(product.location);
                return productKecamatan && productKecamatan.toLowerCase() === neighborKec.toLowerCase();
            });

            // Add neighbor products (avoid duplicates)
            const newProducts = neighborProducts.filter(np => 
                !nearbyProducts.some(ep => ep.name === np.name && ep.store === np.store)
            );
            nearbyProducts.push(...newProducts);
            console.log(`📍 Menambahkan ${newProducts.length} produk dari kecamatan tetangga: ${neighborKec}`);
        }
    }

    // If still not enough, try desa-level matching
    if (nearbyProducts.length < 10) {
        const userAddressLower = userAddress.toLowerCase();

        // Extract desa name from user address (before comma or "kec.")
        const desaMatch = userAddressLower.match(/^([^,]+?)(?:,|\s+kec)/);
        const userDesa = desaMatch ? desaMatch[1].trim() : '';

        if (userDesa) {
            const desaMatches = allProducts.filter(product => {
                const productLocation = product.location.toLowerCase();
                const productDesa = productLocation.split(',')[0].trim();
                // Check if desa names are similar
                return userDesa.includes(productDesa) || productDesa.includes(userDesa);
            }).filter(dm => 
                !nearbyProducts.some(np => np.name === dm.name && np.store === dm.store)
            );
            nearbyProducts.push(...desaMatches);
            console.log(`🏘️ Menambahkan ${desaMatches.length} produk dari desa serupa`);
        }
    }

    // Final result
    const finalProducts = shuffleArray(nearbyProducts).slice(0, 10);

    // If still not enough products, fill with random products from Lombok Timur
    if (finalProducts.length < 10) {
        const remainingSlots = 10 - finalProducts.length;
        const randomProducts = shuffleArray(allProducts)
            .filter(rp => !finalProducts.some(fp => fp.name === rp.name && fp.store === rp.store))
            .slice(0, remainingSlots);
        finalProducts.push(...randomProducts);
        console.log(`🎲 Menambahkan ${randomProducts.length} produk random untuk melengkapi`);
    }

    console.log(`🎯 Total produk "Dekat Saya": ${finalProducts.length}`);
    return finalProducts;
}

// Function to show the main application content
function showMainApp() {
    // Update greeting with user name and time-based greeting
    updateGreeting();
    // Update header with user address
    updateUserLocationHeader();
    
    // Show main app
    document.getElementById('mainApp').style.display = 'block';

    // Generate product cards with location-based filtering for nearby
    const nearbyProductsFiltered = getNearbyProductsByLocation();
    
    // Debug info for user (can be removed in production)
    console.log(`👤 User: ${userName}`);
    console.log(`📍 Alamat: ${userAddress}`);
    console.log(`🏘️ Kecamatan terdeteksi: ${userKecamatan}`);
    console.log(`🛒 Produk "Dekat Saya" yang ditampilkan:`, nearbyProductsFiltered.map(p => `${p.name} (${p.store})`));

    generateCards('nearbyCards', nearbyProductsFiltered);
    generateCards('bestSellerCards', allBestSellerProducts.slice(0, 10)); // Use top 10 best sellers
    generateCards('promoCards', promoProducts.slice(0, 10)); // Use top 10 promo

    generateLainnyaGrid();
    
    // Start real-time clock
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(updateGreeting, 60000); // Update greeting every minute

    // Show PWA install notification after app loads (bulk behavior)
    showBulkPWANotification();
}

// Generate Lainnya Grid with Pagination
function generateLainnyaGrid() {
    const grid = document.getElementById('lainnyaGrid');
    const pagination = document.getElementById('lainnyaPagination');

    // Calculate pagination
    const totalItems = lainnyaProducts.length;
    const totalPages = Math.ceil(totalItems / lainnyaItemsPerPage);
    const startIndex = (lainnyaCurrentPage - 1) * lainnyaItemsPerPage;
    const endIndex = Math.min(startIndex + lainnyaItemsPerPage, totalItems);
    const pageProducts = lainnyaProducts.slice(startIndex, endIndex);

    // Generate grid
    grid.innerHTML = '';
    pageProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"> 🍽️ Foto Produk </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="store-name">${product.store}</div>
                <div class="rating">⭐ ${product.rating}</div>
                <div class="price">${product.price}</div>
                <div class="store-location">${product.location}</div>
            </div>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart('${product.name}')">+</button>
        `;
        // Make card clickable to show product detail
        card.onclick = () => showProductDetail(product);
        card.style.cursor = 'pointer';
        grid.appendChild(card);
    });

    // Generate pagination
    generateLainnyaPagination(totalPages, totalItems, startIndex + 1, endIndex);
}

function generateLainnyaPagination(totalPages, totalItems, startItem, endItem) {
    const pagination = document.getElementById('lainnyaPagination');
    pagination.innerHTML = '';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = '‹ Prev';
    prevBtn.disabled = lainnyaCurrentPage === 1;
    prevBtn.onclick = () => changeLainnyaPage(lainnyaCurrentPage - 1);
    pagination.appendChild(prevBtn);

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, lainnyaCurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'pagination-btn';
        firstBtn.textContent = '1';
        firstBtn.onclick = () => changeLainnyaPage(1);
        pagination.appendChild(firstBtn);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-info';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn';
        if (i === lainnyaCurrentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.onclick = () => changeLainnyaPage(i);
        pagination.appendChild(pageBtn);
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-info';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
        const lastBtn = document.createElement('button');
        lastBtn.className = 'pagination-btn';
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => changeLainnyaPage(totalPages);
        pagination.appendChild(lastBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next ›';
    nextBtn.disabled = lainnyaCurrentPage === totalPages;
    nextBtn.onclick = () => changeLainnyaPage(lainnyaCurrentPage + 1);
    pagination.appendChild(nextBtn);

    // Info text
    const info = document.createElement('div');
    info.className = 'pagination-info';
    info.textContent = `Menampilkan ${startItem}-${endItem} dari ${totalItems} produk`;
    pagination.appendChild(info);
}

function changeLainnyaPage(page) {
    lainnyaCurrentPage = page;
    generateLainnyaGrid();
    // Scroll to lainnya section
    document.querySelector('#lainnyaGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize app content immediately when page loads
function initializeApp() {
    // Check if user data exists and is less than 24 hours old
    const userDataString = localStorage.getItem('zelap-user-data');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        if (Date.now() - userData.timestamp < twentyFourHours) {
            userName = userData.name;
            userAddress = userData.address;
            userKecamatan = userData.kecamatan;

            // Hide name modal
            document.getElementById('nameModal').style.display = 'none';

            // Show main app
            showMainApp();
            
            // Show PWA notification immediately on app load (initial behavior)
            setTimeout(() => {
                showBulkPWANotification();
            }, 500);

            return;
        } else {
            // Data is too old, remove it
            localStorage.removeItem('zelap-user-data');
        }
    }

    // If no valid user data, ensure main app is hidden and show name modal
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('nameModal').style.display = 'flex';

    // Set default greeting
    document.getElementById('greeting').textContent = 'Hallo, Malam ini mau makan apa? 😍';

    // Initialize clock and greeting (will be updated when the user logs in)
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(updateGreeting, 60000);
    
    // Generate product cards (use default nearby products for initial load)
    generateCards('nearbyCards', nearbyProducts.slice(0, 10)); 
    generateCards('bestSellerCards', allBestSellerProducts.slice(0, 10));
    generateCards('promoCards', promoProducts.slice(0, 10));
    generateLainnyaGrid();
}

// Call initialize function when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// --- Banner Slider Logic ---
function startSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function showSlides(n) {
    let slides = document.querySelectorAll(".banner-slide");
    let dots = document.querySelectorAll(".dot");

    if (slides.length === 0) return;

    if (n > slides.length) { currentSlideIndex = 1 }
    if (n < 1) { currentSlideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

function changeSlide(n) {
    showSlides(currentSlideIndex += n);
    startSlideTimer(); // Reset timer on manual change
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlides(currentSlideIndex);
    startSlideTimer(); // Reset timer on manual change
}

// Start the slider on load
document.addEventListener('DOMContentLoaded', startSlideTimer);

// --- Product Card Generation ---
function generateCards(containerId, products) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Check if it's a promo product
        const isPromo = product.originalPrice && product.discount;

        card.innerHTML = `
            <div class="product-image"> 
                🍽️ Foto Produk 
                ${isPromo ? `<div style="position: absolute; top: 10px; right: 10px; background: #ff4444; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${product.discount} OFF</div>` : ''} 
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="store-name">${product.store}</div>
                <div class="rating">⭐ ${product.rating}</div>
                <div class="price">
                    ${product.price}
                    ${isPromo ? `<span style="text-decoration: line-through; color: #999; font-size: 0.9rem; margin-left: 8px;">${product.originalPrice}</span>` : ''}
                </div>
                <div class="store-location">${product.location}</div>
            </div>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart('${product.name}')">+</button>
        `;

        // Make card clickable to show product detail
        card.onclick = () => showProductDetail(product);
        card.style.cursor = 'pointer';

        container.appendChild(card);
    });
}

// --- Detail Page Logic ---
function showDetailPage(section) {
    // Hide main app
    document.getElementById('mainApp').classList.add('hidden');
    
    // Set current section and products
    currentSection = section;
    let detailPageId;
    let productsToDisplay;

    if (section === 'nearby') {
        detailPageId = 'nearbyDetailPage';
        productsToDisplay = getNearbyProductsByLocation();
    } else if (section === 'bestseller') {
        detailPageId = 'bestsellerDetailPage';
        productsToDisplay = allBestSellerProducts;
    } else if (section === 'promo') {
        detailPageId = 'promoDetailPage';
        productsToDisplay = promoProducts;
    } else {
        return; // Safety check
    }

    // Initialize products for filtering
    currentProducts = productsToDisplay;
    filteredProducts = productsToDisplay; // Start with all products
    currentPage = 1;
    
    // Show the relevant detail page
    document.getElementById(detailPageId).classList.add('active');

    // Generate the grid for the detail page
    generateDetailGrid(`${section}ProductsGrid`, `${section}Pagination`);
    
    // Hide the cart icon on detail page
    document.querySelector('.cart-icon').classList.add('hidden');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideDetailPage() {
    // Hide all detail pages
    document.getElementById('nearbyDetailPage').classList.remove('active');
    document.getElementById('bestsellerDetailPage').classList.remove('active');
    document.getElementById('promoDetailPage').classList.remove('active');
    
    // Show main app
    document.getElementById('mainApp').classList.remove('hidden');

    // Show the cart icon
    document.querySelector('.cart-icon').classList.remove('hidden');

    // Reset filters/search for next time
    resetFilters();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to generate and paginate the grid on detail pages
function generateDetailGrid(gridId, paginationId) {
    const grid = document.getElementById(gridId);
    const pagination = document.getElementById(paginationId);
    
    // Calculate pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Generate grid
    grid.innerHTML = '';
    pageProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const isPromo = product.originalPrice && product.discount;

        card.innerHTML = `
            <div class="product-image"> 
                🍽️ Foto Produk 
                ${isPromo ? `<div style="position: absolute; top: 10px; right: 10px; background: #ff4444; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${product.discount} OFF</div>` : ''} 
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="store-name">${product.store}</div>
                <div class="rating">⭐ ${product.rating}</div>
                <div class="price">
                    ${product.price}
                    ${isPromo ? `<span style="text-decoration: line-through; color: #999; font-size: 0.9rem; margin-left: 8px;">${product.originalPrice}</span>` : ''}
                </div>
                <div class="store-location">${product.location}</div>
            </div>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart('${product.name}')">+</button>
        `;
        card.onclick = () => showProductDetail(product);
        card.style.cursor = 'pointer';
        grid.appendChild(card);
    });
    
    // Generate pagination controls
    generateDetailPagination(pagination, totalPages, totalItems, startIndex + 1, endIndex);

    // Scroll to the top of the grid when page changes
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateDetailPagination(paginationElement, totalPages, totalItems, startItem, endItem) {
    paginationElement.innerHTML = '';

    // Helper function to create button
    const createButton = (text, isDisabled, onClick, isActive = false) => {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn';
        if (isActive) btn.classList.add('active');
        btn.textContent = text;
        btn.disabled = isDisabled;
        btn.onclick = onClick;
        return btn;
    };

    // Previous button
    paginationElement.appendChild(createButton('‹ Prev', currentPage === 1, () => changeDetailPage(currentPage - 1)));

    // Page numbers logic (max 5 visible pages)
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
        paginationElement.appendChild(createButton('1', false, () => changeDetailPage(1)));
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-info';
            ellipsis.textContent = '...';
            paginationElement.appendChild(ellipsis);
        }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        paginationElement.appendChild(createButton(i.toString(), false, () => changeDetailPage(i), i === currentPage));
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-info';
            ellipsis.textContent = '...';
            paginationElement.appendChild(ellipsis);
        }
        paginationElement.appendChild(createButton(totalPages.toString(), false, () => changeDetailPage(totalPages)));
    }
    
    // Next button
    paginationElement.appendChild(createButton('Next ›', currentPage === totalPages, () => changeDetailPage(currentPage + 1)));

    // Info text
    const info = document.createElement('div');
    info.className = 'pagination-info';
    info.textContent = `Menampilkan ${startItem}-${endItem} dari ${totalItems} produk`;
    paginationElement.appendChild(info);
}

function changeDetailPage(page) {
    currentPage = page;
    const gridId = `${currentSection}ProductsGrid`;
    const paginationId = `${currentSection}Pagination`;
    generateDetailGrid(gridId, paginationId);
}

// Search and Filter Functions (for detail pages)
let currentSearchTerm = '';
let currentFilter = 'Semua Kategori';

function searchProducts(searchTerm) {
    currentSearchTerm = searchTerm.toLowerCase();
    applyFilters();
}

function filterByCategory(category) {
    currentFilter = category;
    applyFilters();
}

function applyFilters() {
    let products = currentProducts;

    // Apply category filter
    if (currentFilter !== 'Semua Kategori') {
        products = products.filter(product => product.category === currentFilter);
    }

    // Apply search filter
    if (currentSearchTerm) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.store.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm)
        );
    }

    filteredProducts = products;
    currentPage = 1; // Reset to first page
    
    // Update display
    const gridId = `${currentSection}ProductsGrid`;
    const paginationId = `${currentSection}Pagination`;
    generateDetailGrid(gridId, paginationId);
}

function resetFilters() {
    currentFilter = 'Semua Kategori';
    currentSearchTerm = '';
    filteredProducts = currentProducts; // Reset filtered products to original list
    currentPage = 1;
    
    // Reset UI elements in detail pages
    const detailSearchInputs = document.querySelectorAll('.detail-search-bar');
    const detailCategorySelects = document.querySelectorAll('.detail-category-dropdown');
    detailSearchInputs.forEach(input => input.value = '');
    detailCategorySelects.forEach(select => select.value = 'Semua Kategori');

    // Update display
    const gridId = `${currentSection}ProductsGrid`;
    const paginationId = `${currentSection}Pagination`;
    generateDetailGrid(gridId, paginationId);
}


// --- Product Detail Modal Logic ---
function showProductDetail(product) {
    window.currentProduct = product; // Store current product globally for use in addToCartFromDetail
    const modal = document.getElementById('productDetailModal');
    
    // Populate Modal Content
    document.getElementById('detailProductName').textContent = product.name;
    document.getElementById('detailProductStore').textContent = `Dari Toko: ${product.store}`;
    document.getElementById('detailProductRating').textContent = `⭐ ${product.rating}`;
    
    let priceHTML = product.price;
    if (product.originalPrice) {
        priceHTML += ` <span class="original-price" style="text-decoration: line-through; color: #999; font-size: 0.7em; margin-left: 10px;">${product.originalPrice}</span>`;
    }
    document.getElementById('detailProductPrice').innerHTML = priceHTML;
    
    document.getElementById('detailProductDescription').textContent = product.description;
    
    // Specifications
    document.getElementById('specCategory').textContent = product.category;
    document.getElementById('specStatus').textContent = 'Tersedia'; // Placeholder value
    
    // Store Info
    document.getElementById('storeName').textContent = product.store;
    document.getElementById('storeRating').textContent = `⭐ ${product.rating}`;
    document.getElementById('storeLocation').textContent = product.location;
    
    // Show modal
    modal.classList.add('active');

    // Initialize Product Slider
    currentProductSlideIndex = 1;
    showProductSlides(currentProductSlideIndex);
    
    // Hide main scrollbar
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    const modal = document.getElementById('productDetailModal');
    modal.classList.remove('active');
    // Restore main scrollbar
    document.body.style.overflow = 'auto';
}

// Product Detail Slider Functions
function showProductSlides(n) {
    let slides = document.querySelectorAll(".product-slide");
    let dots = document.querySelectorAll(".product-dot");

    if (slides.length === 0) return;

    if (n > slides.length) { currentProductSlideIndex = 1 }
    if (n < 1) { currentProductSlideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[currentProductSlideIndex - 1].classList.add('active');
    dots[currentProductSlideIndex - 1].classList.add('active');
}

function changeProductSlide(n) {
    showProductSlides(currentProductSlideIndex += n);
}

function currentProductSlide(n) {
    currentProductSlideIndex = n;
    showProductSlides(currentProductSlideIndex);
}

// --- Shopping Cart Logic (Simple implementation) ---
let cartItems = 0;

function updateCartBadge() {
    document.getElementById('cartBadge').textContent = cartItems;
}

function addToCart(productName) {
    cartItems++;
    updateCartBadge();
    showToast(`✅ ${productName} ditambahkan ke keranjang!`);
}

function addToCartFromDetail(product) {
    addToCart(product.name);
    closeProductDetail();
}

function openCart() {
    if (cartItems === 0) {
        showToast('Keranjang masih kosong, yuk belanja dulu! 🛒');
    } else {
        showToast(`Anda memiliki ${cartItems} item di keranjang. (Fitur keranjang belum lengkap)`);
    }
}

// --- Utility Functions ---
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let timeGreeting;

    if (hour >= 5 && hour < 11) {
        timeGreeting = 'Pagi ini';
    } else if (hour >= 11 && hour < 15) {
        timeGreeting = 'Siang ini';
    } else if (hour >= 15 && hour < 18) {
        timeGreeting = 'Sore ini';
    } else {
        timeGreeting = 'Malam ini';
    }

    document.getElementById('greeting').textContent = `Hallo ${userName || 'User'}, ${timeGreeting} mau makan apa? 😍`;
}

function updateClock() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    // Timezone is WITA (GMT+8)
    const timezone = 'WITA'; 
    
    document.getElementById('userLocation').innerHTML = `
        <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #333;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM13 7h-2v6l5.25 3.15.75-1.23-4.5-2.62V7z"/>
        </svg>
        ${hour}:${minute} ${timezone}
    `;
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- PWA Installation Logic ---
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    scheduleNextPWANotification();
    console.log('👍 beforeinstallprompt fired. PWA Install ready.');
});

// Function to dismiss the notification
function dismissPWAInstall() {
    document.getElementById('pwaInstallNotification').style.display = 'none';
    pwaInstallNotificationShown = true;
    localStorage.setItem('pwa-dismissed-count', parseInt(localStorage.getItem('pwa-dismissed-count') || 0) + 1);
    localStorage.setItem('pwa-last-dismissed', Date.now());
}

// Schedule next PWA notification (only if not installed)
function scheduleNextPWANotification() {
    if (localStorage.getItem('pwa-installed') === 'true') {
        return;
    }

    const lastDismissed = parseInt(localStorage.getItem('pwa-last-dismissed') || 0);
    const dismissCount = parseInt(localStorage.getItem('pwa-dismissed-count') || 0);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const threeHours = 3 * oneHour;
    const twelveHours = 12 * oneHour;
    const twentyFourHours = 24 * oneHour;
    
    let delay;

    if (dismissCount === 0) {
        // First time visit, schedule after 30 seconds (handled by showBulkPWANotification)
        return;
    } else if (dismissCount === 1) {
        delay = threeHours;
    } else if (dismissCount === 2) {
        delay = twelveHours;
    } else {
        delay = twentyFourHours; // Once a day after that
    }

    if (now - lastDismissed > delay) {
        // If the required delay has passed, show it now
        showPWANotification();
    } else {
        // Otherwise, calculate when to show it next
        const timeUntilNext = lastDismissed + delay - now;
        console.log(`PWA notification scheduled in ${Math.round(timeUntilNext / 60000)} minutes.`);
        clearTimeout(window.pwaTimeout);
        window.pwaTimeout = setTimeout(showPWANotification, timeUntilNext);
    }
}

// Show PWA Notification (bulk behavior)
function showBulkPWANotification() {
    if (pwaInstallNotificationShown || localStorage.getItem('pwa-installed') === 'true') {
        return;
    }
    
    const lastDismissed = parseInt(localStorage.getItem('pwa-last-dismissed') || 0);
    const now = Date.now();
    const oneMinute = 60 * 1000;

    // Show immediately on first visit, or if dismissed over a minute ago (to catch quick navigation)
    if (lastDismissed === 0 || now - lastDismissed > oneMinute) {
        showPWANotification();
    }
}

function showPWANotification() {
    if (localStorage.getItem('pwa-installed') === 'true') {
        return;
    }

    const notification = document.getElementById('pwaInstallNotification');
    notification.style.display = 'flex';
    pwaInstallNotificationShown = true;

    // If prompt is not available (e.g., iOS or desktop non-chromium), change the button to show manual instructions
    const installBtn = document.getElementById('pwaInstallBtn');
    if (!deferredPrompt) {
        installBtn.onclick = () => showManualInstructions();
        installBtn.innerHTML = '<span>📲</span><span>Download</span>';
    }
}

// Install PWA using native prompt
async function installPWA() {
    if (!deferredPrompt) {
        showManualInstructions();
        return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        localStorage.setItem('pwa-installed', 'true');
        dismissPWAInstall();
        showToast('🎉 Aplikasi berhasil diinstall! Notifikasi download tidak akan muncul lagi.');
    } else {
        console.log('User dismissed the install prompt');
        showToast('Install dibatalkan. Notifikasi akan muncul lagi saat Anda mengunjungi halaman ini.');
    }

    // Clear the deferredPrompt
    deferredPrompt = null;
}

// Show manual installation instructions
function showManualInstructions(browserType = null) {
    const instructionsDiv = document.getElementById('pwaInstructions');
    const instructionIcon = document.getElementById('instructionIcon');
    const instructionTitle = document.getElementById('instructionTitle');
    const instructionSteps = document.getElementById('instructionSteps');
    
    // Detect browser if not specified
    if (!browserType) {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
            browserType = 'safari';
        } else if (userAgent.includes('chrome')) {
            browserType = 'chrome';
        } else if (userAgent.includes('firefox')) {
            browserType = 'firefox';
        } else if (userAgent.includes('edge')) {
            browserType = 'edge';
        } else {
            browserType = 'other';
        }
    }

    let instructions = [];
    let icon = '📱';
    let title = 'Cara Install di Perangkat Anda';

    // Detect if mobile or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        if (browserType === 'safari') {
            icon = '🍎';
            title = 'Install di iPhone/iPad (Safari)';
            instructions = [
                'Tap tombol "Share" (kotak dengan panah ke atas) di bagian bawah browser',
                'Scroll ke bawah dan pilih "Tambahkan ke Layar Utama"',
                'Tap "Tambahkan" di sudut kanan atas'
            ];
        } else if (browserType === 'chrome' || browserType === 'other') {
            icon = '🤖';
            title = 'Install di Android/Browser Lain';
            instructions = [
                'Tap menu tiga titik (⋮) di sudut kanan atas browser',
                'Pilih "Tambahkan ke Layar Utama" atau "Install Aplikasi"',
                'Tap "Install"'
            ];
        }
    } else { // Desktop
        if (browserType === 'chrome' || browserType === 'edge') {
            icon = '💻';
            title = 'Install di Komputer (Chrome/Edge)';
            instructions = [
                'Cari ikon "Install" (monitor dengan panah) di bilah alamat browser',
                'Klik ikon tersebut dan ikuti petunjuk untuk menginstall aplikasi'
            ];
        } else {
            icon = '❓';
            title = 'Install (Langkah Umum)';
            instructions = [
                'Cari opsi "Add to Home Screen" atau "Install" di menu browser Anda (biasanya menu tiga titik atau hamburger).',
                'Jika tidak ada, Anda masih dapat mengaksesnya melalui bookmark.'
            ];
        }
    }

    // Update UI
    instructionIcon.textContent = icon;
    instructionTitle.textContent = title;
    instructionSteps.innerHTML = '';
    instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionSteps.appendChild(li);
    });

    instructionsDiv.style.display = 'block';
}

// Event listener for app installation
window.addEventListener('appinstalled', () => {
    // Hide the prompt if it is showing
    if (deferredPrompt) {
        deferredPrompt = null;
    }
    localStorage.setItem('pwa-installed', 'true');
    dismissPWAInstall();
    console.log('PWA was installed');
});

// Set up event listeners for showing PWA notification based on user interaction
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Show PWA notification when user returns to the tab
        setTimeout(() => {
            showBulkPWANotification();
            // Also schedule next notification if needed
            scheduleNextPWANotification();
        }, 1000);
    }
});

// Show PWA notification on page focus (when user clicks on tab/window)
window.addEventListener('focus', function() {
    setTimeout(() => {
        showBulkPWANotification();
        // Also schedule next notification if needed
        scheduleNextPWANotification();
    }, 1000);
});