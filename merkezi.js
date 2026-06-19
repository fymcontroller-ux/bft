(() => {
// Original default prices data
const defaultScreens = [
    { name: "GHS-043", price: 141 },
    { name: "GHS-043E", price: 169 },
    { name: "GHPro-070E-WIFI", price: 160 },
    { name: "GHS-070", price: 155 },
    { name: "GHS-070E", price: 184 },
    { name: "GHS-101", price: 290 },
    { name: "GHS-101E", price: 312 },
    { name: "MSG-156E", price: 1055 }
];

const defaultDrivers = [
    { name: "MICNO-00075H", price: 250 },
    { name: "MICNO-00150H", price: 260 },
    { name: "MICNO-00220H", price: 306 },
    { name: "MICNO-00370H", price: 333 },
    { name: "MICNO-00550H", price: 442 },
    { name: "MICNO-00750H", price: 505 },
    { name: "MICNO-01100H", price: 635 },
    { name: "MICNO-01500H", price: 800 },
    { name: "MICNO-01850H", price: 926 },
    { name: "MICNO-02200H", price: 1120 },
    { name: "MICNO-03000HS", price: 1250 }
];

const defaultPumps = [
    { name: "DVP PA 315 CLAW", price: 5160 },
    { name: "BLOWER 0,70 KW TEK TÜRBİN", price: 160 },
    { name: "BLOWER 1,60 KW TEK TÜRBİN", price: 285 },
    { name: "BLOWER 2,2 KW TEK TÜRBİN", price: 300 },
    { name: "BLOWER 5,5 KW TEK TÜRBİN", price: 740 },
    { name: "BLOWER 18,5 KW TEK TÜRBİN", price: 1915 },
    { name: "BLOWER 1,60 KW ÇİFT TÜRBİN", price: 355 },
    { name: "BLOWER 2,2 KW ÇİFT TÜRBİN", price: 375 },
    { name: "BLOWER 3,0 KW ÇİFT TÜRBİN", price: 550 },
    { name: "BLOWER 4,0 KW ÇİFT TÜRBİN", price: 600 },
    { name: "BLOWER 5,50 KW ÇİFT TÜRBİN", price: 810 },
    { name: "BLOWER 7,5 KW ÇİFT TÜRBİN", price: 1500 },
    { name: "BLOWER 11 KW ÇİFT TÜRBİN", price: 1555 }
];

const defaultPipes = [
    { name: "Ø38X1,2 KROM BORU", price: 35, hose: "Ø38 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø38 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø48X1,5 KROM BORU", price: 45, hose: "Ø48 SPİRAL HORTUM", hosePrice: 5, clamp: "Ø48 SPİRAL HORTUM KELEPÇESİ", clampPrice: 1 },
    { name: "Ø60.3X2 KROM BORU", price: 70, hose: "Ø60.3 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø60.3 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø76.1X2 KROM BORU", price: 90, hose: "Ø76.1 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø76.1 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø88.9x2 KROM BORU", price: 105, hose: "Ø88.9 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø88.9 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø38X1,5 SİYAH BORU", price: 0, hose: "Ø38 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø38 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø48X1,5 SİYAH BORU", price: 10, hose: "Ø48 SPİRAL HORTUM", hosePrice: 5, clamp: "Ø48 SPİRAL HORTUM KELEPÇESİ", clampPrice: 1 },
    { name: "Ø60,3X2 SİYAH BORU", price: 0, hose: "Ø60.3 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø60.3 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø76.1X1,5 SİYAH BORU", price: 0, hose: "Ø76.1 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø76.1 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø88.9x2 SİYAH BORU", price: 0, hose: "Ø88.9 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø88.9 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 }
];

const defaultGeneralItems = [
    { name: "GMT-396T (PLC)", price: 222, category: "Pano Ekipmanları" },
    { name: "GXM-16IA (Input Modül)", price: 70, category: "Pano Ekipmanları" },
    { name: "GXM-16TA (Output Modül)", price: 96, category: "Pano Ekipmanları" },
    { name: "Transtör Kart", price: 20, category: "Pano Ekipmanları" },
    { name: "Güç Kaynağı", price: 70, category: "Pano Ekipmanları" },
    { name: "Fren Direnci", price: 29, category: "Pano Ekipmanları" },
    { name: "Pano Havalandırma", price: 90, category: "Pano Ekipmanları" },
    { name: "Lobar (Küçük)", price: 30, category: "Pano Ekipmanları" },
    { name: "Lobar (Büyük)", price: 40, category: "Pano Ekipmanları" },
    { name: "Pano", price: 500, category: "Pano Ekipmanları" },
    { name: "Diğer Malzemeler", price: 50, category: "Pano Ekipmanları" },
    { name: "12X1 Kumanda Kablosu", price: 2.5, category: "Kablolar" },
    { name: "6X0,5 Kumanda Kablosu", price: 1.0, category: "Kablolar" },
    { name: "8X1 KUMANDA KABLOSU (Duvar-İstasyon Arası)", price: 1.5, category: "Kablolar" },
    { name: "4x4 Bilendajlı Kablo", price: 4.0, category: "Kablolar" },
    { name: "24LÜ SOKET (DUVAR TİPİ)", price: 35, category: "Soketler" },
    { name: "24LÜ SOKET (MAKİNA TİPİ)", price: 35, category: "Soketler" },
    { name: "16LI SOKET (DUVAR TİPİ)", price: 30, category: "Soketler" },
    { name: "HAZNE", price: 275, category: "İstasyon Ekipmanları" },
    { name: "KUMANDA SETİ", price: 30, category: "İstasyon Ekipmanları" },
    { name: "120x120x4 Profil", price: 10.0, category: "Duvardaki Sistem" },
    { name: "HAT BAĞLANTI EKİPMANLARI", price: 12.3, category: "Duvardaki Sistem" },
    { name: "MA1650 PİSTON", price: 15.0, category: "Duvardaki Sistem" },
    { name: "VALF (1/4\" 5/2 Tek Bobin)", price: 12.0, category: "Duvardaki Sistem" },
    { name: "KLEPE TAKIMI", price: 12.0, category: "Duvardaki Sistem" },
    { name: "ŞASE SİSTEMİ (SİKLON+JETFİLTRE)", price: 1000.0, category: "Pompa Şase" },
    { name: "CONTALI SAÇ KELEPÇE", price: 10.0, category: "Tesisat ve Borulama" },
    { name: "TESİSAT DÖŞEME APARATLARI", price: 10.0, category: "Tesisat ve Borulama" }
];

// Active datasets
let screens = [];
let drivers = [];
let pumps = [];
let pipes = [];
let generalItems = [];

document.addEventListener("DOMContentLoaded", () => {
    loadPrices();
    initSelectors();
    initTabs();
    initPriceEditor();
    loadSavedProjectsList();
    setupEventListeners();
    calculate();
});

// Load prices from LocalStorage or fallback to defaults
function loadPrices() {
    screens = JSON.parse(localStorage.getItem("m_screens")) || JSON.parse(JSON.stringify(defaultScreens));
    drivers = JSON.parse(localStorage.getItem("m_drivers")) || JSON.parse(JSON.stringify(defaultDrivers));
    pumps = JSON.parse(localStorage.getItem("m_pumps")) || JSON.parse(JSON.stringify(defaultPumps));
    pipes = JSON.parse(localStorage.getItem("m_pipes")) || JSON.parse(JSON.stringify(defaultPipes));
    
    let storedGeneral = JSON.parse(localStorage.getItem("m_generalItems"));
    if (storedGeneral) {
        // Auto-remove duplicate cable from older storage states if present
        storedGeneral = storedGeneral.filter(item => item.name !== "6x0,5 Kumanda Kablosu (Pano-Şase Arası)");
        
        // Migrate old name to the new unified name
        storedGeneral.forEach(item => {
            if (item.name === "6X0,5 Kumanda Kablosu") {
                item.name = "6X0,5 Kumanda Kablosu";
            }
        });

        // Ensure missing default general items are added if not present in localStorage
        defaultGeneralItems.forEach(defaultItem => {
            if (!storedGeneral.some(item => item.name === defaultItem.name)) {
                storedGeneral.push(JSON.parse(JSON.stringify(defaultItem)));
            }
        });

        generalItems = storedGeneral;
    } else {
        generalItems = JSON.parse(JSON.stringify(defaultGeneralItems));
    }
}

// Save active prices to LocalStorage
function savePrices() {
    localStorage.setItem("m_screens", JSON.stringify(screens));
    localStorage.setItem("m_drivers", JSON.stringify(drivers));
    localStorage.setItem("m_pumps", JSON.stringify(pumps));
    localStorage.setItem("m_pipes", JSON.stringify(pipes));
    localStorage.setItem("m_generalItems", JSON.stringify(generalItems));
}

// Reset prices back to original Excel defaults
function resetPrices() {
    localStorage.removeItem("m_screens");
    localStorage.removeItem("m_drivers");
    localStorage.removeItem("m_pumps");
    localStorage.removeItem("m_pipes");
    localStorage.removeItem("m_generalItems");
    loadPrices();
    
    // Refresh UI Selectors and Inputs
    initSelectors();
    initPriceEditor();
    calculate();
}

function initSelectors() {
    // Save selected values to preserve selections if updating lists
    const savedScreen = document.getElementById("screenSelect").value || "GHS-070E";
    const savedDriver = document.getElementById("driverSelect").value || "MICNO-01100H";
    const savedPump = document.getElementById("pumpSelect").value || "BLOWER 7,5 KW ÇİFT TÜRBİN";
    const savedPipe = document.getElementById("pipeSelect").value || "Ø48X1,5 SİYAH BORU";

    const screenSelect = document.getElementById("screenSelect");
    screenSelect.innerHTML = "";
    screens.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.name;
        opt.textContent = `${s.name} ($${s.price.toFixed(2)})`;
        if (s.name === savedScreen) opt.selected = true;
        screenSelect.appendChild(opt);
    });

    const driverSelect = document.getElementById("driverSelect");
    driverSelect.innerHTML = "";
    drivers.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.name;
        opt.textContent = `${d.name} ($${d.price.toFixed(2)})`;
        if (d.name === savedDriver) opt.selected = true;
        driverSelect.appendChild(opt);
    });

    const pumpSelect = document.getElementById("pumpSelect");
    pumpSelect.innerHTML = "";
    pumps.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = `${p.name} ($${p.price.toFixed(2)})`;
        if (p.name === savedPump) opt.selected = true;
        pumpSelect.appendChild(opt);
    });

    const pipeSelect = document.getElementById("pipeSelect");
    pipeSelect.innerHTML = "";
    pipes.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = `${p.name} ($${p.price.toFixed(2)})`;
        if (p.name === savedPipe) opt.selected = true;
        pipeSelect.appendChild(opt);
    });
}

function initTabs() {
    const btnCalc = document.getElementById("btnCalcTabMerkezi");
    const btnPrice = document.getElementById("btnPriceTabMerkezi");
    const contentCalc = document.getElementById("calcTabContentMerkezi");
    const contentPrice = document.getElementById("priceTabContentMerkezi");

    btnCalc.addEventListener("click", () => {
        btnCalc.classList.add("active");
        btnPrice.classList.remove("active");
        contentCalc.classList.add("active-content");
        contentPrice.classList.remove("active-content");
    });

    btnPrice.addEventListener("click", () => {
        btnPrice.classList.add("active");
        btnCalc.classList.remove("active");
        contentPrice.classList.add("active-content");
        contentCalc.classList.remove("active-content");
    });
}

// Generate the forms dynamically in the price editor panel
function initPriceEditor() {
    const container = document.getElementById("priceEditGridMerkezi");
    container.innerHTML = "";

    // Helper to generate a card section element
    function createGroupCard(title, list, onUpdatePrice) {
        const card = document.createElement("div");
        card.className = "price-group-card";
        
        const h3 = document.createElement("h3");
        h3.textContent = title;
        card.appendChild(h3);

        list.forEach((item, idx) => {
            const row = document.createElement("div");
            row.className = "price-input-row";
            
            const lbl = document.createElement("label");
            lbl.textContent = item.name;
            lbl.title = item.name;
            
            const inputContainer = document.createElement("div");
            inputContainer.className = "input-container";
            
            const inp = document.createElement("input");
            inp.type = "number";
            inp.step = "0.01";
            inp.min = "0";
            inp.value = item.price;
            
            inp.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value) || 0;
                onUpdatePrice(idx, val);
            });

            const unit = document.createElement("span");
            unit.className = "unit";
            unit.textContent = "$";

            inputContainer.appendChild(inp);
            inputContainer.appendChild(unit);
            row.appendChild(lbl);
            row.appendChild(inputContainer);
            card.appendChild(row);
        });

        return card;
    }

    // Render group cards
    container.appendChild(createGroupCard("Ekran Modelleri", screens, (idx, val) => {
        screens[idx].price = val;
        savePrices();
        initSelectors();
        calculate();
    }));

    container.appendChild(createGroupCard("Sürücü Modelleri", drivers, (idx, val) => {
        drivers[idx].price = val;
        savePrices();
        initSelectors();
        calculate();
    }));

    container.appendChild(createGroupCard("Pompa (Blower) Modelleri", pumps, (idx, val) => {
        pumps[idx].price = val;
        savePrices();
        initSelectors();
        calculate();
    }));

    // Render Boru models card with extra fields (Hose, Clamp Prices)
    const pipeCard = document.createElement("div");
    pipeCard.className = "price-group-card";
    const pipeH3 = document.createElement("h3");
    pipeH3.textContent = "Boru ve Tesisat Modelleri";
    pipeCard.appendChild(pipeH3);

    pipes.forEach((p, idx) => {
        // Pipe row
        const rowPipe = document.createElement("div");
        rowPipe.className = "price-input-row";
        rowPipe.innerHTML = `
            <label>${p.name}</label>
            <div class="input-container">
                <input type="number" step="0.01" min="0" value="${p.price}" id="pipePrice-${idx}">
                <span class="unit">$</span>
            </div>
        `;
        pipeCard.appendChild(rowPipe);
        pipeCard.querySelector(`#pipePrice-${idx}`).addEventListener("input", (e) => {
            pipes[idx].price = parseFloat(e.target.value) || 0;
            savePrices();
            initSelectors();
            calculate();
        });

        // Hose price
        const rowHose = document.createElement("div");
        rowHose.className = "price-input-row";
        rowHose.style.paddingLeft = "1.5rem";
        rowHose.innerHTML = `
            <label style="font-size: 0.8rem; color: var(--text-muted);">${p.hose}</label>
            <div class="input-container">
                <input type="number" step="0.01" min="0" value="${p.hosePrice}" id="hosePrice-${idx}">
                <span class="unit">$</span>
            </div>
        `;
        pipeCard.appendChild(rowHose);
        pipeCard.querySelector(`#hosePrice-${idx}`).addEventListener("input", (e) => {
            pipes[idx].hosePrice = parseFloat(e.target.value) || 0;
            savePrices();
            calculate();
        });

        // Clamp price
        const rowClamp = document.createElement("div");
        rowClamp.className = "price-input-row";
        rowClamp.style.paddingLeft = "1.5rem";
        rowClamp.style.marginBottom = "1.5rem";
        rowClamp.innerHTML = `
            <label style="font-size: 0.8rem; color: var(--text-muted);">${p.clamp}</label>
            <div class="input-container">
                <input type="number" step="0.01" min="0" value="${p.clampPrice}" id="clampPrice-${idx}">
                <span class="unit">$</span>
            </div>
        `;
        pipeCard.appendChild(rowClamp);
        pipeCard.querySelector(`#clampPrice-${idx}`).addEventListener("input", (e) => {
            pipes[idx].clampPrice = parseFloat(e.target.value) || 0;
            savePrices();
            calculate();
        });
    });
    container.appendChild(pipeCard);

    // Group General items by their category
    const categories = ["Pano Ekipmanları", "Kablolar", "Soketler", "İstasyon Ekipmanları", "Duvardaki Sistem", "Pompa Şase", "Tesisat ve Borulama"];
    categories.forEach(cat => {
        const catItems = generalItems.filter(item => item.category === cat);
        container.appendChild(createGroupCard(cat, catItems, (idx, val) => {
            const itemToUpdate = catItems[idx];
            const trueIdx = generalItems.findIndex(g => g.name === itemToUpdate.name);
            generalItems[trueIdx].price = val;
            savePrices();
            calculate();
        }));
    });
}

function setupEventListeners() {
    const inputs = [
        "stationCount", "materialCount", "pumpCount", "machineDistance", 
        "longestDistance", "wallToMachineCable", "controlCableLength", 
        "wallToMachineHose", "screenSelect", "driverSelect", "pumpSelect", 
        "pipeSelect", "laborRatio", "projectName"
    ];

    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", calculate);
            el.addEventListener("change", calculate);
        }
    });

    document.getElementById("exportBtnMerkezi").addEventListener("click", () => {
        // Generate Dynamic Name based on date and project
        const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
        const projName = document.getElementById("projectName").value.trim() || "Merkezi Sistem Projesi";
        const originalTitle = document.title;
        
        document.title = `${dateStr} - ${projName} - Hesaplama`;
        window.print();
        
        // Restore title shortly after
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    });

    document.getElementById("resetPricesBtnMerkezi").addEventListener("click", resetPrices);

    // Project management listeners
    document.getElementById("btnSaveProject").addEventListener("click", saveCurrentProject);
    document.getElementById("btnDeleteProject").addEventListener("click", deleteSelectedProject);
    document.getElementById("savedProjectsSelect").addEventListener("change", loadSelectedProject);
}

// Helper to look up prices in generalItems
function getGeneralPrice(itemName) {
    const item = generalItems.find(g => g.name === itemName);
    return item ? item.price : 0;
}

function calculate() {
    // 1. Get raw inputs
    const H7 = parseInt(document.getElementById("stationCount").value) || 0;
    const H8 = parseInt(document.getElementById("materialCount").value) || 0;
    const H9 = parseInt(document.getElementById("pumpCount").value) || 0;
    const H13 = parseFloat(document.getElementById("machineDistance").value) || 0;
    const H14 = parseFloat(document.getElementById("longestDistance").value) || 0;
    const H15 = parseFloat(document.getElementById("wallToMachineCable").value) || 0;
    const H16 = parseFloat(document.getElementById("controlCableLength").value) || 0;
    const H17 = parseFloat(document.getElementById("wallToMachineHose").value) || 0;
    const laborRatio = parseFloat(document.getElementById("laborRatio").value) || 0;

    // Selected components
    const selectedScreenName = document.getElementById("screenSelect").value;
    const selectedScreen = screens.find(s => s.name === selectedScreenName);

    const selectedDriverName = document.getElementById("driverSelect").value;
    const selectedDriver = drivers.find(d => d.name === selectedDriverName);

    const selectedPumpName = document.getElementById("pumpSelect").value;
    const selectedPump = pumps.find(p => p.name === selectedPumpName);

    const selectedPipeName = document.getElementById("pipeSelect").value;
    const selectedPipe = pipes.find(p => p.name === selectedPipeName);

    // 2. Perform Excel-equivalent intermediate computations
    // H10 (INPUT): =(H7*4)+(H9*1)+1
    const H10 = (H7 * 4) + (H9 * 1) + 1;
    // H11 (OUTPUT): =(H7*3)+(H7*H8)+(H9*4)+1
    const H11 = (H7 * 3) + (H7 * H8) + (H9 * 4) + 1;

    // Cabling calculation (O35 Sum)
    let O35 = 0;
    for (let i = 0; i < H7; i++) {
        const dist = H14 - (i * H13);
        O35 += Math.max(0, dist);
    }

    // Cabling total meters = O35 * 1.1
    const cableMeters_12x1 = O35 * 1.1;

    // Display intermediate previews
    document.getElementById("totalInputs").textContent = H10;
    document.getElementById("totalOutputs").textContent = H11;
    document.getElementById("totalCableLength").textContent = `${cableMeters_12x1.toFixed(1)} m`;

    // 3. Define and Calculate Cost Sections
    const sections = {};

    // SECTION 1: PANO
    sections.pano = {
        title: "Pano Sistem Bileşenleri",
        excludeFromTotal: false,
        items: [
            { name: selectedScreen.name, qty: 1, unitPrice: selectedScreen.price },
            { name: "GMT-396T (PLC)", qty: 1, unitPrice: getGeneralPrice("GMT-396T (PLC)") },
            { name: "GXM-16IA (Input Modül)", qty: Math.ceil(H10 / 16), unitPrice: getGeneralPrice("GXM-16IA (Input Modül)") },
            { name: "GXM-16TA (Output Modül)", qty: Math.ceil(H11 / 16), unitPrice: getGeneralPrice("GXM-16TA (Output Modül)") },
            { name: "Transtör Kart", qty: Math.ceil(H11 / 5) + 2, unitPrice: getGeneralPrice("Transtör Kart") },
            { name: "Güç Kaynağı", qty: 2, unitPrice: getGeneralPrice("Güç Kaynağı") },
            { name: selectedDriver.name, qty: H9, unitPrice: selectedDriver.price },
            { name: "Fren Direnci", qty: H9, unitPrice: getGeneralPrice("Fren Direnci") },
            { name: "Pano Havalandırma", qty: 1, unitPrice: getGeneralPrice("Pano Havalandırma") },
            { name: "Lobar (Küçük)", qty: 2, unitPrice: getGeneralPrice("Lobar (Küçük)") },
            { name: "Lobar (Büyük)", qty: 2, unitPrice: getGeneralPrice("Lobar (Büyük)") },
            { name: "Pano", qty: 1, unitPrice: getGeneralPrice("Pano") },
            { name: "Diğer Malzemeler", qty: H7, unitPrice: getGeneralPrice("Diğer Malzemeler") }
        ]
    };

    // SECTION 2: KABLO
    sections.kablo = {
        title: "Kablolama Grubu",
        excludeFromTotal: false,
        items: [
            { name: "12X1 Kumanda Kablosu", qty: cableMeters_12x1, unitPrice: getGeneralPrice("12X1 Kumanda Kablosu"), isMeter: true },
            { name: "6X0,5 Kumanda Kablosu", qty: H16 * H7, unitPrice: getGeneralPrice("6X0,5 Kumanda Kablosu"), isMeter: true },
            { name: "8X1 KUMANDA KABLOSU (Duvar-İstasyon Arası)", qty: H15 * H7, unitPrice: getGeneralPrice("8X1 KUMANDA KABLOSU (Duvar-İstasyon Arası)"), isMeter: true },
            { name: "4x4 Bilendajlı Kablo", qty: 25, unitPrice: getGeneralPrice("4x4 Bilendajlı Kablo"), isMeter: true },
            { name: "6x0,5 Kumanda Kablosu (Pano-Şase Arası)", qty: 25, unitPrice: getGeneralPrice("6X0,5 Kumanda Kablosu"), isMeter: true }
        ]
    };

    // SECTION 3: SOKETLER
    sections.soketler = {
        title: "Soket Malzemeleri",
        excludeFromTotal: false,
        items: [
            { name: "24LÜ SOKET (DUVAR TİPİ)", qty: H7, unitPrice: getGeneralPrice("24LÜ SOKET (DUVAR TİPİ)") },
            { name: "24LÜ SOKET (MAKİNA TİPİ)", qty: H7, unitPrice: getGeneralPrice("24LÜ SOKET (MAKİNA TİPİ)") },
            { name: "16LI SOKET (DUVAR TİPİ)", qty: H7, unitPrice: getGeneralPrice("16LI SOKET (DUVAR TİPİ)") }
        ]
    };

    // SECTION 4: İSTASYON
    sections.istasyon = {
        title: "İstasyon Ekipmanları",
        excludeFromTotal: false,
        items: [
            { name: "HAZNE", qty: H7, unitPrice: getGeneralPrice("HAZNE") },
            { name: "KUMANDA SETİ", qty: H7, unitPrice: getGeneralPrice("KUMANDA SETİ") }
        ]
    };

    // SECTION 5: DUVARDAKİ SİSTEM MALİYETİ
    sections.duvarSistemi = {
        title: "Duvardaki Sistem Maliyeti (Genel Toplama Dahil Değildir)",
        excludeFromTotal: true,
        items: [
            { name: "120x120x4 Profil", qty: H7 * H8, unitPrice: getGeneralPrice("120x120x4 Profil") },
            { name: "HAT BAĞLANTI EKİPMANLARI", qty: H7 * H8, unitPrice: getGeneralPrice("HAT BAĞLANTI EKİPMANLARI") },
            { name: "MA1650 PİSTON", qty: H7 * H8, unitPrice: getGeneralPrice("MA1650 PİSTON") },
            { name: "VALF (1/4\" 5/2 Tek Bobin)", qty: H7 * H8, unitPrice: getGeneralPrice("VALF (1/4\" 5/2 Tek Bobin)") },
            { name: "KLEPE TAKIMI", qty: H7 * H8, unitPrice: getGeneralPrice("KLEPE TAKIMI") }
        ]
    };

    // SECTION 6: POMPA ŞASE SİSTEMİ
    sections.pompaSase = {
        title: "Pompa Şase Sistemi",
        excludeFromTotal: false,
        items: [
            { name: selectedPump.name, qty: H9, unitPrice: selectedPump.price },
            { name: "ŞASE SİSTEMİ (SİKLON+JETFİLTRE)", qty: H9, unitPrice: getGeneralPrice("ŞASE SİSTEMİ (SİKLON+JETFİLTRE)") }
        ]
    };

    // SECTION 7: TESİSAT
    sections.tesisat = {
        title: "Tesisat ve Borulama",
        excludeFromTotal: false,
        items: [
            { name: selectedPipe.hose, qty: (H17 * 2) * H7, unitPrice: selectedPipe.hosePrice, isMeter: true },
            { name: selectedPipe.clamp, qty: 4 * H7, unitPrice: selectedPipe.clampPrice },
            { name: selectedPipe.name, qty: H14 * (H8 + 1), unitPrice: selectedPipe.price, isMeter: true },
            { name: "CONTALI SAÇ KELEPÇE", qty: 16, unitPrice: getGeneralPrice("CONTALI SAÇ KELEPÇE") },
            { name: "TESİSAT DÖŞEME APARATLARI", qty: Math.ceil(H14 / 3), unitPrice: getGeneralPrice("TESİSAT DÖŞEME APARATLARI") }
        ]
    };

    // 4. Populate table & calculate sums
    let materialTotal = 0;
    const tbody = document.getElementById("costTableBodyMerkezi");
    tbody.innerHTML = "";

    Object.keys(sections).forEach(secKey => {
        const sec = sections[secKey];
        
        // Add Section Header Row
        const headerRow = document.createElement("tr");
        headerRow.className = "category-row";
        headerRow.innerHTML = `
            <td colspan="4">${sec.title}</td>
        `;
        tbody.appendChild(headerRow);

        let sectionSum = 0;

        // Add Section Item Rows
        sec.items.forEach(item => {
            const qtyFormatted = item.isMeter ? `${item.qty.toFixed(1)} m` : `${item.qty} Adet`;
            const totalCost = item.qty * item.unitPrice;
            sectionSum += totalCost;
            
            if (!sec.excludeFromTotal) {
                materialTotal += totalCost;
            }

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${qtyFormatted}</td>
                <td>$${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>$${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            `;
            tbody.appendChild(row);
        });

        // Add Section Subtotal Row
        const subtotalRow = document.createElement("tr");
        subtotalRow.className = "subtotal-row";
        subtotalRow.innerHTML = `
            <td>Ara Toplam</td>
            <td colspan="2"></td>
            <td>$${sectionSum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        `;
        tbody.appendChild(subtotalRow);
    });

    // 5. Final totals computations
    const laborCost = materialTotal * laborRatio / 100.0;
    const grandTotal = materialTotal + laborCost;

    // Update displays
    document.getElementById("summaryMaterialTotal").textContent = `$${materialTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("summaryLaborTotal").textContent = `$${laborCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("summaryGrandTotal").textContent = `$${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// --- PROJECT MANAGEMENT FUNCTIONS ---

function loadSavedProjectsList() {
    const list = JSON.parse(localStorage.getItem("m_projects")) || {};
    const select = document.getElementById("savedProjectsSelect");
    
    // Save current selection
    const currentSelection = select.value;
    
    select.innerHTML = '<option value="">-- Yeni Proje Başlat --</option>';
    
    Object.keys(list).sort().forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });

    select.value = currentSelection;
    toggleDeleteButtonState();
}

function toggleDeleteButtonState() {
    const select = document.getElementById("savedProjectsSelect");
    const deleteBtn = document.getElementById("btnDeleteProject");
    if (select.value === "") {
        deleteBtn.disabled = true;
    } else {
        deleteBtn.disabled = false;
    }
}

function saveCurrentProject() {
    const name = document.getElementById("projectName").value.trim();
    if (!name) {
        alert("Lütfen kaydetmeden önce bir proje adı girin.");
        return;
    }

    const projects = JSON.parse(localStorage.getItem("m_projects")) || {};
    
    projects[name] = {
        name: name,
        stationCount: parseInt(document.getElementById("stationCount").value) || 8,
        materialCount: parseInt(document.getElementById("materialCount").value) || 1,
        pumpCount: parseInt(document.getElementById("pumpCount").value) || 1,
        machineDistance: parseFloat(document.getElementById("machineDistance").value) || 1.0,
        longestDistance: parseFloat(document.getElementById("longestDistance").value) || 25.0,
        wallToMachineCable: parseFloat(document.getElementById("wallToMachineCable").value) || 7.0,
        controlCableLength: parseFloat(document.getElementById("controlCableLength").value) || 4.0,
        wallToMachineHose: parseFloat(document.getElementById("wallToMachineHose").value) || 7.0,
        screenSelect: document.getElementById("screenSelect").value,
        driverSelect: document.getElementById("driverSelect").value,
        pumpSelect: document.getElementById("pumpSelect").value,
        pipeSelect: document.getElementById("pipeSelect").value,
        laborRatio: parseFloat(document.getElementById("laborRatio").value) || 50
    };

    localStorage.setItem("m_projects", JSON.stringify(projects));
    loadSavedProjectsList();
    
    document.getElementById("savedProjectsSelect").value = name;
    toggleDeleteButtonState();
    alert(`"${name}" projesi başarıyla kaydedildi.`);
}

function loadSelectedProject() {
    const select = document.getElementById("savedProjectsSelect");
    const name = select.value;
    
    if (name === "") {
        // User clicked '-- Yeni Proje Başlat --'
        resetToNewProject();
        return;
    }

    const projects = JSON.parse(localStorage.getItem("m_projects")) || {};
    const p = projects[name];
    if (!p) return;

    document.getElementById("projectName").value = p.name;
    document.getElementById("stationCount").value = p.stationCount;
    document.getElementById("materialCount").value = p.materialCount;
    document.getElementById("pumpCount").value = p.pumpCount;
    document.getElementById("machineDistance").value = p.machineDistance;
    document.getElementById("longestDistance").value = p.longestDistance;
    document.getElementById("wallToMachineCable").value = p.wallToMachineCable;
    document.getElementById("controlCableLength").value = p.controlCableLength;
    document.getElementById("wallToMachineHose").value = p.wallToMachineHose;
    
    document.getElementById("screenSelect").value = p.screenSelect;
    document.getElementById("driverSelect").value = p.driverSelect;
    document.getElementById("pumpSelect").value = p.pumpSelect;
    document.getElementById("pipeSelect").value = p.pipeSelect;
    
    document.getElementById("laborRatio").value = p.laborRatio;

    toggleDeleteButtonState();
    calculate();
}

function resetToNewProject() {
    document.getElementById("projectName").value = "Yeni Proje";
    document.getElementById("stationCount").value = 8;
    document.getElementById("materialCount").value = 1;
    document.getElementById("pumpCount").value = 1;
    document.getElementById("machineDistance").value = 1.0;
    document.getElementById("longestDistance").value = 25.0;
    document.getElementById("wallToMachineCable").value = 7.0;
    document.getElementById("controlCableLength").value = 4.0;
    document.getElementById("wallToMachineHose").value = 7.0;
    document.getElementById("laborRatio").value = 50;

    document.getElementById("screenSelect").value = "GHS-070E";
    document.getElementById("driverSelect").value = "MICNO-01100H";
    document.getElementById("pumpSelect").value = "BLOWER 7,5 KW ÇİFT TÜRBİN";
    document.getElementById("pipeSelect").value = "Ø48X1,5 SİYAH BORU";
    
    document.getElementById("savedProjectsSelect").value = "";
    toggleDeleteButtonState();

    calculate();
}

function deleteSelectedProject() {
    const select = document.getElementById("savedProjectsSelect");
    const name = select.value;
    if (!name) {
        alert("Lütfen önce silmek istediğiniz projeyi seçin.");
        return;
    }

    if (!confirm(`"${name}" projesini silmek istediğinize emin misiniz?`)) {
        return;
    }

    const projects = JSON.parse(localStorage.getItem("m_projects")) || {};
    delete projects[name];
    localStorage.setItem("m_projects", JSON.stringify(projects));
    
    loadSavedProjectsList();
    resetToNewProject();
}

})();
