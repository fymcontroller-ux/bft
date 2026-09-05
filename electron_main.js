const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { exec } = require('child_process');

// Fix Chromium Windows Occlusion bug (Prevents input focus locking when window occlusion status desyncs on Windows)
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
app.commandLine.appendSwitch('disable-site-isolation-trials');

let isQuitting = false;

// IPC Listener for Auto-Updater with Progress Tracking
ipcMain.handle('download-and-install-update', async (event, downloadUrl) => {
    try {
        if (!downloadUrl) throw new Error("İndirme bağlantısı bulunamadı.");

        const tempDir = app.getPath('temp');
        const filePath = path.join(tempDir, 'BFT_Yonetim_Portali_Update.exe');
        const mainWindow = BrowserWindow.getFocusedWindow();

        // Helper for recursive HTTP/HTTPS download with progress tracking
        const downloadFileWithProgress = async (url, dest) => {
            return new Promise((resolve, reject) => {
                const client = url.startsWith('https') ? https : http;
                const req = client.get(url, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        let redirectUrl = res.headers.location;
                        if (!redirectUrl.startsWith('http')) {
                            const u = new URL(url);
                            redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
                        }
                        return downloadFileWithProgress(redirectUrl, dest).then(resolve).catch(reject);
                    }

                    if (res.statusCode !== 200) {
                        return reject(new Error(`İndirme sunucu hatası (HTTP ${res.statusCode}).`));
                    }

                    // Get total file size for progress calculation
                    const totalSize = res.headers['content-length'] || 0;
                    let downloadedBytes = 0;
                    let progressInterval = null;

                    // Start progress polling (update every ~2 seconds)
                    progressInterval = setInterval(() => {
                        try {
                            const currentStats = fs.statSync(dest);
                            if (!currentStats) throw new Error("Dosya bulunamadı.");
                            
                            const currentSize = currentStats.size;
                            let progressPercent = 0;
                            
                            if (totalSize > 0) {
                                progressPercent = Math.min((currentSize / totalSize) * 100, 98); // Don't show 100% yet
                            } else {
                                // Estimate based on file existence and size growth
                                progressPercent = Math.min(50 + (currentSize / 10000) * 50, 98);
                            }

                            // Send progress to renderer
                            if (mainWindow && mainWindow.webContents.isReady()) {
                                mainWindow.webContents.send('update-download-progress', {
                                    percent: Math.round(progressPercent),
                                    currentSize,
                                    totalSize
                                });
                            }
                        } catch (err) {
                            console.warn("Progress check error:", err.message);
                        }
                    }, 1500);

                    const fileStream = fs.createWriteStream(dest);
                    res.pipe(fileStream);

                    fileStream.on('finish', () => {
                        clearInterval(progressInterval);
                        const finalStats = fs.statSync(dest);
                        
                        // Final progress at 100%
                        if (mainWindow && mainWindow.webContents.isReady()) {
                            mainWindow.webContents.send('update-download-progress', {
                                percent: 100,
                                currentSize: finalStats.size,
                                totalSize
                            });
                        }

                        resolve(dest);
                    });

                    fileStream.on('error', (err) => {
                        clearInterval(progressInterval);
                        fs.unlink(dest, () => {});
                        reject(err);
                    });
                });

                req.on('error', (err) => {
                    clearInterval(progressInterval);
                    fs.unlink(dest, () => {});
                    reject(err);
                });

                // Set up abort controller for timeout handling
                req.setTimeout(30 * 1000, () => {
                    clearInterval(progressInterval);
                    res.destroy();
                    fileStream.destroy();
                    reject(new Error("İndirme işlemi zaman aşımına uğradı."));
                });
            });
        };

        // Show download overlay with progress tracking via IPC
        const showOverlayMessage = (text, iconHtml, showProgress = false) => {
            if (!mainWindow) return;
            
            mainWindow.webContents.send('update-overlay-update', {
                text,
                iconHtml,
                showProgress,
                title: 'Yeni Sürüm Yükleniyor...'
            });
        };

        // Download and install update with visual feedback
        const downloadPromise = (async () => {
            try {
                // Initial status messages
                await renderOverlay('Yeni sürüm indiriliyor...', '<i class="fa-solid fa-circle-notch spin-icon"></i>');
                
                await new Promise(resolve => setTimeout(resolve, 1000));

                await renderOverlay(
                    'İndirme başladı...', 
                    '<div class="update-install-spinner"></div>',
                    true
                );
                
                // Download with progress
                await downloadFileWithProgress(downloadUrl, filePath);

                // File downloaded successfully
                const stats = fs.statSync(filePath);
                
                // Send completion signal to renderer
                mainWindow.webContents.send('update-download-progress', {
                    percent: 100,
                    currentSize: stats.size,
                    totalSize: stats.size
                });
                
                await new Promise(resolve => setTimeout(resolve, 800));

                // Verify downloaded file size > 1MB
                if (stats.size < 500000) {
                    throw new Error("İndirilen kurulum dosyası geçersiz veya bozuk.");
                }

                // Start installation
                mainWindow.webContents.send('update-download-progress', {
                    percent: 50,
                    status: 'Kurulum başlatılıyor...',
                    currentSize: stats.size
                });
                
                // Launch installer and exit current app
                const { shell } = require('electron');
                isQuitting = true;
                
                exec(`"${filePath}"`, (err) => {
                    if (err) console.error("Exec update error:", err);
                });

                mainWindow.webContents.send('update-download-progress', {
                    percent: 75,
                    status: 'Kurulum tamamlanıyor...'
                });

                setTimeout(() => {
                    app.quit();
                }, 1500);

                return { success: true };
            } catch (err) {
                // Handle download errors - send error to renderer
                console.error("Auto update download failed:", err);
                
                // Retry attempt for timeout/connection errors
                if (err.message.includes('timeout') || err.message.includes('zaman aşımı') || 
                    err.message.includes('ETIMEDOUT') || err.message.includes('ENOTFOUND')) {
                    
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    
                    // Retry the download
                    return await downloadFileWithProgress(downloadUrl, filePath).then(async () => {
                        const retryStats = fs.statSync(filePath);
                        
                        // Success! Send completion signal
                        mainWindow.webContents.send('update-download-progress', {
                            percent: 100,
                            currentSize: retryStats.size,
                            totalSize: retryStats.size
                        });
                        
                        isQuitting = true;
                        exec(`"${filePath}"`);
                        
                        setTimeout(() => {
                            app.quit();
                        }, 1000);
                        
                        return { success: true };
                    }).catch(finalErr => {
                        console.error("Retry also failed:", finalErr.message);
                        throw finalErr;
                    });
                }

                // Other errors - show error message
                mainWindow.webContents.send('update-download-progress', {
                    percent: 0,
                    status: 'İndirme başarısız: ' + err.message,
                    isError: true
                });
                
                throw err;
            }
        })();

        // Utility function to format file size
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Wait for download to complete and handle result
        await downloadPromise();

        return { success: true };
    } catch (err) {
        console.error("Critical update error:", err);
        return { success: false, error: err.message };
    }
});

function createWindow() {

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1366,
        height: 850,
        minWidth: 1024,
        minHeight: 700,
        title: 'BFT Yönetim Portalı',
        icon: path.join(__dirname, 'bft_logo.png'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            spellcheck: false // Disables Electron background spellchecker thread that locks input caret on Windows
        }
    });

    // Clean empty menu bar without destroying Win32 keyboard accelerator chain
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));

    // Load the main index.html file
    mainWindow.loadFile('index.html');

    // Safe exit handler: show exit saving notification and flush pending uploads before closing
    mainWindow.on('close', async (e) => {
        if (!isQuitting) {
            e.preventDefault();
            try {
                // Check if renderer has pending cloud sync
                const hasPending = await mainWindow.webContents.executeJavaScript(`
                    (window.hasPendingSync && window.hasPendingSync()) ? true : false
                `);

                if (hasPending) {
                    // Show "Lütfen Bekleyiniz" overlay and trigger immediate upload
                    await mainWindow.webContents.executeJavaScript(`
                        if (window.showExitSavingOverlay) window.showExitSavingOverlay();
                        if (window.flushPendingSync) window.flushPendingSync();
                    `);
                    // Wait for Firestore network write to finalize
                    await new Promise(resolve => setTimeout(resolve, 1800));
                }
            } catch (err) {
                console.error("Window close exit save error:", err);
            } finally {
                isQuitting = true;
                mainWindow.close();
            }
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
