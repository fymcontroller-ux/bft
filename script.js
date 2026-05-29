// Products Database based on original Excel sheet
const products = [
    { name: "Arpa", size: "4 mm", density: 1420, bulkDensity: 690, velocityRange: "20-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Ağaç dilimleri", size: "100x50x4 mm", density: 720, bulkDensity: 500, velocityRange: "23-27 m/s", beta: 0.08, defaultV: 27 },
    { name: "Ağaç talaş", size: "50x20x1 mm", density: 470, bulkDensity: 275, velocityRange: "22-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Buğday", size: "3.9 mm", density: 1380, bulkDensity: 730, velocityRange: "22-27 m/s", beta: 0.04, defaultV: 27 },
    { name: "Buğday kepeği", size: "1 mm", density: 1470, bulkDensity: 300, velocityRange: "20-25 m/s", beta: 0.06, defaultV: 25 },
    { name: "Buğday unu", size: "0.09 mm", density: 1470, bulkDensity: 540, velocityRange: "18-23 m/s", beta: 0.08, defaultV: 23 },
    { name: "Cam bilyacıklar", size: "1.14 mm", density: 2990, bulkDensity: 1780, velocityRange: "22-27 m/s", beta: 0.06, defaultV: 27 },
    { name: "Çavdar", size: "3 mm", density: 1180, bulkDensity: 620, velocityRange: "22-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Çelik bilyacıklar", size: "1.08 mm", density: 7850, bulkDensity: 4420, velocityRange: "25-35 m/s", beta: 0.12, defaultV: 35 },
    { name: "Çimento", size: "0.05 mm", density: 3100, bulkDensity: 1420, velocityRange: "20-25 m/s", beta: 0.18, defaultV: 25 },
    { name: "Çimento (Farin)", size: "0.05 mm", density: 3100, bulkDensity: 960, velocityRange: "20-25 m/s", beta: 0.15, defaultV: 25 },
    { name: "Çinko oksit", size: "0.1 mm", density: 4850, bulkDensity: 2000, velocityRange: "25-30 m/s", beta: 0.15, defaultV: 30 },
    { name: "Testere tozu", size: "0.7 mm", density: 470, bulkDensity: 190, velocityRange: "20-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Hayvan Yemi", size: "0.86 mm", density: 1370, bulkDensity: 540, velocityRange: "22-25 m/s", beta: 0.06, defaultV: 25 },
    { name: "Kaya tuzu", size: "1.6 mm", density: 2190, bulkDensity: 1200, velocityRange: "22-27 m/s", beta: 0.08, defaultV: 27 },
    { name: "Kalsit", size: "1.2 mm", density: 2700, bulkDensity: 1250, velocityRange: "20-25 m/s", beta: 0.15, defaultV: 25 },
    { name: "Malt", size: "3.7 mm", density: 1370, bulkDensity: 540, velocityRange: "20-22 m/s", beta: 0.04, defaultV: 22 },
    { name: "Mısır (kuru)", size: "7.7 mm", density: 1300, bulkDensity: 680, velocityRange: "22-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Mısır irmiği", size: "0.75 mm", density: 1440, bulkDensity: 450, velocityRange: "23-25 m/s", beta: 0.06, defaultV: 25 },
    { name: "Mısır unu", size: "0.19 mm", density: 1400, bulkDensity: 460, velocityRange: "23-25 m/s", beta: 0.10, defaultV: 25 },
    { name: "Mika", size: "0.93 mm", density: 2550, bulkDensity: 830, velocityRange: "25-30 m/s", beta: 0.09, defaultV: 30 },
    { name: "Odun selulozu", size: "0.35 mm", density: 1230, bulkDensity: 370, velocityRange: "22-25 m/s", beta: 0.06, defaultV: 25 },
    { name: "Pirinç", size: "2.7 mm", density: 1620, bulkDensity: 800, velocityRange: "20-25 m/s", beta: 0.06, defaultV: 25 },
    { name: "Prinç kabuğu", size: "2.5 mm", density: 1280, bulkDensity: 105, velocityRange: "18-20 m/s", beta: 0.04, defaultV: 20 },
    { name: "P.Propilen granül", size: "3.5 mm", density: 1000, bulkDensity: 500, velocityRange: "20-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "PVC Pulver", size: "0.2 mm", density: 1320, bulkDensity: 570, velocityRange: "20-25 m/s", beta: 0.10, defaultV: 25 },
    { name: "P.Etilen granül", size: "3.5 mm", density: 1070, bulkDensity: 500, velocityRange: "20-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Prina (Kuru)", size: "0.96 mm", density: 680, bulkDensity: 260, velocityRange: "20-22 m/s", beta: 0.04, defaultV: 22 },
    { name: "Sellüloz Pulver", size: "0.04 mm", density: 1380, bulkDensity: 230, velocityRange: "20-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Soya", size: "6.3 mm", density: 1270, bulkDensity: 690, velocityRange: "22-25 m/s", beta: 0.04, defaultV: 25 },
    { name: "Sabun(rende)", size: "20x5 mm", density: 1100, bulkDensity: 600, velocityRange: "23-27 m/s", beta: 0.08, defaultV: 27 },
    { name: "Toz şeker", size: "0.52 mm", density: 1610, bulkDensity: 860, velocityRange: "20-25 m/s", beta: 0.08, defaultV: 25 },
    { name: "Yulaf", size: "3.4 mm", density: 1340, bulkDensity: 510, velocityRange: "22-25 m/s", beta: 0.04, defaultV: 25 }
];

document.addEventListener("DOMContentLoaded", () => {
    initProductSelect();
    setupEventListeners();
    calculate();

    // Register PWA Service Worker for mobile offline installation
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("sw.js")
                .then(reg => console.log("PWA Service Worker registered:", reg.scope))
                .catch(err => console.log("PWA Service Worker failed:", err));
        });
    }
});

function initProductSelect() {
    const select = document.getElementById("productSelect");
    products.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = p.name;
        if (p.name === "P.Propilen granül") {
            opt.selected = true;
        }
        select.appendChild(opt);
    });
    updateProductSpecs();
}

function setupEventListeners() {
    const inputIds = ["capacity", "pipeDiameter", "verticalLength", "totalLength", "elbows", "airDensity", "velocityRatio"];

    inputIds.forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener("input", calculate);
        el.addEventListener("change", calculate);
    });

    document.getElementById("productSelect").addEventListener("change", () => {
        updateProductSpecs();
        calculate();
    });

    document.getElementById("exportBtn").addEventListener("click", exportToPDF);
}

function updateProductSpecs() {
    const pName = document.getElementById("productSelect").value;
    const p = products.find(prod => prod.name === pName);
    if (p) {
        document.getElementById("specSize").textContent = p.size;
        document.getElementById("specDensity").textContent = p.density ? p.density + " kg/m³" : "-";
        document.getElementById("specBulk").textContent = p.bulkDensity ? p.bulkDensity + " kg/m³" : "-";
    }
}

function calculate() {
    // Get values from controls
    const capacity = parseFloat(document.getElementById("capacity").value); // Qs (t/h)
    const pipeDiameter = parseFloat(document.getElementById("pipeDiameter").value); // d (mm)
    const verticalLength = parseFloat(document.getElementById("verticalLength").value); // H (m)
    const totalLength = parseFloat(document.getElementById("totalLength").value); // L (m)
    const elbows = parseInt(document.getElementById("elbows").value); // i (pcs)
    const airDensity = parseFloat(document.getElementById("airDensity").value); // Blower inlet density (kg/m3)
    const velocityRatio = parseFloat(document.getElementById("velocityRatio").value); // phi (c/v)

    const pName = document.getElementById("productSelect").value;
    const p = products.find(prod => prod.name === pName);
    if (!p) return;

    const V = p.defaultV; // Air velocity (m/s)
    const beta = p.beta; // Material friction coefficient

    // 1. Cross-sectional Area
    const radiusCm = pipeDiameter / 2.0;
    const areaCm2 = (Math.pow(radiusCm, 2) * Math.PI) / 100.0; // cm2

    // 2. Blower Flow Rate (Debi)
    const Q_m3min = (areaCm2 / 10000.0) * V * 60.0;
    const Q_m3hour = Q_m3min * 60.0;
    const Q_lmin = Math.round(Q_m3min * 1000.0);

    // Update Flow Rate displays
    document.getElementById("flowRateM3Min").textContent = Q_m3min.toFixed(2);
    document.getElementById("flowRateM3Hour").textContent = Q_m3hour.toFixed(2);
    document.getElementById("flowRateLMin").textContent = Q_lmin.toLocaleString("tr-TR");

    // 3. Solid-to-Gas Ratio (mu / Karışım Oranı)
    const solidGasRatio = (capacity * 1000.0) / (Q_m3min * airDensity * 60.0);

    // 4. Pressure Loss Components
    // Standard air density constant
    const rho_0 = 1.2; 
    const P_dyn = 0.5 * rho_0 * V * V; // Dynamic pressure

    // Clean air loss factor (KH)
    const pipeDiameterM = pipeDiameter / 1000.0;
    const KH = 0.03 * totalLength / pipeDiameterM;

    // Solid friction loss factor (KS)
    const g = 9.81;
    const KS = beta * totalLength + (2.0 * verticalLength * g) / (velocityRatio * V * V) + 2.0 * velocityRatio * (1.0 + (elbows / 2.0));

    // Total pressure loss (delta P in Pascal)
    const deltaP_Pa = P_dyn * (KH + solidGasRatio * KS);

    // Conversion to other units
    const deltaP_mbar = deltaP_Pa / 100.0;
    const deltaP_bar = deltaP_mbar / 1000.0;
    const deltaP_psi = deltaP_mbar * 0.01450377;

    // Update Pressure displays
    document.getElementById("pressureMbar").textContent = deltaP_mbar.toFixed(2);
    document.getElementById("pressurePa").textContent = Math.round(deltaP_Pa).toLocaleString("tr-TR");
    document.getElementById("pressurePsi").textContent = deltaP_psi.toFixed(4);

    // 5. Check warning condition (Velocity drop or pressure threshold)
    const warningBar = document.getElementById("warningBar");
    const warningMsg = document.getElementById("warningMsg");

    if (solidGasRatio > 35) {
        warningBar.classList.add("active");
        warningMsg.innerHTML = `<strong>Kritik Karışım Oranı Uyarısı:</strong> Karışım oranı çok yüksek (${solidGasRatio.toFixed(1)}). Sistemde boru tıkanma riski bulunmaktadır! Boru çapını büyütün veya hava hızını artırın.`;
    } else if (deltaP_mbar > 800) {
        warningBar.classList.add("active");
        warningMsg.innerHTML = `<strong>Yüksek Basınç Uyarısı:</strong> Toplam basınç kaybı (${deltaP_mbar.toFixed(0)} mbar) standart alçak basınç blower limitlerini aşmaktadır! Yüksek basınç blowerı veya kompresör kullanılması önerilir.`;
    } else {
        warningBar.classList.remove("active");
    }

    updateConveyingDiagram(pipeDiameter, totalLength, elbows, pName);
}

function updateConveyingDiagram(diameter, length, elbows, pName) {
    const diameterText = document.getElementById("diagDiameter");
    const lengthText = document.getElementById("diagLength");
    const elbowsText = document.getElementById("diagElbows");
    const materialText = document.getElementById("diagMaterial");

    if (diameterText) diameterText.textContent = diameter + " mm";
    if (lengthText) lengthText.textContent = length + " m";
    if (elbowsText) elbowsText.textContent = elbows + " Adet";
    if (materialText) materialText.textContent = pName;
}

function exportToPDF() {
    window.print();
}
