// Proposal Management Logic for 'Teklif Ver'

let proposalItems = [];

// Custom Product Catalog structure: { "Kategori Adı": [ { name: "Ürün Adı", price: 123.45 }, ... ] }
let productCatalog = {};

const defaultCatalog = {
    "Pano & Kontrol": [
        { name: "FY Smart Pano Sistem 12''", price: 1250.00 },
        { name: "PLC Genişleme Modülü (16 Input)", price: 180.00 },
        { name: "PLC Genişleme Modülü (16 Output)", price: 195.00 },
        { name: "Güç Kaynağı 24V 10A", price: 85.00 }
    ],
    "Mekanik Bileşenler": [
        { name: "HY500 Gövde Sacı (Lazer Kesim)", price: 125.00 },
        { name: "Paslanmaz Hazne Grubu", price: 450.00 },
        { name: "Klepe Takımı Pnömatik", price: 210.00 }
    ],
    "Hortum & Boru": [
        { name: "2'' Spiral Emiş Hortumu (mt)", price: 12.50 },
        { name: "Çelik Tesisat Borusu Ø60 (mt)", price: 18.00 },
        { name: "Contalı Boru Kelepçesi", price: 8.50 }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    initTeklifVer();
});

function initTeklifVer() {
    // Load custom catalog
    productCatalog = JSON.parse(localStorage.getItem("t_product_catalog")) || defaultCatalog;
    if (!localStorage.getItem("t_product_catalog")) {
        localStorage.setItem("t_product_catalog", JSON.stringify(productCatalog));
    }

    // Populate exchange rate from default or localStorage
    const storedRate = parseFloat(localStorage.getItem("t_exchange_rate")) || defaultExchangeRate;
    document.getElementById("usdExchangeRate").value = storedRate;

    // Populate showTLPrice checkbox from localStorage
    const showTL = localStorage.getItem("t_show_tl") !== "false";
    document.getElementById("showTLPrice").checked = showTL;

    // Populate VAT details from localStorage
    const showVAT = localStorage.getItem("t_show_vat") !== "false";
    document.getElementById("showVATPrice").checked = showVAT;
    const storedVATRate = parseFloat(localStorage.getItem("t_vat_rate")) || 20;
    document.getElementById("vatRate").value = storedVATRate;

    // Set default date
    const dateInput = document.getElementById("proposalDate");
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Populate Central saved projects dropdown for Annex
    populateAnnexCentralDropdown();

    // Populate Pnomatik saved projects dropdown for Annex
    populateAnnexPnomatikDropdown();

    // Populate Catalog and Proposal Category lists
    updateCatalogDropdowns();
    renderCatalogViewer();

    // Bind tab switching
    const btnCreateTeklifTab = document.getElementById("btnCreateTeklifTab");
    const btnManageCatalogTab = document.getElementById("btnManageCatalogTab");
    const createTeklifTabContent = document.getElementById("createTeklifTabContent");
    const manageCatalogTabContent = document.getElementById("manageCatalogTabContent");

    if (btnCreateTeklifTab && btnManageCatalogTab) {
        btnCreateTeklifTab.addEventListener("click", () => {
            btnCreateTeklifTab.classList.add("active");
            btnManageCatalogTab.classList.remove("active");
            createTeklifTabContent.classList.add("active-content");
            manageCatalogTabContent.classList.remove("active-content");
        });

        btnManageCatalogTab.addEventListener("click", () => {
            btnManageCatalogTab.classList.add("active");
            btnCreateTeklifTab.classList.remove("active");
            manageCatalogTabContent.classList.add("active-content");
            createTeklifTabContent.classList.remove("active-content");
        });
    }

    // Bind event listeners
    document.getElementById("sourceProductCategory").addEventListener("change", handleCategoryChange);
    document.getElementById("annexCentralProject").addEventListener("focus", populateAnnexCentralDropdown);
    document.getElementById("annexPnomatikProject").addEventListener("focus", populateAnnexPnomatikDropdown);
    document.getElementById("sourceProductItem").addEventListener("change", handleProductItemChange);
    document.getElementById("btnAddPredefinedProduct").addEventListener("click", addPredefinedProduct);
    document.getElementById("btnAddCustomItem").addEventListener("click", addCustomItem);
    document.getElementById("btnClearProposal").addEventListener("click", clearProposal);
    document.getElementById("btnPrintCustomProposal").addEventListener("click", printProposal);

    // Bind catalog management events
    document.getElementById("btnAddNewCatalogCategory").addEventListener("click", addCatalogCategory);
    document.getElementById("btnAddNewCatalogProduct").addEventListener("click", addCatalogProduct);
    
    document.getElementById("usdExchangeRate").addEventListener("input", () => {
        const rate = parseFloat(document.getElementById("usdExchangeRate").value) || defaultExchangeRate;
        localStorage.setItem("t_exchange_rate", rate);
        updateProposalSummary();
    });
    document.getElementById("showTLPrice").addEventListener("change", (e) => {
        localStorage.setItem("t_show_tl", e.target.checked);
        updateProposalSummary();
    });
    
    document.getElementById("vatRate").addEventListener("input", () => {
        const rate = parseFloat(document.getElementById("vatRate").value) || 0;
        localStorage.setItem("t_vat_rate", rate);
        updateProposalSummary();
    });
    document.getElementById("showVATPrice").addEventListener("change", (e) => {
        localStorage.setItem("t_show_vat", e.target.checked);
        updateProposalSummary();
    });

    // Load proposal from localStorage if exists
    proposalItems = JSON.parse(localStorage.getItem("t_proposal_items")) || [];
    
    // Load client info from localStorage
    const savedInfo = JSON.parse(localStorage.getItem("t_company_info"));
    if (savedInfo) {
        document.getElementById("proposalTitle").value = savedInfo.title || "Fiyat Teklifi";
        document.getElementById("clientCompany").value = savedInfo.company || "";
        document.getElementById("contactPerson").value = savedInfo.contact || "";
        if (savedInfo.date) document.getElementById("proposalDate").value = savedInfo.date;
        if (savedInfo.email) document.getElementById("clientEmail").value = savedInfo.email;
        if (savedInfo.taxOffice) document.getElementById("clientTaxOffice").value = savedInfo.taxOffice;
        if (savedInfo.taxNo) document.getElementById("clientTaxNo").value = savedInfo.taxNo;
        if (savedInfo.address) document.getElementById("clientAddress").value = savedInfo.address;
        
        // Load proposal terms & notes
        if (savedInfo.termsValidity) document.getElementById("termsValidity").value = savedInfo.termsValidity;
        if (savedInfo.termsPayment) document.getElementById("termsPayment").value = savedInfo.termsPayment;
        if (savedInfo.termsDelivery) document.getElementById("termsDelivery").value = savedInfo.termsDelivery;
        if (savedInfo.termsShipping) document.getElementById("termsShipping").value = savedInfo.termsShipping;
        if (savedInfo.noteBankExchange) document.getElementById("noteBankExchange").value = savedInfo.noteBankExchange;
        if (savedInfo.noteOrderConfirm) document.getElementById("noteOrderConfirm").value = savedInfo.noteOrderConfirm;
        if (savedInfo.noteForceMajeure) document.getElementById("noteForceMajeure").value = savedInfo.noteForceMajeure;
    }

    // Bind company input change listeners to persist state
    const companyInputs = [
        "proposalTitle", "clientCompany", "contactPerson", "proposalDate",
        "clientEmail", "clientTaxOffice", "clientTaxNo", "clientAddress",
        "termsValidity", "termsPayment", "termsDelivery", "termsShipping",
        "noteBankExchange", "noteOrderConfirm", "noteForceMajeure"
    ];
    companyInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", saveCompanyInfoState);
    });

    // Load saved proposals list into dropdown
    loadSavedProposalsList();

    // Bind proposal project management (same UX as Merkezi/Pnömatik)
    document.getElementById("btnSaveProposal").addEventListener("click", saveCurrentProposalTemplate);
    document.getElementById("btnDeleteProposal").addEventListener("click", deleteSelectedProposalTemplate);
    document.getElementById("savedProposalsSelect").addEventListener("change", loadSelectedProposalTemplate);

    // Bind PDF folder auto save buttons
    document.getElementById("btnSelectPdfFolder").addEventListener("click", selectPdfFolder);
    document.getElementById("btnSaveToPdfFolder").addEventListener("click", saveProposalToLocalFolder);

    // Initialize/read directory handle
    getSavedDirectoryHandle().then(handle => {
        if (handle) {
            updatePdfFolderStatus(handle.name);
        } else {
            updatePdfFolderStatus(null);
        }
    }).catch(err => {
        console.error("Error reading saved directory handle:", err);
        updatePdfFolderStatus(null);
    });

    updateProposalSummary();
}

function saveCompanyInfoState() {
    const info = {
        title: document.getElementById("proposalTitle").value,
        company: document.getElementById("clientCompany").value,
        contact: document.getElementById("contactPerson").value,
        date: document.getElementById("proposalDate").value,
        email: document.getElementById("clientEmail").value,
        taxOffice: document.getElementById("clientTaxOffice").value,
        taxNo: document.getElementById("clientTaxNo").value,
        address: document.getElementById("clientAddress").value,
        termsValidity: document.getElementById("termsValidity").value,
        termsPayment: document.getElementById("termsPayment").value,
        termsDelivery: document.getElementById("termsDelivery").value,
        termsShipping: document.getElementById("termsShipping").value,
        noteBankExchange: document.getElementById("noteBankExchange").value,
        noteOrderConfirm: document.getElementById("noteOrderConfirm").value,
        noteForceMajeure: document.getElementById("noteForceMajeure").value
    };
    localStorage.setItem("t_company_info", JSON.stringify(info));
}

function populateAnnexCentralDropdown() {
    const list = JSON.parse(localStorage.getItem("m_projects")) || {};
    const select = document.getElementById("annexCentralProject");
    if (!select) return;
    select.innerHTML = '<option value="">-- Proje Eki Yok --</option>';
    
    Object.keys(list).sort().forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });
}

function updateCatalogDropdowns() {
    const sourceCategorySelect = document.getElementById("sourceProductCategory");
    const catalogCategorySelect = document.getElementById("catalogProductCategorySelect");

    const categories = Object.keys(productCatalog).sort();

    // 1. Update source category select
    sourceCategorySelect.innerHTML = '<option value="">-- Kategori Seçin --</option>';
    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        sourceCategorySelect.appendChild(opt);
    });

    // 2. Update catalog target category select
    catalogCategorySelect.innerHTML = '<option value="">-- Kategori Seçin --</option>';
    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        catalogCategorySelect.appendChild(opt);
    });
}

function handleCategoryChange() {
    const category = document.getElementById("sourceProductCategory").value;
    const itemSelect = document.getElementById("sourceProductItem");
    const customPriceInput = document.getElementById("productCustomPrice");
    
    itemSelect.innerHTML = "";
    itemSelect.disabled = true;
    customPriceInput.value = "";
    
    if (category && productCatalog[category]) {
        itemSelect.innerHTML = '<option value="">-- Ürün Seçin --</option>';
        productCatalog[category].forEach(prod => {
            const opt = document.createElement("option");
            opt.value = prod.name;
            opt.textContent = prod.name;
            itemSelect.appendChild(opt);
        });
        itemSelect.disabled = false;
    } else {
        itemSelect.innerHTML = '<option value="">-- Önce Kategori Seçin --</option>';
    }
}

function handleProductItemChange() {
    const category = document.getElementById("sourceProductCategory").value;
    const selectedItem = document.getElementById("sourceProductItem").value;
    const customPriceInput = document.getElementById("productCustomPrice");
    
    if (!category || !selectedItem || !productCatalog[category]) {
        customPriceInput.value = "";
        return;
    }
    
    const prod = productCatalog[category].find(p => p.name === selectedItem);
    if (prod) {
        customPriceInput.value = prod.price.toFixed(2);
    }
}

// Catalog CRUD Operations
function addCatalogCategory() {
    const nameInput = document.getElementById("newCatalogCategoryName");
    const name = nameInput.value.trim();
    if (!name) {
        alert("Lütfen geçerli bir kategori adı girin.");
        return;
    }
    if (productCatalog[name]) {
        alert("Bu isimde bir kategori zaten mevcut.");
        return;
    }

    productCatalog[name] = [];
    localStorage.setItem("t_product_catalog", JSON.stringify(productCatalog));
    nameInput.value = "";
    updateCatalogDropdowns();
    renderCatalogViewer();
}

function deleteCatalogCategory(categoryName) {
    if (confirm(`"${categoryName}" kategorisini ve içindeki tüm ürünleri silmek istediğinize emin misiniz?`)) {
        delete productCatalog[categoryName];
        localStorage.setItem("t_product_catalog", JSON.stringify(productCatalog));
        updateCatalogDropdowns();
        renderCatalogViewer();
        handleCategoryChange(); // reset selects if active
    }
}

function addCatalogProduct() {
    const category = document.getElementById("catalogProductCategorySelect").value;
    const nameInput = document.getElementById("newCatalogProductName");
    const priceInput = document.getElementById("newCatalogProductPrice");
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0.0;

    if (!category) {
        alert("Lütfen önce bir kategori seçin.");
        return;
    }
    if (!name) {
        alert("Lütfen bir ürün adı girin.");
        return;
    }

    // Check if product exists in this category
    const exists = productCatalog[category].some(p => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert("Bu kategoride bu isimde bir ürün zaten mevcut.");
        return;
    }

    productCatalog[category].push({ name: name, price: price });
    localStorage.setItem("t_product_catalog", JSON.stringify(productCatalog));

    nameInput.value = "";
    priceInput.value = "";
    renderCatalogViewer();
}

function deleteCatalogProduct(categoryName, productName) {
    if (confirm(`"${productName}" ürününü silmek istediğinize emin misiniz?`)) {
        productCatalog[categoryName] = productCatalog[categoryName].filter(p => p.name !== productName);
        localStorage.setItem("t_product_catalog", JSON.stringify(productCatalog));
        renderCatalogViewer();
        handleCategoryChange(); // refresh options in proposal
    }
}

function renderCatalogViewer() {
    const container = document.getElementById("catalogViewerContainer");
    if (!container) return;
    container.innerHTML = "";

    const categories = Object.keys(productCatalog).sort();

    if (categories.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Henüz tanımlanmış bir kategori bulunmuyor. Sol panelden ekleyebilirsiniz.</div>`;
        return;
    }

    categories.forEach(cat => {
        const catCard = document.createElement("div");
        catCard.style.border = "1px solid var(--border-color)";
        catCard.style.borderRadius = "12px";
        catCard.style.padding = "1rem";
        catCard.style.background = "rgba(255, 255, 255, 0.01)";

        let productsHTML = "";
        if (productCatalog[cat].length === 0) {
            productsHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">Bu kategoride henüz ürün bulunmuyor.</td></tr>`;
        } else {
            productCatalog[cat].forEach((prod, index) => {
                productsHTML += `
                    <tr>
                        <td style="font-size: 0.85rem;">${prod.name}</td>
                        <td style="text-align: right; font-size: 0.85rem; font-weight: 600;">$${prod.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td style="text-align: center; width: 60px;">
                            <button class="project-btn-main btn-delete" style="padding: 0.15rem 0.35rem; margin: 0; font-size: 0.75rem;" onclick="deleteCatalogProduct('${cat.replace(/'/g, "\\'")}', '${prod.name.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        catCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <h3 style="font-size: 1rem; color: var(--accent-indigo);"><i class="fa-solid fa-folder"></i> ${cat} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(${productCatalog[cat].length} Ürün)</span></h3>
                <button class="project-btn-main btn-delete" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="deleteCatalogCategory('${cat.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-folder-minus"></i> Kategoriyi Sil
                </button>
            </div>
            <table class="cost-table" style="margin: 0; font-size: 0.85rem;">
                <thead>
                    <tr>
                        <th>Ürün Adı</th>
                        <th style="text-align: right; width: 150px;">Birim Fiyatı (USD)</th>
                        <th style="text-align: center; width: 60px;">İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    ${productsHTML}
                </tbody>
            </table>
        `;
        container.appendChild(catCard);
    });
}

function addPredefinedProduct() {
    const category = document.getElementById("sourceProductCategory").value;
    const selectedItem = document.getElementById("sourceProductItem").value;
    const qty = parseInt(document.getElementById("productQty").value) || 1;
    const price = parseFloat(document.getElementById("productCustomPrice").value) || 0.0;
    
    if (!category || !selectedItem) {
        alert("Lütfen önce eklenecek ürünü seçin.");
        return;
    }
    
    proposalItems.push({
        desc: `${category} - ${selectedItem}`,
        qty: qty,
        unit: "Adet",
        unitPrice: price
    });
    
    saveProposalState();
    updateProposalSummary();
}

function addCustomItem() {
    const desc = document.getElementById("customItemDesc").value.trim();
    const qty = parseInt(document.getElementById("customItemQty").value) || 1;
    const unit = document.getElementById("customItemUnit").value.trim() || "Adet";
    const price = parseFloat(document.getElementById("customItemPrice").value) || 0.0;
    
    if (!desc) {
        alert("Lütfen malzeme açıklaması girin.");
        return;
    }
    
    proposalItems.push({
        desc: desc,
        qty: qty,
        unit: unit,
        unitPrice: price
    });
    
    document.getElementById("customItemDesc").value = "";
    document.getElementById("customItemQty").value = "1";
    document.getElementById("customItemPrice").value = "0.00";
    
    saveProposalState();
    updateProposalSummary();
}

function saveProposalState() {
    localStorage.setItem("t_proposal_items", JSON.stringify(proposalItems));
}

function deleteProposalItem(idx) {
    proposalItems.splice(idx, 1);
    saveProposalState();
    updateProposalSummary();
}

function clearProposal() {
    if (confirm("Teklif kalemlerini sıfırlamak istediğinize emin misiniz?")) {
        proposalItems = [];
        saveProposalState();
        updateProposalSummary();
    }
}

function updateProposalSummary() {
    const tbody = document.getElementById("teklifTableBody");
    tbody.innerHTML = "";
    
    let subtotalUSD = 0.0;
    const rate = parseFloat(document.getElementById("usdExchangeRate").value) || defaultExchangeRate;
    const showTL = document.getElementById("showTLPrice").checked;
    const showVAT = document.getElementById("showVATPrice").checked;
    const vatPercent = parseFloat(document.getElementById("vatRate").value) || 0;
    
    proposalItems.forEach((item, idx) => {
        const itemTotal = item.qty * item.unitPrice;
        subtotalUSD += itemTotal;
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.desc}</td>
            <td style="text-align: center;">${item.qty} ${item.unit}</td>
            <td style="text-align: right;">$${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td style="text-align: right;">$${itemTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td style="text-align: center;" class="hide-print-col">
                <button class="project-btn-main btn-delete" style="padding: 0.2rem 0.4rem; margin: 0;" onclick="deleteProposalItem(${idx})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    const vatUSD = subtotalUSD * (vatPercent / 100);
    const grandTotalUSD = subtotalUSD + (showVAT ? vatUSD : 0);
    
    const subtotalTL = subtotalUSD * rate;
    const vatTL = vatUSD * rate;
    const grandTotalTL = grandTotalUSD * rate;
    
    const container = document.getElementById("teklifTotalsContainer");
    
    let totalsHTML = "";
    
    if (showVAT) {
        // Subtotal row
        totalsHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: var(--text-secondary);">Ara Toplam:</span>
                <span style="font-weight: 600; color: var(--text-primary);">$${subtotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `;
        if (showTL) {
            totalsHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; opacity: 0.85;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); padding-left: 10px;">Ara Toplam (TL):</span>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">${subtotalTL.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
                </div>
            `;
        }
        
        // VAT row
        totalsHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="font-size: 0.85rem; color: var(--text-secondary);">KDV (%${vatPercent}):</span>
                <span style="font-weight: 600; color: var(--text-primary);">$${vatUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `;
        if (showTL) {
            totalsHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; opacity: 0.85;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); padding-left: 10px;">KDV (TL):</span>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">${vatTL.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
                </div>
            `;
        }
    }
    
    // Grand Total row
    totalsHTML += `
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 0.5rem; margin-top: 0.25rem;">
            <span style="font-weight: 700; color: var(--text-secondary);">${showVAT ? 'GENEL TOPLAM' : 'TOPLAM'} (USD):</span>
            <span style="font-weight: 700; color: var(--accent-teal); font-size: 1.25rem;">$${grandTotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
    `;
    if (showTL) {
        totalsHTML += `
            <div style="display: flex; justify-content: space-between; border-top: 1px dashed var(--border-color); padding-top: 0.4rem; margin-top: 0.4rem;">
                <span style="font-weight: 700; color: var(--text-secondary);">${showVAT ? 'GENEL TOPLAM' : 'TOPLAM'} (TL):</span>
                <span style="font-weight: 700; color: var(--accent-violet); font-size: 1.25rem;">${grandTotalTL.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
            </div>
        `;
    }
    
    container.innerHTML = totalsHTML;
}

function printProposal() {
    const printContainer = buildProposalPrintElement();
    printContainer.id = "printProposalOverlayContainer";
    printContainer.className = "teklif-print-overlay";
    document.body.appendChild(printContainer);
    document.body.classList.add("teklif-print-active");
    
    window.print();
    
    setTimeout(() => {
        document.body.classList.remove("teklif-print-active");
        printContainer.remove();
    }, 1000);
}

function getCentralAnnexHTML(projectName) {
    const projects = JSON.parse(localStorage.getItem("m_projects")) || {};
    const proj = projects[projectName];
    if (!proj) return "";
    
    const screens = JSON.parse(localStorage.getItem("m_screens")) || defaultScreens;
    const drivers = JSON.parse(localStorage.getItem("m_drivers")) || defaultDrivers;
    const pumps = JSON.parse(localStorage.getItem("m_pumps")) || defaultPumps;
    const pipes = JSON.parse(localStorage.getItem("m_pipes")) || defaultPipes;
    const generalItems = JSON.parse(localStorage.getItem("m_generalItems")) || defaultGeneralItems;
    
    const getGeneralItem = (id) => generalItems.find(item => item.id === id) || { name: id, price: 0 };
    
    const H7 = proj.stationCount;
    const H8 = proj.materialCount;
    const H9 = proj.pumpCount;
    const H13 = proj.machineDistance;
    const H14 = proj.longestDistance;
    const H15 = proj.wallToMachineCable;
    const H16 = proj.controlCableLength;
    const H17 = proj.wallToMachineHose;
    
    const selectedScreen = screens.find(s => s.name === proj.screenSelect);
    const selectedDriver = drivers.find(d => d.name === proj.driverSelect);
    const selectedPump = pumps.find(p => p.name === proj.pumpSelect);
    const selectedPipe = pipes.find(p => p.name === proj.pipeSelect);
    
    const H10 = (H7 * 4) + (H9 * 1) + 1;
    const H11 = (H7 * 3) + (H7 * H8) + (H9 * 4) + 1;
    
    let O35 = 0;
    for (let i = 0; i < H7; i++) {
        O35 += Math.max(0, H14 - (i * H13));
    }
    const cableMeters_12x1 = O35 * 1.1;
    
    const sections = {
        pano: {
            title: "Pano Sistem Bileşenleri",
            items: [
                { name: selectedScreen ? selectedScreen.name : proj.screenSelect, qty: 1 },
                { name: getGeneralItem("plc").name, qty: 1 },
                { name: getGeneralItem("input_mod").name, qty: Math.ceil(H10 / 16) },
                { name: getGeneralItem("output_mod").name, qty: Math.ceil(H11 / 16) },
                { name: getGeneralItem("transistor_kart").name, qty: Math.ceil(H11 / 5) + 2 },
                { name: getGeneralItem("guc_kaynagi").name, qty: 2 },
                { name: selectedDriver ? selectedDriver.name : proj.driverSelect, qty: H9 },
                { name: getGeneralItem("fren_direnci").name, qty: H9 },
                { name: getGeneralItem("pano_havalandirma").name, qty: 1 },
                { name: getGeneralItem("lobar_kucuk").name, qty: 2 },
                { name: getGeneralItem("lobar_buyuk").name, qty: 2 },
                { name: getGeneralItem("pano").name, qty: 1 },
                { name: getGeneralItem("diger_malzemeler").name, qty: H7 }
            ]
        },
        kablo: {
            title: "Kablolama Grubu",
            items: [
                { name: getGeneralItem("kablo_12x1").name, qty: cableMeters_12x1, isMeter: true },
                { name: getGeneralItem("kablo_6x05").name, qty: H16 * H7, isMeter: true },
                { name: getGeneralItem("kablo_8x1").name, qty: H15 * H7, isMeter: true },
                { name: getGeneralItem("kablo_4x4").name, qty: 25, isMeter: true },
                { name: getGeneralItem("kablo_6x05").name + " (Pano-Şase Arası)", qty: 25, isMeter: true }
            ]
        },
        soketler: {
            title: "Soket Malzemeleri",
            items: [
                { name: getGeneralItem("soket_duvar").name, qty: H7 },
                { name: getGeneralItem("soket_makina").name, qty: H7 },
                { name: getGeneralItem("soket_duvar_16").name, qty: H7 }
            ]
        },
        istasyon: {
            title: "İstasyon Ekipmanları",
            items: [
                { name: getGeneralItem("hazne").name, qty: H7 },
                { name: getGeneralItem("kumanda_seti").name, qty: H7 }
            ]
        },
        duvarSistemi: {
            title: "Duvardaki Sistem Bileşenleri",
            items: [
                { name: getGeneralItem("profil_120").name, qty: H7 * H8 },
                { name: getGeneralItem("hat_baglanti").name, qty: H7 * H8 },
                { name: getGeneralItem("piston_ma1650").name, qty: H7 * H8 },
                { name: getGeneralItem("valf_5_2").name, qty: H7 * H8 },
                { name: getGeneralItem("klepe_takimi").name, qty: H7 * H8 }
            ]
        },
        pompaSase: {
            title: "Pompa Şase Sistemi",
            items: [
                { name: selectedPump ? selectedPump.name : proj.pumpSelect, qty: H9 },
                { name: getGeneralItem("sase_sistemi").name, qty: H9 }
            ]
        },
        tesisat: {
            title: "Tesisat ve Borulama",
            items: [
                { name: selectedPipe ? selectedPipe.hose : "", qty: (H17 * 2) * H7, isMeter: true },
                { name: selectedPipe ? selectedPipe.clamp : "", qty: 4 * H7 },
                { name: selectedPipe ? selectedPipe.name : proj.pipeSelect, qty: H14 * (H8 + 1), isMeter: true },
                { name: getGeneralItem("contali_kelepce").name, qty: Math.ceil((H8 * H7 * 2) + ((H14 * (H8 + 1)) / 6)) },
                { name: getGeneralItem("tesisat_aparatlari").name, qty: Math.ceil(H14 / 3) }
            ]
        }
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
                targetSection.items.push({ name: item.name, qty: 1 });
            }
        }
    });

    let tbodyHTML = "";
    Object.keys(sections).forEach(secKey => {
        const sec = sections[secKey];
        
        tbodyHTML += `
            <tr style="background-color: #f1f5f9; font-weight: bold;">
                <td colspan="3" style="border: 1px solid #cbd5e1; padding: 6px;">${sec.title}</td>
            </tr>
        `;
        
        sec.items.forEach(item => {
            if (!item.name) return;
            const qtyFormatted = item.isMeter ? `${item.qty.toFixed(1)} m` : `${item.qty} Adet`;
            tbodyHTML += `
                <tr>
                    <td style="border: 1px solid #e2e8f0; padding: 5px; width: 5%; text-align: center;">•</td>
                    <td style="border: 1px solid #e2e8f0; padding: 5px;">${item.name}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 5px; text-align: center; width: 25%;">${qtyFormatted}</td>
                </tr>
            `;
        });
    });

    return `
        <div class="print-page central-specs-annex" style="page-break-before: always; break-before: page; margin-top: 40px; zoom: 75%;">
            <div style="border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.4rem; color: #1e293b;">TEKLİF EKİ: MERSİ SİSTEM TEKNİK SPESİFİKASYONLARI</h2>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #64748b;">Proje Ref: ${projectName} - Malzeme ve Kurulum Detayları</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
                <thead>
                    <tr style="background-color: #f8fafc;">
                        <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">#</th>
                        <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: left;">Malzeme Açıklaması</th>
                        <th style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">Miktar / Metraj</th>
                    </tr>
                </thead>
                <tbody>
                    ${tbodyHTML}
                </tbody>
            </table>
        </div>
    `;
}

function getPnomatikAnnexHTML(projectName) {
    const projects = JSON.parse(localStorage.getItem("p_projects")) || {};
    const proj = projects[projectName];
    if (!proj) return "";

    const data = window.PnomatikData;
    if (!data) return "";

    const p = data.products.find(prod => prod.name === proj.productSelect) || {
        name: proj.productSelect,
        size: "-",
        density: 1000,
        bulkDensity: 500,
        velocityRange: "20-25 m/s",
        beta: 0.04,
        defaultV: 25
    };

    const V = p.defaultV;
    const beta = p.beta;

    const radiusCm = proj.pipeDiameter / 2.0;
    const areaCm2 = (Math.pow(radiusCm, 2) * Math.PI) / 100.0;

    const Q_m3min = (areaCm2 / 10000.0) * V * 60.0;
    const Q_m3hour = Q_m3min * 60.0;

    const solidGasRatio = (proj.capacity * 1000.0) / (Q_m3min * proj.airDensity * 60.0);

    const rho_0 = 1.2;
    const P_dyn = 0.5 * rho_0 * V * V;
    const pipeDiameterM = proj.pipeDiameter / 1000.0;
    const KH = 0.03 * proj.totalLength / pipeDiameterM;
    const g = 9.81;
    const KS = beta * proj.totalLength + (2.0 * proj.verticalLength * g) / (proj.velocityRatio * V * V) + 2.0 * proj.velocityRatio * (1.0 + (proj.elbows / 2.0));
    const deltaP_Pa = P_dyn * (KH + solidGasRatio * KS);
    const deltaP_mbar = deltaP_Pa / 100.0;
    const safetyPressureMbar = deltaP_mbar * 1.25;

    const result = data.findRecommendedBlower(Q_m3hour, deltaP_mbar, proj.selectedPhase || "3AC");
    let blowerHTML = "";
    if (result && result.recommended) {
        const rec = result.recommended;
        const usagePercent = Math.round((Q_m3hour / rec.availFlow) * 100.0);
        blowerHTML = `
            <div style="margin-top: 15px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; background-color: #f8fafc;">
                <h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 0.9rem;"><i class="fa-solid fa-wind"></i> Mühendislik Blower Seçimi ve Eşleştirme</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; font-size: 0.8rem;">
                    <div><strong>Önerilen Model:</strong> ${rec.model.name.split(" (")[0]}</div>
                    <div><strong>Motor Gücü:</strong> ${rec.model.power} kW</div>
                    <div><strong>Çalışma Noktası Debi Verimi:</strong> ${rec.availFlow.toFixed(1)} m³/sa</div>
                    <div><strong>Kapasite Kullanım Oranı:</strong> %${usagePercent}</div>
                    <div><strong>Model Maks. Debi:</strong> ${rec.model.maxFlow} m³/sa</div>
                    <div><strong>Model Maks. Sürekli Vakum:</strong> ${rec.model.maxVacuum} mbar</div>
                </div>
            </div>
        `;
    } else {
        blowerHTML = `
            <div style="margin-top: 15px; padding: 12px; border: 1px solid #fecaca; border-radius: 6px; background-color: #fef2f2; color: #991b1b; font-size: 0.8rem;">
                <strong>Blower Seçim Uyarısı:</strong> Mevcut çalışma koşullarına (%25 emniyet toleransı dahil) uygun standart bir blower modeli bulunamamıştır. Lütfen çalışma parametrelerini (boru çapı, kapasite vb.) gözden geçirin.
            </div>
        `;
    }

    return `
        <div class="print-page central-specs-annex" style="page-break-before: always; break-before: page; margin-top: 40px; zoom: 75%;">
            <div style="border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.4rem; color: #1e293b;">TEKLİF EKİ: PNÖMATİK TAŞIMA TEKNİK SPESİFİKASYONLARI</h2>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #64748b;">Proje Ref: ${projectName} - Taşıma Kapasitesi ve Optimal Güç Seçimi</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
                <div>
                    <h3 style="margin: 0 0 8px 0; font-size: 0.95rem; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Sistem Giriş Parametreleri</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
                        <tbody>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Taşınacak Ürün / Malzeme:</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.productSelect}</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Hedeflenen Kapasite (Qs):</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.capacity} t/sa</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Boru İç Çapı (d):</td>
                                <td style="padding: 4px 0; text-align: right;">Ø${proj.pipeDiameter} mm</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Dikey Yükseklik (H):</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.verticalLength} m</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Toplam Eşdeğer Uzunluk (L):</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.totalLength} m</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Dirsek Sayısı (i):</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.elbows} Adet</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Emiş Sıcaklığında Yoğunluk (ρ):</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.airDensity} kg/m³</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Blower Faz Seçimi:</td>
                                <td style="padding: 4px 0; text-align: right;">${proj.selectedPhase === "3AC" ? "Trifaze (3AC)" : "Monofaze (1AC)"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div>
                    <h3 style="margin: 0 0 8px 0; font-size: 0.95rem; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Hesaplama ve Çıktı Sonuçları</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
                        <tbody>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Malzeme Yığın Yoğunluğu:</td>
                                <td style="padding: 4px 0; text-align: right;">${p.bulkDensity} kg/m³</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Optimal Taşıma Hızı (V):</td>
                                <td style="padding: 4px 0; text-align: right;">${V} m/s</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Boru Kesit Alanı (A):</td>
                                <td style="padding: 4px 0; text-align: right;">${areaCm2.toFixed(2)} cm²</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Gerekli Blower Hava Debisi:</td>
                                <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #0f172a;">${Q_m3hour.toFixed(1)} m³/sa (${Q_m3min.toFixed(2)} m³/dk)</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Katı / Gaz Karışım Oranı (μ):</td>
                                <td style="padding: 4px 0; text-align: right;">${solidGasRatio.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Hesaplanan Net Basınç Kaybı:</td>
                                <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #0f172a;">${deltaP_mbar.toFixed(1)} mbar</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 0; font-weight: bold; color: #475569;">Emniyetli Hedef Basınç (%125):</td>
                                <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #b45309;">${safetyPressureMbar.toFixed(1)} mbar</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            ${blowerHTML}
        </div>
    `;
}

function buildProposalPrintElement() {
    const title = document.getElementById("proposalTitle").value || "Fiyat Teklifi";
    const company = document.getElementById("clientCompany").value || "Girilmedi";
    const contact = document.getElementById("contactPerson").value || "Girilmedi";
    const dateStr = document.getElementById("proposalDate").value || new Date().toLocaleDateString('tr-TR');
    const rate = parseFloat(document.getElementById("usdExchangeRate").value) || defaultExchangeRate;
    const showTL = document.getElementById("showTLPrice").checked;
    const showVAT = document.getElementById("showVATPrice").checked;
    const vatPercent = parseFloat(document.getElementById("vatRate").value) || 0;
    
    const clientEmail = document.getElementById("clientEmail").value || "Girilmedi";
    const clientTaxOffice = document.getElementById("clientTaxOffice").value || "Girilmedi";
    const clientTaxNo = document.getElementById("clientTaxNo").value || "Girilmedi";
    const clientAddress = document.getElementById("clientAddress").value || "Girilmedi";
    
    const termsValidity = document.getElementById("termsValidity").value || "Girilmedi";
    const termsPayment = document.getElementById("termsPayment").value || "Girilmedi";
    const termsDelivery = document.getElementById("termsDelivery").value || "Girilmedi";
    const termsShipping = document.getElementById("termsShipping").value || "Girilmedi";
    const noteBankExchange = document.getElementById("noteBankExchange").value || "";
    const noteOrderConfirm = document.getElementById("noteOrderConfirm").value || "";
    const noteForceMajeure = document.getElementById("noteForceMajeure").value || "";
    
    const annexCentralProject = document.getElementById("annexCentralProject").value;
    const annexPnomatikProject = document.getElementById("annexPnomatikProject").value;
    
    const printOverlay = document.createElement("div");
    printOverlay.style.background = "#fff";
    printOverlay.style.color = "#000";
    printOverlay.style.padding = "20px";
    printOverlay.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    
    let itemsHTML = "";
    let subtotalUSD = 0.0;
    proposalItems.forEach((item, idx) => {
        const total = item.qty * item.unitPrice;
        subtotalUSD += total;
        
        itemsHTML += `
            <tr>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${idx + 1}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px;">${item.desc}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${item.qty} ${item.unit}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right;">$${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right;">$${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
        `;
    });
    
    const vatUSD = subtotalUSD * (vatPercent / 100);
    const grandTotalUSD = subtotalUSD + (showVAT ? vatUSD : 0);
    
    const subtotalTL = subtotalUSD * rate;
    const vatTL = vatUSD * rate;
    const grandTotalTL = grandTotalUSD * rate;
    
    let annexHTML = "";
    if (annexCentralProject) {
        annexHTML = getCentralAnnexHTML(annexCentralProject);
    }
    
    let pnomatikAnnexHTML = "";
    if (annexPnomatikProject) {
        pnomatikAnnexHTML = getPnomatikAnnexHTML(annexPnomatikProject);
    }
    
    const kurHTML = showTL ? `<p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #64748b;">Kur: 1 $ = ${rate.toFixed(4)} TL</p>` : '';
    
    let finalSummaryHTML = "";
    if (showVAT) {
        finalSummaryHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: 600; color: #475569;">Ara Toplam ($):</span>
                <span style="font-size: 0.9rem; font-weight: 600; color: #0f172a;">$${subtotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `;
        if (showTL) {
            finalSummaryHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; opacity: 0.85; padding-left: 10px;">
                    <span style="font-size: 0.75rem; color: #64748b;">Ara Toplam (TL):</span>
                    <span style="font-size: 0.8rem; color: #64748b;">${subtotalTL.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
                </div>
            `;
        }
        finalSummaryHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: 600; color: #475569;">KDV (%${vatPercent}) ($):</span>
                <span style="font-size: 0.9rem; font-weight: 600; color: #0f172a;">$${vatUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `;
        if (showTL) {
            finalSummaryHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; opacity: 0.85; padding-left: 10px;">
                    <span style="font-size: 0.75rem; color: #64748b;">KDV (TL):</span>
                    <span style="font-size: 0.8rem; color: #64748b;">${vatTL.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
                </div>
            `;
        }
    }
    
    finalSummaryHTML += `
        <div style="display: flex; justify-content: space-between; border-top: 1px solid #cbd5e1; padding-top: 6px; margin-top: 4px;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #475569;">GENEL TOPLAM ($):</span>
            <span style="font-size: 1rem; font-weight: 700; color: #0f172a;">$${grandTotalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
    `;
    
    if (showTL) {
        finalSummaryHTML += `
            <div style="display: flex; justify-content: space-between; border-top: 1px dashed #cbd5e1; padding-top: 6px; margin-top: 6px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: #475569;">GENEL TOPLAM (TL):</span>
                <span style="font-size: 1rem; font-weight: 700; color: #4f46e5;">${grandTotalTL.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
            </div>
        `;
    }
    
    printOverlay.innerHTML = `
        <div class="print-page">
            <div class="print-header" style="border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="bft_logo.png" alt="BFT Logo" style="height: 65px; width: auto; object-fit: contain; display: block;" />
                    <div>
                        <h1 style="margin: 0; font-size: 1.15rem; color: #1e3a8a; font-weight: 800; letter-spacing: 0.5px;">BFT BEFATEK MAKİNA İMALAT VE OTOMASYON</h1>
                        <h2 style="margin: 0 0 6px 0; font-size: 1.0rem; color: #1e3a8a; font-weight: 800; letter-spacing: 0.5px;">SANAYİ TİCARET LİMİTED ŞİRKETİ</h2>
                        <p style="margin: 2px 0; font-size: 0.72rem; color: #475569; line-height: 1.35;">Fevzi Çakmak Mah. Gülistan Cad. Atiker-3 San. Sit. 8.Blok No:29/H Karatay/KONYA</p>
                        <p style="margin: 2px 0; font-size: 0.72rem; color: #475569;">Vergi Dairesi: Selçuk - 1681090669 | E-posta: muhasebe@bft.com.tr</p>
                    </div>
                </div>
                <div style="text-align: right; min-width: 160px;">
                    <h3 style="margin: 0; font-size: 1.25rem; color: #0f172a; font-weight: 700; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; text-transform: uppercase;">${title}</h3>
                    <p style="margin: 6px 0 0 0; font-size: 0.8rem; font-weight: 600;">Tarih: ${dateStr}</p>
                    ${kurHTML}
                </div>
            </div>
            
            <div class="print-meta-grid" style="display: grid; grid-template-columns: 1fr; margin-bottom: 20px; font-size: 0.8rem;">
                <div style="border: 1px solid #cbd5e1; padding: 12px; border-radius: 6px; background-color: #f8fafc; line-height: 1.55;">
                    <span style="font-size: 0.72rem; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">Müşteri / Teklif Sunulan Firma</span>
                    <h3 style="margin: 0 0 6px 0; color: #0f172a; font-size: 1.05rem; font-weight: 700;">${company}</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 20px;">
                        <div><strong>Yetkili Kişi:</strong> ${contact}</div>
                        <div><strong>E-posta Adresi:</strong> ${clientEmail}</div>
                        <div><strong>Vergi Dairesi / No:</strong> ${clientTaxOffice} / ${clientTaxNo}</div>
                        <div><strong>Adres:</strong> ${clientAddress}</div>
                    </div>
                </div>
            </div>
            
            <div class="print-table-container">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.85rem;">
                    <thead>
                        <tr style="background-color: #f8fafc;">
                            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; width: 40px;">No</th>
                            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Malzeme / Açıklama</th>
                            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; width: 100px;">Miktar / Birim</th>
                            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; width: 120px;">Birim Fiyat ($)</th>
                            <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; width: 120px;">Toplam Fiyat ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
            </div>
            
            <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
                <div style="width: 320px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; background-color: #f8fafc;">
                    ${finalSummaryHTML}
                </div>
            </div>

            <!-- NOTLAR TABLOSU VE AÇIKLAMALAR -->
            <div style="margin-top: 15px; margin-bottom: 25px; page-break-inside: avoid; break-inside: avoid;">
                <h4 style="margin: 0 0 4px 0; font-size: 0.85rem; color: #0f172a; text-align: center; font-weight: 800; letter-spacing: 0.5px; border-bottom: 1.5px solid #0f172a; padding-bottom: 2px;">NOTLAR</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.72rem; line-height: 1.35; margin-bottom: 4px; border: 1.5px solid #0f172a;">
                    <tbody>
                        <tr style="border-bottom: 1px solid #0f172a;">
                            <td style="width: 25%; padding: 4px 6px; font-weight: bold; background-color: #f8fafc; border-right: 1px solid #0f172a;">FİYAT GEÇERLİLİK SÜRESİ</td>
                            <td style="padding: 4px 6px; font-weight: 500;">${termsValidity}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #0f172a;">
                            <td style="padding: 4px 6px; font-weight: bold; background-color: #f8fafc; border-right: 1px solid #0f172a;">ÖDEME</td>
                            <td style="padding: 4px 6px; font-weight: 500;">${termsPayment}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #0f172a;">
                            <td style="padding: 4px 6px; font-weight: bold; background-color: #f8fafc; border-right: 1px solid #0f172a;">TESLİM SÜRESİ</td>
                            <td style="padding: 4px 6px; font-weight: 500;">${termsDelivery}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 6px; font-weight: bold; background-color: #f8fafc; border-right: 1px solid #0f172a;">NAKLİYE</td>
                            <td style="padding: 4px 6px; font-weight: 500;">${termsShipping}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div style="font-size: 0.68rem; line-height: 1.4; color: #000; border: 1.5px solid #0f172a; border-top: none; padding: 6px; background-color: #ffffff; text-align: left;">
                    ${noteBankExchange ? `<p style="margin: 0 0 3px 0; font-weight: 600;">• ${noteBankExchange}</p>` : ''}
                    ${noteOrderConfirm ? `<p style="margin: 0 0 3px 0; font-weight: 600;">• ${noteOrderConfirm}</p>` : ''}
                    ${noteForceMajeure ? `<p style="margin: 0; font-weight: bold; text-align: justify;">• ${noteForceMajeure}</p>` : ''}
                </div>
            </div>
            
            <div style="margin-top: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; text-align: center; font-size: 0.85rem;">
                <div>
                    <p style="margin-bottom: 50px;">Müşteri Onay / İmza</p>
                    <div style="border-top: 1px solid #94a3b8; width: 200px; margin: 0 auto;"></div>
                </div>
                <div>
                    <p style="margin-bottom: 50px;">Teklifi Sunan / İmza</p>
                    <div style="border-top: 1px solid #94a3b8; width: 200px; margin: 0 auto;"></div>
                </div>
            </div>
        </div>
        ${annexHTML}
        ${pnomatikAnnexHTML}
    `;
    
    return printOverlay;
}

async function saveProposalToLocalFolder() {
    try {
        const handle = await getSavedDirectoryHandle();
        if (!handle) {
            alert("Lütfen önce 'PDF Klasörü Seç' butonunu kullanarak tekliflerin kaydolacağı bir klasör belirleyin.");
            return;
        }

        const hasPermission = await verifyPermission(handle, true);
        if (!hasPermission) {
            alert("Seçilen klasöre yazma izni verilmedi. Otomatik kaydetme yapılamaz.");
            return;
        }

        const company = document.getElementById("clientCompany").value.trim() || "Isimsiz_Musteri";
        const dateStr = document.getElementById("proposalDate").value || new Date().toISOString().split('T')[0];
        const filename = `${company}_Teklif_${dateStr}.pdf`.replace(/[\/\\?%*:|"<>]/g, '-');

        const pdfContentEl = buildProposalPrintElement();
        pdfContentEl.style.position = "absolute";
        pdfContentEl.style.left = "-9999px";
        pdfContentEl.style.top = "-9999px";
        pdfContentEl.style.width = "800px";
        document.body.appendChild(pdfContentEl);

        const options = {
            margin: 8,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const pdfBlob = await html2pdf().from(pdfContentEl).set(options).output('blob');
        pdfContentEl.remove();

        const fileHandle = await handle.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(pdfBlob);
        await writable.close();

        alert(`Teklif başarıyla "${handle.name}" klasörüne "${filename}" adıyla otomatik olarak kaydedildi.`);
    } catch (e) {
        console.error("Auto PDF save error:", e);
        alert("PDF dosyası kaydedilirken bir hata oluştu: " + e.message);
    }
}

function loadSavedProposalsList() {
    const list = JSON.parse(localStorage.getItem("t_proposals")) || {};
    const select = document.getElementById("savedProposalsSelect");
    if (!select) return;
    
    const currentSelection = select.value;
    select.innerHTML = '<option value="">-- Yeni Teklif Başlat --</option>';
    
    Object.keys(list).sort().forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });
    
    select.value = currentSelection;
    toggleProposalDeleteButtonState();
}

function toggleProposalDeleteButtonState() {
    const select = document.getElementById("savedProposalsSelect");
    const deleteBtn = document.getElementById("btnDeleteProposal");
    if (!select || !deleteBtn) return;
    deleteBtn.disabled = (select.value === "");
}

function saveCurrentProposalTemplate() {
    const nameInput = document.getElementById("proposalSaveName");
    const name = nameInput.value.trim();
    if (!name) {
        alert("Lütfen kaydetmeden önce bir teklif adı girin.");
        return;
    }

    const proposals = JSON.parse(localStorage.getItem("t_proposals")) || {};
    
    proposals[name] = {
        name: name,
        companyInfo: {
            title: document.getElementById("proposalTitle").value,
            company: document.getElementById("clientCompany").value,
            contact: document.getElementById("contactPerson").value,
            date: document.getElementById("proposalDate").value,
            email: document.getElementById("clientEmail").value,
            taxOffice: document.getElementById("clientTaxOffice").value,
            taxNo: document.getElementById("clientTaxNo").value,
            address: document.getElementById("clientAddress").value,
            termsValidity: document.getElementById("termsValidity").value,
            termsPayment: document.getElementById("termsPayment").value,
            termsDelivery: document.getElementById("termsDelivery").value,
            termsShipping: document.getElementById("termsShipping").value,
            noteBankExchange: document.getElementById("noteBankExchange").value,
            noteOrderConfirm: document.getElementById("noteOrderConfirm").value,
            noteForceMajeure: document.getElementById("noteForceMajeure").value
        },
        items: proposalItems,
        exchangeRate: parseFloat(document.getElementById("usdExchangeRate").value) || defaultExchangeRate,
        showTL: document.getElementById("showTLPrice").checked,
        showVAT: document.getElementById("showVATPrice").checked,
        vatRate: parseFloat(document.getElementById("vatRate").value) || 20,
        annexCentral: document.getElementById("annexCentralProject").value,
        annexPnomatik: document.getElementById("annexPnomatikProject").value
    };

    localStorage.setItem("t_proposals", JSON.stringify(proposals));
    loadSavedProposalsList();
    
    document.getElementById("savedProposalsSelect").value = name;
    toggleProposalDeleteButtonState();
    alert(`"${name}" teklifi başarıyla kaydedildi.`);
}

function loadSelectedProposalTemplate() {
    const select = document.getElementById("savedProposalsSelect");
    const name = select.value;
    
    if (name === "") {
        // "-- Yeni Teklif Başlat --" seçildi: formu sıfırla
        resetToNewProposal();
        return;
    }

    const proposals = JSON.parse(localStorage.getItem("t_proposals")) || {};
    const prop = proposals[name];
    if (!prop) return;

    // Set active name input to the loaded proposal's name
    document.getElementById("proposalSaveName").value = name;

    if (prop.companyInfo) {
        document.getElementById("proposalTitle").value = prop.companyInfo.title || "";
        document.getElementById("clientCompany").value = prop.companyInfo.company || "";
        document.getElementById("contactPerson").value = prop.companyInfo.contact || "";
        if (prop.companyInfo.date) document.getElementById("proposalDate").value = prop.companyInfo.date;
        document.getElementById("clientEmail").value = prop.companyInfo.email || "";
        document.getElementById("clientTaxOffice").value = prop.companyInfo.taxOffice || "";
        document.getElementById("clientTaxNo").value = prop.companyInfo.taxNo || "";
        document.getElementById("clientAddress").value = prop.companyInfo.address || "";
        
        document.getElementById("termsValidity").value = prop.companyInfo.termsValidity || "";
        document.getElementById("termsPayment").value = prop.companyInfo.termsPayment || "";
        document.getElementById("termsDelivery").value = prop.companyInfo.termsDelivery || "";
        document.getElementById("termsShipping").value = prop.companyInfo.termsShipping || "";
        document.getElementById("noteBankExchange").value = prop.companyInfo.noteBankExchange || "";
        document.getElementById("noteOrderConfirm").value = prop.companyInfo.noteOrderConfirm || "";
        document.getElementById("noteForceMajeure").value = prop.companyInfo.noteForceMajeure || "";
        
        saveCompanyInfoState();
    }

    proposalItems = prop.items || [];
    localStorage.setItem("t_proposal_items", JSON.stringify(proposalItems));

    document.getElementById("usdExchangeRate").value = prop.exchangeRate || defaultExchangeRate;
    localStorage.setItem("t_exchange_rate", prop.exchangeRate || defaultExchangeRate);
    
    document.getElementById("showTLPrice").checked = prop.showTL !== false;
    localStorage.setItem("t_show_tl", prop.showTL !== false);

    document.getElementById("showVATPrice").checked = prop.showVAT !== false;
    localStorage.setItem("t_show_vat", prop.showVAT !== false);

    document.getElementById("vatRate").value = prop.vatRate || 20;
    localStorage.setItem("t_vat_rate", prop.vatRate || 20);

    document.getElementById("annexCentralProject").value = prop.annexCentral || "";
    document.getElementById("annexPnomatikProject").value = prop.annexPnomatik || "";

    toggleProposalDeleteButtonState();
    renderProposalItems();
    updateProposalSummary();
}

function resetToNewProposal() {
    document.getElementById("proposalSaveName").value = "Yeni Teklif";
    document.getElementById("proposalTitle").value = "Fiyat Teklifi";
    document.getElementById("clientCompany").value = "";
    document.getElementById("contactPerson").value = "";
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("proposalDate").value = today;
    document.getElementById("clientEmail").value = "";
    document.getElementById("clientTaxOffice").value = "";
    document.getElementById("clientTaxNo").value = "";
    document.getElementById("clientAddress").value = "";
    document.getElementById("savedProposalsSelect").value = "";
    toggleProposalDeleteButtonState();
    clearProposal();
}

function deleteSelectedProposalTemplate() {
    const select = document.getElementById("savedProposalsSelect");
    const name = select.value;
    if (!name) {
        alert("Lütfen önce silmek istediğiniz teklifi seçin.");
        return;
    }

    if (!confirm(`"${name}" teklifini kalıcı olarak silmek istediğinize emin misiniz?`)) {
        return;
    }

    const proposals = JSON.parse(localStorage.getItem("t_proposals")) || {};
    delete proposals[name];
    
    localStorage.setItem("t_proposals", JSON.stringify(proposals));
    
    loadSavedProposalsList();
    resetToNewProposal();
    alert(`"${name}" teklifi silindi.`);
}

const DB_NAME = "BFT_Portal_DB";
const STORE_NAME = "settings";
const KEY_DIR_HANDLE = "pdf_directory_handle";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

async function getSavedDirectoryHandle() {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const request = store.get(KEY_DIR_HANDLE);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.error("IndexedDB get error:", e);
        return null;
    }
}

async function saveDirectoryHandle(handle) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            const request = store.put(handle, KEY_DIR_HANDLE);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.error("IndexedDB put error:", e);
    }
}

async function verifyPermission(fileHandle, readWrite) {
    const options = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
    }
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
    }
    return false;
}

function updatePdfFolderStatus(folderName) {
    const statusEl = document.getElementById("pdfFolderStatus");
    if (statusEl) {
        if (folderName) {
            statusEl.innerHTML = `Otomatik Kayıt Klasörü: <strong style="color: var(--accent-teal);">${folderName}</strong> (Teklifler bu klasöre kaydolacaktır)`;
        } else {
            statusEl.textContent = "Otomatik Kayıt Klasörü: Belirlenmedi (Tarayıcı varsayılanına kaydeder)";
        }
    }
}

async function selectPdfFolder() {
    try {
        const handle = await window.showDirectoryPicker();
        await saveDirectoryHandle(handle);
        updatePdfFolderStatus(handle.name);
        alert(`"${handle.name}" klasörü otomatik PDF kayıt yeri olarak seçildi.`);
    } catch (e) {
        if (e.name !== 'AbortError') {
            console.error("Folder selection error:", e);
            alert("Klasör seçilirken bir hata oluştu: " + e.message);
        }
    }
}
