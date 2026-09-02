const fs = require("fs");

const sourceDirectory = "D:\\FY\\Android Studio\\MerkeziSistem\\MerkeziYonetimPortali\\Eski Veriler\\bft-yonetim-portali\\Local Storage\\leveldb";
const outputPath = "D:\\FY\\Android Studio\\MerkeziSistem\\MerkeziYonetimPortali\\kurtarilan_veriler.json";
const storageKeys = [
    "m_projects", "m_screens", "m_drivers", "m_pumps", "m_pipes", "m_generalItems",
    "p_projects", "t_product_catalog", "l_materials", "l_models", "l_personnel", "l_shopExpenses"
];

const sourceBuffers = fs.readdirSync(sourceDirectory)
    .filter(fileName => /\.(ldb|log)$/.test(fileName))
    .map(fileName => fs.readFileSync(`${sourceDirectory}\\${fileName}`));
const existing = JSON.parse(fs.readFileSync(outputPath, "utf8"));

function extractPayload(key) {
    for (const buffer of sourceBuffers) {
        let keyPosition = buffer.indexOf(Buffer.from(key));
        while (keyPosition >= 0) {
            const jsonStart = buffer.indexOf(0x7b, keyPosition);
            const nextMarker = buffer.indexOf(Buffer.from("_file://"), jsonStart);
            const jsonEnd = nextMarker >= 0 ? nextMarker : buffer.length;
            if (jsonStart >= 0 && jsonEnd > jsonStart) {
                const candidate = buffer.subarray(jsonStart, jsonEnd)
                    .toString("latin1")
                    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
                    .trim();
                try {
                    return JSON.parse(candidate);
                } catch (error) {
                    // A later occurrence may contain the complete record.
                }
            }
            keyPosition = buffer.indexOf(Buffer.from(key), keyPosition + key.length);
        }
    }
    return null;
}

const recovered = {};
for (const key of storageKeys) {
    const value = extractPayload(key);
    if (value !== null) {
        recovered[key] = value;
        console.log(`${key}: ${Object.keys(value).length} kayıt`);
    } else {
        console.log(`${key}: bulunamadı veya bozuk`);
    }
}

Object.assign(existing, recovered);
fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2), "utf8");
console.log(`Kurtarılan veri grubu: ${Object.keys(recovered).length}`);