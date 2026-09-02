// Firebase Sync Module for BFT Portal - Automated Real-Time Sync
(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyA-276dWDiRFc_k_rJopib9qrmjte7kB3A",
        authDomain: "bftbft-516a6.firebaseapp.com",
        projectId: "bftbft-516a6",
        storageBucket: "bftbft-516a6.firebasestorage.app",
        messagingSenderId: "442465644757",
        appId: "1:442465644757:web:0928461a1cd88fe37eb25c",
        measurementId: "G-B898PH13VJ"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const storageKeys = [
        "m_projects",
        "m_screens",
        "m_drivers",
        "m_pumps",
        "m_pipes",
        "m_generalItems",
        "p_projects",
        "t_company_info",
        "t_proposal_items",
        "t_product_catalog",
        "t_exchange_rate",
        "t_show_tl",
        "t_show_vat",
        "t_vat_rate",
        "t_proposals",
        "t_proposal_desc_library",
        "t_customers",
        "l_personnel",
        "l_shopExpenses",
        "l_materials",
        "l_models"
    ];

    let isSyncing = false; // Flag to prevent circular sync loop
    let isPullingFromCloud = false;
    let hasPendingUpload = false;
    let isInitialCloudCheckDone = false; // Prevents fresh/empty devices from overwriting cloud before checking
    const myClientId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    let autoUploadTimeout = null;
    let unsubscribeSnapshot = null;

    // Overriding localStorage to auto-detect changes and trigger uploads
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;
    const localArchiveKey = "bft_cloud_upload_archive_v1";

    const saveLocalCloudSnapshot = (companyCode, data) => {
        try {
            const previous = JSON.parse(localStorage.getItem(localArchiveKey) || "[]");
            const archive = Array.isArray(previous) ? previous : [];
            archive.unshift({
                companyCode,
                savedAt: new Date().toISOString(),
                data: { ...data }
            });
            originalSetItem.call(localStorage, localArchiveKey, JSON.stringify(archive.slice(0, 20)));
        } catch (err) {
            console.warn("Local cloud archive save failed:", err);
        }
    };

    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (!isPullingFromCloud && storageKeys.includes(key)) {
            scheduleAutoUpload();
        }
    };

    localStorage.removeItem = function(key) {
        originalRemoveItem.apply(this, arguments);
        if (!isPullingFromCloud && storageKeys.includes(key)) {
            scheduleAutoUpload();
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        // Sidebar elements
        const inputCode = document.getElementById("syncCompanyCode");
        const btnUpload = document.getElementById("btnUploadToCloud");
        const btnDownload = document.getElementById("btnDownloadFromCloud");
        const statusEl = document.getElementById("syncStatus");

        // Modal elements
        const modalInputCode = document.getElementById("modalSyncCompanyCode");
        const btnModalUpload = document.getElementById("btnModalUploadToCloud");
        const btnModalDownload = document.getElementById("btnModalDownloadFromCloud");
        const btnModalImport = document.getElementById("btnModalImportFromFile");
        const cloudImportFile = document.getElementById("cloudImportFile");
        const modalStatusEl = document.getElementById("modalSyncStatus");

        // UI Synced update helper
        const updateSyncUI = (code, statusText) => {
            if (inputCode) inputCode.value = code;
            if (modalInputCode) modalInputCode.value = code;
            if (statusEl) statusEl.textContent = statusText;
            if (modalStatusEl) modalStatusEl.textContent = statusText;
        };

        // Restore saved company code & status (auto-save bft_portal if not set)
        let savedCode = (localStorage.getItem("t_sync_company_code") || "bft_portal").trim().toLowerCase();
        localStorage.setItem("t_sync_company_code", savedCode);
        const lastSyncMsg = localStorage.getItem("t_sync_last_status") || "Son Eşleşme: Yapılmadı";
        updateSyncUI(savedCode, lastSyncMsg);

        // Setup real-time listener on start
        setupRealtimeSync(savedCode);

        // Setup Modal Opening/Closing
        const btnOpenModal = document.getElementById("btnOpenSyncModal");
        const modalEl = document.getElementById("cloudSyncModal");
        const btnCloseModal = document.getElementById("btnCloseCloudSyncModal");

        if (btnOpenModal && modalEl && btnCloseModal) {
            btnOpenModal.addEventListener("click", () => {
                const currentCode = localStorage.getItem("t_sync_company_code") || "bft_portal";
                const currentStatus = localStorage.getItem("t_sync_last_status") || "Son Eşleşme: Yapılmadı";
                updateSyncUI(currentCode, currentStatus);
                modalEl.classList.add("open");
            });

            btnCloseModal.addEventListener("click", () => {
                modalEl.classList.remove("open");
            });

            modalEl.addEventListener("click", (e) => {
                if (e.target === modalEl) {
                    modalEl.classList.remove("open");
                }
            });
        }

        const disableAllButtons = () => {
            if (btnUpload) {
                btnUpload.disabled = true;
                btnUpload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor';
            }
            if (btnModalUpload) {
                btnModalUpload.disabled = true;
                btnModalUpload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor';
            }
            if (btnDownload) {
                btnDownload.disabled = true;
                btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İndiriliyor';
            }
            if (btnModalDownload) {
                btnModalDownload.disabled = true;
                btnModalDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İndiriliyor';
            }
        };

        const enableAllButtons = () => {
            if (btnUpload) {
                btnUpload.disabled = false;
                btnUpload.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Yükle';
            }
            if (btnModalUpload) {
                btnModalUpload.disabled = false;
                btnModalUpload.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Yükle (Upload)';
            }
            if (btnDownload) {
                btnDownload.disabled = false;
                btnDownload.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Çek';
            }
            if (btnModalDownload) {
                btnModalDownload.disabled = false;
                btnModalDownload.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Çek (Download)';
            }
        };

        const updateAllStatus = (msg) => {
            if (statusEl) statusEl.textContent = msg;
            if (modalStatusEl) modalStatusEl.textContent = msg;
        };

        const importJsonBackup = async (file) => {
            const text = await file.text();
            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch (err) {
                throw new Error("Seçilen dosya geçerli bir JSON dosyası değil.");
            }

            const sourceData = parsed && typeof parsed === "object" && parsed.data && typeof parsed.data === "object"
                ? parsed.data
                : parsed;
            const importedKeys = storageKeys.filter(key => Object.prototype.hasOwnProperty.call(sourceData, key));

            if (!importedKeys.length) {
                throw new Error("Dosyada uygulamanın tanıdığı bir veri anahtarı bulunamadı.");
            }

            const confirmed = await window.showCustomConfirm(
                `Bu işlem mevcut yerel kayıtları silecek ve seçilen dosyadaki ${importedKeys.length} veri grubunu geri yükleyecek. Dosyada bulunmayan kayıtlar da kaldırılacak. Ardından geri yüklenen veriler buluta yüklenecek. Devam edilsin mi?`,
                "Dosyadan Veri İçe Aktar"
            );
            if (!confirmed) return false;

            isPullingFromCloud = true;
            try {
                storageKeys.forEach(key => localStorage.removeItem(key));
                importedKeys.forEach(key => {
                    const value = sourceData[key];
                    if (value === null || value === undefined) {
                        localStorage.removeItem(key);
                    } else {
                        localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
                    }
                });
            } finally {
                isPullingFromCloud = false;
            }

            return true;
        };

        const uploadAction = async (getCodeFn, disableBtnsFn, enableBtnsFn, updateStatusFn) => {
            const companyCode = getCodeFn().trim().toLowerCase();
            if (!companyCode) {
                alert("Lütfen geçerli bir şirket/cihaz kodu girin.");
                return;
            }

            disableBtnsFn();
            updateStatusFn("Veriler buluta gönderiliyor...");

            isSyncing = true;
            const payload = {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastWriterClientId: myClientId,
                data: {}
            };

            storageKeys.forEach(key => {
                payload.data[key] = localStorage.getItem(key);
            });

            try {
                await db.collection("portal_data").doc(companyCode).set(payload);
                saveLocalCloudSnapshot(companyCode, payload.data);
                
                const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                const successMsg = `Son Yükleme: ${nowStr}`;
                
                localStorage.setItem("t_sync_last_status", successMsg);
                localStorage.setItem("t_sync_company_code", companyCode);
                updateSyncUI(companyCode, successMsg);

                isInitialCloudCheckDone = true;

                // Re-setup listener in case code changed
                setupRealtimeSync(companyCode);

                alert(`"${companyCode}" kodlu bulut kaydı başarıyla güncellendi.`);
            } catch (err) {
                console.error("Firebase sync upload error:", err);
                updateStatusFn("Yükleme hatası!");
                alert("Buluta veri yüklenirken bir hata oluştu: " + err.message);
            } finally {
                isSyncing = false;
                enableBtnsFn();
            }
        };

        const downloadAction = async (getCodeFn, disableBtnsFn, enableBtnsFn, updateStatusFn) => {
            const companyCode = getCodeFn().trim().toLowerCase();
            if (!companyCode) {
                alert("Lütfen geçerli bir şirket/cihaz kodu girin.");
                return;
            }

            if (!await window.showCustomConfirm("Buluttaki veriler çekildiğinde bu tarayıcıdaki tüm kayıtlar ezilecektir. Devam etmek istiyor musunuz?", "Bulut Verilerini İndir")) {
                return;
            }

            disableBtnsFn();
            updateStatusFn("Veriler buluttan çekiliyor...");

            isSyncing = true;
            try {
                const doc = await db.collection("portal_data").doc(companyCode).get();
                if (!doc.exists) {
                    updateStatusFn("Kayıt bulunamadı!");
                    alert(`"${companyCode}" koduna ait herhangi bir bulut kaydı bulunamadı. Lütfen kodu kontrol edin veya önce diğer cihazdan yükleme yapın.`);
                    isSyncing = false;
                    enableBtnsFn();
                    return;
                }

                const payload = doc.data();
                if (payload && payload.data) {
                    Object.keys(payload.data).forEach(key => {
                        const val = payload.data[key];
                        if (val !== null && val !== undefined) {
                            localStorage.setItem(key, val);
                        } else {
                            localStorage.removeItem(key);
                        }
                    });

                    const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                    const successMsg = `Son İndirme: ${nowStr}`;
                    
                    localStorage.setItem("t_sync_last_status", successMsg);
                    localStorage.setItem("t_sync_company_code", companyCode);
                    updateSyncUI(companyCode, successMsg);

                    alert(`Veriler buluttan başarıyla indirildi! Portal güncelleniyor...`);
                    location.reload(true);
                } else {
                    alert("Kayıtlı veri şablonu hatalı.");
                    isSyncing = false;
                    enableBtnsFn();
                }
            } catch (err) {
                console.error("Firebase sync download error:", err);
                updateStatusFn("İndirme hatası!");
                alert("Buluttan veri çekilirken bir hata oluştu: " + err.message);
                isSyncing = false;
                enableBtnsFn();
            }
        };

        // Event listeners for Sidebar Buttons
        if (btnUpload) {
            btnUpload.addEventListener("click", () => {
                uploadAction(() => inputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
            });
        }
        if (btnDownload) {
            btnDownload.addEventListener("click", () => {
                downloadAction(() => inputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
            });
        }

        // Event listeners for Modal Buttons
        if (btnModalUpload) {
            btnModalUpload.addEventListener("click", () => {
                uploadAction(() => modalInputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
            });
        }
        if (btnModalDownload) {
            btnModalDownload.addEventListener("click", () => {
                downloadAction(() => modalInputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
            });
        }
        if (btnModalImport && cloudImportFile) {
            btnModalImport.addEventListener("click", () => cloudImportFile.click());
            cloudImportFile.addEventListener("change", async () => {
                const file = cloudImportFile.files && cloudImportFile.files[0];
                cloudImportFile.value = "";
                if (!file) return;

                try {
                    const imported = await importJsonBackup(file);
                    if (!imported) return;
                    await uploadAction(() => modalInputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
                } catch (err) {
                    console.error("File import error:", err);
                    updateAllStatus("Dosya içe aktarma hatası!");
                    alert("Dosya içe aktarılırken bir hata oluştu: " + err.message);
                }
            });
        }

        const deleteProjectsAction = async (getCodeFn, disableBtnsFn, enableBtnsFn, updateStatusFn) => {
            const companyCode = getCodeFn().trim().toLowerCase();
            if (!companyCode) {
                alert("Lütfen geçerli bir şirket/cihaz kodu girin.");
                return;
            }

            if (!await window.showCustomConfirm("Tüm kayıtlı Merkezi ve Pnömatik projelerini silmek istediğinize emin misiniz? Bu işlem hem tarayıcıdan hem de buluttan verileri kalıcı olarak silecektir!", "Projeleri Temizle")) {
                return;
            }

            disableBtnsFn();
            updateStatusFn("Projeler siliniyor...");

            isSyncing = true;
            isPullingFromCloud = true;
            try {
                localStorage.setItem("m_projects", "{}");
                localStorage.setItem("p_projects", "{}");
            } finally {
                isPullingFromCloud = false;
            }

            const payload = {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastWriterClientId: myClientId,
                data: {}
            };

            storageKeys.forEach(key => {
                payload.data[key] = localStorage.getItem(key);
            });

            try {
                await db.collection("portal_data").doc(companyCode).set(payload);
                
                const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                const successMsg = `Projeler Temizlendi: ${nowStr}`;
                
                localStorage.setItem("t_sync_last_status", successMsg);
                localStorage.setItem("t_sync_company_code", companyCode);
                updateSyncUI(companyCode, successMsg);

                alert("Tüm Merkezi ve Pnömatik projeleri başarıyla silindi ve bulut eşitlendi.");
                location.reload(true);
            } catch (err) {
                console.error("Firebase sync project delete error:", err);
                updateStatusFn("Silme hatası!");
                alert("Buluttan projeler silinirken bir hata oluştu: " + err.message);
            } finally {
                isSyncing = false;
                enableBtnsFn();
            }
        };

        // Event listeners for Delete Buttons
        const btnDeleteCloud = document.getElementById("btnDeleteCloudProjects");
        const btnModalDeleteCloud = document.getElementById("btnModalDeleteCloudProjects");

        if (btnDeleteCloud) {
            btnDeleteCloud.addEventListener("click", () => {
                deleteProjectsAction(() => inputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
            });
        }
        if (btnModalDeleteCloud) {
            btnModalDeleteCloud.addEventListener("click", () => {
                deleteProjectsAction(() => modalInputCode.value, disableAllButtons, enableAllButtons, updateAllStatus);
            });
        }
    });

    // Helper: Schedule silent auto upload
    function scheduleAutoUpload() {
        if (!isInitialCloudCheckDone) {
            console.log("Bulut ilk kontrolü bekleniyor, otomatik yükleme bekletildi.");
            return;
        }

        const companyCode = (localStorage.getItem("t_sync_company_code") || "bft_portal").trim().toLowerCase();
        if (!companyCode) return;

        // Show pending save message
        const statusEl = document.getElementById("syncStatus");
        const modalStatusEl = document.getElementById("modalSyncStatus");
        const pendingMsg = "Değişiklik algılandı, yedekleniyor... ⏳";
        if (statusEl) statusEl.textContent = pendingMsg;
        if (modalStatusEl) modalStatusEl.textContent = pendingMsg;

        clearTimeout(autoUploadTimeout);
        autoUploadTimeout = setTimeout(async () => {
            await silentUpload(companyCode);
        }, 1500); // 1.5 seconds fast auto-upload
    }

    // Public Helpers for Exit / Flush Handling
    window.hasPendingSync = function() {
        return !!autoUploadTimeout || isSyncing || hasPendingUpload;
    };

    window.showExitSavingOverlay = function() {
        let overlay = document.getElementById("exitSavingOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "exitSavingOverlay";
            overlay.style.cssText = `
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(10, 11, 16, 0.92);
                backdrop-filter: blur(8px);
                z-index: 999999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #ffffff;
                font-family: system-ui, -apple-system, sans-serif;
            `;
            overlay.innerHTML = `
                <div style="background: rgba(30, 32, 48, 0.95); border: 1px solid rgba(99, 102, 241, 0.3); padding: 2.2rem 3rem; border-radius: 16px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); display: flex; flex-direction: column; align-items: center; gap: 1.25rem;">
                    <div style="font-size: 2.8rem; color: #6366f1;">
                        <i class="fa-solid fa-cloud-arrow-up fa-spin"></i>
                    </div>
                    <div style="font-size: 1.25rem; font-weight: 600; color: #f8fafc;">
                        Değişiklikleriniz buluta kaydediliyor...
                    </div>
                    <div style="font-size: 0.9rem; color: #94a3b8;">
                        Lütfen bekleyiniz, işlem tamamlanınca program otomatik kapanacaktır.
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        overlay.style.display = "flex";
    };

    window.hideExitSavingOverlay = function() {
        const overlay = document.getElementById("exitSavingOverlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };

    window.flushPendingSync = async function() {
        if (autoUploadTimeout) {
            clearTimeout(autoUploadTimeout);
            autoUploadTimeout = null;
        }
        const companyCode = (localStorage.getItem("t_sync_company_code") || "bft_portal").trim().toLowerCase();
        if (companyCode) {
            await silentUpload(companyCode);
        }
        window.hideExitSavingOverlay();
    };

    // Trigger instant upload on window exit / mobile app hide
    const handleExitUpload = () => {
        if (window.hasPendingSync()) {
            window.flushPendingSync();
        }
    };
    window.addEventListener("beforeunload", handleExitUpload);
    window.addEventListener("pagehide", handleExitUpload);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            handleExitUpload();
        }
    });

    // Helper: Silent background upload
    async function silentUpload(companyCode) {
        if (isSyncing) {
            hasPendingUpload = true;
            return;
        }
        isSyncing = true;
        hasPendingUpload = false;

        const payload = {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastWriterClientId: myClientId,
            data: {}
        };

        storageKeys.forEach(key => {
            payload.data[key] = localStorage.getItem(key);
        });

        try {
            await db.collection("portal_data").doc(companyCode).set(payload);
            saveLocalCloudSnapshot(companyCode, payload.data);
            
            const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
            const successMsg = `Bulut Eşitlendi (Otomatik): ${nowStr}`;
            
            localStorage.setItem("t_sync_last_status", successMsg);
            
            const statusEl = document.getElementById("syncStatus");
            const modalStatusEl = document.getElementById("modalSyncStatus");
            if (statusEl) statusEl.textContent = successMsg;
            if (modalStatusEl) modalStatusEl.textContent = successMsg;
        } catch (err) {
            console.error("Auto upload failed:", err);
            const errMsg = "Otomatik bulut eşitleme hatası!";
            const statusEl = document.getElementById("syncStatus");
            const modalStatusEl = document.getElementById("modalSyncStatus");
            if (statusEl) statusEl.textContent = errMsg;
            if (modalStatusEl) modalStatusEl.textContent = errMsg;
        } finally {
            isSyncing = false;
            if (hasPendingUpload) {
                hasPendingUpload = false;
                scheduleAutoUpload();
            }
        }
    }

    // Helper: Initial splash screen dismissal
    function hideInitialSplashScreen(delay = 350) {
        setTimeout(() => {
            const splash = document.getElementById("appInitialSplashScreen");
            if (splash) {
                splash.style.opacity = "0";
                splash.style.pointerEvents = "none";
                setTimeout(() => {
                    splash.style.display = "none";
                }, 400);
            }
        }, delay);
    }

    // Safety timeout: If cloud check takes more than 3 seconds (offline/slow), dismiss splash safely
    setTimeout(() => {
        isInitialCloudCheckDone = true;
        hideInitialSplashScreen(0);
    }, 3000);

    // Helper: Real-time Cloud updates listener
    function setupRealtimeSync(companyCode) {
        if (unsubscribeSnapshot) {
            unsubscribeSnapshot();
            unsubscribeSnapshot = null;
        }

        if (!companyCode) {
            isInitialCloudCheckDone = true;
            hideInitialSplashScreen(0);
            return;
        }

        unsubscribeSnapshot = db.collection("portal_data").doc(companyCode)
            .onSnapshot(doc => {
                if (!doc.exists) {
                    isInitialCloudCheckDone = true;
                    hideInitialSplashScreen(300);
                    return;
                }

                const remotePayload = doc.data();
                if (!remotePayload || !remotePayload.data) {
                    isInitialCloudCheckDone = true;
                    hideInitialSplashScreen(300);
                    return;
                }

                // Initial cloud check completed
                isInitialCloudCheckDone = true;

                if (isSyncing) return; // Prevent loops while upload/download is active

                // Ignore updates that were written by this client
                if (remotePayload.lastWriterClientId === myClientId) {
                    hideInitialSplashScreen(200);
                    return;
                }

                // Compare remote data keys with local localStorage
                let hasChanges = false;
                for (let key of storageKeys) {
                    const localVal = localStorage.getItem(key);
                    const remoteVal = remotePayload.data[key];
                    
                    // If a key doesn't exist or is null in cloud data yet, don't trigger sync pull.
                    // This prevents infinite reload loops when new keys like t_customers are added.
                    if (remoteVal === undefined || remoteVal === null) {
                        continue;
                    }

                    const normLocal = (localVal === null || localVal === undefined) ? "" : localVal;
                    const normRemote = remoteVal;

                    if (normLocal !== normRemote) {
                        hasChanges = true;
                        break;
                    }
                }

                if (hasChanges) {
                    isSyncing = true;
                    isPullingFromCloud = true;
                    
                    const splashText = document.getElementById("initialSplashText");
                    if (splashText) splashText.textContent = "Güncel veriler eşitlendi! Başlatılıyor...";

                    try {
                        // Copy remote data into localStorage
                        storageKeys.forEach(key => {
                            const remoteVal = remotePayload.data[key];
                            if (remoteVal !== null && remoteVal !== undefined) {
                                localStorage.setItem(key, remoteVal);
                            } else {
                                // Only remove from local storage if explicitly set to null/empty in remote
                                if (remoteVal !== undefined) {
                                    localStorage.removeItem(key);
                                }
                            }
                        });
                    } finally {
                        isPullingFromCloud = false;
                    }

                    const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                    const successMsg = `Buluttan yeni veri çekildi: ${nowStr}`;
                    localStorage.setItem("t_sync_last_status", successMsg);

                    const statusEl = document.getElementById("syncStatus");
                    const modalStatusEl = document.getElementById("modalSyncStatus");
                    if (statusEl) statusEl.textContent = successMsg;
                    if (modalStatusEl) modalStatusEl.textContent = successMsg;

                    if (window.showToast) {
                        window.showToast("☁️ Buluttaki güncel veriler eşitlendi! Ekran yenileniyor...", "info");
                    }
                    setTimeout(() => {
                        location.reload(true);
                    }, 1200);
                } else {
                    // No changes: smoothly dismiss splash screen
                    hideInitialSplashScreen(350);
                }
            }, err => {
                console.error("Firestore onSnapshot error:", err);
                isInitialCloudCheckDone = true;
                hideInitialSplashScreen(0);
            });
    }

    // ==========================================
    // AUTOMATIC APP VERSION UPDATER MODULE
    // ==========================================
    const CURRENT_APP_VERSION = "1.0.33";

    function isNewerVersion(current, remote) {
        if (!current || !remote) return false;
        const c = current.replace(/^v/, '').split('.').map(Number);
        const r = remote.replace(/^v/, '').split('.').map(Number);
        for (let i = 0; i < Math.max(c.length, r.length); i++) {
            const cNum = c[i] || 0;
            const rNum = r[i] || 0;
            if (rNum > cNum) return true;
            if (rNum < cNum) return false;
        }
        return false;
    }

    async function checkAppVersionUpdate() {
        // Set current badge version UI
        const badgeEl = document.getElementById("appVersionBadge");
        if (badgeEl) badgeEl.textContent = `v${CURRENT_APP_VERSION}`;

        try {
            const doc = await db.collection("portal_data").doc("app_version").get();
            if (!doc.exists) return;

            const data = doc.data();
            if (!data || !data.version) return;

            const remoteVersion = data.version;
            const downloadUrl = data.downloadUrl;

            const btnUpdate = document.getElementById("btnUpdateApp");
            const btnText = document.getElementById("btnUpdateAppText");

            if (isNewerVersion(CURRENT_APP_VERSION, remoteVersion) && downloadUrl) {
                if (btnUpdate && btnText) {
                    btnText.textContent = `Yeni Sürüm Var (v${remoteVersion})`;
                    btnUpdate.style.display = "flex";
                    btnUpdate.onclick = () => handleAppUpdateClick(remoteVersion, downloadUrl, data.releaseNotes);
                }
            } else {
                if (btnUpdate) btnUpdate.style.display = "none";
            }
        } catch (err) {
            console.error("App version check error:", err);
        }
    }

    async function handleAppUpdateClick(remoteVersion, downloadUrl, releaseNotes) {
        const msg = `Yeni sürüm (v${remoteVersion}) yayınlandı!${releaseNotes ? '\n\nYenilikler: ' + releaseNotes : ''}\n\nİndirip otomatik güncellemek istiyor musunuz?`;
        
        const confirmed = window.showCustomConfirm 
            ? await window.showCustomConfirm(msg, `Güncelleme: v${remoteVersion}`)
            : confirm(msg);

        if (!confirmed) return;

        if (window.showToast) {
            window.showToast(`v${remoteVersion} indiriliyor ve kuruluyor... Lütfen bekleyiniz.`, "info");
        }

        // Check if running inside Electron app
        if (typeof window.require !== 'undefined') {
            try {
                const { ipcRenderer } = window.require('electron');
                const result = await ipcRenderer.invoke('download-and-install-update', downloadUrl);
                if (result && !result.success) {
                    if (window.showToast) window.showToast("Güncelleme hatası: " + result.error, "error");
                    else alert("Güncelleme hatası: " + result.error);
                }
            } catch (err) {
                console.error("Electron IPC update error:", err);
                window.open(downloadUrl, "_blank");
            }
        } else {
            // Running in regular browser
            window.open(downloadUrl, "_blank");
        }
    }

    // Trigger version check on startup and every 20 minutes
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(checkAppVersionUpdate, 1500);
        setInterval(checkAppVersionUpdate, 20 * 60 * 1000);
    });
})();
