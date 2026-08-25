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

// IPC Listener for Auto-Updater
ipcMain.handle('download-and-install-update', async (event, downloadUrl) => {
    try {
        if (!downloadUrl) throw new Error("İndirme bağlantısı bulunamadı.");

        const tempDir = app.getPath('temp');
        const filePath = path.join(tempDir, 'BFT_Yonetim_Portali_Update.exe');

        // Helper for recursive HTTP/HTTPS download with redirect support
        const downloadFile = (url, dest, maxRedirects = 5) => {
            return new Promise((resolve, reject) => {
                if (maxRedirects <= 0) return reject(new Error("Çok fazla yönlendirme (Too many redirects)."));

                const client = url.startsWith('https') ? https : http;
                const req = client.get(url, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        let redirectUrl = res.headers.location;
                        if (!redirectUrl.startsWith('http')) {
                            const u = new URL(url);
                            redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
                        }
                        return downloadFile(redirectUrl, dest, maxRedirects - 1).then(resolve).catch(reject);
                    }

                    if (res.statusCode !== 200) {
                        return reject(new Error(`İndirme sunucu hatası (HTTP ${res.statusCode}).`));
                    }

                    const fileStream = fs.createWriteStream(dest);
                    res.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close(() => resolve(dest));
                    });
                    fileStream.on('error', (err) => {
                        fs.unlink(dest, () => {});
                        reject(err);
                    });
                });

                req.on('error', (err) => {
                    fs.unlink(dest, () => {});
                    reject(err);
                });
            });
        };

        await downloadFile(downloadUrl, filePath);

        // Verify downloaded file size > 1MB
        const stats = fs.statSync(filePath);
        if (stats.size < 500000) {
            throw new Error("İndirilen kurulum dosyası geçersiz veya bozuk.");
        }

        // Launch installer and exit current app
        const { shell } = require('electron');
        isQuitting = true;
        
        exec(`"${filePath}"`, (err) => {
            if (err) console.error("Exec update error:", err);
        });

        setTimeout(() => {
            app.quit();
        }, 1200);

        return { success: true };
    } catch (err) {
        console.error("Auto update download failed:", err);
        return { success: false, error: err.message };
    }
});

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
