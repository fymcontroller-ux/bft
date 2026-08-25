@echo off
chcp 65001 > nul
title BFT Portal Tek Tıkla Sürüm Derleme ve Yayınlama Sihirbazı
cls
echo =======================================================
echo    🚀 BFT PORTAL TEK TIKLA SÜRÜM DERLEME VE YAYINLAMA
echo =======================================================
echo.
echo Bu işlem sırasıyla:
echo   1. Versiyon numarasını otomatik +1 yükseltecek
echo   2. dist\ klasöründeki eski kalıntıları temizleyecek
echo   3. Yeni .exe dosyasını dist\ klasöründe derleyecek
echo   4. GitHub Releases'teki eski versiyonları silecek
echo   5. Yeni .exe dosyasını GitHub Releases'e push edecek
echo   6. Mobil/Web (PWA) kaynak kodlarını GitHub'a push edecek
echo   7. GitHub indirme linkini veritabanına kaydedip yayınlayacak!
echo.

node auto_release.js

echo.
pause
