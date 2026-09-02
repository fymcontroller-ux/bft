(() => {
// Active datasets loaded from LocalStorage or fallback to defaults in starter_data.js
let personnel = [];
let shopExpenses = [];
let materials = [];
let models = {};

document.addEventListener("DOMContentLoaded", () => {
    loadPricesAndExpenses();
    initTabs();
    initPriceEditor();
    initExpenseEditor();
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

// Load values from LocalStorage or fall back to defaults
function loadPricesAndExpenses() {
    personnel = JSON.parse(localStorage.getItem("l_personnel")) || JSON.parse(JSON.stringify(defaultPersonnel));
    shopExpenses = JSON.parse(localStorage.getItem("l_shopExpenses")) || JSON.parse(JSON.stringify(defaultShopExpenses));
    materials = JSON.parse(localStorage.getItem("l_materials")) || JSON.parse(JSON.stringify(defaultMaterials));
    models = JSON.parse(localStorage.getItem("l_models")) || JSON.parse(JSON.stringify(defaultModels));
    
    // Dynamically populate model selection list
    const modelSelect = document.getElementById("modelSelect");
    if (modelSelect) {
        const currentVal = modelSelect.value;
        modelSelect.innerHTML = "";
        Object.keys(models).forEach(modelKey => {
            const opt = document.createElement("option");
            opt.value = modelKey;
            opt.textContent = modelKey.includes("YTY") || modelKey.includes("MY") || modelKey.includes("HY") ? `${modelKey}` : `${modelKey} (Yeni Model)`;
            modelSelect.appendChild(opt);
        });
        if (models[currentVal]) {
            modelSelect.value = currentVal;
        } else if (models["MY502"]) {
            modelSelect.value = "MY502";
        } else {
            modelSelect.value = Object.keys(models)[0];
        }
    }
}

// Save active pricing/expense data to LocalStorage
function savePricesAndExpenses() {
    localStorage.setItem("l_personnel", JSON.stringify(personnel));
    localStorage.setItem("l_shopExpenses", JSON.stringify(shopExpenses));
    localStorage.setItem("l_materials", JSON.stringify(materials));
    localStorage.setItem("l_models", JSON.stringify(models));
}

// Reset prices to starter defaults
async function resetPrices() {
    if (await window.showCustomConfirm("Tüm malzeme verilerini orijinal fabrika ayarlarına döndürmek istediğinize emin misiniz?", "Fabrika Ayarlarına Sıfırla")) {
        localStorage.removeItem("l_materials");
        materials = JSON.parse(JSON.stringify(defaultMaterials));
        savePricesAndExpenses();
        initPriceEditor();
        initModelEditDropdown();
        calculate();
    }
}

// Reset expenses to starter defaults
async function resetExpenses() {
    if (await window.showCustomConfirm("Tüm personel ve dükkan giderlerini fabrika ayarlarına sıfırlamak istediğinize emin misiniz?", "Fabrika Ayarlarına Sıfırla")) {
        localStorage.removeItem("l_personnel");
        localStorage.removeItem("l_shopExpenses");
        personnel = JSON.parse(JSON.stringify(defaultPersonnel));
        shopExpenses = JSON.parse(JSON.stringify(defaultShopExpenses));
        savePricesAndExpenses();
        initExpenseEditor();
        calculate();
    }
}

// Tabs switching handler
function initTabs() {
    const btnCalc = document.getElementById("btnCalcTab");
    const btnPrice = document.getElementById("btnPriceTab");
    const btnExpense = document.getElementById("btnExpenseTab");

    const contentCalc = document.getElementById("calcTabContent");
    const contentPrice = document.getElementById("priceTabContent");
    const contentExpense = document.getElementById("expenseTabContent");

    btnCalc.addEventListener("click", () => {
        btnCalc.classList.add("active");
        btnPrice.classList.remove("active");
        btnExpense.classList.remove("active");
        contentCalc.classList.add("active-content");
        contentPrice.classList.remove("active-content");
        contentExpense.classList.remove("active-content");
    });

    btnPrice.addEventListener("click", () => {
        btnCalc.classList.remove("active");
        btnPrice.classList.add("active");
        btnExpense.classList.remove("active");
        contentCalc.classList.remove("active-content");
        contentPrice.classList.add("active-content");
        contentExpense.classList.remove("active-content");
    });

    btnExpense.addEventListener("click", () => {
        btnCalc.classList.remove("active");
        btnPrice.classList.remove("active");
        btnExpense.classList.add("active");
        contentCalc.classList.remove("active-content");
        contentPrice.classList.remove("active-content");
        contentExpense.classList.add("active-content");
    });
}

// Generate the forms dynamically in the price editor panel
function initPriceEditor() {
    const container = document.getElementById("priceEditGrid");
    container.innerHTML = "";

    // Find all unique groups
    const groups = [];
    materials.forEach(m => {
        if (!groups.includes(m.group) && m.group) {
            groups.push(m.group);
        }
    });

    // Sort groups alphabetically
    groups.sort();

    groups.forEach(groupName => {
        const list = materials.filter(m => m.group === groupName);

        const card = document.createElement("div");
        card.className = "price-group-card";
        
        // Card Header
        const headerDiv = document.createElement("div");
        headerDiv.className = "panel-title";
        headerDiv.style.justifyContent = "space-between";
        headerDiv.style.display = "flex";
        headerDiv.style.alignItems = "center";
        headerDiv.style.marginBottom = "1.25rem";
        
        const h3 = document.createElement("h3");
        h3.textContent = groupName;
        h3.style.margin = "0";
        headerDiv.appendChild(h3);

        const delGrpBtn = document.createElement("button");
        delGrpBtn.className = "reset-btn";
        delGrpBtn.style.padding = "0.25rem 0.5rem";
        delGrpBtn.style.fontSize = "0.75rem";
        delGrpBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Grubu Sil';
        delGrpBtn.addEventListener("click", async () => {
            if (await window.showCustomConfirm(`"${groupName}" grubunu ve içindeki tüm malzemeleri silmek istediğinize emin misiniz?`)) {
                materials = materials.filter(m => m.group !== groupName);
                savePricesAndExpenses();
                initPriceEditor();
                initModelEditDropdown();
                calculate();
            }
        });
        headerDiv.appendChild(delGrpBtn);
        card.appendChild(headerDiv);

        // Materials List
        list.forEach(item => {
            const row = document.createElement("div");
            row.className = "price-input-row";
            row.style.flexWrap = "wrap";
            row.style.gap = "0.75rem";
            row.style.alignItems = "center";
            row.style.padding = "0.75rem 0";
            row.style.borderBottom = "1px solid rgba(255,255,255,0.02)";
            
            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = item.name;
            nameInput.style.flex = "1";
            nameInput.style.minWidth = "200px";
            nameInput.style.fontWeight = "500";
            nameInput.style.background = "transparent";
            nameInput.style.border = "1px solid transparent";
            nameInput.style.borderRadius = "6px";
            nameInput.style.color = "var(--text-primary)";
            nameInput.style.padding = "0.25rem 0.5rem";
            nameInput.style.textAlign = "left";
            nameInput.style.outline = "none";
            nameInput.style.cursor = "text";
            
            // Highlight on focus
            nameInput.addEventListener("focus", () => {
                nameInput.style.background = "var(--bg-input)";
                nameInput.style.borderColor = "var(--accent-indigo)";
            });
            nameInput.addEventListener("blur", (e) => {
                nameInput.style.background = "transparent";
                nameInput.style.borderColor = "transparent";
                
                const newName = e.target.value.trim();
                const oldName = item.name;
                
                if (!newName) {
                    alert("Malzeme adı boş olamaz!");
                    nameInput.value = oldName;
                    return;
                }
                if (newName === oldName) return;
                
                // Check if another material has the same name
                if (materials.some(m => m.name.toLowerCase() === newName.toLowerCase())) {
                    alert("Bu isimde başka bir malzeme zaten mevcut!");
                    nameInput.value = oldName;
                    return;
                }
                
                // Update material name in materials array
                const trueIdx = materials.findIndex(m => m.name === oldName);
                if (trueIdx !== -1) {
                    materials[trueIdx].name = newName;
                    materials[trueIdx].updateDate = new Date().toLocaleDateString('tr-TR');
                }
                
                // Update material name in all recipes (models)
                Object.keys(models).forEach(modelKey => {
                    if (models[modelKey] && Array.isArray(models[modelKey].items)) {
                        models[modelKey].items.forEach(recipeItem => {
                            if (recipeItem.name === oldName) {
                                recipeItem.name = newName;
                            }
                        });
                    }
                });
                
                savePricesAndExpenses();
                calculate();
                
                // Re-render UI list & dropdowns to keep everything in sync
                initPriceEditor();
                initModelEditDropdown();
            });
            
            nameInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    nameInput.blur();
                } else if (e.key === "Escape") {
                    nameInput.value = item.name;
                    nameInput.blur();
                }
            });
            
            const inputsWrapper = document.createElement("div");
            inputsWrapper.style.display = "flex";
            inputsWrapper.style.gap = "0.5rem";
            inputsWrapper.style.flexWrap = "wrap";
            inputsWrapper.style.alignItems = "center";
            inputsWrapper.style.marginLeft = "auto";

            // Price input
            const inputContainer = document.createElement("div");
            inputContainer.className = "input-container";
            inputContainer.style.width = "260px";
            
            const inp = document.createElement("input");
            inp.type = "number";
            inp.step = "0.0001";
            inp.min = "0";
            inp.value = item.priceUSD || 0;
            inp.style.textAlign = "left";
            
            inp.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value) || 0;
                const trueIdx = materials.findIndex(m => m.name === item.name);
                materials[trueIdx].priceUSD = val;
                materials[trueIdx].updateDate = new Date().toLocaleDateString('tr-TR');
                savePricesAndExpenses();
                calculate();
                // update date input dynamically if rendered
                const dateInp = inputsWrapper.querySelector('.date-input');
                if (dateInp) dateInp.value = materials[trueIdx].updateDate;
            });

            const unit = document.createElement("span");
            unit.className = "unit";
            unit.textContent = "$";

            inputContainer.appendChild(inp);
            inputContainer.appendChild(unit);
            inputsWrapper.appendChild(inputContainer);

            // Supplier input
            const supplierContainer = document.createElement("div");
            supplierContainer.className = "input-container";
            supplierContainer.style.width = "180px";
            const supplierInp = document.createElement("input");
            supplierInp.type = "text";
            supplierInp.placeholder = "Tedarikçi Firma";
            supplierInp.value = item.supplier || "";
            supplierInp.style.textAlign = "left";
            supplierInp.addEventListener("input", (e) => {
                const trueIdx = materials.findIndex(m => m.name === item.name);
                materials[trueIdx].supplier = e.target.value;
                savePricesAndExpenses();
                calculate();
            });
            supplierContainer.appendChild(supplierInp);
            inputsWrapper.appendChild(supplierContainer);

            // Date input (Editable representation)
            const dateContainer = document.createElement("div");
            dateContainer.className = "input-container";
            dateContainer.style.width = "120px";
            const dateInp = document.createElement("input");
            dateInp.type = "text";
            dateInp.className = "date-input";
            dateInp.placeholder = "Tarih Yok";
            dateInp.value = item.updateDate || "";
            dateInp.style.textAlign = "center";
            dateInp.addEventListener("input", (e) => {
                const val = e.target.value;
                const trueIdx = materials.findIndex(m => m.name === item.name);
                if (trueIdx !== -1) {
                    materials[trueIdx].updateDate = val;
                    savePricesAndExpenses();
                    calculate();
                }
            });
            dateContainer.appendChild(dateInp);
            inputsWrapper.appendChild(dateContainer);

            // Move Up button
            const upBtn = document.createElement("button");
            upBtn.className = "project-btn-main";
            upBtn.style.padding = "0.4rem 0.5rem";
            upBtn.style.marginTop = "0";
            upBtn.style.background = "rgba(99, 102, 241, 0.08)";
            upBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
            upBtn.style.color = "#c7d2fe";
            upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            upBtn.title = "Yukarı Taşı";
            upBtn.addEventListener("click", () => {
                const listIdx = list.findIndex(x => x.name === item.name);
                const trueIdx = materials.findIndex(m => m.name === item.name);
                if (listIdx > 0 && trueIdx > 0) {
                    [materials[trueIdx - 1], materials[trueIdx]] = [materials[trueIdx], materials[trueIdx - 1]];
                    savePricesAndExpenses();
                    initPriceEditor();
                }
            });
            inputsWrapper.appendChild(upBtn);

            // Move Down button
            const downBtn = document.createElement("button");
            downBtn.className = "project-btn-main";
            downBtn.style.padding = "0.4rem 0.5rem";
            downBtn.style.marginTop = "0";
            downBtn.style.background = "rgba(99, 102, 241, 0.08)";
            downBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
            downBtn.style.color = "#c7d2fe";
            downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
            downBtn.title = "Aşağı Taşı";
            downBtn.addEventListener("click", () => {
                const listIdx = list.findIndex(x => x.name === item.name);
                const trueIdx = materials.findIndex(m => m.name === item.name);
                if (listIdx < list.length - 1 && trueIdx < materials.length - 1) {
                    [materials[trueIdx], materials[trueIdx + 1]] = [materials[trueIdx + 1], materials[trueIdx]];
                    savePricesAndExpenses();
                    initPriceEditor();
                }
            });
            inputsWrapper.appendChild(downBtn);

            // Item Delete button
            const delItemBtn = document.createElement("button");
            delItemBtn.className = "project-btn-main btn-delete";
            delItemBtn.style.padding = "0.4rem 0.5rem";
            delItemBtn.style.marginTop = "0";
            delItemBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            delItemBtn.addEventListener("click", async () => {
                if (await window.showCustomConfirm(`"${item.name}" malzemesini tamamen silmek istediğinize emin misiniz?`)) {
                    materials = materials.filter(m => m.name !== item.name);
                    savePricesAndExpenses();
                    initPriceEditor();
                    initModelEditDropdown();
                    calculate();
                }
            });
            inputsWrapper.appendChild(delItemBtn);

            row.appendChild(nameInput);
            row.appendChild(inputsWrapper);
            card.appendChild(row);
        });

        // Add Material Footer inside Group Card
        const footerDiv = document.createElement("div");
        footerDiv.style.marginTop = "1.25rem";
        footerDiv.style.paddingTop = "1rem";
        footerDiv.style.borderTop = "1px solid var(--border-color)";
        
        const footerTitle = document.createElement("div");
        footerTitle.style.fontSize = "0.8rem";
        footerTitle.style.fontWeight = "600";
        footerTitle.style.color = "var(--text-muted)";
        footerTitle.style.marginBottom = "0.5rem";
        footerTitle.textContent = "YENİ MALZEME EKLE";
        footerDiv.appendChild(footerTitle);

        const addRow1 = document.createElement("div");
        addRow1.className = "form-group";
        addRow1.style.gridTemplateColumns = "2fr 1fr 1.5fr";
        addRow1.style.marginBottom = "0.5rem";
        addRow1.style.gap = "0.5rem";

        const nameInp = document.createElement("div");
        nameInp.className = "input-container";
        nameInp.style.padding = "0.35rem 0.5rem";
        const nameInpEl = document.createElement("input");
        nameInpEl.placeholder = "Malzeme Adı";
        nameInpEl.style.fontSize = "0.8rem";
        nameInpEl.style.textAlign = "left";
        nameInp.appendChild(nameInpEl);
        addRow1.appendChild(nameInp);

        const valInp = document.createElement("div");
        valInp.className = "input-container";
        valInp.style.padding = "0.35rem 0.5rem";
        const valInpEl = document.createElement("input");
        valInpEl.type = "number";
        valInpEl.step = "0.01";
        valInpEl.placeholder = "USD ($)";
        valInpEl.style.fontSize = "0.8rem";
        valInpEl.style.textAlign = "left";
        valInp.appendChild(valInpEl);
        addRow1.appendChild(valInp);

        const supInp = document.createElement("div");
        supInp.className = "input-container";
        supInp.style.padding = "0.35rem 0.5rem";
        const supInpEl = document.createElement("input");
        supInpEl.placeholder = "Tedarikçi";
        supInpEl.style.fontSize = "0.8rem";
        supInpEl.style.textAlign = "left";
        supInp.appendChild(supInpEl);
        addRow1.appendChild(supInp);
        
        footerDiv.appendChild(addRow1);

        const addBtn = document.createElement("button");
        addBtn.className = "project-btn-main btn-save";
        addBtn.style.padding = "0.35rem";
        addBtn.style.width = "100%";
        addBtn.style.fontSize = "0.8rem";
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Gruba Ekle';
        addBtn.addEventListener("click", () => {
            const mName = nameInpEl.value.trim();
            const mPrice = parseFloat(valInpEl.value) || 0.0;
            const mSupplier = supInpEl.value.trim();
            if (!mName) {
                alert("Lütfen geçerli bir malzeme adı girin.");
                return;
            }
            if (materials.some(m => m.name.toLowerCase() === mName.toLowerCase())) {
                alert("Bu isimde bir malzeme zaten mevcut!");
                return;
            }

            materials.push({
                name: mName,
                priceUSD: mPrice,
                group: groupName,
                supplier: mSupplier,
                updateDate: new Date().toLocaleDateString('tr-TR'),
                desc: null
            });

            savePricesAndExpenses();
            initPriceEditor();
            initModelEditDropdown();
            calculate();
        });
        footerDiv.appendChild(addBtn);

        card.appendChild(footerDiv);
        container.appendChild(card);
    });
}

// Render Tab 3: Detailed Operating Giderleri
function initExpenseEditor() {
    // 1. Render Personnel Table
    const pBody = document.getElementById("personnelTableBody");
    pBody.innerHTML = "";

    personnel.forEach((p, idx) => {
        const row = document.createElement("tr");
        
        const nameCell = createEditableTextCell(p.name, (val) => { p.name = val; saveAndRecalcExpenses(); });
        row.appendChild(nameCell);

        const sumCell = document.createElement("td");
        sumCell.style.textAlign = "right";
        sumCell.style.color = "var(--text-primary)";
        sumCell.style.fontWeight = "600";

        const updateRowTotal = () => {
            const sumVal = p.netSalary + p.ssk + p.bagkur + p.yemek + p.yol;
            sumCell.textContent = `$${sumVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };
        updateRowTotal();

        const netCell = createEditableCell(p.netSalary, (val) => { p.netSalary = val; updateRowTotal(); saveAndRecalcExpenses(); });
        const sskCell = createEditableCell(p.ssk, (val) => { p.ssk = val; updateRowTotal(); saveAndRecalcExpenses(); });
        const bagkurCell = createEditableCell(p.bagkur, (val) => { p.bagkur = val; updateRowTotal(); saveAndRecalcExpenses(); });
        const yemekCell = createEditableCell(p.yemek, (val) => { p.yemek = val; updateRowTotal(); saveAndRecalcExpenses(); });
        const yolCell = createEditableCell(p.yol, (val) => { p.yol = val; updateRowTotal(); saveAndRecalcExpenses(); });
        
        row.appendChild(netCell);
        row.appendChild(sskCell);
        row.appendChild(bagkurCell);
        row.appendChild(yemekCell);
        row.appendChild(yolCell);
        row.appendChild(sumCell);

        // Actions
        const actionCell = document.createElement("td");
        actionCell.style.textAlign = "center";
        actionCell.style.verticalAlign = "middle";
        actionCell.style.whiteSpace = "nowrap";
        actionCell.style.padding = "0.5rem !important";

        // Move Up button
        const upBtn = document.createElement("button");
        upBtn.className = "project-btn-main";
        upBtn.style.padding = "0.25rem 0.4rem";
        upBtn.style.marginTop = "0";
        upBtn.style.marginRight = "0.15rem";
        upBtn.style.display = "inline-block";
        upBtn.style.background = "rgba(99, 102, 241, 0.08)";
        upBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
        upBtn.style.color = "#c7d2fe";
        upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        upBtn.title = "Yukarı Taşı";
        upBtn.addEventListener("click", () => {
            if (idx > 0) {
                [personnel[idx - 1], personnel[idx]] = [personnel[idx], personnel[idx - 1]];
                saveAndRecalcExpenses();
                initExpenseEditor();
            }
        });
        actionCell.appendChild(upBtn);

        // Move Down button
        const downBtn = document.createElement("button");
        downBtn.className = "project-btn-main";
        downBtn.style.padding = "0.25rem 0.4rem";
        downBtn.style.marginTop = "0";
        downBtn.style.marginRight = "0.15rem";
        downBtn.style.display = "inline-block";
        downBtn.style.background = "rgba(99, 102, 241, 0.08)";
        downBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
        downBtn.style.color = "#c7d2fe";
        downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        downBtn.title = "Aşağı Taşı";
        downBtn.addEventListener("click", () => {
            if (idx < personnel.length - 1) {
                [personnel[idx], personnel[idx + 1]] = [personnel[idx + 1], personnel[idx]];
                saveAndRecalcExpenses();
                initExpenseEditor();
            }
        });
        actionCell.appendChild(downBtn);

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.25rem 0.4rem";
        delBtn.style.marginTop = "0";
        delBtn.style.display = "inline-block";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", async () => {
            if (await window.showCustomConfirm(`"${p.name}" personelini silmek istediğinize emin misiniz?`)) {
                personnel.splice(idx, 1);
                saveAndRecalcExpenses();
                initExpenseEditor();
            }
        });
        actionCell.appendChild(delBtn);
        row.appendChild(actionCell);

        pBody.appendChild(row);
    });

    // 2. Render Shop Expenses List
    const shopList = document.getElementById("expenseEditList");
    shopList.innerHTML = "";

    shopExpenses.forEach((exp, idx) => {
        const row = document.createElement("div");
        row.className = "price-input-row";
        
        const nameInp = document.createElement("input");
        nameInp.type = "text";
        nameInp.value = exp.name;
        nameInp.style.fontSize = "0.88rem";
        nameInp.style.color = "var(--text-secondary)";
        nameInp.style.flex = "1";
        nameInp.style.minWidth = "160px";
        nameInp.style.background = "transparent";
        nameInp.style.border = "none";
        nameInp.style.borderBottom = "1px dashed rgba(255,255,255,0.15)";
        nameInp.style.outline = "none";
        nameInp.style.padding = "0.25rem 0";
        nameInp.style.textAlign = "left";
        nameInp.style.fontFamily = "inherit";
        nameInp.addEventListener("input", (e) => {
            shopExpenses[idx].name = e.target.value;
            saveAndRecalcExpenses();
        });
        
        const rightContainer = document.createElement("div");
        rightContainer.style.display = "flex";
        rightContainer.style.alignItems = "center";
        rightContainer.style.gap = "0.5rem";

        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        inputContainer.style.width = "130px";
        
        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.01";
        inp.min = "0";
        inp.value = exp.price.toFixed(2);
        
        inp.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            shopExpenses[idx].price = val;
            saveAndRecalcExpenses();
        });

        const unit = document.createElement("span");
        unit.className = "unit";
        unit.textContent = "$";

        inputContainer.appendChild(inp);
        inputContainer.appendChild(unit);
        rightContainer.appendChild(inputContainer);

        // Move Up button
        const upBtn = document.createElement("button");
        upBtn.className = "project-btn-main";
        upBtn.style.padding = "0.4rem 0.5rem";
        upBtn.style.marginTop = "0";
        upBtn.style.background = "rgba(99, 102, 241, 0.08)";
        upBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
        upBtn.style.color = "#c7d2fe";
        upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        upBtn.title = "Yukarı Taşı";
        upBtn.addEventListener("click", () => {
            if (idx > 0) {
                [shopExpenses[idx - 1], shopExpenses[idx]] = [shopExpenses[idx], shopExpenses[idx - 1]];
                saveAndRecalcExpenses();
                initExpenseEditor();
            }
        });
        rightContainer.appendChild(upBtn);

        // Move Down button
        const downBtn = document.createElement("button");
        downBtn.className = "project-btn-main";
        downBtn.style.padding = "0.4rem 0.5rem";
        downBtn.style.marginTop = "0";
        downBtn.style.background = "rgba(99, 102, 241, 0.08)";
        downBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
        downBtn.style.color = "#c7d2fe";
        downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        downBtn.title = "Aşağı Taşı";
        downBtn.addEventListener("click", () => {
            if (idx < shopExpenses.length - 1) {
                [shopExpenses[idx], shopExpenses[idx + 1]] = [shopExpenses[idx + 1], shopExpenses[idx]];
                saveAndRecalcExpenses();
                initExpenseEditor();
            }
        });
        rightContainer.appendChild(downBtn);

        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.4rem 0.5rem";
        delBtn.style.marginTop = "0";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener("click", async () => {
            if (await window.showCustomConfirm(`"${exp.name}" giderini tamamen silmek istediğinize emin misiniz?`)) {
                shopExpenses.splice(idx, 1);
                saveAndRecalcExpenses();
                initExpenseEditor();
            }
        });
        rightContainer.appendChild(delBtn);

        row.appendChild(nameInp);
        row.appendChild(rightContainer);
        shopList.appendChild(row);
    });

    updateExpenseSummaryDisplay();
}

// Helper to create editable inputs in the staff table
function createEditableCell(val, onUpdate) {
    const td = document.createElement("td");
    const inp = document.createElement("input");
    inp.type = "number";
    inp.step = "0.01";
    inp.min = "0";
    inp.value = val.toFixed(2);
    inp.style.width = "75px";
    inp.style.padding = "0.25rem";
    inp.style.background = "transparent";
    inp.style.border = "none";
    inp.style.color = "var(--text-primary)";
    inp.style.textAlign = "right";
    inp.style.fontFamily = "var(--font-mono)";
    inp.style.outline = "none";

    inp.addEventListener("focus", () => inp.parentElement.style.background = "rgba(255,255,255,0.03)");
    inp.addEventListener("blur", () => inp.parentElement.style.background = "transparent");
    inp.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value) || 0.0;
        onUpdate(value);
    });

    td.appendChild(inp);
    return td;
}

function createEditableTextCell(val, onUpdate) {
    const td = document.createElement("td");
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = val;
    inp.style.width = "100%";
    inp.style.padding = "0.25rem";
    inp.style.background = "transparent";
    inp.style.border = "none";
    inp.style.color = "var(--text-primary)";
    inp.style.textAlign = "left";
    inp.style.fontWeight = "500";
    inp.style.outline = "none";

    inp.addEventListener("focus", () => inp.parentElement.style.background = "rgba(255,255,255,0.03)");
    inp.addEventListener("blur", () => inp.parentElement.style.background = "transparent");
    inp.addEventListener("input", (e) => {
        onUpdate(e.target.value);
    });

    td.appendChild(inp);
    return td;
}

function saveAndRecalcExpenses() {
    savePricesAndExpenses();
    calculate();
    updateExpenseSummaryDisplay();
}

function updateExpenseSummaryDisplay() {
    let totalPersonnel = 0;
    personnel.forEach(p => totalPersonnel += (p.netSalary + p.ssk + p.bagkur + p.yemek + p.yol));

    let totalShop = 0;
    shopExpenses.forEach(e => totalShop += e.price);

    const totalNet = totalPersonnel + totalShop;
    const extra = totalNet * 0.1;
    const totalWithExtra = totalNet + extra;

    document.getElementById("expSummaryPersonnel").textContent = `$${totalPersonnel.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("expSummaryShop").textContent = `$${totalShop.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("expSummaryNet").textContent = `$${totalNet.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("expSummaryExtra").textContent = `$${extra.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("expSummaryTotal").textContent = `$${totalWithExtra.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}



function setupEventListeners() {
    document.getElementById("modelSelect").addEventListener("change", () => {
        calculate();
    });

    // Yeni Model Ekle modal toggle - önce tanımla, sonra kullan
    const btnAddNewModel = document.getElementById("btnAddNewModel");
    const newModelModal = document.getElementById("newModelModal");

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (newModelModal.classList.contains("open")) closeNewModelModal();
            if (copyModelModal.classList.contains("open")) closeCopyModelModal();
            if (renameModelModal.classList.contains("open")) closeRenameModelModal();
        }
    });

    function openNewModelModal() {
        newModelModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeNewModelModal() {
        newModelModal.classList.remove("open");
        document.body.style.overflow = "";
        document.getElementById("newModelNameInput").value = "";
        document.getElementById("newModelCapacityInput").value = "20";
    }

    btnAddNewModel.addEventListener("click", openNewModelModal);
    document.getElementById("btnCloseNewModel").addEventListener("click", closeNewModelModal);

    newModelModal.addEventListener("click", (e) => {
        if (e.target === newModelModal) closeNewModelModal();
    });

    // Copy Model Modal Helpers & Event Listeners
    const copyModelModal = document.getElementById("copyModelModal");

    function openCopyModelModal() {
        const selectedModelKey = document.getElementById("modelSelect").value;
        document.getElementById("copyModelNewNameInput").value = selectedModelKey + "_KOPYA";
        copyModelModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeCopyModelModal() {
        copyModelModal.classList.remove("open");
        document.body.style.overflow = "";
        document.getElementById("copyModelNewNameInput").value = "";
    }

    document.getElementById("btnCopyModel").addEventListener("click", openCopyModelModal);
    document.getElementById("btnCloseCopyModel").addEventListener("click", closeCopyModelModal);
    copyModelModal.addEventListener("click", (e) => {
        if (e.target === copyModelModal) closeCopyModelModal();
    });

    // Rename Model Modal Helpers & Event Listeners
    const renameModelModal = document.getElementById("renameModelModal");

    function openRenameModelModal() {
        const selectedModelKey = document.getElementById("modelSelect").value;
        document.getElementById("renameModelNameInput").value = selectedModelKey;
        renameModelModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeRenameModelModal() {
        renameModelModal.classList.remove("open");
        document.body.style.overflow = "";
        document.getElementById("renameModelNameInput").value = "";
    }

    document.getElementById("btnRenameModel").addEventListener("click", openRenameModelModal);
    document.getElementById("btnCloseRenameModel").addEventListener("click", closeRenameModelModal);
    renameModelModal.addEventListener("click", (e) => {
        if (e.target === renameModelModal) closeRenameModelModal();
    });

    // Delete selected model handler
    document.getElementById("btnDeleteModel").addEventListener("click", async () => {
        const selectedModelKey = document.getElementById("modelSelect").value;
        if (!selectedModelKey) return;

        if (await window.showCustomConfirm(`"${selectedModelKey}" modelini tamamen silmek istediğinize emin misiniz?`)) {
            delete models[selectedModelKey];
            savePricesAndExpenses();
            loadPricesAndExpenses(); // Reload list
            calculate();
            initExpenseEditor();
            alert(`"${selectedModelKey}" modeli başarıyla silindi.`);
        }
    });

    // Submit new model
    document.getElementById("btnNewModelSubmit").addEventListener("click", () => {
        const modelName = document.getElementById("newModelNameInput").value.trim().toUpperCase();
        const modelCapacity = parseInt(document.getElementById("newModelCapacityInput").value) || 20;

        if (!modelName) {
            alert("Lütfen model adı girin.");
            return;
        }

        if (models[modelName]) {
            alert("Bu model adı zaten kullanımda!");
            return;
        }

        // Create new model with blank items
        models[modelName] = {
            items: [],
            machineCount: modelCapacity
        };

        savePricesAndExpenses();
        
        // Update Select Option list
        const modelSelect = document.getElementById("modelSelect");
        const opt = document.createElement("option");
        opt.value = modelName;
        opt.textContent = `${modelName} (Yeni Model)`;
        modelSelect.appendChild(opt);
        modelSelect.value = modelName;

        // Trigger change events
        calculate();

        closeNewModelModal();
    });

    // Submit copy model
    document.getElementById("btnCopyModelSubmit").addEventListener("click", () => {
        const selectedModelKey = document.getElementById("modelSelect").value;
        if (!selectedModelKey) return;

        const newName = document.getElementById("copyModelNewNameInput").value.trim().toUpperCase();
        if (!newName) {
            alert("Lütfen yeni bir model adı girin.");
            return;
        }

        if (models[newName]) {
            alert("Bu model adı zaten kullanımda!");
            return;
        }

        const oldModel = models[selectedModelKey];
        models[newName] = {
            machineCount: oldModel.machineCount,
            items: oldModel.items.map(item => ({ ...item }))
        };

        savePricesAndExpenses();

        // Update Select Option list
        document.getElementById("modelSelect").value = newName;
        loadPricesAndExpenses();
        calculate();

        closeCopyModelModal();
        alert(`"${selectedModelKey}" modeli başarıyla "${newName}" olarak kopyalandı.`);
    });

    // Submit rename model
    document.getElementById("btnRenameModelSubmit").addEventListener("click", () => {
        const selectedModelKey = document.getElementById("modelSelect").value;
        if (!selectedModelKey) return;

        const newName = document.getElementById("renameModelNameInput").value.trim().toUpperCase();
        if (!newName) {
            alert("Lütfen yeni bir model adı girin.");
            return;
        }

        if (newName === selectedModelKey) {
            closeRenameModelModal();
            return;
        }

        if (models[newName]) {
            alert("Bu model adı zaten kullanımda!");
            return;
        }

        // Rename key in models object
        models[newName] = models[selectedModelKey];
        delete models[selectedModelKey];

        savePricesAndExpenses();

        // Update Select Option list
        document.getElementById("modelSelect").value = newName;
        loadPricesAndExpenses();
        calculate();

        closeRenameModelModal();
        alert(`Model ismi başarıyla "${newName}" olarak güncellendi.`);
    });

    // Model capacity input handler
    document.getElementById("modelCapacityInput").addEventListener("input", (e) => {
        const val = parseInt(e.target.value) || 20;
        const selectedModelKey = document.getElementById("modelSelect").value;
        models[selectedModelKey].machineCount = val;
        savePricesAndExpenses();
        calculate();
        initExpenseEditor();
    });

    // New Group Panel handlers
    const btnAddNewGroup = document.getElementById("btnAddNewGroup");
    const newGroupFormContainer = document.getElementById("newGroupFormContainer");
    btnAddNewGroup.addEventListener("click", () => {
        newGroupFormContainer.style.display = "block";
    });
    document.getElementById("btnNewGroupCancel").addEventListener("click", () => {
        newGroupFormContainer.style.display = "none";
        document.getElementById("newGroupNameInput").value = "";
    });
    document.getElementById("btnNewGroupSubmit").addEventListener("click", () => {
        const gName = document.getElementById("newGroupNameInput").value.trim();
        if (!gName) {
            alert("Lütfen grup adı girin.");
            return;
        }

        // Just add a dummy material to initialize this group
        materials.push({
            name: `${gName} Örnek Malzeme`,
            priceUSD: 0.0,
            group: gName,
            desc: null
        });

        savePricesAndExpenses();
        initPriceEditor();
        newGroupFormContainer.style.display = "none";
        document.getElementById("newGroupNameInput").value = "";
    });

    // Add new shop expense submit
    document.getElementById("btnShopExpenseAddSubmit").addEventListener("click", () => {
        const name = document.getElementById("newShopExpenseName").value.trim();
        const price = parseFloat(document.getElementById("newShopExpensePrice").value) || 0.0;
        if (!name) {
            alert("Lütfen geçerli bir dükkan gider adı girin.");
            return;
        }

        shopExpenses.push({ name: name, price: price });
        savePricesAndExpenses();
        initExpenseEditor();
        calculate();

        document.getElementById("newShopExpenseName").value = "";
        document.getElementById("newShopExpensePrice").value = "";
    });

    // Add new personnel submit
    document.getElementById("btnPersonnelAddSubmit").addEventListener("click", () => {
        const pName = document.getElementById("pAddName").value.trim();
        if (!pName) {
            alert("Lütfen personel/kadro adı girin.");
            return;
        }
        const net = parseFloat(document.getElementById("pAddNet").value) || 0.0;
        const ssk = parseFloat(document.getElementById("pAddSsk").value) || 0.0;
        const bagkur = parseFloat(document.getElementById("pAddBagkur").value) || 0.0;
        const yemek = parseFloat(document.getElementById("pAddYemek").value) || 0.0;
        const yol = parseFloat(document.getElementById("pAddYol").value) || 0.0;

        personnel.push({
            name: pName,
            netSalary: net,
            ssk: ssk,
            bagkur: bagkur,
            yemek: yemek,
            yol: yol
        });

        savePricesAndExpenses();
        initExpenseEditor();
        calculate();

        document.getElementById("pAddName").value = "";
        document.getElementById("pAddNet").value = "";
        document.getElementById("pAddSsk").value = "";
        document.getElementById("pAddBagkur").value = "";
        document.getElementById("pAddYemek").value = "";
        document.getElementById("pAddYol").value = "";
    });

    document.getElementById("resetPricesBtn").addEventListener("click", resetPrices);
    document.getElementById("resetExpensesBtn").addEventListener("click", resetExpenses);

    // Quick Add Material submit handler
    document.getElementById("btnQuickAddSubmit").addEventListener("click", () => {
        const selectedModelKey = document.getElementById("modelSelect").value;
        const model = models[selectedModelKey];
        if (!model) return;

        const select = document.getElementById("quickAddMaterialSelect");
        const mName = select.value;
        if (!mName) {
            alert("Lütfen reçeteye eklemek için listeden bir malzeme seçin!");
            return;
        }

        model.items.push({ name: mName, qty: 1.0 });
        savePricesAndExpenses();
        calculate();
    });

    document.getElementById("quickAddCategorySelect").addEventListener("change", () => {
        const selectedModelKey = document.getElementById("modelSelect").value;
        const model = models[selectedModelKey];
        if (model) {
            renderQuickAddMaterialsOnly(model);
        }
    });
}

// Helper to look up USD price in materials list
function getMaterialUSDPrice(name) {
    if (name === "Sürücü Maliyeti") return 0.0;
    const mat = materials.find(m => m.name === name);
    return mat ? mat.priceUSD : 0.0;
}

function getMaterialDetails(name) {
    const mat = materials.find(m => m.name === name);
    return mat ? { supplier: mat.supplier || "-", updateDate: mat.updateDate || "-" } : { supplier: "-", updateDate: "-" };
}

function calculate() {
    const selectedModelKey = document.getElementById("modelSelect").value;
    const model = models[selectedModelKey];
    if (!model) return;

    // Sync model capacity input value
    const capInp = document.getElementById("modelCapacityInput");
    if (capInp) capInp.value = model.machineCount;

    // 1. Calculate expenses (natively in USD)
    let totalPersonnel = 0;
    personnel.forEach(p => totalPersonnel += (p.netSalary + p.ssk + p.bagkur + p.yemek + p.yol));

    let totalShop = 0;
    shopExpenses.forEach(e => totalShop += e.price);

    const monthlyExpensesTotal = (totalPersonnel + totalShop) * 1.1; // Net + 10% extra

    const machineCount = model.machineCount;
    const operatingCostPerMachine = monthlyExpensesTotal / machineCount;

    // Display model metadata
    document.getElementById("modelMachineCount").textContent = `${machineCount} Makine`;
    document.getElementById("modelItemTypesCount").textContent = `${model.items.length} Kalem`;

    // 2. Populate cost table and calculate material subtotal in USD
    const tbody = document.getElementById("costTableBody");
    tbody.innerHTML = "";

    let subtotalUSD = 0.0;

    model.items.forEach(item => {
        const priceUSD = getMaterialUSDPrice(item.name);
        const details = getMaterialDetails(item.name);
        const totalUSD = item.qty * priceUSD;

        subtotalUSD += totalUSD;

        const unitText = getMaterialUnit(item.name);

        const row = document.createElement("tr");

        // 1. Name
        const tdName = document.createElement("td");
        tdName.textContent = item.name;
        row.appendChild(tdName);

        const tdQty = document.createElement("td");
        tdQty.style.textAlign = "center";
        tdQty.style.verticalAlign = "middle";
        tdQty.style.padding = "0.5rem !important";

        const qtyContainer = document.createElement("div");
        qtyContainer.className = "input-container";
        qtyContainer.style.width = "65px";
        qtyContainer.style.padding = "0.15rem 0.35rem";
        qtyContainer.style.margin = "0 auto";
        qtyContainer.style.display = "inline-flex";
        qtyContainer.style.alignItems = "center";

        const qtyInp = document.createElement("input");
        qtyInp.type = "number";
        qtyInp.step = "any";
        qtyInp.min = "0.01";
        qtyInp.value = item.qty;
        qtyInp.style.fontSize = "0.85rem";
        qtyInp.style.textAlign = "center";
        qtyInp.style.border = "none";
        qtyInp.style.background = "transparent";
        qtyInp.style.color = "inherit";
        qtyInp.style.width = "55px";

        qtyInp.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0.0;
            item.qty = val;

            const newTotalUSD = val * priceUSD;
            tdRowTotal.textContent = `$${newTotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Recalculate subtotal & grand totals
            let tempSubtotal = 0.0;
            model.items.forEach(x => {
                const p = getMaterialUSDPrice(x.name);
                tempSubtotal += x.qty * p;
            });

            const tempOperating = monthlyExpensesTotal / machineCount;
            const tempExtra = tempSubtotal * 0.10;
            const tempGrand = tempSubtotal + tempExtra + tempOperating;

            document.getElementById("summarySubtotalUSD").textContent = `$${tempSubtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById("summaryGrandTotalUSD").textContent = `$${tempGrand.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            savePricesAndExpenses();
        });

        qtyInp.addEventListener("blur", () => {
            calculate();
        });

        const unitBadge = document.createElement("span");
        unitBadge.style.fontSize = "0.75rem";
        unitBadge.style.padding = "0.25rem 0.5rem";
        unitBadge.style.borderRadius = "6px";
        unitBadge.style.cursor = "pointer";
        unitBadge.style.userSelect = "none";
        unitBadge.style.fontWeight = "600";
        unitBadge.style.display = "inline-block";
        unitBadge.style.minWidth = "50px";
        unitBadge.style.textAlign = "center";
        unitBadge.style.transition = "all 0.2s ease";
        unitBadge.style.marginLeft = "0.5rem";

        if (unitText === "m") {
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
            const nextUnit = (unitText === "m") ? "Adet" : "m";
            saveMaterialUnit(item.name, nextUnit);
            calculate();
        });

        qtyContainer.appendChild(qtyInp);
        tdQty.appendChild(qtyContainer);
        tdQty.appendChild(unitBadge);
        row.appendChild(tdQty);

        // 3. Supplier (Hidden for compact view)
        const tdSupplier = document.createElement("td");
        tdSupplier.textContent = details.supplier;
        tdSupplier.style.display = "none";
        row.appendChild(tdSupplier);

        // 4. Unit Price
        const tdUnitPrice = document.createElement("td");
        tdUnitPrice.style.textAlign = "right";
        tdUnitPrice.style.fontFamily = "var(--font-mono)";
        tdUnitPrice.style.fontSize = "0.85rem";
        tdUnitPrice.textContent = `$${priceUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        row.appendChild(tdUnitPrice);

        // 5. Total Price
        const tdRowTotal = document.createElement("td");
        tdRowTotal.style.textAlign = "right";
        tdRowTotal.style.fontFamily = "var(--font-mono)";
        tdRowTotal.style.fontWeight = "600";
        tdRowTotal.style.fontSize = "0.85rem";
        tdRowTotal.textContent = `$${totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        row.appendChild(tdRowTotal);

        // 6. Update Date (Hidden for compact view)
        const tdDate = document.createElement("td");
        tdDate.textContent = details.updateDate;
        tdDate.style.display = "none";
        row.appendChild(tdDate);

        // 7. Action buttons (Move Up, Move Down, Delete)
        const tdAction = document.createElement("td");
        tdAction.style.textAlign = "center";
        tdAction.style.verticalAlign = "middle";
        tdAction.style.whiteSpace = "nowrap";
        tdAction.style.padding = "0.5rem !important";

        // Move Up button
        const upBtn = document.createElement("button");
        upBtn.className = "project-btn-main";
        upBtn.style.padding = "0.25rem 0.35rem";
        upBtn.style.marginTop = "0";
        upBtn.style.marginRight = "0.15rem";
        upBtn.style.display = "inline-block";
        upBtn.style.background = "rgba(99, 102, 241, 0.08)";
        upBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
        upBtn.style.color = "#c7d2fe";
        upBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        upBtn.title = "Yukarı Taşı";
        upBtn.addEventListener("click", () => {
            const idx = model.items.findIndex(x => x.name === item.name);
            if (idx > 0) {
                [model.items[idx - 1], model.items[idx]] = [model.items[idx], model.items[idx - 1]];
                savePricesAndExpenses();
                calculate();
            }
        });

        // Move Down button
        const downBtn = document.createElement("button");
        downBtn.className = "project-btn-main";
        downBtn.style.padding = "0.25rem 0.35rem";
        downBtn.style.marginTop = "0";
        downBtn.style.marginRight = "0.15rem";
        downBtn.style.display = "inline-block";
        downBtn.style.background = "rgba(99, 102, 241, 0.08)";
        downBtn.style.borderColor = "rgba(99, 102, 241, 0.2)";
        downBtn.style.color = "#c7d2fe";
        downBtn.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        downBtn.title = "Aşağı Taşı";
        downBtn.addEventListener("click", () => {
            const idx = model.items.findIndex(x => x.name === item.name);
            if (idx < model.items.length - 1) {
                [model.items[idx], model.items[idx + 1]] = [model.items[idx + 1], model.items[idx]];
                savePricesAndExpenses();
                calculate();
            }
        });

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.className = "project-btn-main btn-delete";
        delBtn.style.padding = "0.25rem 0.35rem";
        delBtn.style.marginTop = "0";
        delBtn.style.display = "inline-block";
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.title = "Sil";
        delBtn.addEventListener("click", () => {
            const idx = model.items.findIndex(x => x.name === item.name);
            if (idx !== -1) {
                model.items.splice(idx, 1);
                savePricesAndExpenses();
                calculate();
            }
        });

        tdAction.appendChild(upBtn);
        tdAction.appendChild(downBtn);
        tdAction.appendChild(delBtn);
        row.appendChild(tdAction);

        tbody.appendChild(row);
    });

    // 3. Final calculations in USD
    const extraMasrafUSD = subtotalUSD * 0.10;
    const grandTotalUSD = subtotalUSD + extraMasrafUSD + operatingCostPerMachine;

    // Update Dashboard Displays
    document.getElementById("summarySubtotalUSD").textContent = `$${subtotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("summaryOperatingUSD").textContent = `$${operatingCostPerMachine.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("summaryGrandTotalUSD").textContent = `$${grandTotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    initQuickAddDropdown(model);
}

function initQuickAddDropdown(model) {
    const categorySelect = document.getElementById("quickAddCategorySelect");
    if (!categorySelect) return;

    // Save active category selection
    const activeCategory = categorySelect.value;

    // Populate categories dynamically
    categorySelect.innerHTML = '<option value="">-- Tüm Gruplar --</option>';
    const groups = [...new Set(materials.map(m => m.group).filter(Boolean))].sort();
    groups.forEach(g => {
        const opt = document.createElement("option");
        opt.value = g;
        opt.textContent = g;
        categorySelect.appendChild(opt);
    });

    if (groups.includes(activeCategory)) {
        categorySelect.value = activeCategory;
    }

    renderQuickAddMaterialsOnly(model);
}

function renderQuickAddMaterialsOnly(model) {
    const categorySelect = document.getElementById("quickAddCategorySelect");
    const materialSelect = document.getElementById("quickAddMaterialSelect");
    if (!categorySelect || !materialSelect) return;

    const selectedGroup = categorySelect.value;
    materialSelect.innerHTML = "";

    // Default option
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "-- Reçeteye eklemek için bir parça seçin --";
    materialSelect.appendChild(placeholder);

    // Filter by group (category) & exclude already added items
    let available = materials.filter(m => !model.items.some(item => item.name === m.name));
    if (selectedGroup) {
        available = available.filter(m => m.group === selectedGroup);
    }

    // Sort alphabetically
    available.sort((a, b) => a.name.localeCompare(b.name));

    available.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.name;
        opt.textContent = `${m.name} ($${m.priceUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
        materialSelect.appendChild(opt);
    });
}

})();
