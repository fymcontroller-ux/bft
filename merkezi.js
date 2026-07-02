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
    { id: "plc", name: "GMT-396T (PLC)", price: 222, category: "Pano Ekipmanları" },
    { id: "input_mod", name: "GXM-16IA (Input Modül)", price: 70, category: "Pano Ekipmanları" },
    { id: "output_mod", name: "GXM-16TA (Output Modül)", price: 96, category: "Pano Ekipmanları" },
    { id: "transistor_kart", name: "Transtör Kart", price: 20, category: "Pano Ekipmanları" },
    { id: "guc_kaynagi", name: "Güç Kaynağı", price: 70, category: "Pano Ekipmanları" },
    { id: "fren_direnci", name: "Fren Direnci", price: 29, category: "Pano Ekipmanları" },
    { id: "pano_havalandirma", name: "Pano Havalandırma", price: 90, category: "Pano Ekipmanları" },
    { id: "lobar_kucuk", name: "Lobar (Küçük)", price: 30, category: "Pano Ekipmanları" },
    { id: "lobar_buyuk", name: "Lobar (Büyük)", price: 40, category: "Pano Ekipmanları" },
    { id: "pano", name: "Pano", price: 500, category: "Pano Ekipmanları" },
    { id: "diger_malzemeler", name: "Diğer Malzemeler", price: 50, category: "Pano Ekipmanları" },
    { id: "kablo_12x1", name: "12X1 Kumanda Kablosu", price: 2.5, category: "Kablolar" },
    { id: "kablo_6x05", name: "6X0,5 Kumanda Kablosu", price: 1.0, category: "Kablolar" },
    { id: "kablo_8x1", name: "8X1 KUMANDA KABLOSU (Duvar-İstasyon Arası)", price: 1.5, category: "Kablolar" },
    { id: "kablo_4x4", name: "4x4 Bilendajlı Kablo", price: 4.0, category: "Kablolar" },
    { id: "soket_duvar", name: "24LÜ SOKET (DUVAR TİPİ)", price: 35, category: "Soketler" },
    { id: "soket_makina", name: "24LÜ SOKET (MAKİNA TİPİ)", price: 35, category: "Soketler" },
    { id: "soket_duvar_16", name: "16LI SOKET (DUVAR TİPİ)", price: 30, category: "Soketler" },
    { id: "hazne", name: "HAZNE", price: 275, category: "İstasyon Ekipmanları" },
    { id: "kumanda_seti", name: "KUMANDA SETİ", price: 30, category: "İstasyon Ekipmanları" },
    { id: "profil_120", name: "120x120x4 Profil", price: 10.0, category: "Duvardaki Sistem" },
    { id: "hat_baglanti", name: "HAT BAĞLANTI EKİPMANLARI", price: 12.3, category: "Duvardaki Sistem" },
    { id: "piston_ma1650", name: "MA1650 PİSTON", price: 15.0, category: "Duvardaki Sistem" },
    { id: "valf_5_2", name: "VALF (1/4\" 5/2 Tek Bobin)", price: 12.0, category: "Duvardaki Sistem" },
    { id: "klepe_takimi", name: "KLEPE TAKIMI", price: 12.0, category: "Duvardaki Sistem" },
    { id: "sase_sistemi", name: "ŞASE SİSTEMİ (SİKLON+JETFİLTRE)", price: 1000.0, category: "Pompa Şase" },
    { id: "contali_kelepce", name: "CONTALI SAÇ KELEPÇE", price: 10.0, category: "Tesisat ve Borulama" },
    { id: "tesisat_aparatlari", name: "TESİSAT DÖŞEME APARATLARI", price: 10.0, category: "Tesisat ve Borulama" }
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

function getMaterialUnit(name) {
    const units = JSON.parse(localStorage.getItem("l_material_units")) || {};
    return units[name] || "Adet";
}

function saveMaterialUnit(name, unit) {
    const units = JSON.parse(localStorage.getItem("l_material_units")) || {};
    units[name] = unit;
    localStorage.setItem("l_material_units", JSON.stringify(units));
}

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
            if (!storedGeneral.some(item => item.name === defaultItem.name || item.id === defaultItem.id)) {
                storedGeneral.push(JSON.parse(JSON.stringify(defaultItem)));
            }
        });

        // Ensure every item has an id if it matches one of the defaults by name or id
        storedGeneral.forEach(item => {
            if (!item.id) {
                const match = defaultGeneralItems.find(d => d.name === item.name);
                if (match) item.id = match.id;
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
        opt.textContent = s.name;
        if (s.name === savedScreen) opt.selected = true;
        screenSelect.appendChild(opt);
    });

    const driverSelect = document.getElementById("driverSelect");
    driverSelect.innerHTML = "";
    drivers.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.name;
        opt.textContent = d.name;
        if (d.name === savedDriver) opt.selected = true;
        driverSelect.appendChild(opt);
    });

    const pumpSelect = document.getElementById("pumpSelect");
    pumpSelect.innerHTML = "";
    pumps.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = p.name;
        if (p.name === savedPump) opt.selected = true;
        pumpSelect.appendChild(opt);
    });

    const pipeSelect = document.getElementById("pipeSelect");
    pipeSelect.innerHTML = "";
    pipes.filter(p => !p.name.startsWith("[")).forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = p.name;
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
    function createGroupCard(title, list, onAdd, onDelete, onUpdatePrice, onUpdateName) {
        const card = document.createElement("div");
        card.className = "price-group-card";
        
        const h3 = document.createElement("h3");
        h3.textContent = title;
        card.appendChild(h3);

        list.forEach((item, idx) => {
            const row = document.createElement("div");
            row.className = "price-input-row";
            row.style.display = "flex";
            row.style.gap = "0.75rem";
            row.style.alignItems = "center";
            row.style.padding = "0.5rem 0";
            row.style.borderBottom = "1px solid rgba(255,255,255,0.02)";
            
            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = item.name;
            nameInput.style.flex = "1";
            nameInput.style.minWidth = "150px";
            nameInput.style.background = "transparent";
            nameInput.style.border = "1px solid transparent";
            nameInput.style.borderRadius = "6px";
            nameInput.style.color = "var(--text-primary)";
            nameInput.style.outline = "none";
            nameInput.style.padding = "0.25rem 0.5rem";
            nameInput.style.textAlign = "left";
            
            nameInput.addEventListener("focus", () => {
                nameInput.style.background = "var(--bg-input)";
                nameInput.style.borderColor = "var(--accent-indigo)";
            });
            nameInput.addEventListener("blur", (e) => {
                nameInput.style.background = "transparent";
                nameInput.style.borderColor = "transparent";
                const newName = e.target.value.trim();
                if (!newName) {
                    alert("İsim boş olamaz!");
                    nameInput.value = item.name;
                    return;
                }
                if (newName === item.name) return;
                
                if (list.some(x => x.name.toLowerCase() === newName.toLowerCase())) {
                    alert("Bu isim zaten mevcut!");
                    nameInput.value = item.name;
                    return;
                }
                
                onUpdateName(idx, newName);
            });
            nameInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") nameInput.blur();
                if (e.key === "Escape") { nameInput.value = item.name; nameInput.blur(); }
            });
            
            const inputContainer = document.createElement("div");
            inputContainer.className = "input-container";
            inputContainer.style.width = "120px";
            inputContainer.style.marginLeft = "auto";
            
            const inp = document.createElement("input");
            inp.type = "number";
            inp.step = "0.01";
            inp.min = "0";
            inp.value = item.price;
            inp.style.textAlign = "left";
            
            inp.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value) || 0;
                onUpdatePrice(idx, val);
            });

            const unit = document.createElement("span");
            unit.className = "unit";
            unit.textContent = "$";

            inputContainer.appendChild(inp);
            inputContainer.appendChild(unit);
            
            // Delete button
            const delBtn = document.createElement("button");
            delBtn.className = "project-btn-main btn-delete";
            delBtn.style.padding = "0.4rem 0.5rem";
            delBtn.style.marginTop = "0";
            delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            delBtn.addEventListener("click", () => {
                if (confirm(`"${item.name}" malzemesini silmek istediğinize emin misiniz?`)) {
                    onDelete(idx);
                }
            });
            
            row.appendChild(nameInput);
            row.appendChild(inputContainer);
            row.appendChild(delBtn);
            card.appendChild(row);
        });

        // Add Item Footer
        const footerDiv = document.createElement("div");
        footerDiv.style.marginTop = "1rem";
        footerDiv.style.paddingTop = "0.75rem";
        footerDiv.style.borderTop = "1px solid var(--border-color)";
        
        const addRow = document.createElement("div");
        addRow.style.display = "flex";
        addRow.style.gap = "0.5rem";
        
        const addName = document.createElement("div");
        addName.className = "input-container";
        addName.style.flex = "2";
        addName.style.padding = "0.35rem 0.5rem";
        const addNameInput = document.createElement("input");
        addNameInput.placeholder = "Yeni Ekle...";
        addNameInput.style.fontSize = "0.8rem";
        addNameInput.style.textAlign = "left";
        addName.appendChild(addNameInput);
        
        const addPrice = document.createElement("div");
        addPrice.className = "input-container";
        addPrice.style.flex = "1";
        addPrice.style.padding = "0.35rem 0.5rem";
        const addPriceInput = document.createElement("input");
        addPriceInput.type = "number";
        addPriceInput.step = "0.01";
        addPriceInput.placeholder = "USD ($)";
        addPriceInput.style.fontSize = "0.8rem";
        addPriceInput.style.textAlign = "left";
        addPrice.appendChild(addPriceInput);
        
        const addBtn = document.createElement("button");
        addBtn.className = "project-btn-main btn-save";
        addBtn.style.padding = "0.35rem 0.75rem";
        addBtn.style.fontSize = "0.8rem";
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addBtn.addEventListener("click", () => {
            const nameVal = addNameInput.value.trim();
            const priceVal = parseFloat(addPriceInput.value) || 0;
            if (!nameVal) {
                alert("Lütfen geçerli bir ad girin.");
                return;
            }
            if (list.some(x => x.name.toLowerCase() === nameVal.toLowerCase())) {
                alert("Bu isim zaten mevcut!");
                return;
            }
            onAdd(nameVal, priceVal);
        });
        
        addRow.appendChild(addName);
        addRow.appendChild(addPrice);
        addRow.appendChild(addBtn);
        footerDiv.appendChild(addRow);
        card.appendChild(footerDiv);

        return card;
    }

    // Render screens card
    container.appendChild(createGroupCard("Ekran Modelleri", screens, 
        (name, price) => {
            screens.push({ name, price });
            savePrices();
            initSelectors();
            initPriceEditor();
            calculate();
        },
        (idx) => {
            screens.splice(idx, 1);
            savePrices();
            initSelectors();
            initPriceEditor();
            calculate();
        },
        (idx, price) => {
            screens[idx].price = price;
            savePrices();
            initSelectors();
            calculate();
        },
        (idx, name) => {
            screens[idx].name = name;
            savePrices();
            initSelectors();
            calculate();
        }
    ));

    // Render drivers card
    container.appendChild(createGroupCard("Sürücü Modelleri", drivers, 
        (name, price) => {
            drivers.push({ name, price });
            savePrices();
            initSelectors();
            initPriceEditor();
            calculate();
        },
        (idx) => {
            drivers.splice(idx, 1);
            savePrices();
            initSelectors();
            initPriceEditor();
            calculate();
        },
        (idx, price) => {
            drivers[idx].price = price;
            savePrices();
            initSelectors();
            calculate();
        },
        (idx, name) => {
            drivers[idx].name = name;
            savePrices();
            initSelectors();
            calculate();
        }
    ));

    // Render pumps card
    container.appendChild(createGroupCard("Pompa (Blower) Modelleri", pumps, 
        (name, price) => {
            pumps.push({ name, price });
            savePrices();
            initSelectors();
            initPriceEditor();
            calculate();
        },
        (idx) => {
            pumps.splice(idx, 1);
            savePrices();
            initSelectors();
            initPriceEditor();
            calculate();
        },
        (idx, price) => {
            pumps[idx].price = price;
            savePrices();
            initSelectors();
            calculate();
        },
        (idx, name) => {
            pumps[idx].name = name;
            savePrices();
            initSelectors();
            calculate();
        }
    ));

    const uniqueHoses = [];
    pipes.forEach(p => {
        if (p.hose && !uniqueHoses.some(h => h.name === p.hose)) {
            uniqueHoses.push({ name: p.hose, price: p.hosePrice });
        }
    });

    const uniqueClamps = [];
    pipes.forEach(p => {
        if (p.clamp && !uniqueClamps.some(c => c.name === p.clamp)) {
            uniqueClamps.push({ name: p.clamp, price: p.clampPrice });
        }
    });

    function getDiameterFromPipeName(pipeName) {
        const match = pipeName.match(/(Ø[\d.]+)/i);
        return match ? match[1] : "Ø38";
    }

    function createSimpleAddFooter(placeholderName, onAdd) {
        const footerDiv = document.createElement("div");
        footerDiv.style.marginTop = "1rem";
        footerDiv.style.paddingTop = "0.75rem";
        footerDiv.style.borderTop = "1px solid var(--border-color)";
        
        const addRow = document.createElement("div");
        addRow.style.display = "flex";
        addRow.style.gap = "0.5rem";
        
        const addName = document.createElement("div");
        addName.className = "input-container";
        addName.style.flex = "2";
        addName.style.padding = "0.35rem 0.5rem";
        const addNameInput = document.createElement("input");
        addNameInput.placeholder = placeholderName;
        addNameInput.style.fontSize = "0.8rem";
        addNameInput.style.textAlign = "left";
        addName.appendChild(addNameInput);
        
        const addPrice = document.createElement("div");
        addPrice.className = "input-container";
        addPrice.style.flex = "1";
        addPrice.style.padding = "0.35rem 0.5rem";
        const addPriceInput = document.createElement("input");
        addPriceInput.type = "number";
        addPriceInput.step = "0.01";
        addPriceInput.placeholder = "USD ($)";
        addPriceInput.style.fontSize = "0.8rem";
        addPriceInput.style.textAlign = "left";
        addPrice.appendChild(addPriceInput);
        
        const addBtn = document.createElement("button");
        addBtn.className = "project-btn-main btn-save";
        addBtn.style.padding = "0.35rem 0.75rem";
        addBtn.style.fontSize = "0.8rem";
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addBtn.addEventListener("click", () => {
            const nameVal = addNameInput.value.trim();
            const priceVal = parseFloat(addPriceInput.value) || 0;
            if (!nameVal) {
                alert("Lütfen geçerli bir ad girin.");
                return;
            }
            onAdd(nameVal, priceVal, addNameInput, addPriceInput);
        });
        
        addRow.appendChild(addName);
        addRow.appendChild(addPrice);
        addRow.appendChild(addBtn);
        footerDiv.appendChild(addRow);
        
        return footerDiv;
    }

    // Render PASLANMAZ KROM BORULAR
    const kromCard = document.createElement("div");
    kromCard.className = "price-group-card";
    const kromH3 = document.createElement("h3");
    kromH3.textContent = "PASLANMAZ KROM BORULAR";
    kromCard.appendChild(kromH3);

    const kromPipes = pipes.filter(p => !p.name.toUpperCase().includes("SİYAH"));

    kromPipes.forEach(p => {
        const masterIdx = pipes.findIndex(x => x.name === p.name);
        
        const row = document.createElement("div");
        row.className = "price-input-row";
        row.style.display = "flex";
        row.style.gap = "0.75rem";
        row.style.alignItems = "center";
        row.style.padding = "0.5rem 0";
        row.style.borderBottom = "1px solid rgba(255,255,255,0.02)";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = p.name;
        nameInput.style.flex = "1";
        nameInput.style.minWidth = "150px";
        nameInput.style.background = "transparent";
        nameInput.style.border = "1px solid transparent";
        nameInput.style.borderRadius = "6px";
        nameInput.style.color = "var(--text-primary)";
        nameInput.style.outline = "none";
        nameInput.style.padding = "0.25rem 0.5rem";
        nameInput.style.textAlign = "left";

        nameInput.addEventListener("focus", () => {
            nameInput.style.background = "var(--bg-input)";
            nameInput.style.borderColor = "var(--accent-indigo)";
        });
        nameInput.addEventListener("blur", (e) => {
            nameInput.style.background = "transparent";
            nameInput.style.borderColor = "transparent";
            const newName = e.target.value.trim();
            if (!newName) {
                alert("Boru adı boş olamaz!");
                nameInput.value = p.name;
                return;
            }
            if (newName === p.name) return;
            if (pipes.some(x => x.name.toLowerCase() === newName.toLowerCase())) {
                alert("Bu isim zaten mevcut!");
                nameInput.value = p.name;
                return;
            }
            pipes[masterIdx].name = newName;
            savePrices();
            initSelectors();
            calculate();
        });
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") nameInput.blur();
            if (e.key === "Escape") { nameInput.value = p.name; nameInput.blur(); }
        });

        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        inputContainer.style.width = "120px";
        inputContainer.style.marginLeft = "auto";

        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.01";
        inp.min = "0";
        inp.value = p.price;
        inp.style.textAlign = "left";
        inp.addEventListener("input", (e) => {
            pipes[masterIdx].price = parseFloat(e.target.value) || 0;
            savePrices();
            calculate();
        });

        const unit = document.createElement("span");
        unit.className = "unit";
        unit.textContent = "$";

        inputContainer.appendChild(inp);
        inputContainer.appendChild(unit);

        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.4rem 0.5rem";
        delBtn.style.marginTop = "0";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", () => {
            if (confirm(`"${p.name}" borusunu silmek istediğinize emin misiniz?`)) {
                pipes.splice(masterIdx, 1);
                savePrices();
                initSelectors();
                initPriceEditor();
                calculate();
            }
        });

        row.appendChild(nameInput);
        row.appendChild(inputContainer);
        row.appendChild(delBtn);
        kromCard.appendChild(row);
    });

    kromCard.appendChild(createSimpleAddFooter("Yeni Ekle...", (name, price, nameInp, priceInp) => {
        if (pipes.some(x => x.name.toLowerCase() === name.toLowerCase())) {
            alert("Bu isim zaten mevcut!");
            return;
        }
        if (name.toUpperCase().includes("SİYAH")) {
            alert("Krom boru adı 'SİYAH' kelimesini içeremez.");
            return;
        }
        const dia = getDiameterFromPipeName(name);
        pipes.push({
            name: name,
            price: price,
            hose: `${dia} SPİRAL HORTUM`,
            hosePrice: 0,
            clamp: `${dia} SPİRAL HORTUM KELEPÇESİ`,
            clampPrice: 0
        });
        savePrices();
        initSelectors();
        initPriceEditor();
        calculate();
        nameInp.value = "";
        priceInp.value = "";
    }));
    container.appendChild(kromCard);

    // Render SİYAH ÇELİK BORULAR
    const siyahCard = document.createElement("div");
    siyahCard.className = "price-group-card";
    const siyahH3 = document.createElement("h3");
    siyahH3.textContent = "SİYAH ÇELİK BORULAR";
    siyahCard.appendChild(siyahH3);

    const siyahPipes = pipes.filter(p => p.name.toUpperCase().includes("SİYAH"));

    siyahPipes.forEach(p => {
        const masterIdx = pipes.findIndex(x => x.name === p.name);
        
        const row = document.createElement("div");
        row.className = "price-input-row";
        row.style.display = "flex";
        row.style.gap = "0.75rem";
        row.style.alignItems = "center";
        row.style.padding = "0.5rem 0";
        row.style.borderBottom = "1px solid rgba(255,255,255,0.02)";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = p.name;
        nameInput.style.flex = "1";
        nameInput.style.minWidth = "150px";
        nameInput.style.background = "transparent";
        nameInput.style.border = "1px solid transparent";
        nameInput.style.borderRadius = "6px";
        nameInput.style.color = "var(--text-primary)";
        nameInput.style.outline = "none";
        nameInput.style.padding = "0.25rem 0.5rem";
        nameInput.style.textAlign = "left";

        nameInput.addEventListener("focus", () => {
            nameInput.style.background = "var(--bg-input)";
            nameInput.style.borderColor = "var(--accent-indigo)";
        });
        nameInput.addEventListener("blur", (e) => {
            nameInput.style.background = "transparent";
            nameInput.style.borderColor = "transparent";
            const newName = e.target.value.trim();
            if (!newName) {
                alert("Boru adı boş olamaz!");
                nameInput.value = p.name;
                return;
            }
            if (newName === p.name) return;
            if (pipes.some(x => x.name.toLowerCase() === newName.toLowerCase())) {
                alert("Bu isim zaten mevcut!");
                nameInput.value = p.name;
                return;
            }
            pipes[masterIdx].name = newName;
            savePrices();
            initSelectors();
            calculate();
        });
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") nameInput.blur();
            if (e.key === "Escape") { nameInput.value = p.name; nameInput.blur(); }
        });

        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        inputContainer.style.width = "120px";
        inputContainer.style.marginLeft = "auto";

        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.01";
        inp.min = "0";
        inp.value = p.price;
        inp.style.textAlign = "left";
        inp.addEventListener("input", (e) => {
            pipes[masterIdx].price = parseFloat(e.target.value) || 0;
            savePrices();
            calculate();
        });

        const unit = document.createElement("span");
        unit.className = "unit";
        unit.textContent = "$";

        inputContainer.appendChild(inp);
        inputContainer.appendChild(unit);

        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.4rem 0.5rem";
        delBtn.style.marginTop = "0";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", () => {
            if (confirm(`"${p.name}" borusunu silmek istediğinize emin misiniz?`)) {
                pipes.splice(masterIdx, 1);
                savePrices();
                initSelectors();
                initPriceEditor();
                calculate();
            }
        });

        row.appendChild(nameInput);
        row.appendChild(inputContainer);
        row.appendChild(delBtn);
        siyahCard.appendChild(row);
    });

    siyahCard.appendChild(createSimpleAddFooter("Yeni Ekle...", (name, price, nameInp, priceInp) => {
        if (pipes.some(x => x.name.toLowerCase() === name.toLowerCase())) {
            alert("Bu isim zaten mevcut!");
            return;
        }
        if (!name.toUpperCase().includes("SİYAH")) {
            alert("Siyah çelik boru adı 'SİYAH' kelimesini içermelidir (örn. Ø38X1,5 SİYAH BORU).");
            return;
        }
        const dia = getDiameterFromPipeName(name);
        pipes.push({
            name: name,
            price: price,
            hose: `${dia} SPİRAL HORTUM`,
            hosePrice: 0,
            clamp: `${dia} SPİRAL HORTUM KELEPÇESİ`,
            clampPrice: 0
        });
        savePrices();
        initSelectors();
        initPriceEditor();
        calculate();
        nameInp.value = "";
        priceInp.value = "";
    }));
    container.appendChild(siyahCard);

    // Render SPİRAL HORTUMLAR
    const hortumCard = document.createElement("div");
    hortumCard.className = "price-group-card";
    const hortumH3 = document.createElement("h3");
    hortumH3.textContent = "SPİRAL HORTUMLAR";
    hortumCard.appendChild(hortumH3);

    uniqueHoses.forEach(h => {
        const row = document.createElement("div");
        row.className = "price-input-row";
        row.style.display = "flex";
        row.style.gap = "0.75rem";
        row.style.alignItems = "center";
        row.style.padding = "0.5rem 0";
        row.style.borderBottom = "1px solid rgba(255,255,255,0.02)";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = h.name;
        nameInput.style.flex = "1";
        nameInput.style.minWidth = "150px";
        nameInput.style.background = "transparent";
        nameInput.style.border = "1px solid transparent";
        nameInput.style.borderRadius = "6px";
        nameInput.style.color = "var(--text-primary)";
        nameInput.style.outline = "none";
        nameInput.style.padding = "0.25rem 0.5rem";
        nameInput.style.textAlign = "left";

        nameInput.addEventListener("focus", () => {
            nameInput.style.background = "var(--bg-input)";
            nameInput.style.borderColor = "var(--accent-indigo)";
        });
        nameInput.addEventListener("blur", (e) => {
            nameInput.style.background = "transparent";
            nameInput.style.borderColor = "transparent";
            const newName = e.target.value.trim();
            if (!newName) {
                alert("Hortum adı boş olamaz!");
                nameInput.value = h.name;
                return;
            }
            if (newName === h.name) return;
            if (uniqueHoses.some(x => x.name.toLowerCase() === newName.toLowerCase())) {
                alert("Bu isimde bir hortum zaten mevcut!");
                nameInput.value = h.name;
                return;
            }

            pipes.forEach(pi => {
                if (pi.hose === h.name) {
                    pi.hose = newName;
                }
            });

            savePrices();
            initPriceEditor();
            calculate();
        });
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") nameInput.blur();
            if (e.key === "Escape") { nameInput.value = h.name; nameInput.blur(); }
        });

        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        inputContainer.style.width = "120px";
        inputContainer.style.marginLeft = "auto";

        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.01";
        inp.min = "0";
        inp.value = h.price;
        inp.style.textAlign = "left";
        inp.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            pipes.forEach(pi => {
                if (pi.hose === h.name) {
                    pi.hosePrice = val;
                }
            });
            savePrices();
            calculate();
        });

        const unit = document.createElement("span");
        unit.className = "unit";
        unit.textContent = "$";

        inputContainer.appendChild(inp);
        inputContainer.appendChild(unit);

        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.4rem 0.5rem";
        delBtn.style.marginTop = "0";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", () => {
            if (confirm(`"${h.name}" hortumunu tüm borulardan temizlemek istediğinize emin misiniz?`)) {
                for (let i = pipes.length - 1; i >= 0; i--) {
                    if (pipes[i].hose === h.name) {
                        if (pipes[i].name.startsWith("[HORTUM]")) {
                            pipes.splice(i, 1);
                        } else {
                            pipes[i].hose = "";
                            pipes[i].hosePrice = 0;
                        }
                    }
                }
                savePrices();
                initPriceEditor();
                calculate();
            }
        });

        row.appendChild(nameInput);
        row.appendChild(inputContainer);
        row.appendChild(delBtn);
        hortumCard.appendChild(row);
    });

    hortumCard.appendChild(createSimpleAddFooter("Yeni Ekle...", (name, price, nameInp, priceInp) => {
        if (uniqueHoses.some(x => x.name.toLowerCase() === name.toLowerCase())) {
            alert("Bu isimde bir hortum zaten mevcut!");
            return;
        }
        pipes.push({
            name: `[HORTUM] ${name}`,
            price: 0,
            hose: name,
            hosePrice: price,
            clamp: "",
            clampPrice: 0
        });
        savePrices();
        initPriceEditor();
        calculate();
        nameInp.value = "";
        priceInp.value = "";
    }));
    container.appendChild(hortumCard);

    // Render Spiral Hortum Kelepçeleri
    const kelepceCard = document.createElement("div");
    kelepceCard.className = "price-group-card";
    const kelepceH3 = document.createElement("h3");
    kelepceH3.textContent = "SPİRAL HORTUM KELEPÇELERİ";
    kelepceCard.appendChild(kelepceH3);

    uniqueClamps.forEach(c => {
        const row = document.createElement("div");
        row.className = "price-input-row";
        row.style.display = "flex";
        row.style.gap = "0.75rem";
        row.style.alignItems = "center";
        row.style.padding = "0.5rem 0";
        row.style.borderBottom = "1px solid rgba(255,255,255,0.02)";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = c.name;
        nameInput.style.flex = "1";
        nameInput.style.minWidth = "150px";
        nameInput.style.background = "transparent";
        nameInput.style.border = "1px solid transparent";
        nameInput.style.borderRadius = "6px";
        nameInput.style.color = "var(--text-primary)";
        nameInput.style.outline = "none";
        nameInput.style.padding = "0.25rem 0.5rem";
        nameInput.style.textAlign = "left";

        nameInput.addEventListener("focus", () => {
            nameInput.style.background = "var(--bg-input)";
            nameInput.style.borderColor = "var(--accent-indigo)";
        });
        nameInput.addEventListener("blur", (e) => {
            nameInput.style.background = "transparent";
            nameInput.style.borderColor = "transparent";
            const newName = e.target.value.trim();
            if (!newName) {
                alert("Kelepçe adı boş olamaz!");
                nameInput.value = c.name;
                return;
            }
            if (newName === c.name) return;
            if (uniqueClamps.some(x => x.name.toLowerCase() === newName.toLowerCase())) {
                alert("Bu isimde bir kelepçe zaten mevcut!");
                nameInput.value = c.name;
                return;
            }

            pipes.forEach(pi => {
                if (pi.clamp === c.name) {
                    pi.clamp = newName;
                }
            });

            savePrices();
            initPriceEditor();
            calculate();
        });
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") nameInput.blur();
            if (e.key === "Escape") { nameInput.value = c.name; nameInput.blur(); }
        });

        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        inputContainer.style.width = "120px";
        inputContainer.style.marginLeft = "auto";

        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.01";
        inp.min = "0";
        inp.value = c.price;
        inp.style.textAlign = "left";
        inp.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            pipes.forEach(pi => {
                if (pi.clamp === c.name) {
                    pi.clampPrice = val;
                }
            });
            savePrices();
            calculate();
        });

        const unit = document.createElement("span");
        unit.className = "unit";
        unit.textContent = "$";

        inputContainer.appendChild(inp);
        inputContainer.appendChild(unit);

        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.4rem 0.5rem";
        delBtn.style.marginTop = "0";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", () => {
            if (confirm(`"${c.name}" kelepçesini tüm borulardan temizlemek istediğinize emin misiniz?`)) {
                for (let i = pipes.length - 1; i >= 0; i--) {
                    if (pipes[i].clamp === c.name) {
                        if (pipes[i].name.startsWith("[KELEPÇE]")) {
                            pipes.splice(i, 1);
                        } else {
                            pipes[i].clamp = "";
                            pipes[i].clampPrice = 0;
                        }
                    }
                }
                savePrices();
                initPriceEditor();
                calculate();
            }
        });

        row.appendChild(nameInput);
        row.appendChild(inputContainer);
        row.appendChild(delBtn);
        kelepceCard.appendChild(row);
    });
    container.appendChild(kelepceCard);

    // Group General items by their category
    const categories = ["Pano Ekipmanları", "Kablolar", "Soketler", "İstasyon Ekipmanları", "Duvardaki Sistem", "Pompa Şase", "Tesisat ve Borulama"];
    categories.forEach(cat => {
        const catItems = generalItems.filter(item => item.category === cat);
        container.appendChild(createGroupCard(cat, catItems, 
            (name, price) => {
                generalItems.push({
                    id: "custom_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
                    name,
                    price,
                    category: cat
                });
                savePrices();
                initPriceEditor();
                calculate();
            },
            (idx) => {
                const itemToDelete = catItems[idx];
                generalItems = generalItems.filter(g => g.name !== itemToDelete.name || g.id !== itemToDelete.id);
                savePrices();
                initPriceEditor();
                calculate();
            },
            (idx, price) => {
                const itemToUpdate = catItems[idx];
                const trueIdx = generalItems.findIndex(g => g.name === itemToUpdate.name && g.id === itemToUpdate.id);
                if (trueIdx !== -1) {
                    generalItems[trueIdx].price = price;
                }
                savePrices();
                calculate();
            },
            (idx, name) => {
                const itemToUpdate = catItems[idx];
                const trueIdx = generalItems.findIndex(g => g.name === itemToUpdate.name && g.id === itemToUpdate.id);
                if (trueIdx !== -1) {
                    generalItems[trueIdx].name = name;
                }
                savePrices();
                calculate();
            }
        ));
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
            el.addEventListener("input", () => {
                calculate();
                saveCurrentProjectSilent();
            });
            el.addEventListener("change", () => {
                calculate();
                saveCurrentProjectSilent();
            });
        }
    });
    document.getElementById("exportBtnMerkeziRapor").addEventListener("click", () => {
        const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
        const projName = document.getElementById("projectName").value.trim() || "Merkezi Sistem Projesi";
        const originalTitle = document.title;
        
        // Update print-only header elements
        const printProjNameEl = document.getElementById("printProjName");
        const printProjDateEl = document.getElementById("printProjDate");
        if (printProjNameEl) printProjNameEl.textContent = projName;
        if (printProjDateEl) printProjDateEl.textContent = dateStr;
        
        const showPrices = document.getElementById("printShowPricesCheck").checked;
        
        if (showPrices) {
            document.title = `${dateStr} - ${projName} - Rapor`;
        } else {
            document.title = `${dateStr} - ${projName} - Teklif`;
            document.body.classList.add("hide-prices-print");
        }
        
        window.print();
        
        setTimeout(() => {
            if (!showPrices) {
                document.body.classList.remove("hide-prices-print");
            }
            document.title = originalTitle;
        }, 1000);
    });

    document.getElementById("resetPricesBtnMerkezi").addEventListener("click", resetPrices);

    // Project management listeners
    document.getElementById("btnSaveProject").addEventListener("click", saveCurrentProject);
    document.getElementById("btnDeleteProject").addEventListener("click", deleteSelectedProject);
    document.getElementById("savedProjectsSelect").addEventListener("change", loadSelectedProject);
}

// Helper to look up name & price by id or fallback to name
function getGeneralItem(id) {
    const item = generalItems.find(g => g.id === id) || generalItems.find(g => g.name === id);
    return item ? item : { name: id, price: 0 };
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
            { name: selectedScreen ? selectedScreen.name : selectedScreenName, qty: 1, unitPrice: selectedScreen ? selectedScreen.price : 0 },
            { name: getGeneralItem("plc").name, qty: 1, unitPrice: getGeneralItem("plc").price },
            { name: getGeneralItem("input_mod").name, qty: Math.ceil(H10 / 16), unitPrice: getGeneralItem("input_mod").price },
            { name: getGeneralItem("output_mod").name, qty: Math.ceil(H11 / 16), unitPrice: getGeneralItem("output_mod").price },
            { name: getGeneralItem("transistor_kart").name, qty: Math.ceil(H11 / 5) + 2, unitPrice: getGeneralItem("transistor_kart").price },
            { name: getGeneralItem("guc_kaynagi").name, qty: 2, unitPrice: getGeneralItem("guc_kaynagi").price },
            { name: selectedDriver ? selectedDriver.name : selectedDriverName, qty: H9, unitPrice: selectedDriver ? selectedDriver.price : 0 },
            { name: getGeneralItem("fren_direnci").name, qty: H9, unitPrice: getGeneralItem("fren_direnci").price },
            { name: getGeneralItem("pano_havalandirma").name, qty: 1, unitPrice: getGeneralItem("pano_havalandirma").price },
            { name: getGeneralItem("lobar_kucuk").name, qty: 2, unitPrice: getGeneralItem("lobar_kucuk").price },
            { name: getGeneralItem("lobar_buyuk").name, qty: 2, unitPrice: getGeneralItem("lobar_buyuk").price },
            { name: getGeneralItem("pano").name, qty: 1, unitPrice: getGeneralItem("pano").price },
            { name: getGeneralItem("diger_malzemeler").name, qty: H7, unitPrice: getGeneralItem("diger_malzemeler").price }
        ]
    };

    // SECTION 2: KABLO
    sections.kablo = {
        title: "Kablolama Grubu",
        excludeFromTotal: false,
        items: [
            { name: getGeneralItem("kablo_12x1").name, qty: cableMeters_12x1, unitPrice: getGeneralItem("kablo_12x1").price, isMeter: true },
            { name: getGeneralItem("kablo_6x05").name, qty: H16 * H7, unitPrice: getGeneralItem("kablo_6x05").price, isMeter: true },
            { name: getGeneralItem("kablo_8x1").name, qty: H15 * H7, unitPrice: getGeneralItem("kablo_8x1").price, isMeter: true },
            { name: getGeneralItem("kablo_4x4").name, qty: 25, unitPrice: getGeneralItem("kablo_4x4").price, isMeter: true },
            { name: getGeneralItem("kablo_6x05").name + " (Pano-Şase Arası)", qty: 25, unitPrice: getGeneralItem("kablo_6x05").price, isMeter: true }
        ]
    };

    // SECTION 3: SOKETLER
    sections.soketler = {
        title: "Soket Malzemeleri",
        excludeFromTotal: false,
        items: [
            { name: getGeneralItem("soket_duvar").name, qty: H7, unitPrice: getGeneralItem("soket_duvar").price },
            { name: getGeneralItem("soket_makina").name, qty: H7, unitPrice: getGeneralItem("soket_makina").price },
            { name: getGeneralItem("soket_duvar_16").name, qty: H7, unitPrice: getGeneralItem("soket_duvar_16").price }
        ]
    };

    // SECTION 4: İSTASYON
    sections.istasyon = {
        title: "İstasyon Ekipmanları",
        excludeFromTotal: false,
        items: [
            { name: getGeneralItem("hazne").name, qty: H7, unitPrice: getGeneralItem("hazne").price },
            { name: getGeneralItem("kumanda_seti").name, qty: H7, unitPrice: getGeneralItem("kumanda_seti").price }
        ]
    };

    // SECTION 5: DUVARDAKİ SİSTEM MALİYETİ
    sections.duvarSistemi = {
        title: "Duvardaki Sistem Maliyeti (Genel Toplama Dahil Değildir)",
        excludeFromTotal: true,
        items: [
            { name: getGeneralItem("profil_120").name, qty: H7 * H8, unitPrice: getGeneralItem("profil_120").price },
            { name: getGeneralItem("hat_baglanti").name, qty: H7 * H8, unitPrice: getGeneralItem("hat_baglanti").price },
            { name: getGeneralItem("piston_ma1650").name, qty: H7 * H8, unitPrice: getGeneralItem("piston_ma1650").price },
            { name: getGeneralItem("valf_5_2").name, qty: H7 * H8, unitPrice: getGeneralItem("valf_5_2").price },
            { name: getGeneralItem("klepe_takimi").name, qty: H7 * H8, unitPrice: getGeneralItem("klepe_takimi").price }
        ]
    };

    // SECTION 6: POMPA ŞASE SİSTEMİ
    sections.pompaSase = {
        title: "Pompa Şase Sistemi",
        excludeFromTotal: false,
        items: [
            { name: selectedPump ? selectedPump.name : selectedPumpName, qty: H9, unitPrice: selectedPump ? selectedPump.price : 0 },
            { name: getGeneralItem("sase_sistemi").name, qty: H9, unitPrice: getGeneralItem("sase_sistemi").price }
        ]
    };

    // SECTION 7: TESİSAT
    sections.tesisat = {
        title: "Tesisat ve Borulama",
        excludeFromTotal: false,
        items: [
            { name: selectedPipe ? selectedPipe.hose : "", qty: (H17 * 2) * H7, unitPrice: selectedPipe ? selectedPipe.hosePrice : 0, isMeter: true },
            { name: selectedPipe ? selectedPipe.clamp : "", qty: 4 * H7, unitPrice: selectedPipe ? selectedPipe.clampPrice : 0 },
            { name: selectedPipe ? selectedPipe.name : selectedPipeName, qty: H14 * (H8 + 1), unitPrice: selectedPipe ? selectedPipe.price : 0, isMeter: true },
            { name: getGeneralItem("contali_kelepce").name, qty: Math.ceil((H8 * H7 * 2) + ((H14 * (H8 + 1)) / 6)), unitPrice: getGeneralItem("contali_kelepce").price },
            { name: getGeneralItem("tesisat_aparatlari").name, qty: Math.ceil(H14 / 3), unitPrice: getGeneralItem("tesisat_aparatlari").price }
        ]
    };

    const defaultIds = [
        "plc", "input_mod", "output_mod", "transistor_kart", "guc_kaynagi", "fren_direnci",
        "pano_havalandirma", "lobar_kucuk", "lobar_buyuk", "pano", "diger_malzemeler",
        "kablo_12x1", "kablo_6x05", "kablo_8x1", "kablo_4x4",
        "soket_duvar", "soket_makina", "soket_duvar_16",
        "hazne", "kumanda_seti",
        "profil_120", "hat_baglanti", "piston_ma1650", "valf_5_2", "klepe_takimi",
        "sase_sistemi",
        "contali_kelepce", "tesisat_aparatlari"
    ];

    // Append custom general items dynamically to their matching sections
    generalItems.forEach(item => {
        if (!item.id || !defaultIds.includes(item.id)) {
            let targetSection = null;
            if (item.category === "Pano Ekipmanları") targetSection = sections.pano;
            else if (item.category === "Kablolar") targetSection = sections.kablo;
            else if (item.category === "Soketler") targetSection = sections.soketler;
            else if (item.category === "İstasyon Ekipmanları") targetSection = sections.istasyon;
            else if (item.category === "Duvardaki Sistem") targetSection = sections.duvarSistemi;
            else if (item.category === "Pompa Şase") targetSection = sections.pompaSase;
            else if (item.category === "Tesisat ve Borulama") targetSection = sections.tesisat;

            if (targetSection) {
                targetSection.items.push({
                    name: item.name,
                    qty: 1,
                    unitPrice: item.price
                });
            }
        }
    });

    // 4. Populate table & calculate sums
    let materialTotal = 0;
    const tablesGrid = document.getElementById("tablesGridMerkezi");
    tablesGrid.innerHTML = "";

    Object.keys(sections).forEach(secKey => {
        const sec = sections[secKey];
        let sectionSum = 0;

        // Create table card container
        const tableCard = document.createElement("div");
        tableCard.className = "table-container print-avoid-split";
        
        const table = document.createElement("table");
        table.className = "cost-table";
        
        // Create table head with section title
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr class="category-row">
                <th colspan="4">${sec.title}</th>
            </tr>
            <tr>
                <th>Malzeme Açıklaması</th>
                <th>Miktar</th>
                <th>Birim Fiyat ($)</th>
                <th>Toplam Fiyat ($)</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        // Add Section Item Rows
        sec.items.forEach(item => {
            const currentUnit = getMaterialUnit(item.name);
            const totalCost = item.qty * item.unitPrice;
            sectionSum += totalCost;
            
            if (!sec.excludeFromTotal) {
                materialTotal += totalCost;
            }

            const row = document.createElement("tr");
            
            // 1. Description
            const tdName = document.createElement("td");
            tdName.textContent = item.name;
            row.appendChild(tdName);

            // 2. Quantity + Unit Select
            const tdQty = document.createElement("td");
            tdQty.style.display = "flex";
            tdQty.style.alignItems = "center";
            tdQty.style.justifyContent = "center";
            tdQty.style.gap = "0.5rem";
            
            const qtySpan = document.createElement("span");
            qtySpan.textContent = currentUnit === "m" ? item.qty.toFixed(1) : item.qty;
            
            const unitBadge = document.createElement("span");
            unitBadge.style.fontSize = "0.75rem";
            unitBadge.style.padding = "0.2rem 0.4rem";
            unitBadge.style.borderRadius = "4px";
            unitBadge.style.cursor = "pointer";
            unitBadge.style.userSelect = "none";
            unitBadge.style.fontWeight = "600";
            unitBadge.style.display = "inline-block";
            unitBadge.style.minWidth = "50px";
            unitBadge.style.textAlign = "center";
            unitBadge.style.transition = "all 0.2s ease";

            if (currentUnit === "m") {
                unitBadge.style.background = "rgba(99, 102, 241, 0.12)";
                unitBadge.style.border = "1px solid rgba(99, 102, 241, 0.25)";
                unitBadge.style.color = "#c7d2fe";
                unitBadge.textContent = "Metre";
            } else {
                unitBadge.style.background = "rgba(255, 255, 255, 0.03)";
                unitBadge.style.border = "1px solid rgba(255, 255, 255, 0.08)";
                unitBadge.style.color = "var(--text-secondary)";
                unitBadge.textContent = "Adet";
            }

            unitBadge.addEventListener("mouseenter", () => {
                unitBadge.style.filter = "brightness(1.2)";
            });
            unitBadge.addEventListener("mouseleave", () => {
                unitBadge.style.filter = "none";
            });

            unitBadge.addEventListener("click", () => {
                const nextUnit = (currentUnit === "m") ? "Adet" : "m";
                saveMaterialUnit(item.name, nextUnit);
                calculate();
            });

            tdQty.appendChild(qtySpan);
            tdQty.appendChild(unitBadge);
            row.appendChild(tdQty);

            // 3. Unit Price
            const tdPrice = document.createElement("td");
            tdPrice.style.textAlign = "right";
            tdPrice.style.fontFamily = "var(--font-mono)";
            tdPrice.textContent = `$${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            row.appendChild(tdPrice);

            // 4. Total Price
            const tdTotal = document.createElement("td");
            tdTotal.style.textAlign = "right";
            tdTotal.style.fontFamily = "var(--font-mono)";
            tdTotal.textContent = `$${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            row.appendChild(tdTotal);

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
        
        table.appendChild(tbody);
        tableCard.appendChild(table);
        tablesGrid.appendChild(tableCard);
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

function saveCurrentProjectSilent() {
    const name = document.getElementById("projectName").value.trim();
    if (!name) return;

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
    
    const select = document.getElementById("savedProjectsSelect");
    if (select) {
        const prevVal = select.value;
        loadSavedProjectsList();
        if (prevVal !== name) {
            select.value = name;
            toggleDeleteButtonState();
        }
    }
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
