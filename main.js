// Portal Orchestration & Navigation Logic

// Force cache busting once for v3 transition to clear old service worker cache
if (!localStorage.getItem('sw_version_reset_v4')) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            let promises = [];
            for (let registration of registrations) {
                promises.push(registration.unregister());
            }
            Promise.all(promises).then(() => {
                if (window.caches) {
                    caches.keys().then(names => {
                        let cachePromises = [];
                        for (let name of names) {
                            cachePromises.push(caches.delete(name));
                        }
                        Promise.all(cachePromises).then(() => {
                            localStorage.setItem('sw_version_reset_v4', 'true');
                            window.location.reload(true);
                        });
                    }).catch(() => {
                        localStorage.setItem('sw_version_reset_v4', 'true');
                        window.location.reload(true);
                    });
                } else {
                    localStorage.setItem('sw_version_reset_v4', 'true');
                    window.location.reload(true);
                }
            });
        }).catch(() => {
            localStorage.setItem('sw_version_reset_v4', 'true');
            window.location.reload(true);
        });
    } else {
        localStorage.setItem('sw_version_reset_v4', 'true');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initPortalNavigation();
    updateDashboardStats();
});

// Switch between portal sections (Dashboard, Yükleyici, Merkezi Sistem, Pnömatik)
function switchPortalSection(targetSectionId) {
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
