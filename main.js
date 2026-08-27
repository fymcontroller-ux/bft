// Custom Non-Blocking Toast Notification System (Replaces Native Blocking alert())
window.showToast = function(message, type = "info") {
    let container = document.getElementById("bftToastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "bftToastContainer";
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
            max-width: 380px;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const isError = type === 'error';
    
    toast.style.cssText = `
        background: rgba(18, 20, 29, 0.95);
        border: 1px solid ${isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(99, 102, 241, 0.4)'};
        border-left: 4px solid ${isError ? '#ef4444' : '#10b981'};
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(12px);
        color: #f8fafc;
        padding: 12px 18px;
        border-radius: 10px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 0.88rem;
        display: flex;
        align-items: center;
        gap: 12px;
        pointer-events: auto;
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    const icon = isError 
        ? '<i class="fa-solid fa-circle-exclamation" style="color: #ef4444; font-size: 1.1rem;"></i>' 
        : '<i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.1rem;"></i>';

    toast.innerHTML = `${icon} <span style="flex:1; line-height: 1.4; font-weight: 500;">${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(0)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(30px)";
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 350);
    }, 2500);
};

// Override window.alert completely so it NEVER opens native blocking dialogs or loses focus!
window.alert = function(msg) {
    if (!msg) return;
    const isError = /hata|boş|geçersiz|mevcut|kullanımda|silindi/i.test(msg);
    window.showToast(msg, isError ? 'error' : 'success');
};

// Custom Sleek Non-Blocking Confirm Modal (Replaces Native Blocking confirm())
window.showCustomConfirm = function(message, title = "Silme Onayı", customConfirmText = null, customConfirmBg = null, customIconClass = null) {
    return new Promise((resolve) => {
        let overlay = document.getElementById("bftConfirmOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "bftConfirmOverlay";
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(10, 11, 16, 0.85);
                backdrop-filter: blur(8px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s ease;
                font-family: system-ui, -apple-system, sans-serif;
            `;
            document.body.appendChild(overlay);
        }

        const isReset = /fabrika|orijinal|sıfırla/i.test(message);
        const isUpdate = /güncelle/i.test(title) || /güncelle/i.test(message);

        let iconClass = customIconClass || (isUpdate ? 'fa-cloud-arrow-down' : (isReset ? 'fa-triangle-exclamation' : 'fa-trash-can'));
        let accentColor = customConfirmBg || (isUpdate ? '#10b981' : (isReset ? '#f59e0b' : '#ef4444'));
        let confirmLabel = customConfirmText || (isUpdate ? 'Evet, Güncelle' : (isReset ? 'Evet, Sıfırla' : 'Evet, Sil'));
        let btnGradient = isUpdate ? 'linear-gradient(135deg, #10b981, #059669)' : (isReset ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #ef4444, #b91c1c)');

        overlay.innerHTML = `
            <div style="background: #12141d; border: 1px solid ${accentColor}55; border-radius: 20px; padding: 2rem 2.2rem; width: 90%; max-width: 440px; text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.6); transform: scale(0.92); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; align-items: center; gap: 1.2rem;">
                <div style="font-size: 2.8rem; color: ${accentColor}; background: ${accentColor}18; width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid ${accentColor}33;">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <h3 style="margin: 0; color: #f8fafc; font-size: 1.2rem; font-weight: 700;">${title}</h3>
                    <p style="margin: 0; color: #94a3b8; font-size: 0.9rem; line-height: 1.5;">${message}</p>
                </div>
                <div style="display: flex; gap: 0.8rem; width: 100%; margin-top: 0.5rem;">
                    <button id="btnConfirmCancel" style="flex: 1; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); color: #cbd5e1; font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;">
                        İptal
                    </button>
                    <button id="btnConfirmOk" style="flex: 1; padding: 0.75rem 1rem; border-radius: 10px; border: none; background: ${btnGradient}; color: #ffffff; font-weight: 600; font-size: 0.88rem; cursor: pointer; box-shadow: 0 4px 14px ${accentColor}55; transition: all 0.2s;">
                        ${confirmLabel}
                    </button>
                </div>
            </div>
        `;

        overlay.style.display = "flex";
        requestAnimationFrame(() => {
            overlay.style.opacity = "1";
            const box = overlay.firstElementChild;
            if (box) box.style.transform = "scale(1)";
        });

        const closeConfirm = (result) => {
            overlay.style.opacity = "0";
            const box = overlay.firstElementChild;
            if (box) box.style.transform = "scale(0.92)";
            setTimeout(() => {
                overlay.style.display = "none";
                window.focus();
                resolve(result);
            }, 200);
        };

        const btnCancel = overlay.querySelector("#btnConfirmCancel");
        const btnOk = overlay.querySelector("#btnConfirmOk");

        if (btnCancel) btnCancel.onclick = () => closeConfirm(false);
        if (btnOk) btnOk.onclick = () => closeConfirm(true);
    });
};



// --- MODULE-SPECIFIC PRINT SCALE CONTROLLER ---
// Defaults: Merkezi = %80 (0.8), Pnömatik = %100 (1.0), Teklif = %100 (1.0)
const MODULE_PRINT_DEFAULTS = {
    merkezi: "0.8",
    pnomatik: "1",
    teklif: "1"
};

window.getModulePrintScale = function(moduleKey) {
    const fallback = MODULE_PRINT_DEFAULTS[moduleKey] || "1";
    try {
        const stored = localStorage.getItem(`app_print_scale_${moduleKey}`);
        return stored !== null ? stored : fallback;
    } catch(e) {
        return fallback;
    }
};

window.setModulePrintScale = function(moduleKey, scaleVal) {
    if (!moduleKey) return;
    const factor = parseFloat(scaleVal) || 1.0;
    try {
        localStorage.setItem(`app_print_scale_${moduleKey}`, factor.toString());
    } catch(e) {}

    // Apply specific CSS variables for browser print
    if (moduleKey === 'merkezi') {
        document.documentElement.style.setProperty('--print-scale-factor', factor);
        document.documentElement.style.setProperty('--print-zoom-merkezi', (90 * factor) + '%');
    } else if (moduleKey === 'pnomatik') {
        document.documentElement.style.setProperty('--print-zoom-pnomatik', (70 * factor) + '%');
    } else if (moduleKey === 'teklif') {
        document.documentElement.style.setProperty('--print-zoom-teklif', (90 * factor) + '%');
        document.documentElement.style.setProperty('--print-zoom-teklif-specs', (75 * factor) + '%');
    }
};

function initPrintScaleController() {
    // Initialize CSS variables for all modules with their saved/default scales
    window.setModulePrintScale('merkezi', window.getModulePrintScale('merkezi'));
    window.setModulePrintScale('pnomatik', window.getModulePrintScale('pnomatik'));
    window.setModulePrintScale('teklif', window.getModulePrintScale('teklif'));
}

// --- GLOBAL PDF GENERATOR & WHATSAPP SHARER & PREVIEW MODAL ---
let isPdfProcessing = false;
let currentPreviewElement = null;
let currentPreviewFilename = '';
let currentPreviewTitle = '';
let currentPreviewZoom = 1.0;
let currentPreviewOnPrint = null;
let currentPreviewSource = null; // 'merkezi', 'pnomatik', 'teklif'

window.openDocumentPreviewModal = function(element, filename, titleText, onPrint, sourceModule = null) {
    const modal = document.getElementById("pdfPreviewModal");
    const sheetPaper = document.getElementById("previewSheetPaper");
    const docNameSpan = document.getElementById("previewDocName");
    const scaleSelectModal = document.getElementById("printScaleSelectModal");
    
    if (!modal || !sheetPaper) return;

    currentPreviewElement = element;
    currentPreviewFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    currentPreviewTitle = titleText || "BFT Belge Raporu";
    currentPreviewOnPrint = typeof onPrint === "function" ? onPrint : null;
    currentPreviewSource = sourceModule;
    
    if (docNameSpan) {
        docNameSpan.textContent = currentPreviewFilename;
    }

    if (scaleSelectModal && sourceModule) {
        const savedScale = window.getModulePrintScale(sourceModule);
        scaleSelectModal.value = savedScale.toString();
    }

    // Clear previous preview content and inject a fresh clone
    sheetPaper.innerHTML = "";
    const cloned = element.cloneNode(true);
    cloned.style.margin = "0 auto";
    sheetPaper.appendChild(cloned);

    // Responsive default zoom: Auto-fit on mobile screens, 100% on desktop
    if (window.innerWidth <= 768) {
        const availW = Math.max(300, (window.innerWidth || 360) - 24);
        currentPreviewZoom = Math.min(1.0, Math.max(0.35, +(availW / 720).toFixed(2)));
    } else {
        currentPreviewZoom = 1.0;
    }
    updatePreviewZoom();

    modal.classList.add("open");
};

window.closeDocumentPreviewModal = function() {
    const modal = document.getElementById("pdfPreviewModal");
    if (modal) {
        modal.classList.remove("open");
    }
};

function updatePreviewZoom() {
    const sheetPaper = document.getElementById("previewSheetPaper");
    const zoomLevel = document.getElementById("previewZoomLevel");
    if (sheetPaper) {
        sheetPaper.style.transform = `scale(${currentPreviewZoom})`;
    }
    if (zoomLevel) {
        zoomLevel.textContent = `${Math.round(currentPreviewZoom * 100)}%`;
    }
}

function initDocumentPreviewModal() {
    const modal = document.getElementById("pdfPreviewModal");
    const btnClose = document.getElementById("btnClosePdfPreviewModal");
    const btnCancel = document.getElementById("btnPreviewCancel");
    const btnZoomIn = document.getElementById("btnPreviewZoomIn");
    const btnZoomOut = document.getElementById("btnPreviewZoomOut");
    const btnZoomFit = document.getElementById("btnPreviewZoomFit");
    const btnPrint = document.getElementById("btnPreviewPrint");
    const btnDownload = document.getElementById("btnPreviewDownload");
    const btnWhatsApp = document.getElementById("btnPreviewWhatsApp");

    if (btnClose) btnClose.addEventListener("click", window.closeDocumentPreviewModal);
    if (btnCancel) btnCancel.addEventListener("click", window.closeDocumentPreviewModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                window.closeDocumentPreviewModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("open")) {
            window.closeDocumentPreviewModal();
        }
    });

    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
            currentPreviewZoom = Math.min(+(currentPreviewZoom + 0.1).toFixed(2), 2.0);
            updatePreviewZoom();
        });
    }

    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
            currentPreviewZoom = Math.max(+(currentPreviewZoom - 0.1).toFixed(2), 0.35);
            updatePreviewZoom();
        });
    }

    if (btnZoomFit) {
        btnZoomFit.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                const availW = Math.max(300, (window.innerWidth || 360) - 24);
                const fitZoom = Math.min(1.0, Math.max(0.35, +(availW / 720).toFixed(2)));
                // Toggle between Fit to Screen and 100%
                currentPreviewZoom = (currentPreviewZoom === 1.0) ? fitZoom : 1.0;
            } else {
                currentPreviewZoom = 1.0;
            }
            updatePreviewZoom();
        });
    }

    if (btnPrint) {
        btnPrint.addEventListener("click", () => {
            window.closeDocumentPreviewModal();
            if (typeof currentPreviewOnPrint === "function") {
                // Execute exact page print routine (same title, exact css, clean layout)
                setTimeout(() => {
                    currentPreviewOnPrint();
                }, 100);
            } else {
                window.print();
            }
        });
    }

window.generateCleanTeklifPrintElement = function() {
    if (typeof buildProposalPrintElement !== "function") return null;
    const currentScale = parseFloat(window.getModulePrintScale("teklif")) || 1.0;
    const rawProposal = buildProposalPrintElement();
    
    // Master container for all proposal pages
    const rootContainer = document.createElement("div");
    rootContainer.style.cssText = "width: 710px; margin: 0 auto; background: #ffffff; box-sizing: border-box;";

    const pages = rawProposal.querySelectorAll(".print-page");
    const pageList = pages.length > 0 ? Array.from(pages) : [rawProposal];
    const scaledWidth = Math.round(710 / currentScale);

    pageList.forEach((pageEl, idx) => {
        const outerWrapper = document.createElement("div");
        outerWrapper.className = "print-page" + (idx > 0 ? " print-page-break" : "");
        outerWrapper.style.cssText = "width: 710px; overflow: hidden; background: #ffffff; margin: 0 auto 20px auto; box-sizing: border-box; position: relative;";

        const innerScaled = document.createElement("div");
        innerScaled.style.cssText = `width: ${scaledWidth}px; transform: scale(${currentScale}); transform-origin: top left; background: #ffffff; color: #000000; font-family: 'Segoe UI', Arial, sans-serif; box-sizing: border-box; padding: 12px;`;

        // Move all children of pageEl into innerScaled
        while (pageEl.firstChild) {
            innerScaled.appendChild(pageEl.firstChild);
        }

        outerWrapper.appendChild(innerScaled);

        // Measure exact scaled height dynamically
        document.body.appendChild(outerWrapper);
        const exactHeight = Math.ceil(innerScaled.getBoundingClientRect().height);
        outerWrapper.style.height = (exactHeight + 2) + "px";
        outerWrapper.remove();

        rootContainer.appendChild(outerWrapper);
    });

    return rootContainer;
};

    const scaleSelectModal = document.getElementById("printScaleSelectModal");
    if (scaleSelectModal) {
        scaleSelectModal.addEventListener("change", (e) => {
            const newScale = e.target.value;
            if (currentPreviewSource) {
                window.setModulePrintScale(currentPreviewSource, newScale);
            }

            // Re-render preview content based on active source module
            let freshElement = null;
            if (currentPreviewSource === 'merkezi' && typeof generateCleanMerkeziPrintElement === "function") {
                freshElement = generateCleanMerkeziPrintElement();
            } else if (currentPreviewSource === 'pnomatik' && typeof generateCleanPnomatikPrintElement === "function") {
                freshElement = generateCleanPnomatikPrintElement();
            } else if (currentPreviewSource === 'teklif' && typeof window.generateCleanTeklifPrintElement === "function") {
                freshElement = window.generateCleanTeklifPrintElement();
            }

            if (freshElement) {
                currentPreviewElement = freshElement;
                const sheetPaper = document.getElementById("previewSheetPaper");
                if (sheetPaper) {
                    sheetPaper.innerHTML = "";
                    const cloned = freshElement.cloneNode(true);
                    cloned.style.margin = "0 auto";
                    sheetPaper.appendChild(cloned);
                }
            }
            window.showToast(`Baskı Ölçeği %${Math.round(parseFloat(newScale) * 100)} olarak güncellendi.`);
        });
    }

    if (btnDownload) {
        btnDownload.addEventListener("click", async () => {
            if (!currentPreviewElement) return;
            await window.generateAndSharePDFFromElement(currentPreviewElement, currentPreviewFilename, currentPreviewTitle, 'download');
        });
    }

    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", async () => {
            if (!currentPreviewElement) return;
            await window.generateAndSharePDFFromElement(currentPreviewElement, currentPreviewFilename, currentPreviewTitle, 'share');
        });
    }
}

window.generateAndSharePDFFromElement = async function(element, filename, titleText, actionType = 'share') {
    if (isPdfProcessing) {
        window.showToast("İşlem devam ediyor, lütfen bekleyin...", "info");
        return;
    }
    isPdfProcessing = true;

    if (!window.html2pdf) {
        isPdfProcessing = false;
        window.showToast("PDF kütüphanesi yüklenemedi. Lütfen internet bağlantınızı kontrol edin.", "error");
        return;
    }

    const loader = document.createElement("div");
    loader.id = "bftPdfLoader";
    loader.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(10, 11, 16, 0.90);
        backdrop-filter: blur(6px);
        z-index: 99999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
        color: #ffffff;
        font-family: 'Outfit', sans-serif;
    `;
    loader.innerHTML = `
        <div style="width: 48px; height: 48px; border: 4px solid rgba(37, 211, 102, 0.2); border-top-color: #25D366; border-radius: 50%; animation: bftSpin 0.9s linear infinite;"></div>
        <div style="font-size: 1.1rem; font-weight: 600; color: #f8fafc;">PDF Hazırlanıyor...</div>
        <div style="font-size: 0.82rem; color: #94a3b8;">Lütfen bekleyin</div>
        <style>@keyframes bftSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(loader);

    const cleanFileName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

    // ── Off-screen container: fixed width to match preview (710px) ──────────────
    const PDF_CONTAINER_W = 710;
    const PDF_MARGIN_MM   = 6;   // mm margin on all sides
    const A4_W_MM         = 210;
    const A4_H_MM         = 297;
    const USABLE_W_MM     = A4_W_MM - (2 * PDF_MARGIN_MM); // 198mm
    const USABLE_H_MM     = A4_H_MM - (2 * PDF_MARGIN_MM); // 285mm

    const tempContainer = document.createElement("div");
    tempContainer.style.cssText = `position: fixed; left: -9999px; top: 0; width: ${PDF_CONTAINER_W}px; background: #ffffff; color: #000000; z-index: -99999; pointer-events: none; overflow: visible;`;
    const clonedElement = element.cloneNode(true);
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Wait for fonts & images (like BFT base64 logo) to settle
    await new Promise(r => setTimeout(r, 120));

    try {
        const renderTask = async () => {
            // 1. Identify distinct pages (e.g. Teklif has .print-page for main offer and annexes)
            const printPages = tempContainer.querySelectorAll(".print-page");
            const pagesToRender = printPages.length > 0 ? Array.from(printPages) : [clonedElement];

            // 2. Initialize jsPDF
            let pdf = null;
            if (window.jspdf && window.jspdf.jsPDF) {
                pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
            } else if (typeof window.jsPDF === 'function') {
                pdf = new window.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
            } else if (window.html2pdf) {
                const worker = window.html2pdf().set({
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
                });
                await worker.from(document.createElement('div')).toPdf();
                pdf = await worker.get('pdf');
            }

            if (!pdf) throw new Error("PDF oluşturucu başlatılamadı.");

            async function getCanvasForPage(targetEl) {
                if (typeof window.html2canvas === 'function') {
                    return await window.html2canvas(targetEl, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff',
                        letterRendering: true,
                        scrollX: 0,
                        scrollY: 0
                    });
                }
                if (window.html2pdf) {
                    const worker = window.html2pdf().set({
                        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff', letterRendering: true, scrollX: 0, scrollY: 0 }
                    });
                    return await worker.from(targetEl).toCanvas().get('canvas');
                }
                throw new Error("Canvas motoru yüklenemedi.");
            }

            // 3. Render each page accurately to its own A4 PDF sheet
            for (let i = 0; i < pagesToRender.length; i++) {
                const pageEl = pagesToRender[i];
                if (pageEl.style.display === "none") continue;

                const canvas = await getCanvasForPage(pageEl);
                const imgData = canvas.toDataURL('image/jpeg', 0.98);
                const rawHeightMm = (canvas.height * USABLE_W_MM) / canvas.width;

                // Scale down proportionally if content slightly exceeds single A4 printable height
                let finalW = USABLE_W_MM;
                let finalH = rawHeightMm;
                if (rawHeightMm > USABLE_H_MM) {
                    const scaleFactor = USABLE_H_MM / rawHeightMm;
                    finalW = USABLE_W_MM * scaleFactor;
                    finalH = USABLE_H_MM;
                }

                const posX = PDF_MARGIN_MM + ((USABLE_W_MM - finalW) / 2);
                const posY = PDF_MARGIN_MM;

                if (i > 0) {
                    pdf.addPage('a4', 'portrait');
                }

                pdf.addImage(imgData, 'JPEG', posX, posY, finalW, finalH, undefined, 'FAST');
            }

            return pdf.output('blob');
        };

        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Zaman aşımı oluştu.")), 25000));
        const pdfBlob = await Promise.race([renderTask(), timeoutPromise]);

        const pdfFile = new File([pdfBlob], cleanFileName, { type: 'application/pdf' });

        if (loader.parentNode) loader.remove();
        if (tempContainer.parentNode) tempContainer.remove();

        let shareHandled = false;

        if (actionType === 'share') {
            // Try Mobile Web Share API
            if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
                try {
                    await navigator.share({
                        files: [pdfFile],
                        title: titleText || "BFT Proje Raporu",
                        text: `${titleText || "BFT Proje Raporu"} ekte yer almaktadır.`
                    });
                    shareHandled = true;
                    window.showToast("PDF başarıyla paylaşıldı.", "success");
                } catch (shareErr) {
                    if (shareErr && shareErr.name === 'AbortError') {
                        shareHandled = true;
                    } else {
                        console.warn("Mobil paylaşım hatası:", shareErr);
                    }
                }
            }
        }

        if (!shareHandled) {
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = cleanFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 2000);
            if (actionType === 'download') {
                window.showToast("PDF başarıyla indirildi.", "success");
            } else {
                window.showToast("PDF hazırlandı ve indirildi. WhatsApp'tan gönderebilirsiniz.", "success");
            }
        }
    } catch (err) {
        if (loader.parentNode) loader.remove();
        if (tempContainer.parentNode) tempContainer.remove();
        if (err && err.name !== 'AbortError') {
            console.error("PDF oluşturma hatası:", err);
            window.showToast("PDF oluşturulurken hata: " + (err.message || err), "error");
        }
    } finally {
        if (loader.parentNode) loader.remove();
        if (tempContainer.parentNode) tempContainer.remove();
        isPdfProcessing = false;
    }
};

function generateCleanMerkeziPrintElement() {
    const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
    const projName = document.getElementById("projectName")?.value.trim() || "Yeni Proje";
    const showPrices = document.getElementById("printShowPricesCheck")?.checked !== false;
    const currentScale = parseFloat(window.getModulePrintScale("merkezi")) || 0.8;

    // Form values
    const stationCount = document.getElementById("stationCount")?.value || "8";
    const materialCount = document.getElementById("materialCount")?.value || "1";
    const pumpCount = document.getElementById("pumpCount")?.value || "1";
    const machineDistance = document.getElementById("machineDistance")?.value || "1.0";
    const longestDistance = document.getElementById("longestDistance")?.value || "25.0";
    
    const wallToMachineCable = document.getElementById("wallToMachineCable")?.value || "7.0";
    const controlCableLength = document.getElementById("controlCableLength")?.value || "4.0";
    const wallToMachineHose = document.getElementById("wallToMachineHose")?.value || "7.0";

    const screenSelect = document.getElementById("screenSelect")?.value || "-";
    const driverSelect = document.getElementById("driverSelect")?.value || "-";
    const pumpSelect = document.getElementById("pumpSelect")?.value || "-";
    const pipeSelect = document.getElementById("pipeSelect")?.value || "-";

    const subtotal = document.getElementById("summarySubtotal")?.textContent || "$0.00";
    const labor = document.getElementById("summaryLabor")?.textContent || "$0.00";
    const grandTotal = document.getElementById("summaryGrandTotal")?.textContent || "$0.00";

    // Clone live tables
    const tablesGrid = document.querySelector("#merkezi-sec .tables-grid");
    let tablesHTML = "";
    if (tablesGrid) {
        const clonedGrid = tablesGrid.cloneNode(true);
        if (!showPrices) {
            clonedGrid.querySelectorAll(".cost-table th:nth-child(3), .cost-table td:nth-child(3), .cost-table th:nth-child(4), .cost-table td:nth-child(4), .cost-table tr.subtotal-row").forEach(el => el.remove());
        }
        tablesHTML = clonedGrid.innerHTML;
    }

    const outerWrapper = document.createElement("div");
    outerWrapper.style.cssText = "width: 710px; overflow: hidden; background: #ffffff; margin: 0 auto; box-sizing: border-box;";

    const container = document.createElement("div");
    const scaledWidth = Math.round(710 / currentScale);
    container.style.cssText = `width: ${scaledWidth}px; transform: scale(${currentScale}); transform-origin: top left; padding: 4px 6px; background: #ffffff; color: #000000; font-family: 'Segoe UI', Arial, sans-serif; box-sizing: border-box;`;

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #000000; padding-bottom: 6px; margin-bottom: 14px;">
            <h1 style="margin: 0; font-size: 1.45rem; font-weight: 700; color: #000000;">${projName}</h1>
            <span style="font-size: 0.9rem; color: #111111; font-weight: 600;">${dateStr}</span>
        </div>

        <!-- 3 Columns Parameters Card -->
        <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; display: grid; grid-template-columns: 1.1fr 1.1fr 1fr; gap: 14px; font-size: 0.72rem; line-height: 1.45; background: #ffffff;">
            <!-- Col 1 -->
            <div style="border-right: 1px solid #e2e8f0; padding-right: 10px;">
                <h4 style="margin: 0 0 6px 0; font-size: 0.74rem; color: #4338ca; text-transform: uppercase; font-weight: 700;">1. KAPASİTE VE YERLEŞİM</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">İstasyon Sayısı</span><strong style="color: #000;">${stationCount} Adet</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">Hammadde Sayısı</span><strong style="color: #000;">${materialCount} Adet</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">Pompa Sayısı</span><strong style="color: #000;">${pumpCount} Adet</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">Makineler Arası Mesafe</span><strong style="color: #000;">${machineDistance} m</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">En Uzun Hat Mesafesi</span><strong style="color: #000;">${longestDistance} m</strong></div>
            </div>
            <!-- Col 2 -->
            <div style="border-right: 1px solid #e2e8f0; padding-right: 10px;">
                <h4 style="margin: 0 0 6px 0; font-size: 0.74rem; color: #4338ca; text-transform: uppercase; font-weight: 700;">2. KABLO VE SPİRAL HORTUM</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">Duvardan Makine Kablo</span><strong style="color: #000;">${wallToMachineCable} m</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">Kumanda Kablosu Boyu</span><strong style="color: #000;">${controlCableLength} m</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;"><span style="color: #475569;">Duvardan Makine Hortum</span><strong style="color: #000;">${wallToMachineHose} m</strong></div>
            </div>
            <!-- Col 3 -->
            <div>
                <h4 style="margin: 0 0 6px 0; font-size: 0.74rem; color: #4338ca; text-transform: uppercase; font-weight: 700;">3. MODEL SEÇİMLERİ</h4>
                <div style="margin-bottom: 3px;"><span style="color: #64748b; font-size: 0.68rem; display: block;">Ekran Modeli</span><strong style="color: #000;">${screenSelect}</strong></div>
                <div style="margin-bottom: 3px;"><span style="color: #64748b; font-size: 0.68rem; display: block;">Sürücü Modeli</span><strong style="color: #000;">${driverSelect}</strong></div>
                <div style="margin-bottom: 3px;"><span style="color: #64748b; font-size: 0.68rem; display: block;">Pompa (Blower) Modeli</span><strong style="color: #000;">${pumpSelect}</strong></div>
                <div style="margin-bottom: 3px;"><span style="color: #64748b; font-size: 0.68rem; display: block;">Tesisat Boru Modeli</span><strong style="color: #000;">${pipeSelect}</strong></div>
            </div>
        </div>

        ${showPrices ? `
        <!-- Metrics Card -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 7px 12px; background: #ffffff;">
                <span style="font-size: 0.70rem; color: #64748b; display: block; font-weight: 600;">Malzeme Toplamı ($)</span>
                <span style="font-size: 1.1rem; font-weight: 700; color: #000000;">${subtotal}</span>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 7px 12px; background: #ffffff;">
                <span style="font-size: 0.70rem; color: #64748b; display: block; font-weight: 600;">İşçilik Maliyeti ($)</span>
                <span style="font-size: 1.1rem; font-weight: 700; color: #000000;">${labor}</span>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 7px 12px; background: #ffffff;">
                <span style="font-size: 0.70rem; color: #64748b; display: block; font-weight: 600;">Genel Toplam ($)</span>
                <span style="font-size: 1.1rem; font-weight: 700; color: #000000;">${grandTotal}</span>
            </div>
        </div>
        ` : ''}

        <!-- Masonry Tables Grid -->
        <div class="clean-tables-wrapper" style="column-count: 2; column-gap: 12px; font-size: 0.70rem; width: 100%;">
            ${tablesHTML}
        </div>
    `;

    // Apply exact typography & borders to tables inside container
    container.querySelectorAll(".table-container").forEach(tc => {
        tc.style.cssText = "display: inline-block; width: 100%; margin-bottom: 10px; break-inside: avoid; page-break-inside: avoid;";
    });
    container.querySelectorAll(".table-title, h4").forEach(tt => {
        tt.style.cssText = "font-size: 0.75rem; font-weight: 700; color: #000000; border-left: 3px solid #4338ca; padding-left: 5px; margin: 0 0 3px 0;";
    });
    container.querySelectorAll(".cost-table").forEach(tbl => {
        tbl.style.cssText = "width: 100%; border-collapse: collapse; font-size: 0.69rem; margin-bottom: 3px;";
    });
    container.querySelectorAll(".cost-table th").forEach(th => {
        th.style.cssText = "border-bottom: 2px solid #000000; padding: 2px 4px; font-weight: 700; color: #000000; text-align: left; background: #ffffff;";
    });
    container.querySelectorAll(".cost-table td").forEach(td => {
        td.style.cssText = "border-bottom: 1px solid #e2e8f0; padding: 2px 4px; color: #000000;";
    });
    container.querySelectorAll(".cost-table tr.subtotal-row td").forEach(td => {
        td.style.cssText = "border-top: 1px solid #000000; font-weight: 700; padding: 3px 4px; color: #000000;";
    });

    outerWrapper.appendChild(container);
    document.body.appendChild(outerWrapper);
    const exactHeight = Math.ceil(container.getBoundingClientRect().height);
    outerWrapper.style.height = (exactHeight + 2) + "px";
    outerWrapper.remove();

    return outerWrapper;
}

function generateCleanPnomatikPrintElement() {
    const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
    const projNameInp = document.getElementById("projectNamePnomatik");
    const projName = (projNameInp ? projNameInp.value.trim() : "") || "Pnömatik Taşıma Projesi";
    const currentScale = parseFloat(window.getModulePrintScale("pnomatik")) || 1.0;

    // 1. Bulk Material & Specs
    const bulkMaterialSelect = document.getElementById("bulkMaterialSelect")?.selectedOptions[0]?.text || "-";
    const specParticleSize = document.getElementById("specParticleSize")?.textContent || "-";
    const specTrueDensity = document.getElementById("specTrueDensity")?.textContent || "-";
    const specBulkDensity = document.getElementById("specBulkDensity")?.textContent || "-";

    // 2. Geometry
    const pipeDiameter = document.getElementById("pipeDiameter")?.value || "-";
    const verticalLength = document.getElementById("verticalLength")?.value || "-";
    const pipeLength = document.getElementById("pipeLength")?.value || "-";
    const elbows = document.getElementById("elbows")?.value || "-";

    // 3. Air & Capacity
    const capacity = document.getElementById("capacity")?.value || "-";
    const airDensity = document.getElementById("airDensity")?.value || "-";
    const velocityRatio = document.getElementById("velocityRatio")?.value || "-";

    // Results - Left Column
    const flowRateM3Min = document.getElementById("flowRateM3Min")?.textContent || "-";
    const flowRateM3Hour = document.getElementById("flowRateM3Hour")?.textContent || "-";
    const flowRateLMin = document.getElementById("flowRateLMin")?.textContent || "-";

    const pressureMbar = document.getElementById("pressureMbar")?.textContent || "-";
    const pressureSafetyMbar = document.getElementById("pressureSafetyMbar")?.textContent || "-";
    const pressurePa = document.getElementById("pressurePa")?.textContent || "-";
    const pressurePsi = document.getElementById("pressurePsi")?.textContent || "-";

    // Results - Right Column
    const recBlowerModel = document.getElementById("recBlowerModel")?.textContent || "-";
    const recBlowerPower = document.getElementById("recBlowerPower")?.textContent || "-";
    const recBlowerDesc = document.getElementById("recBlowerDesc")?.textContent || "";
    const recBlowerUsage = document.getElementById("recBlowerUsage")?.textContent || "0%";
    const recBlowerCapacity = document.getElementById("recBlowerCapacity")?.textContent || "-";
    const recBlowerMaxVacuum = document.getElementById("recBlowerMaxVacuum")?.textContent || "-";

    const recBlowerAlternatives = document.getElementById("recBlowerAlternatives")?.innerHTML || "";
    const recBlowerNotesList = document.getElementById("recBlowerNotesList")?.innerHTML || "";

    const outerWrapper = document.createElement("div");
    outerWrapper.style.cssText = "width: 710px; overflow: hidden; background: #ffffff; margin: 0 auto; box-sizing: border-box;";

    const container = document.createElement("div");
    const scaledWidth = Math.round(710 / currentScale);
    container.style.cssText = `width: ${scaledWidth}px; transform: scale(${currentScale}); transform-origin: top left; padding: 6px 8px; background: #ffffff; color: #000000; font-family: 'Segoe UI', Arial, sans-serif; box-sizing: border-box;`;

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #000000; padding-bottom: 6px; margin-bottom: 14px;">
            <div>
                <h1 style="margin: 0; font-size: 1.45rem; font-weight: 700; color: #000000;">${projName}</h1>
                <span style="font-size: 0.80rem; color: #64748b;">Pnömatik Taşıma Hesaplama ve Sonuç Raporu</span>
            </div>
            <span style="font-size: 0.88rem; color: #111111; font-weight: 600;">${dateStr}</span>
        </div>

        <!-- TOP CARD: TASARIM PARAMETRELERİ VE GİRDİLER -->
        <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px; background: #ffffff;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #4338ca; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-sliders"></i> TASARIM PARAMETRELERİ VE GİRDİLER
            </div>

            <!-- Section 1 -->
            <div style="margin-bottom: 8px;">
                <h4 style="margin: 0 0 4px 0; font-size: 0.73rem; color: #4338ca; text-transform: uppercase; font-weight: 700;">1. TAŞINACAK BULK MALZEME</h4>
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-bottom: 6px;">
                    <span style="color: #475569;">Malzeme Seçimi:</span>
                    <strong style="color: #000;">${bulkMaterialSelect}</strong>
                </div>
                <!-- 3 Mini Badges -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 0.70rem; text-align: center; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 6px;">
                    <div><span style="color: #64748b; font-size: 0.65rem; display: block;">TANE ÇAPI</span><strong style="color: #000;">${specParticleSize}</strong></div>
                    <div><span style="color: #64748b; font-size: 0.65rem; display: block;">ÖZGÜL AĞIRLIK</span><strong style="color: #000;">${specTrueDensity}</strong></div>
                    <div><span style="color: #64748b; font-size: 0.65rem; display: block;">YIĞIN YOĞUNLUĞU</span><strong style="color: #000;">${specBulkDensity}</strong></div>
                </div>
            </div>

            <!-- Section 2 & 3 in 2 Columns -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px; border-top: 1px solid #f1f5f9; padding-top: 8px; font-size: 0.72rem; line-height: 1.5;">
                <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 0.73rem; color: #4338ca; text-transform: uppercase; font-weight: 700;">2. BORU HATTI GEOMETRİSİ</h4>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">Taşıma Borusu İç Çapı</span><strong style="color: #000;">${pipeDiameter} mm</strong></div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">Dikey Boru Uzunluğu</span><strong style="color: #000;">${verticalLength} m</strong></div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">Toplam Boru Uzunluğu (Yatay + Dikey)</span><strong style="color: #000;">${pipeLength} m</strong></div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">Kıvrımlı Dirsek Sayısı</span><strong style="color: #000;">${elbows} Adet</strong></div>
                </div>
                <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 0.73rem; color: #4338ca; text-transform: uppercase; font-weight: 700;">3. TAŞIMA KAPASİTESİ VE HAVA ŞARTLARI</h4>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">İstenilen Tonaj (Kapasite)</span><strong style="color: #000;">${capacity} t/h</strong></div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">Hava Yoğunluğu (İletim Başlangıcı)</span><strong style="color: #000;">${airDensity} kg/m³</strong></div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;"><span style="color: #475569;">İletim Hava Hızı Oranı (c/V)</span><strong style="color: #000;">${velocityRatio} c/V</strong></div>
                </div>
            </div>
        </div>

        <!-- BOTTOM CARD: BLOWER KAPASİTESİ VE HESAPLAMA ÇIKTILARI -->
        <div style="font-size: 0.82rem; font-weight: 700; color: #000000; margin: 10px 0 6px 0; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-chart-simple" style="color: #4338ca;"></i> Blower Kapasitesi ve Hesaplama Çıktıları
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 12px; margin-bottom: 10px;">
            <!-- Left Column (Debi + Basınç) -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <!-- Debi Card -->
                <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; background: #ffffff;">
                    <div style="font-size: 0.72rem; color: #475569; font-weight: 600; margin-bottom: 4px;">Gerekli Minimum Körük/Blower Debisi</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #000000; margin-bottom: 4px;">${flowRateM3Min} <span style="font-size: 0.85rem; font-weight: 500; color: #64748b;">m³/dk</span></div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-bottom: 6px;">Taşıma havası hızını minimum değerde tutmak ve çökmeyi önlemek için blowerın sağlaması gereken debidir.</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.68rem; border-top: 1px solid #f1f5f9; padding-top: 4px;">
                        <div><span style="color: #64748b; font-size: 0.62rem; display: block;">Debi (Saatlik)</span><strong>${flowRateM3Hour} m³/sa</strong></div>
                        <div><span style="color: #64748b; font-size: 0.62rem; display: block;">Debi (Litre)</span><strong>${flowRateLMin} lt/dk</strong></div>
                    </div>
                </div>

                <!-- Basınç Card -->
                <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; background: #ffffff;">
                    <div style="font-size: 0.72rem; color: #475569; font-weight: 600; margin-bottom: 4px;">Gerekli Minimum Körük/Blower Basıncı</div>
                    <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 4px;">
                        <span style="font-size: 1.4rem; font-weight: 700; color: #000000;">${pressureMbar}</span>
                        <span style="font-size: 0.9rem; color: #94a3b8;">/</span>
                        <span style="font-size: 1.4rem; font-weight: 700; color: #000000;">${pressureSafetyMbar}</span>
                        <span style="font-size: 0.82rem; font-weight: 500; color: #64748b;">mbar</span>
                    </div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-bottom: 6px;">Hava sürtünmesi ve katı malzeme taşıma yükü nedeniyle oluşan toplam vakum emiş direnci.</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.68rem; border-top: 1px solid #f1f5f9; padding-top: 4px;">
                        <div><span style="color: #64748b; font-size: 0.62rem; display: block;">Basınç Farkı (Pa)</span><strong>${pressurePa} Pa</strong></div>
                        <div><span style="color: #64748b; font-size: 0.62rem; display: block;">Basınç (Psi)</span><strong>${pressurePsi} psi</strong></div>
                    </div>
                </div>
            </div>

            <!-- Right Column (Blower Eşleştirme & Notlar) -->
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="font-size: 0.72rem; color: #475569; font-weight: 600; margin-bottom: 4px;">Mühendislik Blower Seçimi ve Eşleştirme</div>
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                        <span style="font-size: 1.45rem; font-weight: 700; color: #4338ca;">${recBlowerModel}</span>
                        <span style="font-size: 1.05rem; font-weight: 600; color: #000000;">${recBlowerPower}</span>
                    </div>
                    <div style="font-size: 0.68rem; color: #475569; margin-bottom: 6px; line-height: 1.35;">${recBlowerDesc}</div>
                    
                    <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: #64748b; margin-bottom: 6px;">
                        <span>Çalışma Noktası Yük Marjı:</span>
                        <strong style="color: #000000;">${recBlowerUsage}</strong>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.68rem; border-top: 1px solid #f1f5f9; padding-top: 4px; margin-bottom: 8px;">
                        <div><span style="color: #64748b; font-size: 0.62rem; display: block;">Sağlanan Debi</span><strong>${recBlowerCapacity}</strong></div>
                        <div><span style="color: #64748b; font-size: 0.62rem; display: block;">Maks. Basınç</span><strong>${recBlowerMaxVacuum}</strong></div>
                    </div>

                    <!-- Alternatives -->
                    <div style="margin-bottom: 8px;">
                        <div style="font-size: 0.68rem; font-weight: 600; color: #475569; margin-bottom: 3px;">Diğer Uygun Modeller:</div>
                        <div class="alt-tags-print" style="display: flex; flex-wrap: wrap; gap: 4px; font-size: 0.65rem;">
                            ${recBlowerAlternatives}
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                <div style="border-top: 1px solid #e2e8f0; padding-top: 6px;">
                    <div style="font-size: 0.68rem; font-weight: 700; color: #d97706; margin-bottom: 3px; display: flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-circle-exclamation"></i> Kritik Kurulum ve Güvenlik Notları
                    </div>
                    <ul style="margin: 0; padding-left: 14px; font-size: 0.62rem; color: #334155; line-height: 1.35;">
                        ${recBlowerNotesList}
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Clean alternative tags styling for print/pdf
    const currentModel = document.getElementById("recBlowerModel")?.textContent.trim() || "";
    const currentPower = document.getElementById("recBlowerPower")?.textContent.trim() || "";
    const cleanPowerValue = currentPower.replace(/\s*kW/i, '').trim();

    container.querySelectorAll(".alt-tag").forEach(tag => {
        const tagText = tag.textContent.trim();
        const hasModel = currentModel && tagText.includes(currentModel);
        const hasPower = cleanPowerValue && (tagText.includes(cleanPowerValue) || tagText.includes(currentPower));
        const isThisTagActive = tag.classList.contains("active") || (hasModel && hasPower);

        if (isThisTagActive) {
            tag.style.cssText = "display: inline-block; padding: 2px 7px; border: 1.5px solid #4338ca; border-radius: 4px; font-size: 0.64rem; color: #ffffff; background: #4338ca; font-weight: 700; box-shadow: 0 1px 2px rgba(67, 56, 202, 0.25);";
        } else {
            tag.style.cssText = "display: inline-block; padding: 2px 7px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.64rem; color: #334155; background: #f8fafc; font-weight: 500;";
        }
    });

    outerWrapper.appendChild(container);
    document.body.appendChild(outerWrapper);
    const exactHeightPnomatik = Math.ceil(container.getBoundingClientRect().height);
    outerWrapper.style.height = (exactHeightPnomatik + 2) + "px";
    outerWrapper.remove();

    return outerWrapper;
}

function initWhatsAppShareButtons() {
    // 1. Merkezi Sistem WhatsApp Button
    const btnWhatsAppMerkezi = document.getElementById("btnWhatsAppMerkezi");
    if (btnWhatsAppMerkezi) {
        btnWhatsAppMerkezi.addEventListener("click", () => {
            const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
            const projName = document.getElementById("projectName")?.value.trim() || "Merkezi_Sistem";

            const element = generateCleanMerkeziPrintElement();
            const filename = `${dateStr}_${projName.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ_-]/g, '_')}_Rapor`;

            window.openDocumentPreviewModal(element, filename, `${projName} Raporu`, () => {
                const exportBtn = document.getElementById("exportBtnMerkeziRapor");
                if (exportBtn) exportBtn.click();
                else window.print();
            }, 'merkezi');
        });
    }

    // 2. Pnömatik WhatsApp Button
    const btnWhatsAppPnomatik = document.getElementById("btnWhatsAppPnomatik");
    if (btnWhatsAppPnomatik) {
        btnWhatsAppPnomatik.addEventListener("click", () => {
            const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
            const projNameInp = document.getElementById("projectNamePnomatik");
            const projName = (projNameInp ? projNameInp.value.trim() : "") || "Pnomatik_Tasarim";

            const element = generateCleanPnomatikPrintElement();
            if (!element) return;
            const filename = `${dateStr}_${projName.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ_-]/g, '_')}_Pnomatik_Rapor`;

            window.openDocumentPreviewModal(element, filename, `${projName} Pnömatik Raporu`, () => {
                const exportBtn = document.getElementById("exportBtnPnomatik");
                if (exportBtn) exportBtn.click();
                else if (typeof exportToPDF === "function") exportToPDF();
                else window.print();
            }, 'pnomatik');
        });
    }

    // 3. Teklif Ver Preview / WhatsApp Button
    const btnWhatsAppTeklif = document.getElementById("btnWhatsAppTeklif");
    if (btnWhatsAppTeklif) {
        btnWhatsAppTeklif.addEventListener("click", () => {
            const innerElement = typeof window.generateCleanTeklifPrintElement === "function" 
                ? window.generateCleanTeklifPrintElement() 
                : (typeof buildProposalPrintElement === "function" ? buildProposalPrintElement() : null);
            if (!innerElement) return;

            const dateStr = new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');
            const company = document.getElementById("clientCompany")?.value.trim() || "Musteri";
            const filename = `${dateStr}_Teklif_${company.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ_-]/g, '_')}`;

            window.openDocumentPreviewModal(innerElement, filename, `${company} Fiyat Teklifi`, () => {
                const exportBtn = document.getElementById("btnPrintCustomProposal");
                if (exportBtn) exportBtn.click();
                else if (typeof printProposal === "function") printProposal();
                else window.print();
            }, 'teklif');
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initPortalNavigation();
    updateDashboardStats();
    initPrintScaleController();
    initDocumentPreviewModal();
    initWhatsAppShareButtons();

    // Fix Electron / Chromium input focus locking bug on button clicks & inputs
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
            if (document.activeElement !== target) {
                target.focus();
            }
        } else {
            // If clicking save buttons or action items, ensure window keeps active focus
            setTimeout(() => {
                window.focus();
            }, 100);
        }
    }, true);
});

// Switch between portal sections (Dashboard, Yükleyici, Merkezi Sistem, Pnömatik)
function switchPortalSection(targetSectionId) {
    if (!targetSectionId) return;

    // Save active section locally so reloads don't reset navigation
    try {
        localStorage.setItem("active_portal_section", targetSectionId);
    } catch(e) {}

    // Hide all sections
    const sections = document.querySelectorAll(".portal-section");
    sections.forEach(sec => {
        sec.classList.remove("active");
    });

    // Show target section
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
        targetSection.classList.add("active");
    }

    // Update active class in sidebar menu
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    sidebarItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-target") === targetSectionId) {
            item.classList.add("active");
        }
    });

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Refresh stats if coming back to dashboard
    if (targetSectionId === "dashboard-sec") {
        updateDashboardStats();
    }
}

// Initialize navigation event listeners
function initPortalNavigation() {
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");
            switchPortalSection(target);
        });
    });

    // Restore last active section on page load / auto-refresh
    const savedSection = localStorage.getItem("active_portal_section");
    if (savedSection && document.getElementById(savedSection)) {
        switchPortalSection(savedSection);
    }
}

// Fetch stats from LocalStorage to display in the main Dashboard overview cards
function updateDashboardStats() {
    try {
        // Yükleyici Models Count
        const loadedModels = JSON.parse(localStorage.getItem("l_models"));
        const modelCount = loadedModels ? Object.keys(loadedModels).length : 5; // Fallback to 5 defaults
        const loaderDescEl = document.querySelector(".overview-card:nth-child(1) .overview-desc");
        if (loaderDescEl) {
            loaderDescEl.innerHTML = `Sistemde aktif tanımlı <strong>${modelCount} farklı model</strong> ve reçete maliyet hesabı mevcuttur.`;
        }

        // Merkezi Sistem Saved Projects Count
        const savedProjects = JSON.parse(localStorage.getItem("m_projects"));
        const projectCount = savedProjects ? Object.keys(savedProjects).length : 0;
        const centralDescEl = document.querySelector(".overview-card:nth-child(2) .overview-desc");
        if (centralDescEl) {
            centralDescEl.innerHTML = `LocalStorage üzerinde kayıtlı <strong>${projectCount} adet fiyat teklif projesi</strong> bulunuyor.`;
        }

        // Pnömatik Taşıma Saved Projects Count
        const savedProjectsPnomatik = JSON.parse(localStorage.getItem("p_projects"));
        const projectCountPnomatik = savedProjectsPnomatik ? Object.keys(savedProjectsPnomatik).length : 0;
        const pnomatikDescEl = document.querySelector(".overview-card:nth-child(3) .overview-desc");
        if (pnomatikDescEl) {
            pnomatikDescEl.innerHTML = `Sistemde kayıtlı <strong>${projectCountPnomatik} adet pnömatik taşıma projesi</strong> bulunuyor.`;
        }
    } catch (e) {
        console.error("Dashboard istatistikleri güncellenirken hata oluştu:", e);
    }
}
