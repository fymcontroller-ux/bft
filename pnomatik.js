(() => {
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
    // --- 3AC Trifaze Tek Kademe (Single Stage) Modeller (Grafikler.pdf Sayfa 2 & 3 verilerine göre) ---
    { name: "2RB 010 (0.20 kW)", phase: "3AC", power: "0.20", maxFlow: 55, maxVacuum: 80, points: [[0, 55], [50, 32], [80, 5]] },
    { name: "2RB 110 (0.20 kW)", phase: "3AC", power: "0.20", maxFlow: 70, maxVacuum: 100, points: [[0, 70], [60, 42], [100, 10]] },
    { name: "2RB 110 (0.25 kW)", phase: "3AC", power: "0.25", maxFlow: 70, maxVacuum: 110, points: [[0, 70], [70, 45], [110, 5]] },
    { name: "2RB 210 (0.25 kW)", phase: "3AC", power: "0.25", maxFlow: 80, maxVacuum: 100, points: [[0, 80], [60, 50], [100, 20]] },
    { name: "2RB 210 (0.40 kW)", phase: "3AC", power: "0.40", maxFlow: 80, maxVacuum: 120, points: [[0, 80], [70, 52], [120, 10]] },
    { name: "2RB 230 (0.40 kW)", phase: "3AC", power: "0.40", maxFlow: 105, maxVacuum: 120, points: [[0, 105], [70, 68], [120, 25]] },
    { name: "2RB 230 (0.70 kW)", phase: "3AC", power: "0.70", maxFlow: 105, maxVacuum: 120, points: [[0, 105], [80, 72], [120, 30]] },
    { name: "2RB 310 (0.55 kW)", phase: "3AC", power: "0.55", maxFlow: 110, maxVacuum: 110, points: [[0, 110], [70, 72], [110, 30]] },
    { name: "2RB 310 (0.70 kW)", phase: "3AC", power: "0.70", maxFlow: 110, maxVacuum: 150, points: [[0, 110], [90, 74], [150, 10]] },
    { name: "2RB 330 (0.55 kW)", phase: "3AC", power: "0.55", maxFlow: 140, maxVacuum: 60, points: [[0, 140], [35, 90], [60, 60]] },
    { name: "2RB 330 (0.70 kW)", phase: "3AC", power: "0.70", maxFlow: 140, maxVacuum: 100, points: [[0, 140], [60, 95], [100, 30]] },
    { name: "2RB 410 (0.70 kW)", phase: "3AC", power: "0.70", maxFlow: 145, maxVacuum: 120, points: [[0, 145], [70, 98], [120, 40]] },
    { name: "2RB 410 (0.85 kW)", phase: "3AC", power: "0.85", maxFlow: 145, maxVacuum: 160, points: [[0, 145], [90, 98], [160, 20]] },
    { name: "2RB 410 (1.30 kW)", phase: "3AC", power: "1.30", maxFlow: 145, maxVacuum: 170, points: [[0, 145], [100, 102], [170, 25]] },
    { name: "2RB 430 (0.70 kW)", phase: "3AC", power: "0.70", maxFlow: 180, maxVacuum: 70, points: [[0, 180], [40, 120], [70, 80]] },
    { name: "2RB 430 (0.85 kW)", phase: "3AC", power: "0.85", maxFlow: 180, maxVacuum: 110, points: [[0, 180], [65, 125], [110, 55]] },
    { name: "2RB 430 (1.30 kW)", phase: "3AC", power: "1.30", maxFlow: 180, maxVacuum: 170, points: [[0, 180], [100, 135], [170, 50]] },
    { name: "2RB 510 (0.85 kW)", phase: "3AC", power: "0.85", maxFlow: 210, maxVacuum: 110, points: [[0, 210], [65, 145], [110, 110]] },
    { name: "2RB 510 (1.30 kW)", phase: "3AC", power: "1.30", maxFlow: 210, maxVacuum: 170, points: [[0, 210], [100, 145], [170, 80]] },
    { name: "2RB 510 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 210, maxVacuum: 200, points: [[0, 210], [110, 148], [200, 80]] },
    { name: "2RB 510 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 210, maxVacuum: 220, points: [[0, 210], [120, 150], [220, 50]] },
    { name: "2RB 530 (0.85 kW)", phase: "3AC", power: "0.85", maxFlow: 270, maxVacuum: 40, points: [[0, 270], [25, 180], [40, 190]] },
    { name: "2RB 530 (1.30 kW)", phase: "3AC", power: "1.30", maxFlow: 270, maxVacuum: 120, points: [[0, 270], [70, 185], [120, 135]] },
    { name: "2RB 530 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 270, maxVacuum: 160, points: [[0, 270], [90, 190], [160, 110]] },
    { name: "2RB 530 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 270, maxVacuum: 220, points: [[0, 270], [120, 195], [220, 70]] },
    { name: "2RB 610 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 265, maxVacuum: 170, points: [[0, 265], [100, 185], [170, 100]] },
    { name: "2RB 610 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 265, maxVacuum: 235, points: [[0, 265], [130, 190], [235, 60]] },
    { name: "2RB 610 (3.00 kW)", phase: "3AC", power: "3.00", maxFlow: 265, maxVacuum: 280, points: [[0, 265], [150, 195], [280, 20]] },
    { name: "2RB 630 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 345, maxVacuum: 125, points: [[0, 345], [75, 250], [125, 175]] },
    { name: "2RB 630 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 345, maxVacuum: 200, points: [[0, 345], [110, 255], [200, 110]] },
    { name: "2RB 630 (3.00 kW)", phase: "3AC", power: "3.00", maxFlow: 345, maxVacuum: 240, points: [[0, 345], [130, 260], [240, 65]] },
    { name: "2RB 710 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 318, maxVacuum: 160, points: [[0, 318], [95, 235], [160, 150]] },
    { name: "2RB 710 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 318, maxVacuum: 190, points: [[0, 318], [110, 240], [190, 120]] },
    { name: "2RB 710 (3.00 kW)", phase: "3AC", power: "3.00", maxFlow: 318, maxVacuum: 260, points: [[0, 318], [150, 240], [260, 40]] },
    { name: "2RB 710 (4.00 kW)", phase: "3AC", power: "4.00", maxFlow: 318, maxVacuum: 290, points: [[0, 318], [160, 245], [290, 15]] },
    { name: "2RB 730 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 420, maxVacuum: 100, points: [[0, 420], [60, 320], [100, 260]] },
    { name: "2RB 730 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 420, maxVacuum: 180, points: [[0, 420], [100, 325], [180, 170]] },
    { name: "2RB 730 (3.00 kW)", phase: "3AC", power: "3.00", maxFlow: 420, maxVacuum: 220, points: [[0, 420], [120, 330], [220, 220]] },
    { name: "2RB 730 (4.00 kW)", phase: "3AC", power: "4.00", maxFlow: 420, maxVacuum: 260, points: [[0, 420], [140, 335], [260, 150]] },
    { name: "2RB 810 (4.00 kW)", phase: "3AC", power: "4.00", maxFlow: 530, maxVacuum: 200, points: [[0, 530], [110, 410], [200, 320]] },
    { name: "2RB 810 (5.50 kW)", phase: "3AC", power: "5.50", maxFlow: 530, maxVacuum: 300, points: [[0, 530], [160, 415], [300, 150]] },
    { name: "2RB 810 (7.50 kW)", phase: "3AC", power: "7.50", maxFlow: 530, maxVacuum: 320, points: [[0, 530], [170, 420], [320, 280]] },
    { name: "2RB 830 (4.00 kW)", phase: "3AC", power: "4.00", maxFlow: 700, maxVacuum: 150, points: [[0, 700], [90, 540], [150, 420]] },
    { name: "2RB 830 (5.50 kW)", phase: "3AC", power: "5.50", maxFlow: 700, maxVacuum: 200, points: [[0, 700], [110, 550], [200, 350]] },
    { name: "2RB 830 (7.50 kW)", phase: "3AC", power: "7.50", maxFlow: 700, maxVacuum: 270, points: [[0, 700], [150, 555], [270, 230]] },
    { name: "2RB 910 (8.50 kW)", phase: "3AC", power: "8.50", maxFlow: 1050, maxVacuum: 190, points: [[0, 1050], [110, 810], [190, 680]] },
    { name: "2RB 910 (12.50 kW)", phase: "3AC", power: "12.50", maxFlow: 1050, maxVacuum: 290, points: [[0, 1050], [160, 820], [290, 450]] },
    { name: "2RB 910 (18.50 kW)", phase: "3AC", power: "18.50", maxFlow: 1050, maxVacuum: 360, points: [[0, 1050], [190, 830], [360, 350]] },
    { name: "2RB 930 (8.50 kW)", phase: "3AC", power: "8.50", maxFlow: 1370, maxVacuum: 120, points: [[0, 1370], [70, 1050], [120, 950]] },
    { name: "2RB 930 (12.50 kW)", phase: "3AC", power: "12.50", maxFlow: 1370, maxVacuum: 190, points: [[0, 1370], [110, 1060], [190, 780]] },
    { name: "2RB 930 (15.00 kW)", phase: "3AC", power: "15.00", maxFlow: 1370, maxVacuum: 250, points: [[0, 1370], [140, 1070], [250, 600]] },
    { name: "2RB 930 (18.50 kW)", phase: "3AC", power: "18.50", maxFlow: 1370, maxVacuum: 320, points: [[0, 1370], [170, 1080], [320, 400]] },

    // --- 3AC Trifaze Çift Kademe (Double Stage) Modeller (Grafikler.pdf Sayfa 3 & 4 verilerine göre) ---
    { name: "2RB 220 (0.70 kW)", phase: "3AC", power: "0.70", maxFlow: 88, maxVacuum: 210, points: [[0, 88], [110, 68], [210, 30]] },
    { name: "2RB 320 (0.85 kW)", phase: "3AC", power: "0.85", maxFlow: 110, maxVacuum: 200, points: [[0, 110], [100, 82], [200, 40]] },
    { name: "2RB 320 (1.30 kW)", phase: "3AC", power: "1.30", maxFlow: 110, maxVacuum: 280, points: [[0, 110], [140, 85], [280, 25]] },
    { name: "2RB 420 (1.60 kW)", phase: "3AC", power: "1.60", maxFlow: 150, maxVacuum: 280, points: [[0, 150], [140, 115], [280, 50]] },
    { name: "2RB 420 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 150, maxVacuum: 330, points: [[0, 150], [170, 120], [330, 25]] },
    { name: "2RB 520 (3.00 kW)", phase: "3AC", power: "3.00", maxFlow: 230, maxVacuum: 340, points: [[0, 230], [170, 180], [340, 80]] },
    { name: "2RB 520 (4.00 kW)", phase: "3AC", power: "4.00", maxFlow: 230, maxVacuum: 390, points: [[0, 230], [200, 185], [390, 50]] },
    { name: "2RB 720 (2.20 kW)", phase: "3AC", power: "2.20", maxFlow: 320, maxVacuum: 200, points: [[0, 320], [100, 250], [200, 180]] },
    { name: "2RB 720 (3.00 kW)", phase: "3AC", power: "3.00", maxFlow: 320, maxVacuum: 280, points: [[0, 320], [140, 255], [280, 150]] },
    { name: "2RB 720 (4.00 kW)", phase: "3AC", power: "4.00", maxFlow: 320, maxVacuum: 360, points: [[0, 320], [180, 260], [360, 110]] },
    { name: "2RB 720 (5.50 kW)", phase: "3AC", power: "5.50", maxFlow: 320, maxVacuum: 440, points: [[0, 320], [220, 260], [440, 80]] },
    { name: "2RB 720 (7.50 kW)", phase: "3AC", power: "7.50", maxFlow: 320, maxVacuum: 440, points: [[0, 320], [220, 260], [440, 80]] },
    { name: "2RB 740 (4.30 kW)", phase: "3AC", power: "4.30", maxFlow: 500, maxVacuum: 150, points: [[0, 500], [75, 380], [150, 290]] },
    { name: "2RB 740 (5.50 kW)", phase: "3AC", power: "5.50", maxFlow: 500, maxVacuum: 240, points: [[0, 500], [120, 390], [240, 180]] },
    { name: "2RB 740 (7.50 kW)", phase: "3AC", power: "7.50", maxFlow: 500, maxVacuum: 240, points: [[0, 500], [120, 390], [240, 180]] },
    { name: "2RB 820 (5.50 kW)", phase: "3AC", power: "5.50", maxFlow: 520, maxVacuum: 280, points: [[0, 520], [140, 410], [280, 260]] },
    { name: "2RB 820 (7.50 kW)", phase: "3AC", power: "7.50", maxFlow: 520, maxVacuum: 400, points: [[0, 520], [200, 420], [400, 110]] },
    { name: "2RB 820 (11.00 kW)", phase: "3AC", power: "11.00", maxFlow: 520, maxVacuum: 430, points: [[0, 520], [215, 425], [430, 80]] },
    { name: "2RB 820 (15.00 kW)", phase: "3AC", power: "15.00", maxFlow: 520, maxVacuum: 460, points: [[0, 520], [230, 430], [460, 50]] },
    { name: "2RB 840 (7.50 kW)", phase: "3AC", power: "7.50", maxFlow: 900, maxVacuum: 200, points: [[0, 900], [100, 710], [200, 580]] },
    { name: "2RB 840 (11.00 kW)", phase: "3AC", power: "11.00", maxFlow: 900, maxVacuum: 280, points: [[0, 900], [140, 720], [280, 370]] },
    { name: "2RB 920 (12.50 kW)", phase: "3AC", power: "12.50", maxFlow: 1110, maxVacuum: 300, points: [[0, 1110], [150, 890], [300, 680]] },
    { name: "2RB 920 (16.50 kW)", phase: "3AC", power: "16.50", maxFlow: 1110, maxVacuum: 410, points: [[0, 1110], [200, 900], [410, 510]] },
    { name: "2RB 920 (20.00 kW)", phase: "3AC", power: "20.00", maxFlow: 1110, maxVacuum: 440, points: [[0, 1110], [300, 840], [440, 450]] },
    { name: "2RB 920 (25.00 kW)", phase: "3AC", power: "25.00", maxFlow: 1110, maxVacuum: 440, points: [[0, 1110], [300, 840], [440, 450]] },
    { name: "2RB 940 (15.00 kW)", phase: "3AC", power: "15.00", maxFlow: 1940, maxVacuum: 130, points: [[0, 1940], [65, 1550], [130, 1310]] },
    { name: "2RB 940 (20.00 kW)", phase: "3AC", power: "20.00", maxFlow: 1940, maxVacuum: 220, points: [[0, 1940], [110, 1560], [220, 1020]] },
    { name: "2RB 940 (25.00 kW)", phase: "3AC", power: "25.00", maxFlow: 1940, maxVacuum: 310, points: [[0, 1940], [155, 1580], [310, 680]] },
    { name: "2RB 943 (15.00 kW)", phase: "3AC", power: "15.00", maxFlow: 2050, maxVacuum: 160, points: [[0, 2050], [80, 1640], [160, 1420]] },
    { name: "2RB 943 (20.00 kW)", phase: "3AC", power: "20.00", maxFlow: 2050, maxVacuum: 250, points: [[0, 2050], [125, 1650], [250, 1100]] },
    { name: "2RB 943 (25.00 kW)", phase: "3AC", power: "25.00", maxFlow: 2050, maxVacuum: 310, points: [[0, 2050], [155, 1660], [310, 780]] },

    // --- 1AC Monofaze Tek/Çift Kademe Modeller (Grafikler.pdf Sayfa 13 verilerine göre) ---
    { name: "2RB 010 (1AC - 0.12 kW)", phase: "1AC", power: "0.12", maxFlow: 55, maxVacuum: 60, points: [[0, 55], [30, 32], [60, 10]] },
    { name: "2RB 010 (1AC - 0.20 kW)", phase: "1AC", power: "0.20", maxFlow: 55, maxVacuum: 70, points: [[0, 55], [35, 32], [70, 5]] },
    { name: "2RB 110 (1AC - 0.20 kW)", phase: "1AC", power: "0.20", maxFlow: 70, maxVacuum: 100, points: [[0, 70], [50, 42], [100, 10]] },
    { name: "2RB 110 (1AC - 0.25 kW)", phase: "1AC", power: "0.25", maxFlow: 70, maxVacuum: 110, points: [[0, 70], [55, 45], [110, 5]] },
    { name: "2RB 210 (1AC - 0.25 kW)", phase: "1AC", power: "0.25", maxFlow: 80, maxVacuum: 100, points: [[0, 80], [50, 50], [100, 20]] },
    { name: "2RB 210 (1AC - 0.37 kW)", phase: "1AC", power: "0.37", maxFlow: 80, maxVacuum: 120, points: [[0, 80], [60, 52], [120, 10]] },
    { name: "2RB 310 (1AC - 0.55 kW)", phase: "1AC", power: "0.55", maxFlow: 120, maxVacuum: 120, points: [[0, 120], [60, 80], [120, 30]] },
    { name: "2RB 310 (1AC - 0.70 kW)", phase: "1AC", power: "0.70", maxFlow: 120, maxVacuum: 150, points: [[0, 120], [75, 82], [150, 10]] },
    { name: "2RB 330 (1AC - 0.70 kW)", phase: "1AC", power: "0.70", maxFlow: 145, maxVacuum: 100, points: [[0, 145], [50, 95], [100, 30]] },
    { name: "2RB 410 (1AC - 0.80 kW)", phase: "1AC", power: "0.80", maxFlow: 145, maxVacuum: 150, points: [[0, 145], [75, 95], [150, 20]] },
    { name: "2RB 410 (1AC - 1.10 kW)", phase: "1AC", power: "1.10", maxFlow: 145, maxVacuum: 150, points: [[0, 145], [75, 95], [150, 20]] },
    { name: "2RB 430 (1AC - 0.80 kW)", phase: "1AC", power: "0.80", maxFlow: 180, maxVacuum: 100, points: [[0, 180], [50, 120], [100, 60]] },
    { name: "2RB 430 (1AC - 1.10 kW)", phase: "1AC", power: "1.10", maxFlow: 180, maxVacuum: 170, points: [[0, 180], [85, 125], [170, 35]] },
    { name: "2RB 510 (1AC - 1.10 kW)", phase: "1AC", power: "1.10", maxFlow: 210, maxVacuum: 160, points: [[0, 210], [80, 140], [160, 75]] },
    { name: "2RB 510 (1AC - 1.50 kW)", phase: "1AC", power: "1.50", maxFlow: 215, maxVacuum: 190, points: [[0, 215], [95, 145], [190, 50]] },
    { name: "2RB 530 (1AC - 1.50 kW)", phase: "1AC", power: "1.50", maxFlow: 270, maxVacuum: 140, points: [[0, 270], [70, 180], [140, 90]] },
    { name: "2RB 710 (1AC - 2.20 kW)", phase: "1AC", power: "2.20", maxFlow: 318, maxVacuum: 190, points: [[0, 318], [95, 235], [190, 120]] },
    { name: "2RB 220 (1AC - 0.70 kW)", phase: "1AC", power: "0.70", maxFlow: 88, maxVacuum: 210, points: [[0, 88], [110, 68], [210, 30]] },
    { name: "2RB 320 (1AC - 1.10 kW)", phase: "1AC", power: "1.10", maxFlow: 120, maxVacuum: 240, points: [[0, 120], [120, 90], [240, 25]] },
    { name: "2RB 420 (1AC - 1.50 kW)", phase: "1AC", power: "1.50", maxFlow: 150, maxVacuum: 280, points: [[0, 150], [140, 115], [280, 50]] }
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
    const safetyPressure = requiredPressure * 1.25;
    
    blowerModels.forEach(model => {
        if (model.phase !== phase) return;
        
        // Strict safety limit check with 25% safety margin:
        // Disqualify model if safety-adjusted operating vacuum pressure exceeds motor's continuous duty safety limit!
        if (safetyPressure > model.maxVacuum) return;
        
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
        alternatives: candidates.slice(1, 10) // Up to 9 alternatives (total 10 models)
    };
}


document.addEventListener("DOMContentLoaded", () => {
    initProductSelect();
    setupEventListeners();
    loadSavedProjectsListPnomatik();
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
            el.addEventListener("input", () => {
                calculate();
                saveCurrentProjectPnomatikSilent();
            });
            el.addEventListener("change", () => {
                calculate();
                saveCurrentProjectPnomatikSilent();
            });
        }
    });

    document.getElementById("productSelect").addEventListener("change", () => {
        updateProductSpecs();
        calculate();
        saveCurrentProjectPnomatikSilent();
    });

    document.getElementById("exportBtnPnomatik").addEventListener("click", exportToPDF);

    // Phase Selection click handlers
    const btn3AC = document.getElementById("btn3AC");
    const btn1AC = document.getElementById("btn1AC");

    if (btn3AC && btn1AC) {
        btn3AC.addEventListener("click", () => {
            selectedPhase = "3AC";
            btn3AC.classList.add("active");
            btn1AC.classList.remove("active");
            calculate();
            saveCurrentProjectPnomatikSilent();
        });

        btn1AC.addEventListener("click", () => {
            selectedPhase = "1AC";
            btn1AC.classList.add("active");
            btn3AC.classList.remove("active");
            calculate();
            saveCurrentProjectPnomatikSilent();
        });
    }

    // Project management listeners
    const btnSaveProj = document.getElementById("btnSaveProjectPnomatik");
    if (btnSaveProj) btnSaveProj.addEventListener("click", saveCurrentProjectPnomatik);
    const btnDelProj = document.getElementById("btnDeleteProjectPnomatik");
    if (btnDelProj) btnDelProj.addEventListener("click", deleteSelectedProjectPnomatik);
    const selectProj = document.getElementById("savedProjectsSelectPnomatik");
    if (selectProj) selectProj.addEventListener("change", loadSelectedProjectPnomatik);
    
    const projNameInp = document.getElementById("projectNamePnomatik");
    if (projNameInp) {
        projNameInp.addEventListener("input", () => {
            calculate();
            saveCurrentProjectPnomatikSilent();
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
    
    const safetyPressureMbar = deltaP_mbar * 1.25;
    const safetyPressureMbarEl = document.getElementById("pressureSafetyMbar");
    if (safetyPressureMbarEl) {
        safetyPressureMbarEl.textContent = safetyPressureMbar.toFixed(2);
    }
    
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

// Update dynamic engineering safety notes and warnings based on selected blower, usage, and operating pressure
function updateBlowerNotes(model, usagePercent, requiredPressure) {
    const notesList = document.getElementById("recBlowerNotesList");
    if (!notesList) return;
    
    let html = "";
    const safetyPressure = requiredPressure * 1.25;
    
    // 1. Safety Valve
    html += `<li><strong>Vakum Emniyet Ventili:</strong> Sürekli işletimde pompa limit değeri olan <strong>${model.maxVacuum} mbar</strong> basıncının aşılmaması ve motorun aşırı yüklenmemesi için hatta emniyet ventili takılması kritik önemdedir. (Sisteminiz için %25 emniyet toleranslı hedef: <strong>${safetyPressure.toFixed(0)} mbar</strong>).</li>`;
    
    // 2. Filter Koruması
    html += `<li><strong>Vakum Kartuş Filtre:</strong> Taşınan malzemenin toz ve partiküllerinin blower rotorları arasına kaçıp sıkışmaya veya aşınmaya sebep olmaması için hatta mutlaka emiş filtresi eklenmelidir.</li>`;
    
    // 3. Margin note based on usage
    if (usagePercent > 85) {
        html += `<li><strong>Kritik Yüksek Yük Marjı (<span style="color:#ef4444; font-weight:600;">%${usagePercent} Kullanım</span>):</strong> Pompa limitlerine çok yakın çalışmaktadır. Termik röle akım ayarları hassas yapılmalı ve sürekli çalışma süreleri izlenmelidir.</li>`;
    } else if (usagePercent > 70) {
        html += `<li><strong>Orta Yüksek Yük Marjı (<span style="color:#f59e0b; font-weight:600;">%${usagePercent} Kullanım</span>):</strong> Pompa ısınma eğiliminde olabilir. Körük ünitesinin iyi havalandırılan bir ortamda konuşlandırılması ve filtre bakımlarının sıklaştırılması önerilir.</li>`;
    } else {
        html += `<li><strong>Güvenli Bölge (<span style="color:#10b981; font-weight:600;">%${usagePercent} Kullanım</span>):</strong> Pompa en yüksek verim aralığında çalışmakta olup, ısınma ve mekanik aşınma riskleri minimum seviyemedir.</li>`;
    }
    
    // 4. Frequency note
    html += `<li><strong>Çalışma Frekansı (50 Hz):</strong> Seçim katalogdaki <strong>50 Hz</strong> nominal çalışma verilerine göre yapılmıştır. Frekans konvertörü (invertör) ile hız ayarı yapılacaksa izin verilen limit frekanslara dikkat edilmelidir.</li>`;
    
    notesList.innerHTML = html;
}

// Update DOM elements with recommended blower details
function updateBlowerSelection(requiredFlow, requiredPressure) {
    const matchContainer = document.getElementById("blowerMatchContainer");
    const noMatchContainer = document.getElementById("blowerNoMatchContainer");
    const recBlowerModel = document.getElementById("recBlowerModel");
    const recBlowerPower = document.getElementById("recBlowerPower");
    const recBlowerUsage = document.getElementById("recBlowerUsage");
    const recBlowerCapacity = document.getElementById("recBlowerCapacity");
    const recBlowerMaxFlow = document.getElementById("recBlowerMaxFlow");
    const recBlowerMaxVacuum = document.getElementById("recBlowerMaxVacuum");
    const recBlowerProgressBar = document.getElementById("recBlowerProgressBar");
    const recBlowerAlternatives = document.getElementById("recBlowerAlternatives");
    const recBlowerDesc = document.getElementById("recBlowerDesc");

    if (!matchContainer || !noMatchContainer) return;

    // Find recommended blower model (requires 25% safety margin on vacuum limit check)
    const result = findRecommendedBlower(requiredFlow, requiredPressure, selectedPhase);

    if (result) {
        matchContainer.style.display = "block";
        noMatchContainer.style.display = "none";

        const rec = result.recommended;
        
        // Update recommended model display (split name to keep primary title clean, e.g. "2RB 730")
        recBlowerModel.textContent = rec.model.name.split(" (")[0];
        recBlowerPower.textContent = rec.model.power + " kW";
        
        // Capacity utilization %
        const usagePercent = Math.round((requiredFlow / rec.availFlow) * 100.0);
        recBlowerUsage.textContent = usagePercent + "%";
        recBlowerCapacity.textContent = rec.availFlow.toFixed(1) + " m³/sa";
        
        // Technical Limits
        if (recBlowerMaxFlow) recBlowerMaxFlow.textContent = rec.model.maxFlow + " m³/sa";
        if (recBlowerMaxVacuum) recBlowerMaxVacuum.textContent = rec.model.maxVacuum + " mbar";

        // Update progress bar width and color
        recBlowerProgressBar.style.width = Math.min(usagePercent, 100) + "%";
        if (usagePercent > 85) {
            recBlowerProgressBar.style.background = "linear-gradient(90deg, #ef4444, #f87171)"; // red warning
        } else if (usagePercent > 70) {
            recBlowerProgressBar.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)"; // amber
        } else {
            recBlowerProgressBar.style.background = "linear-gradient(90deg, var(--accent-violet), #a78bfa)"; // violet
        }

        // Custom descriptive text showing both actual operating vacuum and safety target
        recBlowerDesc.innerHTML = `Hesaplanan çalışma noktasına (<strong>${requiredFlow.toFixed(1)} m³/sa @ ${requiredPressure.toFixed(0)} mbar</strong>) en uygun Doğuşsan 2RB yan kanal blower modelidir. <em>(%25 emniyet toleransı uygulanmıştır: <strong>${(requiredPressure * 1.25).toFixed(0)} mbar</strong>)</em>`;

        // Update warnings & safety points
        updateBlowerNotes(rec.model, usagePercent, requiredPressure);

        // Load alternative compatible models (including the recommended model so the user can easily toggle back to it)
        const allMatches = [rec, ...result.alternatives];
        recBlowerAlternatives.innerHTML = "";
        
        allMatches.forEach(alt => {
            const tag = document.createElement("span");
            tag.className = "alt-tag";
            const isRec = (alt.model.name === rec.model.name);
            tag.textContent = alt.model.name; // Keep name as is since it already contains kW (e.g. "2RB 730 (4.00 kW)")
            tag.title = `${requiredPressure.toFixed(0)} mbar vakumda maks debisi: ${alt.availFlow.toFixed(1)} m³/sa`;
            
            if (isRec) {
                tag.style.borderColor = "var(--accent-violet)";
                tag.style.background = "rgba(139, 92, 246, 0.12)";
            }
            
            // Allow interactive preview of alternative specs upon clicking tag
            tag.addEventListener("click", () => {
                // Reset styling for all tags
                Array.from(recBlowerAlternatives.children).forEach(child => {
                    child.style.borderColor = "";
                    child.style.background = "";
                });
                // Style the active tag
                tag.style.borderColor = "var(--accent-violet)";
                tag.style.background = "rgba(139, 92, 246, 0.12)";

                recBlowerModel.textContent = alt.model.name.split(" (")[0];
                recBlowerPower.textContent = alt.model.power + " kW";
                const altUsage = Math.round((requiredFlow / alt.availFlow) * 100.0);
                recBlowerUsage.textContent = altUsage + "%";
                recBlowerCapacity.textContent = alt.availFlow.toFixed(1) + " m³/sa";
                
                if (recBlowerMaxFlow) recBlowerMaxFlow.textContent = alt.model.maxFlow + " m³/sa";
                if (recBlowerMaxVacuum) recBlowerMaxVacuum.textContent = alt.model.maxVacuum + " mbar";
                
                recBlowerProgressBar.style.width = Math.min(altUsage, 100) + "%";
                
                // Toggle progress bar colors dynamically for preview
                if (altUsage > 85) {
                    recBlowerProgressBar.style.background = "linear-gradient(90deg, #ef4444, #f87171)";
                } else if (altUsage > 70) {
                    recBlowerProgressBar.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
                } else {
                    recBlowerProgressBar.style.background = "linear-gradient(90deg, var(--accent-violet), #a78bfa)";
                }

                // Update dynamic warnings when this alternative is selected
                updateBlowerNotes(alt.model, altUsage, requiredPressure);
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
    const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
    const projNameInp = document.getElementById("projectNamePnomatik");
    const projName = projNameInp ? projNameInp.value.trim() : "";
    const originalTitle = document.title;
    
    document.title = `${dateStr} - ${projName || "Pnomatik Tasarim Projesi"} - Rapor`;
    window.print();
    
    setTimeout(() => {
        document.title = originalTitle;
    }, 1000);
}

// --- PROJECT MANAGEMENT FUNCTIONS ---
function loadSavedProjectsListPnomatik() {
    const list = JSON.parse(localStorage.getItem("p_projects")) || {};
    const select = document.getElementById("savedProjectsSelectPnomatik");
    if (!select) return;
    
    const currentSelection = select.value;
    select.innerHTML = '<option value="">-- Yeni Proje Başlat --</option>';
    
    Object.keys(list).sort().forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });

    select.value = currentSelection;
    toggleDeleteButtonStatePnomatik();
}

function toggleDeleteButtonStatePnomatik() {
    const select = document.getElementById("savedProjectsSelectPnomatik");
    const deleteBtn = document.getElementById("btnDeleteProjectPnomatik");
    if (!select || !deleteBtn) return;
    deleteBtn.disabled = (select.value === "");
}

function saveCurrentProjectPnomatik() {
    const nameInput = document.getElementById("projectNamePnomatik");
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
        alert("Lütfen kaydetmeden önce bir proje adı girin.");
        return;
    }

    const projects = JSON.parse(localStorage.getItem("p_projects")) || {};
    
    projects[name] = {
        name: name,
        productSelect: document.getElementById("productSelect").value,
        capacity: parseFloat(document.getElementById("capacity").value) || 2,
        pipeDiameter: parseFloat(document.getElementById("pipeDiameter").value) || 56,
        verticalLength: parseFloat(document.getElementById("verticalLength").value) || 4,
        totalLength: parseFloat(document.getElementById("totalLength").value) || 6,
        elbows: parseInt(document.getElementById("elbows").value) || 3,
        airDensity: parseFloat(document.getElementById("airDensity").value) || 0.8,
        velocityRatio: parseFloat(document.getElementById("velocityRatio").value) || 0.7,
        selectedPhase: selectedPhase
    };

    localStorage.setItem("p_projects", JSON.stringify(projects));
    loadSavedProjectsListPnomatik();
    
    document.getElementById("savedProjectsSelectPnomatik").value = name;
    toggleDeleteButtonStatePnomatik();
    
    // Update main dashboard stats if it has a listener or updates
    if (typeof updateDashboardStats === "function") {
        updateDashboardStats();
    }
    
    alert(`"${name}" projesi başarıyla kaydedildi.`);
}

function saveCurrentProjectPnomatikSilent() {
    const nameInput = document.getElementById("projectNamePnomatik");
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) return;

    const projects = JSON.parse(localStorage.getItem("p_projects")) || {};
    
    projects[name] = {
        name: name,
        productSelect: document.getElementById("productSelect").value,
        capacity: parseFloat(document.getElementById("capacity").value) || 2,
        pipeDiameter: parseFloat(document.getElementById("pipeDiameter").value) || 56,
        verticalLength: parseFloat(document.getElementById("verticalLength").value) || 4,
        totalLength: parseFloat(document.getElementById("totalLength").value) || 6,
        elbows: parseInt(document.getElementById("elbows").value) || 3,
        airDensity: parseFloat(document.getElementById("airDensity").value) || 0.8,
        velocityRatio: parseFloat(document.getElementById("velocityRatio").value) || 0.7,
        selectedPhase: selectedPhase
    };

    localStorage.setItem("p_projects", JSON.stringify(projects));
    loadSavedProjectsListPnomatik();
    
    const select = document.getElementById("savedProjectsSelectPnomatik");
    if (select) {
        const prevVal = select.value;
        if (prevVal !== name) {
            select.value = name;
            toggleDeleteButtonStatePnomatik();
        }
    }
    
    if (typeof updateDashboardStats === "function") {
        updateDashboardStats();
    }
}

function deleteSelectedProjectPnomatik() {
    const select = document.getElementById("savedProjectsSelectPnomatik");
    const name = select ? select.value : "";
    if (!name) {
        alert("Lütfen önce silmek istediğiniz projeyi seçin.");
        return;
    }

    if (!confirm(`"${name}" projesini silmek istediğinize emin misiniz?`)) {
        return;
    }

    const projects = JSON.parse(localStorage.getItem("p_projects")) || {};
    delete projects[name];
    localStorage.setItem("p_projects", JSON.stringify(projects));
    
    loadSavedProjectsListPnomatik();
    resetToNewProjectPnomatik();
    
    if (typeof updateDashboardStats === "function") {
        updateDashboardStats();
    }
}

function loadSelectedProjectPnomatik() {
    const select = document.getElementById("savedProjectsSelectPnomatik");
    const name = select ? select.value : "";
    
    if (name === "") {
        resetToNewProjectPnomatik();
        return;
    }

    const projects = JSON.parse(localStorage.getItem("p_projects")) || {};
    const p = projects[name];
    if (!p) return;

    document.getElementById("projectNamePnomatik").value = p.name;
    document.getElementById("productSelect").value = p.productSelect;
    document.getElementById("capacity").value = p.capacity;
    document.getElementById("pipeDiameter").value = p.pipeDiameter;
    document.getElementById("verticalLength").value = p.verticalLength;
    document.getElementById("totalLength").value = p.totalLength;
    document.getElementById("elbows").value = p.elbows;
    document.getElementById("airDensity").value = p.airDensity;
    document.getElementById("velocityRatio").value = p.velocityRatio;
    
    selectedPhase = p.selectedPhase || "3AC";
    const btn3AC = document.getElementById("btn3AC");
    const btn1AC = document.getElementById("btn1AC");
    if (btn3AC && btn1AC) {
        if (selectedPhase === "3AC") {
            btn3AC.classList.add("active");
            btn1AC.classList.remove("active");
        } else {
            btn1AC.classList.add("active");
            btn3AC.classList.remove("active");
        }
    }

    updateProductSpecs();
    toggleDeleteButtonStatePnomatik();
    calculate();
}

function resetToNewProjectPnomatik() {
    document.getElementById("projectNamePnomatik").value = "Yeni Proje";
    document.getElementById("productSelect").value = "P.Propilen granül";
    document.getElementById("capacity").value = 2;
    document.getElementById("pipeDiameter").value = 56;
    document.getElementById("verticalLength").value = 4;
    document.getElementById("totalLength").value = 6;
    document.getElementById("elbows").value = 3;
    document.getElementById("airDensity").value = 0.8;
    document.getElementById("velocityRatio").value = 0.7;
    
    selectedPhase = "3AC";
    const btn3AC = document.getElementById("btn3AC");
    const btn1AC = document.getElementById("btn1AC");
    if (btn3AC && btn1AC) {
        btn3AC.classList.add("active");
        btn1AC.classList.remove("active");
    }

    updateProductSpecs();
    document.getElementById("savedProjectsSelectPnomatik").value = "";
    toggleDeleteButtonStatePnomatik();
    calculate();
}

window.PnomatikData = {
    products: products,
    blowerModels: blowerModels,
    findRecommendedBlower: findRecommendedBlower,
    getFlowAtPressure: getFlowAtPressure
};

})();
