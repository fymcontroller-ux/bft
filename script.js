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
];

// Global state for blower phase selection
let selectedPhase = "3AC";

// Blower models coordinates and specs database (based on Vacuum diagrams in Grafikler(Vakum).pdf)
const blowerModels = [
    // --- 3AC Trifaze Tek Kademe Modeller ---
    { name: "2RB 010", phase: "3AC", power: "0.20", maxFlow: 38, maxVacuum: 60, points: [[0, 38], [30, 32], [50, 20], [60, 0]] },
    { name: "2RB 110", phase: "3AC", power: "0.40", maxFlow: 55, maxVacuum: 80, points: [[0, 55], [40, 42], [60, 28], [80, 0]] },
    { name: "2RB 210", phase: "3AC", power: "0.70", maxFlow: 80, maxVacuum: 110, points: [[0, 80], [50, 65], [80, 45], [110, 0]] },
    { name: "2RB 230", phase: "3AC", power: "0.85", maxFlow: 88, maxVacuum: 120, points: [[0, 88], [60, 70], [90, 55], [120, 0]] },
    { name: "2RB 310", phase: "3AC", power: "0.85", maxFlow: 100, maxVacuum: 120, points: [[0, 100], [60, 82], [90, 64], [120, 0]] },
    { name: "2RB 330", phase: "3AC", power: "1.30", maxFlow: 120, maxVacuum: 140, points: [[0, 120], [70, 98], [110, 70], [140, 0]] },
    { name: "2RB 410", phase: "3AC", power: "0.85", maxFlow: 145, maxVacuum: 120, points: [[0, 145], [60, 115], [90, 85], [120, 0]] },
    { name: "2RB 430", phase: "3AC", power: "1.60", maxFlow: 150, maxVacuum: 170, points: [[0, 150], [80, 125], [130, 90], [170, 0]] },
    { name: "2RB 510", phase: "3AC", power: "2.20", maxFlow: 200, maxVacuum: 190, points: [[0, 200], [90, 160], [140, 120], [190, 0]] },
    { name: "2RB 530", phase: "3AC", power: "3.00", maxFlow: 230, maxVacuum: 260, points: [[0, 230], [120, 185], [190, 130], [260, 0]] },
    { name: "2RB 610", phase: "3AC", power: "2.20", maxFlow: 270, maxVacuum: 250, points: [[0, 270], [100, 220], [180, 150], [250, 0]] },
    { name: "2RB 710", phase: "3AC", power: "3.00", maxFlow: 320, maxVacuum: 270, points: [[0, 320], [120, 260], [200, 180], [270, 0]] },
    { name: "2RB 630", phase: "3AC", power: "4.00", maxFlow: 320, maxVacuum: 280, points: [[0, 320], [130, 265], [210, 195], [280, 0]] },
    { name: "2RB 730", phase: "3AC", power: "5.50", maxFlow: 350, maxVacuum: 310, points: [[0, 350], [150, 290], [230, 210], [310, 0]] },
    { name: "2RB 810", phase: "3AC", power: "8.50", maxFlow: 530, maxVacuum: 320, points: [[0, 530], [150, 450], [250, 350], [320, 0]] },
    { name: "2RB 830", phase: "3AC", power: "12.50", maxFlow: 580, maxVacuum: 340, points: [[0, 580], [160, 500], [260, 380], [340, 0]] },
    { name: "2RB 910", phase: "3AC", power: "15.00", maxFlow: 1050, maxVacuum: 460, points: [[0, 1050], [200, 880], [350, 600], [460, 0]] },
    { name: "2RB 930", phase: "3AC", power: "18.50", maxFlow: 1150, maxVacuum: 460, points: [[0, 1150], [200, 970], [350, 700], [460, 0]] },

    // --- 3AC Trifaze Çift Kademe Modeller ---
    { name: "2RB 220", phase: "3AC", power: "0.85", maxFlow: 80, maxVacuum: 240, points: [[0, 80], [100, 68], [180, 50], [240, 0]] },
    { name: "2RB 320", phase: "3AC", power: "1.60", maxFlow: 110, maxVacuum: 280, points: [[0, 110], [120, 92], [200, 72], [280, 0]] },
    { name: "2RB 420", phase: "3AC", power: "3.00", maxFlow: 150, maxVacuum: 320, points: [[0, 150], [150, 122], [240, 92], [320, 0]] },
    { name: "2RB 520", phase: "3AC", power: "5.50", maxFlow: 230, maxVacuum: 400, points: [[0, 230], [180, 192], [290, 142], [400, 0]] },
    { name: "2RB 720", phase: "3AC", power: "7.50", maxFlow: 320, maxVacuum: 460, points: [[0, 320], [200, 265], [320, 205], [460, 0]] },
    { name: "2RB 740", phase: "3AC", power: "11.00", maxFlow: 420, maxVacuum: 480, points: [[0, 420], [220, 345], [350, 265], [480, 0]] },
    { name: "2RB 820", phase: "3AC", power: "11.00", maxFlow: 530, maxVacuum: 420, points: [[0, 530], [200, 445], [320, 345], [420, 0]] },
    { name: "2RB 840", phase: "3AC", power: "20.00", maxFlow: 700, maxVacuum: 480, points: [[0, 700], [250, 580], [380, 440], [480, 0]] },
    { name: "2RB 920", phase: "3AC", power: "20.00", maxFlow: 1050, maxVacuum: 420, points: [[0, 1050], [200, 920], [320, 760], [420, 0]] },
    { name: "2RB 940", phase: "3AC", power: "20.00", maxFlow: 1900, maxVacuum: 360, points: [[0, 1900], [150, 1680], [270, 1380], [360, 0]] },
    { name: "2RB 943", phase: "3AC", power: "20.00", maxFlow: 2050, maxVacuum: 370, points: [[0, 2050], [160, 1820], [280, 1500], [370, 0]] },

    // --- 1AC Monofaze Modeller ---
    { name: "2RB 010 (1AC)", phase: "1AC", power: "0.20", maxFlow: 38, maxVacuum: 65, points: [[0, 38], [30, 29], [50, 18], [65, 0]] },
    { name: "2RB 110 (1AC)", phase: "1AC", power: "0.37", maxFlow: 55, maxVacuum: 80, points: [[0, 55], [40, 40], [60, 25], [80, 0]] },
    { name: "2RB 210 (1AC)", phase: "1AC", power: "0.55", maxFlow: 80, maxVacuum: 115, points: [[0, 80], [50, 60], [80, 40], [115, 0]] },
    { name: "2RB 220 (1AC)", phase: "1AC", power: "0.70", maxFlow: 80, maxVacuum: 245, points: [[0, 80], [100, 65], [170, 45], [245, 0]] },
    { name: "2RB 310 (1AC)", phase: "1AC", power: "0.55", maxFlow: 100, maxVacuum: 125, points: [[0, 100], [50, 80], [80, 58], [125, 0]] },
    { name: "2RB 320 (1AC)", phase: "1AC", power: "1.10", maxFlow: 110, maxVacuum: 285, points: [[0, 110], [120, 85], [200, 55], [285, 0]] },
    { name: "2RB 330 (1AC)", phase: "1AC", power: "1.10", maxFlow: 120, maxVacuum: 145, points: [[0, 120], [60, 95], [100, 70], [145, 0]] },
    { name: "2RB 410 (1AC)", phase: "1AC", power: "0.80", maxFlow: 145, maxVacuum: 125, points: [[0, 145], [60, 110], [90, 80], [125, 0]] },
    { name: "2RB 420 (1AC)", phase: "1AC", power: "1.50", maxFlow: 150, maxVacuum: 325, points: [[0, 150], [120, 120], [220, 85], [325, 0]] },
    { name: "2RB 430 (1AC)", phase: "1AC", power: "1.50", maxFlow: 150, maxVacuum: 175, points: [[0, 150], [70, 120], [120, 85], [175, 0]] },
    { name: "2RB 510 (1AC)", phase: "1AC", power: "1.50", maxFlow: 200, maxVacuum: 195, points: [[0, 200], [80, 160], [130, 115], [195, 0]] },
    { name: "2RB 530 (1AC)", phase: "1AC", power: "2.20", maxFlow: 230, maxVacuum: 265, points: [[0, 230], [100, 185], [180, 125], [265, 0]] },
    { name: "2RB 710 (1AC)", phase: "1AC", power: "2.20", maxFlow: 320, maxVacuum: 275, points: [[0, 320], [120, 245], [200, 170], [275, 0]] }
];

// Linear interpolation to find flow capacity of a blower at a given vacuum pressure (mbar)
function getFlowAtPressure(model, pressure) {
    const pts = model.points;
    if (pressure <= pts[0][0]) return pts[0][1];
    if (pressure >= pts[pts.length - 1][0]) return 0;
    
    for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i][0];
        const q1 = pts[i][1];
        const p2 = pts[i + 1][0];
        const q2 = pts[i + 1][1];
        
        if (pressure >= p1 && pressure <= p2) {
            // Linear interpolation formula
            return q1 + ((q2 - q1) / (p2 - p1)) * (pressure - p1);
        }
    }
    return 0;
}

// Find matching blowers and select the most optimal one
function findRecommendedBlower(requiredFlow, requiredPressure, phase) {
    const candidates = [];
    
    blowerModels.forEach(model => {
        if (model.phase !== phase) return;
        
        const flowAtP = getFlowAtPressure(model, requiredPressure);
        if (flowAtP >= requiredFlow) {
            candidates.push({
                model: model,
                availFlow: flowAtP,
                margin: flowAtP - requiredFlow
            });
        }
    });
    
    if (candidates.length === 0) return null;
    
    // Sort candidates to find the most compact & energy-optimal blower
    // 1st: Motor Power (kW) ascending
    // 2nd: Max flow capacity (at 0 mbar) ascending
    candidates.sort((a, b) => {
        const pA = parseFloat(a.model.power);
        const pB = parseFloat(b.model.power);
        if (pA !== pB) return pA - pB;
        return a.model.maxFlow - b.model.maxFlow;
    });
    
    return {
        recommended: candidates[0],
        alternatives: candidates.slice(1, 5) // Up to 4 alternatives
    };
}


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
        if (el) {
            el.addEventListener("input", calculate);
            el.addEventListener("change", calculate);
        }
    });

    document.getElementById("productSelect").addEventListener("change", () => {
        updateProductSpecs();
        calculate();
    });

    document.getElementById("exportBtn").addEventListener("click", exportToPDF);

    // Phase Selection click handlers
    const btn3AC = document.getElementById("btn3AC");
    const btn1AC = document.getElementById("btn1AC");

    if (btn3AC && btn1AC) {
        btn3AC.addEventListener("click", () => {
            selectedPhase = "3AC";
            btn3AC.classList.add("active");
            btn1AC.classList.remove("active");
            calculate();
        });

        btn1AC.addEventListener("click", () => {
            selectedPhase = "1AC";
            btn1AC.classList.add("active");
            btn3AC.classList.remove("active");
            calculate();
        });
    }
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

    // Dynamic Blower recommendation matching
    updateBlowerSelection(Q_m3hour, deltaP_mbar);
}

// Update DOM elements with recommended blower details
function updateBlowerSelection(requiredFlow, requiredPressure) {
    const matchContainer = document.getElementById("blowerMatchContainer");
    const noMatchContainer = document.getElementById("blowerNoMatchContainer");
    const recBlowerModel = document.getElementById("recBlowerModel");
    const recBlowerPower = document.getElementById("recBlowerPower");
    const recBlowerUsage = document.getElementById("recBlowerUsage");
    const recBlowerCapacity = document.getElementById("recBlowerCapacity");
    const recBlowerProgressBar = document.getElementById("recBlowerProgressBar");
    const recBlowerAlternatives = document.getElementById("recBlowerAlternatives");
    const recBlowerDesc = document.getElementById("recBlowerDesc");

    if (!matchContainer || !noMatchContainer) return;

    // Find recommended blower model
    const result = findRecommendedBlower(requiredFlow, requiredPressure, selectedPhase);

    if (result) {
        matchContainer.style.display = "block";
        noMatchContainer.style.display = "none";

        const rec = result.recommended;
        
        // Update recommended model display
        recBlowerModel.textContent = rec.model.name;
        recBlowerPower.textContent = rec.model.power + " kW";
        
        // Capacity utilization %
        const usagePercent = Math.round((requiredFlow / rec.availFlow) * 100.0);
        recBlowerUsage.textContent = usagePercent + "%";
        recBlowerCapacity.textContent = rec.availFlow.toFixed(1) + " m³/sa";

        // Update progress bar width and color
        recBlowerProgressBar.style.width = Math.min(usagePercent, 100) + "%";
        if (usagePercent > 85) {
            recBlowerProgressBar.style.background = "linear-gradient(90deg, #ef4444, #f87171)"; // red warning
        } else if (usagePercent > 70) {
            recBlowerProgressBar.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)"; // amber
        } else {
            recBlowerProgressBar.style.background = "linear-gradient(90deg, var(--accent-violet), #a78bfa)"; // violet
        }

        // Custom descriptive text
        recBlowerDesc.innerHTML = `Hesaplanan çalışma noktasına (<strong>${requiredFlow.toFixed(1)} m³/sa @ ${requiredPressure.toFixed(0)} mbar</strong>) en uygun Doğuşsan 2RB yan kanal blower modelidir.`;

        // Load alternative compatible models (including the recommended model so the user can easily toggle back to it)
        const allMatches = [rec, ...result.alternatives];
        recBlowerAlternatives.innerHTML = "";
        
        allMatches.forEach(alt => {
            const tag = document.createElement("span");
            tag.className = "alt-tag";
            const isRec = (alt.model.name === rec.model.name);
            tag.textContent = (isRec ? "⭐ " : "") + `${alt.model.name} (${alt.model.power} kW)`;
            tag.title = `${requiredPressure.toFixed(0)} mbar vakumda maks debisi: ${alt.availFlow.toFixed(1)} m³/sa`;
            
            if (isRec) {
                tag.style.borderColor = "var(--accent-violet)";
                tag.style.background = "rgba(139, 92, 246, 0.12)";
            }
            
            // Allow interactive preview of alternative specs upon clicking tag
            tag.addEventListener("click", () => {
                recBlowerModel.textContent = alt.model.name;
                recBlowerPower.textContent = alt.model.power + " kW";
                const altUsage = Math.round((requiredFlow / alt.availFlow) * 100.0);
                recBlowerUsage.textContent = altUsage + "%";
                recBlowerCapacity.textContent = alt.availFlow.toFixed(1) + " m³/sa";
                recBlowerProgressBar.style.width = Math.min(altUsage, 100) + "%";
                
                // Toggle progress bar colors dynamically for preview
                if (altUsage > 85) {
                    recBlowerProgressBar.style.background = "linear-gradient(90deg, #ef4444, #f87171)";
                } else if (altUsage > 70) {
                    recBlowerProgressBar.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
                } else {
                    recBlowerProgressBar.style.background = "linear-gradient(90deg, var(--accent-violet), #a78bfa)";
                }
            });

            recBlowerAlternatives.appendChild(tag);
        });
    } else {
        // No match found
        matchContainer.style.display = "none";
        noMatchContainer.style.display = "block";
    }
}

function exportToPDF() {
    window.print();
}
