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



document.addEventListener("DOMContentLoaded", () => {
    initPortalNavigation();
    updateDashboardStats();

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
