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
        "l_personnel",
        "l_shopExpenses",
        "l_materials",
        "l_models"
    ];

    let isSyncing = false; // Flag to prevent circular sync loop
    let autoUploadTimeout = null;
    let unsubscribeSnapshot = null;

    // Overriding localStorage to auto-detect changes and trigger uploads
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (!isSyncing && storageKeys.includes(key)) {
            scheduleAutoUpload();
        }
    };

    localStorage.removeItem = function(key) {
        originalRemoveItem.apply(this, arguments);
        if (!isSyncing && storageKeys.includes(key)) {
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
        const modalStatusEl = document.getElementById("modalSyncStatus");

        // UI Synced update helper
        const updateSyncUI = (code, statusText) => {
            if (inputCode) inputCode.value = code;
            if (modalInputCode) modalInputCode.value = code;
            if (statusEl) statusEl.textContent = statusText;
            if (modalStatusEl) modalStatusEl.textContent = statusText;
        };

        // Restore saved company code & status
        const savedCode = localStorage.getItem("t_sync_company_code") || "bft_portal";
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
                data: {}
            };

            storageKeys.forEach(key => {
                payload.data[key] = localStorage.getItem(key);
            });

            try {
                await db.collection("portal_data").doc(companyCode).set(payload);
                
                const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                const successMsg = `Son Yükleme: ${nowStr}`;
                
                localStorage.setItem("t_sync_last_status", successMsg);
                localStorage.setItem("t_sync_company_code", companyCode);
                updateSyncUI(companyCode, successMsg);

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

            if (!confirm(`Buluttaki veriler çekildiğinde bu tarayıcıdaki tüm kayıtlar ezilecektir. Devam etmek istiyor musunuz?`)) {
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
                    location.reload();
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

        const deleteProjectsAction = async (getCodeFn, disableBtnsFn, enableBtnsFn, updateStatusFn) => {
            const companyCode = getCodeFn().trim().toLowerCase();
            if (!companyCode) {
                alert("Lütfen geçerli bir şirket/cihaz kodu girin.");
                return;
            }

            if (!confirm("Tüm kayıtlı Merkezi ve Pnömatik projelerini silmek istediğinize emin misiniz? Bu işlem hem tarayıcıdan hem de buluttan verileri kalıcı olarak silecektir! (Yükleyici verileri ve fiyat listeleri korunacaktır.)")) {
                return;
            }

            disableBtnsFn();
            updateStatusFn("Projeler siliniyor...");

            isSyncing = true;
            localStorage.setItem("m_projects", "{}");
            localStorage.setItem("p_projects", "{}");

            const payload = {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
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
                location.reload();
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
        const companyCode = (localStorage.getItem("t_sync_company_code") || "").trim().toLowerCase();
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
        }, 3000); // 3 seconds after last local storage modification
    }

    // Helper: Silent background upload
    async function silentUpload(companyCode) {
        if (isSyncing) return;
        isSyncing = true;

        const payload = {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            data: {}
        };

        storageKeys.forEach(key => {
            payload.data[key] = localStorage.getItem(key);
        });

        try {
            await db.collection("portal_data").doc(companyCode).set(payload);
            
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
        }
    }

    // Helper: Real-time Cloud updates listener
    function setupRealtimeSync(companyCode) {
        if (unsubscribeSnapshot) {
            unsubscribeSnapshot();
            unsubscribeSnapshot = null;
        }

        if (!companyCode) return;

        unsubscribeSnapshot = db.collection("portal_data").doc(companyCode)
            .onSnapshot(doc => {
                if (isSyncing) return; // Prevent loops while upload/download is active

                if (!doc.exists) return;

                const remotePayload = doc.data();
                if (!remotePayload || !remotePayload.data) return;

                // Compare remote data keys with local localStorage
                let hasChanges = false;
                for (let key of storageKeys) {
                    const localVal = localStorage.getItem(key);
                    const remoteVal = remotePayload.data[key];
                    
                    // If a key doesn't exist in remote cloud data, don't trigger sync pull.
                    // This prevents infinite reload loops on new keys or missing cloud keys.
                    if (remoteVal === undefined) {
                        continue;
                    }

                    // Normalize both null and undefined to null to prevent false mismatch reload loops
                    const normLocal = (localVal === null || localVal === undefined) ? null : localVal;
                    const normRemote = (remoteVal === null || remoteVal === undefined) ? null : remoteVal;

                    if (normLocal !== normRemote) {
                        hasChanges = true;
                        break;
                    }
                }

                if (hasChanges) {
                    isSyncing = true;
                    
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

                    const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                    const successMsg = `Yeni bulut verisi uygulandı: ${nowStr}`;
                    localStorage.setItem("t_sync_last_status", successMsg);

                    // Show visual feedback before reloading
                    const statusEl = document.getElementById("syncStatus");
                    const modalStatusEl = document.getElementById("modalSyncStatus");
                    const reloadMsg = "Buluttan yeni veriler çekildi, sayfa yenileniyor...";
                    if (statusEl) statusEl.textContent = reloadMsg;
                    if (modalStatusEl) modalStatusEl.textContent = reloadMsg;

                    setTimeout(() => {
                        location.reload();
                    }, 1200);
                }
            }, err => {
                console.error("Firestore onSnapshot error:", err);
            });
    }
})();
