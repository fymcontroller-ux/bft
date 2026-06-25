// Firebase Sync Module for BFT Portal
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
        "t_vat_rate"
    ];

// Firebase Sync Module for BFT Portal
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
        "t_vat_rate"
    ];

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

            const payload = {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                data: {}
            };

            storageKeys.forEach(key => {
                const val = localStorage.getItem(key);
                payload.data[key] = val; // Store as raw string to preserve exact JSON structure
            });

            try {
                await db.collection("portal_data").doc(companyCode).set(payload);
                
                const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                const successMsg = `Son Yükleme: ${nowStr}`;
                
                localStorage.setItem("t_sync_last_status", successMsg);
                localStorage.setItem("t_sync_company_code", companyCode);
                updateSyncUI(companyCode, successMsg);

                alert(`"${companyCode}" kodlu bulut kaydı başarıyla güncellendi.`);
            } catch (err) {
                console.error("Firebase sync upload error:", err);
                updateStatusFn("Yükleme hatası!");
                alert("Buluta veri yüklenirken bir hata oluştu: " + err.message);
            } finally {
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

            try {
                const doc = await db.collection("portal_data").doc(companyCode).get();
                if (!doc.exists) {
                    updateStatusFn("Kayıt bulunamadı!");
                    alert(`"${companyCode}" koduna ait herhangi bir bulut kaydı bulunamadı. Lütfen kodu kontrol edin veya önce diğer cihazdan yükleme yapın.`);
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
                }
            } catch (err) {
                console.error("Firebase sync download error:", err);
                updateStatusFn("İndirme hatası!");
                alert("Buluttan veri çekilirken bir hata oluştu: " + err.message);
            } finally {
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
    });
})();

