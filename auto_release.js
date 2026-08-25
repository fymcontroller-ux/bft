const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

process.on('uncaughtException', (err) => {
    console.error("\n❌ Ağ veya Bağlantı Hatası:", err.message || err);
    console.log("Lütfen internet bağlantınızı kontrol edip tekrar deneyin.\n");
    process.exit(1);
});

console.log("=======================================================");
console.log("🚀 BFT PORTAL TEK TIKLA SÜRÜM DERLEME VE YAYINLAMA");
console.log("=======================================================\n");

// ADIM 1: Versiyon Numarası Yükseltiliyor (+1 Patch)
console.log("📌 ADIM 1: Versiyon Numarası Yükseltiliyor...");
const packagePath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const oldVersion = pkg.version || "1.0.0";

const parts = oldVersion.split('.').map(Number);
parts[2] = (parts[2] || 0) + 1; // Increment patch version
const newVersion = parts.join('.');

pkg.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');

// firebase_sync.js versiyon güncelleme
const syncPath = path.join(__dirname, 'firebase_sync.js');
let syncContent = fs.readFileSync(syncPath, 'utf8');
syncContent = syncContent.replace(/const CURRENT_APP_VERSION = "[^"]+";/, `const CURRENT_APP_VERSION = "${newVersion}";`);
fs.writeFileSync(syncPath, syncContent, 'utf8');

console.log(`✅ Versiyon yükseltildi: v${oldVersion} ➔ v${newVersion}\n`);

// ADIM 2: dist\ Klasörü Temizleniyor
console.log("🧹 ADIM 2: dist\\ Klasörü ve Eski Kalıntıları Temizleniyor...");
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    try {
        fs.rmSync(distDir, { recursive: true, force: true });
        console.log("✅ Eski derleme kalıntıları temizlendi.");
    } catch (e) {
        console.warn("⚠️ dist/ temizlenirken bir uyarı alındı:", e.message);
    }
}
fs.mkdirSync(distDir, { recursive: true });
console.log("");

// ADIM 3: Otomatik Derleme (.exe)
console.log(`⚙️ ADIM 3: Masaüstü Uygulaması (.exe) Derleniyor (npx electron-builder)...`);
console.log("Lütfen bekleyiniz, bu işlem 30-45 saniye sürebilir...\n");

try {
    execSync('npx electron-builder --win nsis', { stdio: 'inherit', cwd: __dirname });
    console.log(`\n✅ Masaüstü uygulaması (.exe) başarıyla derlendi!\n`);
} catch (err) {
    console.error("\n❌ HATA: .exe derlemesi sırasında bir sorun oluştu!");
    process.exit(1);
}

const exeFileName = `BFT_Yonetim_Portali_Setup_v${newVersion}.exe`;
const exeFilePath = path.join(__dirname, 'dist', exeFileName);

if (!fs.existsSync(exeFilePath)) {
    console.error(`❌ HATA: Derlenen dosya bulunamadı: ${exeFilePath}`);
    process.exit(1);
}

// ADIM 4: GitHub'daki Eski Versiyonlar Siliniyor
const repoTarget = "fymcontroller-ux/bft";
console.log(`🗑️ ADIM 4: GitHub (${repoTarget}) Üzerindeki Eski Sürümler Temizleniyor...`);
try {
    const rawList = execSync(`gh release list --repo ${repoTarget} --json tagName`, { encoding: 'utf8' });
    const releaseList = JSON.parse(rawList || '[]');
    for (const item of releaseList) {
        if (item.tagName) {
            console.log(`  └─ Eski release siliniyor: ${item.tagName}`);
            try {
                execSync(`gh release delete ${item.tagName} --repo ${repoTarget} --yes --cleanup-tag`, { stdio: 'inherit' });
            } catch (errDel) {
                console.warn(`  ⚠️ ${item.tagName} silinirken hata (devam ediliyor):`, errDel.message);
            }
        }
    }
    console.log("✅ Eski sürümler GitHub'dan temizlendi.\n");
} catch (errList) {
    console.warn("⚠️ GitHub release listesi alınırken uyarı (devam ediliyor):", errList.message);
}

// ADIM 5: Yeni Release Oluşturuluyor ve .exe Yükleniyor
const releaseTag = `v${newVersion}`;
const releaseTitle = `BFT Yönetim Portalı v${newVersion}`;
const releaseNotes = `BFT Yönetim Portalı Sürüm ${releaseTag} güncellemesi.`;

console.log(`📤 ADIM 5: Yeni .exe GitHub Release (${releaseTag}) Olarak Yükleniyor...`);
try {
    execSync(`gh release create ${releaseTag} "${exeFilePath}" --repo ${repoTarget} --title "${releaseTitle}" --notes "${releaseNotes}"`, { stdio: 'inherit' });
    console.log(`✅ GitHub Release başarıyla oluşturuldu ve .exe yüklendi!\n`);
} catch (errCreate) {
    console.error("❌ HATA: GitHub Release oluşturulurken bir sorun oluştu!");
    console.error(errCreate.message);
    process.exit(1);
}

// ADIM 6: Web / Mobil (PWA) Kodları GitHub (main) Deponuza Push Ediliyor
console.log("🌐 ADIM 6: Web ve Mobil (PWA) Kodları GitHub'a Push Ediliyor...");
try {
    execSync('git add .', { stdio: 'inherit', cwd: __dirname });
    try {
        execSync(`git commit -m "build: Sürüm v${newVersion} yayınlandı (PWA & Desktop)"`, { stdio: 'inherit', cwd: __dirname });
    } catch (eCommit) {
        console.log("ℹ️ Commit edilecek değişiklik bulunamadı veya zaten güncel.");
    }
    execSync('git push origin main', { stdio: 'inherit', cwd: __dirname });
    console.log("✅ Web/PWA kaynak kodları GitHub'a (main branch) başarıyla push edildi!\n");
} catch (errPush) {
    console.warn("⚠️ Web kodları GitHub'a push edilirken uyarı/hata:", errPush.message || errPush);
}

// ADIM 7: GitHub İndirme Linki Alınıyor & Firestore Güncelleniyor
const downloadUrl = `https://github.com/${repoTarget}/releases/download/${releaseTag}/${exeFileName}`;

console.log(`📲 ADIM 7: Bulut Veritabanı Güncelleniyor (v${newVersion})...`);
updateFirestoreAppVersion(newVersion, downloadUrl, releaseNotes);

function updateFirestoreAppVersion(version, downloadUrl, customNotes) {
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/bftbft-516a6/databases/(default)/documents/portal_data/app_version';
    const notes = customNotes || `Sürüm v${version} güncellemesi ve performans iyileştirmeleri.`;

    const payload = JSON.stringify({
        fields: {
            version: { stringValue: version },
            downloadUrl: { stringValue: downloadUrl },
            releaseNotes: { stringValue: notes },
            updatedAt: { timestampValue: new Date().toISOString() }
        }
    });

    const urlObj = new URL(firestoreUrl);
    const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log("\n=======================================================");
                console.log(`🎉 TEBRİKLER! BFT PORTAL SÜRÜM v${version} BAŞARIYLA YAYINLANDI!`);
                console.log(`🔗 GitHub İndirme Linki: ${downloadUrl}`);
                console.log("Tüm kullanıcı uygulamaları otomatik ikaz ve güncelleme alacaktır.");
                console.log("=======================================================\n");
            } else {
                console.error(`\n❌ Veritabanı Güncelleme Hatası (${res.statusCode}):`, body);
            }
        });
    });

    req.on('error', (err) => {
        console.error("\n❌ Veritabanı Güncelleme Ağ Hatası:", err.message);
        console.log("İnternet bağlantınızı kontrol edip lütfen tekrar deneyin.\n");
    });

    req.write(payload);
    req.end();
}
