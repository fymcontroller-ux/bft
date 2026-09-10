// Fiyat Listesi Module - Isolated Logic
(() => {
    const FiyatListesi = {
        init() {
            this.cacheElements();
            this.bindEvents();
            this.render();
        },

        cacheElements() {
            this.container = document.getElementById('price-list-container');
            this.searchInput = document.getElementById('price-list-search');
            this.categoryFilter = document.getElementById('price-list-category');
            this.previewButton = document.getElementById('btnPreviewPriceList');
        },

        bindEvents() {
            if (this.searchInput) {
                this.searchInput.addEventListener('input', () => this.render());
            }
            if (this.categoryFilter) {
                this.categoryFilter.addEventListener('change', () => this.render());
            }
            if (this.previewButton && !this.previewButton.dataset.bound) {
                this.previewButton.dataset.bound = "true";
                this.previewButton.addEventListener('click', () => this.openPreview());
            }
        },

        createPreviewElement() {
            if (!this.container) return null;

            const preview = this.container.cloneNode(true);
            preview.removeAttribute("id");
            preview.classList.add("price-list-preview-document");
            preview.querySelectorAll(".price-list-sort-controls, .price-list-cat-sort").forEach(element => element.remove());

            preview.querySelectorAll(".price-list-category-card").forEach(categoryCard => {
                categoryCard.style.borderRadius = "12px";
                categoryCard.style.overflow = "hidden";
                categoryCard.style.breakInside = "avoid";
                categoryCard.style.pageBreakInside = "avoid";

                categoryCard.querySelectorAll(".price-list-preview-product").forEach(productCard => {
                    productCard.style.borderRadius = "10px";
                    productCard.style.overflow = "hidden";
                    productCard.style.breakInside = "avoid";
                    productCard.style.pageBreakInside = "avoid";
                });

                const table = categoryCard.querySelector(".price-list-table");
                const rows = table ? table.querySelectorAll("tbody tr") : [];
                if (!table || !rows.length) return;

                const productCards = document.createElement("div");
                productCards.className = "price-list-preview-products";

                rows.forEach(row => {
                    const infoCell = row.querySelector(".product-info-cell");
                    const priceCell = row.querySelector(".product-price");
                    if (!infoCell || !priceCell) return;

                    const productCard = document.createElement("article");
                    productCard.className = "price-list-preview-product";
                    productCard.style.borderRadius = "10px";
                    productCard.style.overflow = "hidden";

                    const image = infoCell.querySelector(".price-list-product-image");
                    const text = infoCell.querySelector(".product-text-cell");

                    if (image) {
                        const imageClone = image.cloneNode(true);
                        imageClone.className = "price-list-preview-product-image";
                        productCard.appendChild(imageClone);
                    } else {
                        productCard.classList.add("no-image");
                    }

                    if (text) {
                        const textClone = text.cloneNode(true);
                        textClone.className = "price-list-preview-product-content";
                        productCard.appendChild(textClone);
                    }

                    const price = document.createElement("div");
                    price.className = "price-list-preview-product-price";
                    price.textContent = priceCell.textContent.trim();
                    productCard.appendChild(price);
                    productCards.appendChild(productCard);
                });

                table.replaceWith(productCards);
            });

            return preview;
        },

        openPreview() {
            const preview = this.createPreviewElement();
            if (!preview) return;

            if (typeof window.openDocumentPreviewModal === "function") {
                window.openDocumentPreviewModal(
                    preview,
                    "Fiyat_Listesi",
                    "Fiyat Listesi",
                    () => this.printPreview(),
                    "fiyatlistesi"
                );
            }
        },

        async downloadPreview(actionType = "download") {
            const downloadElement = this.createPreviewElement();
            if (!downloadElement) return;
            await this.createIndependentPDF(downloadElement, actionType);
        },

        async createIndependentPDF(element, actionType = "download") {
            if (this.isGeneratingPDF) return;
            if (typeof window.html2canvas !== "function") {
                window.showToast("PDF görüntü motoru yüklenemedi.", "error");
                return;
            }

            const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
            if (typeof jsPDF !== "function") {
                window.showToast("PDF dosya motoru yüklenemedi.", "error");
                return;
            }

            this.isGeneratingPDF = true;
            const loader = document.createElement("div");
            loader.style.cssText = "position: fixed; inset: 0; z-index: 99999999; display: flex; align-items: center; justify-content: center; background: rgba(10, 11, 16, 0.9); color: #ffffff; font: 600 1rem Outfit, sans-serif;";
            loader.textContent = "Fiyat listesi PDF'i hazırlanıyor...";
            document.body.appendChild(loader);

            const A4_WIDTH_MM = 210;
            const A4_HEIGHT_MM = 297;
            const PDF_MARGIN_MM = 6;
            const CONTENT_WIDTH_MM = A4_WIDTH_MM - (PDF_MARGIN_MM * 2);
            const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - (PDF_MARGIN_MM * 2);
            const clonedElement = element.cloneNode(true);
            clonedElement.classList.add("price-list-independent-pdf");
            clonedElement.style.width = `${CONTENT_WIDTH_MM}mm`;
            clonedElement.style.maxWidth = "none";
            clonedElement.style.margin = "0";
            clonedElement.style.padding = "0";
            clonedElement.style.boxSizing = "border-box";
            clonedElement.querySelectorAll(".price-list-category-card").forEach(card => {
                card.style.width = "100%";
                card.style.maxWidth = "none";
                card.style.margin = "0";
                card.style.boxSizing = "border-box";
            });

            // html2canvas object-fit desteklemez — resimleri sarmalayıcı div ile düzelt.
            // Resim kendi doğal oranında, max boyutla kısıtlanmış şekilde ortalanır.
            clonedElement.querySelectorAll(".price-list-preview-product-image").forEach(img => {
                const wrapper = document.createElement("div");
                // Border wrapper'da — img inline style border'ı ezmesin diye
                wrapper.style.cssText = "width:140px; height:120px; display:flex; align-items:center; justify-content:center; overflow:hidden; border:1px solid #cbd5e1; border-radius:6px; background:#ffffff; flex-shrink:0;";
                img.style.cssText = "max-width:138px; max-height:118px; width:auto; height:auto; display:block; object-fit:unset; border:none; border-radius:0; background:none;";
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            });

            const captureHost = document.createElement("div");
            captureHost.style.cssText = `position: fixed; left: -10000px; top: 0; width: ${CONTENT_WIDTH_MM}mm; background: #ffffff; overflow: visible;`;
            captureHost.appendChild(clonedElement);
            document.body.appendChild(captureHost);

            try {
                // Resimlerin tam yüklenmesi için bekle
                await Promise.all(
                    Array.from(clonedElement.querySelectorAll("img")).map(img =>
                        img.complete ? Promise.resolve() : new Promise(res => { img.onload = res; img.onerror = res; })
                    )
                );
                await new Promise(resolve => setTimeout(resolve, 150));
                // Tüm elementi tek canvas'a çek — oran bütünlüğü garantili
                const fullCanvas = await window.html2canvas(clonedElement, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#ffffff",
                    letterRendering: true,
                    scrollX: 0,
                    scrollY: 0
                });

                // Canvas px → mm dönüşüm katsayısı (tek kaynaktan, hiç bozulma yok)
                const PX_TO_MM = CONTENT_WIDTH_MM / fullCanvas.width;

                const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
                const PAGE_GAP_MM = 3; // Kartlar arası dikey boşluk

                // Tablo bütünlüğü koruması: Her kartın DOM pozisyonunu al,
                // ana canvas'tan crop et — oran mükemmel korunur.
                const hostRect = captureHost.getBoundingClientRect();
                const categoryCards = clonedElement.querySelectorAll(".price-list-category-card");
                const cardList = categoryCards.length > 0 ? Array.from(categoryCards) : [clonedElement];

                let currentPageUsedMm = 0;
                let pageNumber = 0;

                for (let ci = 0; ci < cardList.length; ci++) {
                    const cardRect = cardList[ci].getBoundingClientRect();

                    // Kartın ana canvas içindeki piksel koordinatları (scale:2 ile)
                    const cropY = Math.round((cardRect.top - hostRect.top) * 2);
                    const cropH = Math.round(cardRect.height * 2);
                    const clampedCropH = Math.min(cropH, fullCanvas.height - cropY);
                    if (clampedCropH <= 0) continue;

                    const cardHeightMm = clampedCropH * PX_TO_MM;

                    // Kart A4'ten yüksekse satır satır böl (zorunlu kırılma)
                    if (cardHeightMm > CONTENT_HEIGHT_MM) {
                        const chunkHeightPx = Math.floor(CONTENT_HEIGHT_MM / PX_TO_MM);
                        for (let offsetY = 0; offsetY < clampedCropH; offsetY += chunkHeightPx) {
                            const chunkH = Math.min(chunkHeightPx, clampedCropH - offsetY);
                            const chunkCanvas = document.createElement("canvas");
                            chunkCanvas.width = fullCanvas.width;
                            chunkCanvas.height = chunkH;
                            const ctx = chunkCanvas.getContext("2d");
                            ctx.fillStyle = "#ffffff";
                            ctx.fillRect(0, 0, chunkCanvas.width, chunkCanvas.height);
                            ctx.drawImage(fullCanvas, 0, cropY + offsetY, fullCanvas.width, chunkH, 0, 0, fullCanvas.width, chunkH);
                            if (pageNumber > 0 || currentPageUsedMm > 0) { pdf.addPage("a4", "portrait"); }
                            const chunkMm = chunkH * PX_TO_MM;
                            pdf.addImage(chunkCanvas.toDataURL("image/jpeg", 0.98), "JPEG", PDF_MARGIN_MM, PDF_MARGIN_MM, CONTENT_WIDTH_MM, chunkMm, undefined, "FAST");
                            pageNumber++;
                            currentPageUsedMm = (chunkH < chunkHeightPx) ? PDF_MARGIN_MM + chunkMm : CONTENT_HEIGHT_MM;
                        }
                        continue;
                    }

                    // Mevcut sayfada yeterli alan yoksa yeni sayfa aç
                    const neededMm = currentPageUsedMm > 0 ? cardHeightMm + PAGE_GAP_MM : cardHeightMm;
                    if (currentPageUsedMm + neededMm > CONTENT_HEIGHT_MM + PDF_MARGIN_MM) {
                        pdf.addPage("a4", "portrait");
                        pageNumber++;
                        currentPageUsedMm = PDF_MARGIN_MM;
                    }

                    const posY = currentPageUsedMm > 0 ? currentPageUsedMm : PDF_MARGIN_MM;

                    // Ana canvas'tan bu kartın slice'ını crop et
                    const cropCanvas = document.createElement("canvas");
                    cropCanvas.width = fullCanvas.width;
                    cropCanvas.height = clampedCropH;
                    const cropCtx = cropCanvas.getContext("2d");
                    cropCtx.fillStyle = "#ffffff";
                    cropCtx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);
                    cropCtx.drawImage(fullCanvas, 0, cropY, fullCanvas.width, clampedCropH, 0, 0, fullCanvas.width, clampedCropH);

                    pdf.addImage(cropCanvas.toDataURL("image/jpeg", 0.98), "JPEG", PDF_MARGIN_MM, posY, CONTENT_WIDTH_MM, cardHeightMm, undefined, "FAST");
                    if (pageNumber === 0) pageNumber = 1;
                    currentPageUsedMm = posY + cardHeightMm + PAGE_GAP_MM;
                }

                const pdfBlob = pdf.output("blob");
                const pdfFile = new File([pdfBlob], "Fiyat_Listesi.pdf", { type: "application/pdf" });
                let shared = false;

                if (actionType === "share" && navigator.canShare?.({ files: [pdfFile] })) {
                    try {
                        await navigator.share({ files: [pdfFile], title: "Fiyat Listesi" });
                        shared = true;
                    } catch (error) {
                        if (error?.name !== "AbortError") console.warn("Fiyat listesi paylaşım hatası:", error);
                    }
                }

                if (!shared) {
                    const url = URL.createObjectURL(pdfBlob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "Fiyat_Listesi.pdf";
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    setTimeout(() => URL.revokeObjectURL(url), 2000);
                }

                window.showToast(shared ? "Fiyat listesi paylaşıldı." : "Fiyat listesi PDF olarak indirildi.", "success");
            } catch (error) {
                console.error("Fiyat listesi PDF oluşturma hatası:", error);
                window.showToast("Fiyat listesi PDF'i oluşturulamadı.", "error");
            } finally {
                captureHost.remove();
                loader.remove();
                this.isGeneratingPDF = false;
            }
        },

        printPreview() {
            const printElement = this.createPreviewElement();
            if (!printElement) return;

            printElement.id = "priceListPrintOverlayContainer";
            printElement.classList.add("price-list-pdf-export");
            document.body.appendChild(printElement);
            document.body.classList.add("price-list-print-active");

            const cleanup = () => {
                printElement.remove();
                document.body.classList.remove("price-list-print-active");
            };

            window.addEventListener("afterprint", cleanup, { once: true });
            window.print();
        },

        getFilteredData() {
            const catalog = JSON.parse(localStorage.getItem("t_product_catalog")) || {};
            const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : "";
            const selectedCategory = this.categoryFilter ? this.categoryFilter.value : "All";

            let results = [];

            for (const [category, products] of Object.entries(catalog)) {
                if (selectedCategory !== "All" && category !== selectedCategory) continue;

                const filteredProducts = products.filter(p => {
                    // Only show products marked for price list
                    const isMarked = p.showInPriceList === true;
                    const matchesSearch = p.name.toLowerCase().includes(searchTerm);
                    return isMarked && matchesSearch;
                });

                filteredProducts.forEach(p => {
                    results.push({ ...p, category });
                });
            }
            return results;
        },

        render() {
            if (!this.container) return;

            const catalog = JSON.parse(localStorage.getItem("t_product_catalog")) || {};
            const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : "";
            const selectedCategory = this.categoryFilter ? this.categoryFilter.value : "All";

            let hasContent = false;
            let html = "";

            const categories = Object.keys(catalog);

            categories.forEach((category, catIndex) => {
                if (selectedCategory !== "All" && category !== selectedCategory) return;

                const products = catalog[category];
                const filteredProducts = products.filter(p => {
                    const isMarked = p.showInPriceList === true;
                    const matchesSearch = p.name.toLowerCase().includes(searchTerm);
                    return isMarked && matchesSearch;
                });

                if (filteredProducts.length === 0) return;
                hasContent = true;

                html += `
                    <div class="price-list-category-card">
                        <div class="price-list-card-header">
                            <div style="display: flex; align-items: center; gap: 0.8rem;">
                                <div class="price-list-cat-sort">
                                    <button class="sort-btn" onclick="window.movePriceCategory(${catIndex}, -1)" ${catIndex === 0 ? 'disabled' : ''} title="Kategoriyi Yukarı Taşı">
                                        <i class="fa-solid fa-chevron-up"></i>
                                    </button>
                                    <button class="sort-btn" onclick="window.movePriceCategory(${catIndex}, 1)" ${catIndex === categories.length - 1 ? 'disabled' : ''} title="Kategoriyi Aşağı Taşı">
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                                </div>
                                <h3 style="margin:0;"><i class="fa-solid fa-folder"></i> ${category}</h3>
                            </div>
                            <span class="product-count">${filteredProducts.length} Ürün</span>
                        </div>
                        <div class="price-list-card-body">
                            <table class="price-list-table">
                                <thead>
                                    <tr>
                                        <th style="width: 50px; text-align: center;">Sıra</th>
                                        <th>Ürün Adı</th>
                                        <th style="text-align: right;">Birim Fiyat</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

                filteredProducts.forEach((item) => {
                    const actualIndex = products.findIndex(p => p.name === item.name);
                    
                    html += `
                        <tr class="price-list-item-row">
                            <td style="text-align: center; white-space: nowrap;">
                                <div class="price-list-sort-controls">
                                    <button class="sort-btn" onclick="window.movePriceListItem('${category}', ${actualIndex}, -1)" ${actualIndex === 0 ? 'disabled' : ''} title="Yukarı Taşı">
                                        <i class="fa-solid fa-chevron-up"></i>
                                    </button>
                                    <button class="sort-btn" onclick="window.movePriceListItem('${category}', ${actualIndex}, 1)" ${actualIndex === products.length - 1 ? 'disabled' : ''} title="Aşağı Taşı">
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="product-info-cell">
                                    ${item.image ? `<img class="price-list-product-image" src="${item.image}" alt="${item.name}">` : ''}
                                    <div class="product-text-cell">
                                        <div class="product-name">${item.name}</div>
                                        ${item.description ? `<div class="product-description">${item.description}</div>` : ''}
                                    </div>
                                </div>
                            </td>
                            <td class="product-price" style="text-align: right;">${item.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} $</td>
                        </tr>
                    `;
                });

                html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            });

            if (!hasContent) {
                this.container.innerHTML = `
                    <div class="price-list-empty">
                        <i class="fa-solid fa-box-open"></i>
                        <p>Gösterilecek ürün bulunamadı. Lütfen katalog yönetiminden ürünleri işaretleyin.</p>
                    </div>
                `;
                return;
            }

            this.container.innerHTML = html;
        },

        moveItem(category, index, direction) {
            const catalog = JSON.parse(localStorage.getItem("t_product_catalog")) || {};
            const products = catalog[category];
            
            if (!products || index < 0 || index >= products.length) return;

            const targetIdx = index + direction;
            if (targetIdx < 0 || targetIdx >= products.length) return;

            // Swap in original array
            [products[index], products[targetIdx]] = [products[targetIdx], products[index]];
            
            localStorage.setItem("t_product_catalog", JSON.stringify(catalog));
            this.render();
        },

        moveCategory(index, direction) {
            const catalog = JSON.parse(localStorage.getItem("t_product_catalog")) || {};
            const categories = Object.keys(catalog);
            
            if (index < 0 || index >= categories.length) return;

            const targetIdx = index + direction;
            if (targetIdx < 0 || targetIdx >= categories.length) return;

            const newCatalog = {};
            const sortedCategories = [...categories];
            [sortedCategories[index], sortedCategories[targetIdx]] = [sortedCategories[targetIdx], sortedCategories[index]];

            sortedCategories.forEach(cat => {
                newCatalog[cat] = catalog[cat];
            });

            localStorage.setItem("t_product_catalog", JSON.stringify(newCatalog));
            this.render();
        }
    };

    // Initialize when the section becomes active
    document.addEventListener('DOMContentLoaded', () => {
        // We wrap the render in a function that can be called by the section switcher
        window.renderFiyatListesi = () => FiyatListesi.render();
        window.movePriceListItem = (category, index, direction) => FiyatListesi.moveItem(category, index, direction);
        window.movePriceCategory = (index, direction) => FiyatListesi.moveCategory(index, direction);
        window.downloadPriceListPreview = () => FiyatListesi.downloadPreview("download");
        window.sharePriceListPreview = () => FiyatListesi.downloadPreview("share");
        
        // Also integrate with the existing switchPortalSection logic
        const originalSwitch = window.switchPortalSection;
        if (originalSwitch) {
            window.switchPortalSection = function(sectionId) {
                originalSwitch(sectionId);
                if (sectionId === 'fiyatlistesi-sec') {
                    FiyatListesi.init();
                }
            };
        } else {
            // If switchPortalSection isn't global yet, we'll handle it via a simple interval or mutation observer
            // but usually it is global in this project structure.
            FiyatListesi.init();
        }
    });
})();
