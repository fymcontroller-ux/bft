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
    pipes.forEach(p => {
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

    // Render Boru models card with extra fields (Hose, Clamp Prices)
    const pipeCard = document.createElement("div");
    pipeCard.className = "price-group-card";
    const pipeH3 = document.createElement("h3");
    pipeH3.textContent = "Boru ve Tesisat Modelleri";
    pipeCard.appendChild(pipeH3);

    pipes.forEach((p, idx) => {
        const rowOuter = document.createElement("div");
        rowOuter.style.padding = "0.75rem 0";
        rowOuter.style.borderBottom = "1px solid rgba(255,255,255,0.03)";
        rowOuter.style.position = "relative";

        // Pipe Row
        const rowPipe = document.createElement("div");
        rowPipe.className = "price-input-row";
        rowPipe.style.display = "flex";
        rowPipe.style.gap = "0.75rem";
        rowPipe.style.alignItems = "center";
        
        const pipeNameInput = document.createElement("input");
        pipeNameInput.type = "text";
        pipeNameInput.value = p.name;
        pipeNameInput.style.flex = "1";
        pipeNameInput.style.minWidth = "150px";
        pipeNameInput.style.background = "transparent";
        pipeNameInput.style.border = "1px solid transparent";
        pipeNameInput.style.borderRadius = "6px";
        pipeNameInput.style.color = "var(--text-primary)";
        pipeNameInput.style.outline = "none";
        pipeNameInput.style.padding = "0.25rem 0.5rem";
        pipeNameInput.style.textAlign = "left";
        
        pipeNameInput.addEventListener("focus", () => {
            pipeNameInput.style.background = "var(--bg-input)";
            pipeNameInput.style.borderColor = "var(--accent-indigo)";
        });
        pipeNameInput.addEventListener("blur", (e) => {
            pipeNameInput.style.background = "transparent";
            pipeNameInput.style.borderColor = "transparent";
            const newName = e.target.value.trim();
            if (!newName) {
                alert("Boru adı boş olamaz!");
                pipeNameInput.value = p.name;
                return;
            }
            if (newName === p.name) return;
            pipes[idx].name = newName;
            savePrices();
            initSelectors();
            calculate();
        });
        pipeNameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") pipeNameInput.blur();
            if (e.key === "Escape") { pipeNameInput.value = p.name; pipeNameInput.blur(); }
        });

        const pipePriceContainer = document.createElement("div");
        pipePriceContainer.className = "input-container";
        pipePriceContainer.style.width = "120px";
        pipePriceContainer.style.marginLeft = "auto";
        const pipePriceInp = document.createElement("input");
        pipePriceInp.type = "number";
        pipePriceInp.step = "0.01";
        pipePriceInp.min = "0";
        pipePriceInp.value = p.price;
        pipePriceInp.style.textAlign = "left";
        pipePriceInp.addEventListener("input", (e) => {
            pipes[idx].price = parseFloat(e.target.value) || 0;
            savePrices();
            initSelectors();
            calculate();
        });
        const unit1 = document.createElement("span");
        unit1.className = "unit";
        unit1.textContent = "$";
        pipePriceContainer.appendChild(pipePriceInp);
        pipePriceContainer.appendChild(unit1);

        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.4rem 0.5rem";
        delBtn.style.marginTop = "0";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", () => {
            if (confirm(`"${p.name}" boru hattını tamamen silmek istediğinize emin misiniz?`)) {
                pipes.splice(idx, 1);
                savePrices();
                initSelectors();
                initPriceEditor();
                calculate();
            }
        });

        rowPipe.appendChild(pipeNameInput);
        rowPipe.appendChild(pipePriceContainer);
        rowPipe.appendChild(delBtn);
        rowOuter.appendChild(rowPipe);

        // Hose price row
        const rowHose = document.createElement("div");
        rowHose.className = "price-input-row";
        rowHose.style.paddingLeft = "1.5rem";
        rowHose.style.display = "flex";
        rowHose.style.gap = "0.75rem";
        rowHose.style.alignItems = "center";
        
        const hoseNameInput = document.createElement("input");
        hoseNameInput.type = "text";
        hoseNameInput.value = p.hose;
        hoseNameInput.style.flex = "1";
        hoseNameInput.style.minWidth = "150px";
        hoseNameInput.style.background = "transparent";
        hoseNameInput.style.border = "1px solid transparent";
        hoseNameInput.style.borderRadius = "6px";
        hoseNameInput.style.color = "var(--text-muted)";
        hoseNameInput.style.fontSize = "0.8rem";
        hoseNameInput.style.outline = "none";
        hoseNameInput.style.padding = "0.25rem 0.5rem";
        hoseNameInput.style.textAlign = "left";
        hoseNameInput.addEventListener("focus", () => {
            hoseNameInput.style.background = "var(--bg-input)";
            hoseNameInput.style.borderColor = "var(--accent-indigo)";
        });
        hoseNameInput.addEventListener("blur", (e) => {
            hoseNameInput.style.background = "transparent";
            hoseNameInput.style.borderColor = "transparent";
            const newHoseName = e.target.value.trim();
            if (!newHoseName) {
                alert("Spiral hortum adı boş olamaz!");
                hoseNameInput.value = p.hose;
                return;
            }
            if (newHoseName === p.hose) return;
            const oldHoseName = p.hose;
            pipes.forEach(pi => {
                if (pi.hose === oldHoseName) {
                    pi.hose = newHoseName;
                }
            });
            savePrices();
            initPriceEditor();
            calculate();
        });

        const hosePriceContainer = document.createElement("div");
        hosePriceContainer.className = "input-container";
        hosePriceContainer.style.width = "120px";
        hosePriceContainer.style.marginLeft = "auto";
        const hosePriceInp = document.createElement("input");
        hosePriceInp.type = "number";
        hosePriceInp.step = "0.01";
        hosePriceInp.min = "0";
        hosePriceInp.value = p.hosePrice;
        hosePriceInp.style.textAlign = "left";
        hosePriceInp.id = `hosePrice-${idx}`;
        hosePriceInp.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            const targetHoseName = pipes[idx].hose;
            pipes.forEach((pItem, i) => {
                if (pItem.hose === targetHoseName) {
                    pItem.hosePrice = val;
                    const inputEl = document.getElementById(`hosePrice-${i}`);
                    if (inputEl) {
                        inputEl.value = val;
                    }
                }
            });
            savePrices();
            calculate();
        });
        const unit2 = document.createElement("span");
        unit2.className = "unit";
        unit2.textContent = "$";
        hosePriceContainer.appendChild(hosePriceInp);
        hosePriceContainer.appendChild(unit2);

        const spacePlaceholder1 = document.createElement("div");
        spacePlaceholder1.style.width = "32px";

        rowHose.appendChild(hoseNameInput);
        rowHose.appendChild(hosePriceContainer);
        rowHose.appendChild(spacePlaceholder1);
        rowOuter.appendChild(rowHose);

        // Clamp price row
        const rowClamp = document.createElement("div");
        rowClamp.className = "price-input-row";
        rowClamp.style.paddingLeft = "1.5rem";
        rowClamp.style.display = "flex";
        rowClamp.style.gap = "0.75rem";
        rowClamp.style.alignItems = "center";
        
        const clampNameInput = document.createElement("input");
        clampNameInput.type = "text";
        clampNameInput.value = p.clamp;
        clampNameInput.style.flex = "1";
        clampNameInput.style.minWidth = "150px";
        clampNameInput.style.background = "transparent";
        clampNameInput.style.border = "1px solid transparent";
        clampNameInput.style.borderRadius = "6px";
        clampNameInput.style.color = "var(--text-muted)";
        clampNameInput.style.fontSize = "0.8rem";
        clampNameInput.style.outline = "none";
        clampNameInput.style.padding = "0.25rem 0.5rem";
        clampNameInput.style.textAlign = "left";
        clampNameInput.addEventListener("focus", () => {
            clampNameInput.style.background = "var(--bg-input)";
            clampNameInput.style.borderColor = "var(--accent-indigo)";
        });
        clampNameInput.addEventListener("blur", (e) => {
            clampNameInput.style.background = "transparent";
            clampNameInput.style.borderColor = "transparent";
            const newClampName = e.target.value.trim();
            if (!newClampName) {
                alert("Kelepçe adı boş olamaz!");
                clampNameInput.value = p.clamp;
                return;
            }
            if (newClampName === p.clamp) return;
            const oldClampName = p.clamp;
            pipes.forEach(pi => {
                if (pi.clamp === oldClampName) {
                    pi.clamp = newClampName;
                }
            });
            savePrices();
            initPriceEditor();
            calculate();
        });

        const clampPriceContainer = document.createElement("div");
        clampPriceContainer.className = "input-container";
        clampPriceContainer.style.width = "120px";
        clampPriceContainer.style.marginLeft = "auto";
        const clampPriceInp = document.createElement("input");
        clampPriceInp.type = "number";
        clampPriceInp.step = "0.01";
        clampPriceInp.min = "0";
        clampPriceInp.value = p.clampPrice;
        clampPriceInp.style.textAlign = "left";
        clampPriceInp.id = `clampPrice-${idx}`;
        clampPriceInp.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            const targetClampName = pipes[idx].clamp;
            pipes.forEach((pItem, i) => {
                if (pItem.clamp === targetClampName) {
                    pItem.clampPrice = val;
                    const inputEl = document.getElementById(`clampPrice-${i}`);
                    if (inputEl) {
                        inputEl.value = val;
                    }
                }
            });
            savePrices();
            calculate();
        });
        const unit3 = document.createElement("span");
        unit3.className = "unit";
        unit3.textContent = "$";
        clampPriceContainer.appendChild(clampPriceInp);
        clampPriceContainer.appendChild(unit3);

        const spacePlaceholder2 = document.createElement("div");
        spacePlaceholder2.style.width = "32px";

        rowClamp.appendChild(clampNameInput);
        rowClamp.appendChild(clampPriceContainer);
        rowClamp.appendChild(spacePlaceholder2);
        rowOuter.appendChild(rowClamp);

        pipeCard.appendChild(rowOuter);
    });

    // Add pipe footer
    const pipeFooter = document.createElement("div");
    pipeFooter.style.marginTop = "1.5rem";
    pipeFooter.style.paddingTop = "1rem";
    pipeFooter.style.borderTop = "1px solid var(--border-color)";
    pipeFooter.innerHTML = `
        <div style="font-size: 0.8rem; font-weight:600; color: var(--text-muted); margin-bottom: 0.5rem;">YENİ BORU SİSTEMİ EKLE</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div class="input-container" style="padding: 0.35rem 0.5rem;"><input id="addPipeName" placeholder="Boru Adı" style="font-size: 0.8rem; text-align: left;"></div>
            <div class="input-container" style="padding: 0.35rem 0.5rem;"><input type="number" id="addPipePrice" placeholder="Boru Fiyat ($)" style="font-size: 0.8rem; text-align: left;"></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div class="input-container" style="padding: 0.35rem 0.5rem;"><input id="addHoseName" placeholder="Spiral Hortum Adı" style="font-size: 0.8rem; text-align: left;"></div>
            <div class="input-container" style="padding: 0.35rem 0.5rem;"><input type="number" id="addHosePrice" placeholder="Hortum Fiyat ($)" style="font-size: 0.8rem; text-align: left;"></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div class="input-container" style="padding: 0.35rem 0.5rem;"><input id="addClampName" placeholder="Kelepçe Adı" style="font-size: 0.8rem; text-align: left;"></div>
            <div class="input-container" style="padding: 0.35rem 0.5rem;"><input type="number" id="addClampPrice" placeholder="Kelepçe Fiyat ($)" style="font-size: 0.8rem; text-align: left;"></div>
        </div>
        <button id="btnAddPipeSubmit" class="project-btn-main btn-save" style="width: 100%; padding: 0.4rem; font-size: 0.8rem;"><i class="fa-solid fa-plus"></i> Boru Modeli Ekle</button>
    `;
    pipeCard.appendChild(pipeFooter);
    container.appendChild(pipeCard);

    pipeFooter.querySelector("#btnAddPipeSubmit").addEventListener("click", () => {
        const pipeName = pipeFooter.querySelector("#addPipeName").value.trim();
        const pipePrice = parseFloat(pipeFooter.querySelector("#addPipePrice").value) || 0;
        const hoseName = pipeFooter.querySelector("#addHoseName").value.trim();
        const hosePrice = parseFloat(pipeFooter.querySelector("#addHosePrice").value) || 0;
        const clampName = pipeFooter.querySelector("#addClampName").value.trim();
        const clampPrice = parseFloat(pipeFooter.querySelector("#addClampPrice").value) || 0;

        if (!pipeName || !hoseName || !clampName) {
            alert("Lütfen boru, hortum ve kelepçe adlarını doldurun.");
            return;
        }

        pipes.push({
            name: pipeName,
            price: pipePrice,
            hose: hoseName,
            hosePrice: hosePrice,
            clamp: clampName,
            clampPrice: clampPrice
        });
        savePrices();
        initSelectors();
        initPriceEditor();
        calculate();
    });

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
            el.addEventListener("input", calculate);
            el.addEventListener("change", calculate);
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
            { name: getGeneralItem("contali_kelepce").name, qty: 16, unitPrice: getGeneralItem("contali_kelepce").price },
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
