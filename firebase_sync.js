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
        const inputCode = document.getElementById("syncCompanyCode");
        const btnUpload = document.getElementById("btnUploadToCloud");
        const btnDownload = document.getElementById("btnDownloadFromCloud");
        const statusEl = document.getElementById("syncStatus");

        if (!inputCode || !btnUpload || !btnDownload || !statusEl) return;

        // Restore saved company code from LocalStorage
        const savedCode = localStorage.getItem("t_sync_company_code");
        if (savedCode) {
            inputCode.value = savedCode;
        }

        // Restore last sync status message
        const lastSyncMsg = localStorage.getItem("t_sync_last_status");
        if (lastSyncMsg) {
            statusEl.textContent = lastSyncMsg;
        }

        btnUpload.addEventListener("click", async () => {
            const companyCode = inputCode.value.trim().toLowerCase();
            if (!companyCode) {
                alert("Lütfen geçerli bir şirket/cihaz kodu girin.");
                return;
            }

            btnUpload.disabled = true;
            btnUpload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yükleniyor';
            statusEl.textContent = "Veriler buluta gönderiliyor...";

            const payload = {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                data: {}
            };

            storageKeys.forEach(key => {
                const val = localStorage.getItem(key);
                payload.data[key] = val; // Store as raw string to avoid parse errors and preserve exact structure
            });

            try {
                await db.collection("portal_data").doc(companyCode).set(payload);
                
                const nowStr = new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString("tr-TR");
                const successMsg = `Son Yükleme: ${nowStr}`;
                statusEl.textContent = successMsg;
                localStorage.setItem("t_sync_last_status", successMsg);
                localStorage.setItem("t_sync_company_code", companyCode);

                alert(`"${companyCode}" kodlu bulut kaydı başarıyla güncellendi.`);
            } catch (err) {
                console.error("Firebase sync upload error:", err);
                statusEl.textContent = "Yükleme hatası!";
                alert("Buluta veri yüklenirken bir hata oluştu: " + err.message);
            } finally {
                btnUpload.disabled = false;
                btnUpload.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Yükle';
            }
        });

        btnDownload.addEventListener("click", async () => {
            const companyCode = inputCode.value.trim().toLowerCase();
            if (!companyCode) {
                alert("Lütfen geçerli bir şirket/cihaz kodu girin.");
                return;
            }

            if (!confirm(`Buluttaki veriler çekildiğinde bu tarayıcıdaki tüm kayıtlar ezilecektir. Devam etmek istiyor musunuz?`)) {
                return;
            }

            btnDownload.disabled = true;
            btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İndiriliyor';
            statusEl.textContent = "Veriler buluttan çekiliyor...";

            try {
                const doc = await db.collection("portal_data").doc(companyCode).get();
                if (!doc.exists) {
                    statusEl.textContent = "Kayıt bulunamadı!";
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
                    statusEl.textContent = successMsg;
                    localStorage.setItem("t_sync_last_status", successMsg);
                    localStorage.setItem("t_sync_company_code", companyCode);

                    alert(`Veriler buluttan başarıyla indirildi! Portal güncelleniyor...`);
                    location.reload();
                } else {
                    alert("Kayıtlı veri şablonu hatalı.");
                }
            } catch (err) {
                console.error("Firebase sync download error:", err);
                statusEl.textContent = "İndirme hatası!";
                alert("Buluttan veri çekilirken bir hata oluştu: " + err.message);
            } finally {
                btnDownload.disabled = false;
                btnDownload.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Çek';
            }
        });
    });
})();
