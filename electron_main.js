const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { exec } = require('child_process');

app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
app.commandLine.appendSwitch('disable-site-isolation-trials');

let isQuitting = false;
let mainWindow = null;

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function createWindow() {
    mainWindow = new BrowserWindow({
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
            spellcheck: false
        }
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('close', async (event) => {
        if (!isQuitting) {
            event.preventDefault();
            try {
                const hasPending = await mainWindow.webContents.executeJavaScript(`
                    (window.hasPendingSync && window.hasPendingSync()) ? true : false
                `);

                if (hasPending) {
                    await mainWindow.webContents.executeJavaScript(`
                        if (window.showExitSavingOverlay) window.showExitSavingOverlay();
                        if (window.flushPendingSync) window.flushPendingSync();
                    `);
                    await new Promise(resolve => setTimeout(resolve, 1800));
                }
            } catch (err) {
                console.error('Window close exit save error:', err);
            } finally {
                isQuitting = true;
                mainWindow.close();
            }
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

async function fetchLatestReleaseDownloadUrl() {
    try {
        const apiUrl = 'https://api.github.com/repos/bft-yonetim-portali/bft-yonetim-portali/releases/latest';
        const response = await fetch(apiUrl, {
            headers: { 'User-Agent': 'BFT-Portal-Updater' }
        });

        if (!response.ok) {
            throw new Error(`GitHub API hatası: ${response.status}`);
        }

        const data = await response.json();
        const asset = (data.assets || []).find((item) => item.name && item.name.toLowerCase().endsWith('.exe'));

        if (!asset || !asset.browser_download_url) {
            throw new Error('Yeni sürüm kurulum dosyası bulunamadı.');
        }

        return asset.browser_download_url;
    } catch (err) {
        console.error('fetchLatestReleaseDownloadUrl error:', err);
        throw err;
    }
}

async function downloadFileWithProgress(url, dest) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        let progressInterval = null;
        let fileStream = null;

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

            const totalSize = Number(res.headers['content-length'] || 0);
            let downloadedBytes = 0;

            progressInterval = setInterval(() => {
                try {
                    const currentStats = fs.existsSync(dest) ? fs.statSync(dest) : null;
                    if (!currentStats) return;

                    const currentSize = currentStats.size;
                    let progressPercent = 0;

                    if (totalSize > 0) {
                        progressPercent = Math.min((currentSize / totalSize) * 100, 98);
                    } else {
                        progressPercent = Math.min(50 + (currentSize / 12000) * 50, 98);
                    }

                    if (mainWindow && mainWindow.webContents.isReady()) {
                        mainWindow.webContents.send('update-download-progress', {
                            percent: Math.round(progressPercent),
                            currentSize,
                            totalSize,
                            formattedSize: formatFileSize(currentSize)
                        });
                    }
                } catch (err) {
                    console.warn('Progress check error:', err.message);
                }
            }, 1500);

            fileStream = fs.createWriteStream(dest);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                clearInterval(progressInterval);
                const finalStats = fs.statSync(dest);

                if (mainWindow && mainWindow.webContents.isReady()) {
                    mainWindow.webContents.send('update-download-progress', {
                        percent: 100,
                        currentSize: finalStats.size,
                        totalSize: totalSize || finalStats.size,
                        formattedSize: formatFileSize(finalStats.size)
                    });
                }

                resolve(dest);
            });

            fileStream.on('error', (err) => {
                clearInterval(progressInterval);
                if (fs.existsSync(dest)) {
                    fs.unlinkSync(dest);
                }
                reject(err);
            });

            res.on('data', (chunk) => {
                downloadedBytes += chunk.length;
            });
        });

        req.on('error', (err) => {
            clearInterval(progressInterval);
            if (fileStream) {
                fileStream.destroy();
            }
            if (fs.existsSync(dest)) {
                fs.unlinkSync(dest);
            }
            reject(err);
        });

        req.setTimeout(30000, () => {
            clearInterval(progressInterval);
            req.destroy();
            if (fileStream) {
                fileStream.destroy();
            }
            if (fs.existsSync(dest)) {
                fs.unlinkSync(dest);
            }
            reject(new Error('İndirme işlemi zaman aşımına uğradı.'));
        });
    });
}

ipcMain.handle('download-and-install-update', async (event, downloadUrl) => {
    const targetWindow = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0] || mainWindow;

    if (!targetWindow) {
        throw new Error('Ana pencere bulunamadı.');
    }

    try {
        const resolvedDownloadUrl = downloadUrl || await fetchLatestReleaseDownloadUrl();
        const filePath = path.join(app.getPath('temp'), 'BFT_Yonetim_Portali_Update.exe');

        targetWindow.webContents.send('update-download-progress', {
            percent: 10,
            status: 'İndirme başlıyor...'
        });

        await downloadFileWithProgress(resolvedDownloadUrl, filePath);

        const stats = fs.statSync(filePath);
        if (stats.size < 500000) {
            throw new Error('İndirilen kurulum dosyası geçersiz veya bozuk.');
        }

        targetWindow.webContents.send('update-download-progress', {
            percent: 50,
            status: 'Kurulum hazırlanıyor...',
            currentSize: stats.size,
            totalSize: stats.size,
            formattedSize: formatFileSize(stats.size)
        });

        isQuitting = true;
        exec(`"${filePath}"`, (err) => {
            if (err) {
                console.error('Exec update error:', err);
            }
        });

        targetWindow.webContents.send('update-download-progress', {
            percent: 75,
            status: 'Kurulum tamamlanıyor...'
        });

        setTimeout(() => {
            app.quit();
        }, 1500);

        return { success: true };
    } catch (err) {
        console.error('Update install failed:', err);
        targetWindow.webContents.send('update-download-progress', {
            percent: 0,
            status: 'İndirme başarısız: ' + err.message,
            isError: true
        });
        return { success: false, error: err.message };
    }
});

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