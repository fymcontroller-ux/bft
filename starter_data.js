// Yükleyici Maliyetleri - Default Data
const defaultExchangeRate = 33.5;

const defaultPersonnel = [];

const defaultShopExpenses = [];

const defaultMaterials = [
    {
        "name": "YÜKLEYİCİ PANO LAZER KESİM",
        "priceUSD": 4.772727,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "YÜKLEYİCİ PANO BOYA MALİYETİ",
        "priceUSD": 0.721154,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY500 LAZER KESİM",
        "priceUSD": 14.285714,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "HY501 LAZER KESİM",
        "priceUSD": 126.627219,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "HY1000 LAZER KESİM",
        "priceUSD": 0.0,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "HY1001 LAZER KESİM",
        "priceUSD": 0.0,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "HY2000 LAZER KESİM",
        "priceUSD": 0.0,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "HY2001 LAZER KESİM",
        "priceUSD": 0.0,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "MY500-502 LAZER KESİM",
        "priceUSD": 10.909091,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "MY501-503 LAZER KESİM",
        "priceUSD": 211.805556,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "HY500 PLASTİK GÖVDE VE KAPAK MALİYETİ",
        "priceUSD": 18.095238,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "MY500-502 PLASTİK GÖVDE VE KAPAK MALİYETİ",
        "priceUSD": 18.095238,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY500 VE MY500-502 KAYNAK MALİYETİ",
        "priceUSD": 2.777778,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY1000-1001 KAYNAK MALİYETİ",
        "priceUSD": 16.666667,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY2000-2001 KAYNAK MALİYETİ",
        "priceUSD": 0.0,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY501 VE MY501-503 KAYNAK MALİYETİ",
        "priceUSD": 16.666667,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY500 VE MY500-502 BOYA MALİYETİ",
        "priceUSD": 2.525253,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY1000 BOYA MALİYETİ",
        "priceUSD": 8.411215,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "HY2000 BOYA MALİYETİ",
        "priceUSD": 27.6,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "GÜNCEL(17032022)"
    },
    {
        "name": "1\" FİLİTRE REGÜLATÖR",
        "priceUSD": 45.090909,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "1/2\" FİLTRELİ REGÜLATÖR G GÖVDE",
        "priceUSD": 24.963289,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "1\"-1/2\" REDÜKSİYON PLX",
        "priceUSD": 1.71,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "1\" DÜZ NİPEL 30°",
        "priceUSD": 1.655,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "1\" İÇTEN DİŞLİ TE",
        "priceUSD": 6.15,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "3/4\"-1\" ORANTILI NİPEL",
        "priceUSD": 2.038,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "1\" N.K 0-16 BAR SELENOİD VALF",
        "priceUSD": 36.0,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "3/4'' 25 MM PATLAÇ VALF",
        "priceUSD": 22.6,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "1/2 16 MM PNÖM.DÜZ REKOR",
        "priceUSD": 1.878947,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "1\"-1/2\" ORANTILI NİPEL",
        "priceUSD": 1.866812,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "1/2 16 MM PNÖM.DİRSEK REKOR",
        "priceUSD": 2.951016,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "1/2\" ALYAN KÖRTAPA İNCE",
        "priceUSD": 1.158901,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "1/2” 3/2 Tek bobin valf",
        "priceUSD": 16.009558,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "1/2\" DÜZ NİPEL 30°",
        "priceUSD": 1.019116,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "1/2” 5/3 KAPALI MERKEZ VALF",
        "priceUSD": 34.5,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "KARE FİLTRE HAMMADDE + BASIMI",
        "priceUSD": 6.162695,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "KARE FİLTRE BEZİ",
        "priceUSD": 1.030928,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "YUVARLAK FİLTRE HAMMADDE + BASIMI",
        "priceUSD": 6.162,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "YUVARLAK FİLTRE BEZİ",
        "priceUSD": 1.030928,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "YUVARLAK 6 DELİKLİ CONTA",
        "priceUSD": 0.165975,
        "group": "Filtre ve Conta Grubu",
        "desc": "GÜNCEL 13,06,2023"
    },
    {
        "name": "KARE 4 DELİKLİ CONTA",
        "priceUSD": 0.625,
        "group": "Filtre ve Conta Grubu",
        "desc": "RASGELE"
    },
    {
        "name": "KARE 8 DELİKLİ CONTA",
        "priceUSD": 0.625,
        "group": "Filtre ve Conta Grubu",
        "desc": "RASGELE"
    },
    {
        "name": "ENJEKTÖR ARKA CONTA",
        "priceUSD": 0.024896,
        "group": "Filtre ve Conta Grubu",
        "desc": "GÜNCEL 13,06,2023"
    },
    {
        "name": "PLASTİK POMPA GÖVDE",
        "priceUSD": 0.4875,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "PLASTİK POMPA KAPAK",
        "priceUSD": 0.39375,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "PLASTİK POMPA ENJEKTÖR UCU",
        "priceUSD": 0.5,
        "group": "Diğer Malzemeler",
        "desc": "RASGELE"
    },
    {
        "name": "ENJEKTÖR HAMMADDE + BASIMI",
        "priceUSD": 0.10101,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "362-1 U KANCALI TOGGLE CLAMP-HAFİF SERİ",
        "priceUSD": 1.834382,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "KULP PLASTİK R 136",
        "priceUSD": 0.314465,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 12cm",
        "priceUSD": 0.782414,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 60cm",
        "priceUSD": 3.912072,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU İŞLEMLERİ",
        "priceUSD": 1.25,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "GWEST 22 MM SES-LED FLAŞÖR İKAZLI BUZZER 24V AC-DC",
        "priceUSD": 1.807229,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "LC1-D12BD 24V DC 5.5kW 1NA+1NK KONTAKTÖR TELEM.",
        "priceUSD": 20.976177,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "GWEST AZ-15GW22-B AZ MİKRO SWITCH",
        "priceUSD": 2.033735,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "DELTA PMT SERİSİ 24V 100W 4,5A GÜÇ KAYNAĞI",
        "priceUSD": 12.815663,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "TTR 6x1,5mm² KABLO",
        "priceUSD": 1.927711,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "SCHNEIDER RSZE1S48M SOKETLİ RÖLE İÇİN SOKET",
        "priceUSD": 2.243802,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "RSB-2A080BD RÖLE",
        "priceUSD": 1.495868,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "ELEKTRONİK KART",
        "priceUSD": 33.0,
        "group": "Elektrik ve Kontrol",
        "desc": "NET"
    },
    {
        "name": "POWER SOKETİ",
        "priceUSD": 0.294118,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "POWER KABLOSU",
        "priceUSD": 3.411765,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "SWİTCH SOKETİ",
        "priceUSD": 0.206612,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "SWİTCH KABLOSU",
        "priceUSD": 0.53719,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "1 1/2\" SPİRAL TELLİ HORTUM",
        "priceUSD": 3.969072,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "47-51 KELEPÇE",
        "priceUSD": 0.467222,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "3 KADEMELİ MONOFAZE MOTOR",
        "priceUSD": 31.065089,
        "group": "Elektrik ve Kontrol",
        "desc": "GÜNCEL"
    },
    {
        "name": "2 KADEMELİ MONOFAZE MOTOR",
        "priceUSD": 24.074074,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "0,75 kw Tek Kademeli Trifaze",
        "priceUSD": 195.0,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "1,6 kw Tek Kademeli Trifaze",
        "priceUSD": 310.0,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "2,2 kw Tek Kademeli Trifaze",
        "priceUSD": 350.0,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "7,5 kw Çift Kademeli Trifaze",
        "priceUSD": 1068.0,
        "group": "Diğer Malzemeler",
        "desc": null
    },
    {
        "name": "18 kw Tek Kademeli Trifaze",
        "priceUSD": 2825.0,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "Trifaze Model Lazer Kesim Gövde",
        "priceUSD": 77.777778,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "Trifaze Model Lazer Kesim Hazne",
        "priceUSD": 11.666667,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "Yerden Yükleyici Plastik Alt Kapak",
        "priceUSD": 2.777778,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "Trifaze Model Boya",
        "priceUSD": 13.888889,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "KF Kanatlı Somun",
        "priceUSD": 13.156703,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": null
    },
    {
        "name": "Yerden Yükleyici Toz Filtresi (HT 0809)",
        "priceUSD": 12.599366,
        "group": "Filtre ve Conta Grubu",
        "desc": null
    },
    {
        "name": "Motor Takozları",
        "priceUSD": 0.447761,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "380V Kablo (5x2,5)",
        "priceUSD": 1.833333,
        "group": "Elektrik ve Kontrol",
        "desc": "İNTERNET FİYATI"
    },
    {
        "name": "Switch Kablosu (2x0,75)",
        "priceUSD": 0.277778,
        "group": "Elektrik ve Kontrol",
        "desc": "İNTERNET FİYATI"
    },
    {
        "name": "Yerden Yükleyici Tel Filtre Teli",
        "priceUSD": 2.595156,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "LRE08 - 2,5-4A. TERMİK RÖLE SCHNEİDER",
        "priceUSD": 11.61011,
        "group": "Pnömatik ve Tesisat",
        "desc": null
    },
    {
        "name": "V-Otomat (3x6 Amper)",
        "priceUSD": 6.944444,
        "group": "Elektrik ve Kontrol",
        "desc": "İNTERNET FİYATI"
    },
    {
        "name": "GWEST A5-01ZS ACİL STOP BUTONU",
        "priceUSD": 1.51075,
        "group": "Elektrik ve Kontrol",
        "desc": null
    },
    {
        "name": "Trifaze Model Kaynak Maliyeti",
        "priceUSD": 11.111111,
        "group": "Mekanik ve Gövde Elemanları",
        "desc": "RASGELE"
    },
    {
        "name": "Yerden Yükleyici Swich Soketi",
        "priceUSD": 2.222222,
        "group": "Elektrik ve Kontrol",
        "desc": "İNTERNET FİYATI"
    }
];

const defaultModels = {
    "YTY": {
        "items": [
            {
                "name": "1,6 kw Tek Kademeli Trifaze",
                "qty": 1.0
            },
            {
                "name": "Trifaze Model Lazer Kesim Gövde",
                "qty": 1.0
            },
            {
                "name": "Trifaze Model Lazer Kesim Hazne",
                "qty": 1.0
            },
            {
                "name": "Yerden Yükleyici Plastik Alt Kapak",
                "qty": 1.0
            },
            {
                "name": "Trifaze Model Boya",
                "qty": 1.0
            },
            {
                "name": "KF Kanatlı Somun",
                "qty": 1.0
            },
            {
                "name": "Yerden Yükleyici Toz Filtresi (HT 0809)",
                "qty": 1.0
            },
            {
                "name": "Motor Takozları",
                "qty": 4.0
            },
            {
                "name": "380V Kablo (5x2,5)",
                "qty": 5.0
            },
            {
                "name": "Switch Kablosu (2x0,75)",
                "qty": 5.0
            },
            {
                "name": "LRE08 - 2,5-4A. TERMİK RÖLE SCHNEİDER",
                "qty": 1.0
            },
            {
                "name": "LC1-D12BD 24V DC 5.5kW 1NA+1NK KONTAKTÖR TELEM.",
                "qty": 1.0
            },
            {
                "name": "GWEST A5-01ZS ACİL STOP BUTONU",
                "qty": 1.0
            },
            {
                "name": "V-Otomat (3x6 Amper)",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE HAMMADDE + BASIMI",
                "qty": 1.0
            },
            {
                "name": "Yerden Yükleyici Tel Filtre Teli",
                "qty": 1.0
            },
            {
                "name": "KARE 4 DELİKLİ CONTA",
                "qty": 1.0
            },
            {
                "name": "362-1 U KANCALI TOGGLE CLAMP-HAFİF SERİ",
                "qty": 10.0
            },
            {
                "name": "KULP PLASTİK R 136",
                "qty": 2.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 60cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU İŞLEMLERİ",
                "qty": 1.0
            },
            {
                "name": "GWEST 22 MM SES-LED FLAŞÖR İKAZLI BUZZER 24V AC-DC",
                "qty": 1.0
            },
            {
                "name": "GWEST AZ-15GW22-B AZ MİKRO SWITCH",
                "qty": 1.0
            },
            {
                "name": "DELTA PMT SERİSİ 24V 100W 4,5A GÜÇ KAYNAĞI",
                "qty": 1.0
            },
            {
                "name": "ELEKTRONİK KART",
                "qty": 1.0
            },
            {
                "name": "Yerden Yükleyici Swich Soketi",
                "qty": 1.0
            },
            {
                "name": "1 1/2\" SPİRAL TELLİ HORTUM",
                "qty": 8.0
            },
            {
                "name": "47-51 KELEPÇE",
                "qty": 6.0
            },
            {
                "name": "Sürücü Maliyeti",
                "qty": 1.0
            }
        ],
        "machineCount": 20
    },
    "HY500": {
        "items": [
            {
                "name": "YÜKLEYİCİ PANO LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "YÜKLEYİCİ PANO BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "HY500 PLASTİK GÖVDE VE KAPAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 KAYNAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "1/2\" FİLTRELİ REGÜLATÖR G GÖVDE",
                "qty": 1.0
            },
            {
                "name": "1/2 16 MM PNÖM.DİRSEK REKOR",
                "qty": 8.0
            },
            {
                "name": "1/2\" ALYAN KÖRTAPA İNCE",
                "qty": 2.0
            },
            {
                "name": "1/2” 5/3 KAPALI MERKEZ VALF",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE HAMMADDE + BASIMI",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE BEZİ",
                "qty": 1.0
            },
            {
                "name": "YUVARLAK 6 DELİKLİ CONTA",
                "qty": 2.0
            },
            {
                "name": "KARE 4 DELİKLİ CONTA",
                "qty": 1.0
            },
            {
                "name": "ENJEKTÖR ARKA CONTA",
                "qty": 8.0
            },
            {
                "name": "PLASTİK POMPA GÖVDE",
                "qty": 1.0
            },
            {
                "name": "PLASTİK POMPA KAPAK",
                "qty": 2.0
            },
            {
                "name": "PLASTİK POMPA ENJEKTÖR UCU",
                "qty": 1.0
            },
            {
                "name": "ENJEKTÖR HAMMADDE + BASIMI",
                "qty": 8.0
            },
            {
                "name": "362-1 U KANCALI TOGGLE CLAMP-HAFİF SERİ",
                "qty": 4.0
            },
            {
                "name": "KULP PLASTİK R 136",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 12cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 60cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU İŞLEMLERİ",
                "qty": 1.0
            },
            {
                "name": "GWEST 22 MM SES-LED FLAŞÖR İKAZLI BUZZER 24V AC-DC",
                "qty": 1.0
            },
            {
                "name": "GWEST AZ-15GW22-B AZ MİKRO SWITCH",
                "qty": 1.0
            },
            {
                "name": "DELTA PMT SERİSİ 24V 100W 4,5A GÜÇ KAYNAĞI",
                "qty": 1.0
            },
            {
                "name": "TTR 6x1,5mm² KABLO",
                "qty": 5.0
            },
            {
                "name": "ELEKTRONİK KART",
                "qty": 1.0
            },
            {
                "name": "POWER SOKETİ",
                "qty": 1.0
            },
            {
                "name": "POWER KABLOSU",
                "qty": 1.0
            },
            {
                "name": "SWİTCH SOKETİ",
                "qty": 1.0
            },
            {
                "name": "SWİTCH KABLOSU",
                "qty": 1.0
            },
            {
                "name": "1 1/2\" SPİRAL TELLİ HORTUM",
                "qty": 4.0
            },
            {
                "name": "47-51 KELEPÇE",
                "qty": 2.0
            }
        ],
        "machineCount": 20
    },
    "MY300": {
        "items": [
            {
                "name": "YÜKLEYİCİ PANO LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "YÜKLEYİCİ PANO BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "MY500-502 LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "MY500-502 PLASTİK GÖVDE VE KAPAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 KAYNAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "1/2\" ALYAN KÖRTAPA İNCE",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE HAMMADDE + BASIMI",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE BEZİ",
                "qty": 1.0
            },
            {
                "name": "YUVARLAK 6 DELİKLİ CONTA",
                "qty": 2.0
            },
            {
                "name": "KARE 4 DELİKLİ CONTA",
                "qty": 1.0
            },
            {
                "name": "PLASTİK POMPA KAPAK",
                "qty": 1.0
            },
            {
                "name": "362-1 U KANCALI TOGGLE CLAMP-HAFİF SERİ",
                "qty": 4.0
            },
            {
                "name": "KULP PLASTİK R 136",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 12cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 60cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU İŞLEMLERİ",
                "qty": 1.0
            },
            {
                "name": "GWEST 22 MM SES-LED FLAŞÖR İKAZLI BUZZER 24V AC-DC",
                "qty": 1.0
            },
            {
                "name": "GWEST AZ-15GW22-B AZ MİKRO SWITCH",
                "qty": 1.0
            },
            {
                "name": "DELTA PMT SERİSİ 24V 100W 4,5A GÜÇ KAYNAĞI",
                "qty": 1.0
            },
            {
                "name": "TTR 6x1,5mm² KABLO",
                "qty": 5.0
            },
            {
                "name": "SCHNEIDER RSZE1S48M SOKETLİ RÖLE İÇİN SOKET",
                "qty": 1.0
            },
            {
                "name": "RSB-2A080BD RÖLE",
                "qty": 1.0
            },
            {
                "name": "ELEKTRONİK KART",
                "qty": 1.0
            },
            {
                "name": "POWER SOKETİ",
                "qty": 1.0
            },
            {
                "name": "POWER KABLOSU",
                "qty": 1.0
            },
            {
                "name": "SWİTCH SOKETİ",
                "qty": 1.0
            },
            {
                "name": "SWİTCH KABLOSU",
                "qty": 1.0
            },
            {
                "name": "1 1/2\" SPİRAL TELLİ HORTUM",
                "qty": 4.0
            },
            {
                "name": "47-51 KELEPÇE",
                "qty": 2.0
            },
            {
                "name": "2 KADEMELİ MONOFAZE MOTOR",
                "qty": 1.0
            }
        ],
        "machineCount": 30
    },
    "MY500": {
        "items": [
            {
                "name": "YÜKLEYİCİ PANO LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "YÜKLEYİCİ PANO BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "MY500-502 LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "MY500-502 PLASTİK GÖVDE VE KAPAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 KAYNAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "1/2\" ALYAN KÖRTAPA İNCE",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE HAMMADDE + BASIMI",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE BEZİ",
                "qty": 1.0
            },
            {
                "name": "YUVARLAK 6 DELİKLİ CONTA",
                "qty": 1.0
            },
            {
                "name": "KARE 4 DELİKLİ CONTA",
                "qty": 1.0
            },
            {
                "name": "PLASTİK POMPA KAPAK",
                "qty": 1.0
            },
            {
                "name": "362-1 U KANCALI TOGGLE CLAMP-HAFİF SERİ",
                "qty": 4.0
            },
            {
                "name": "KULP PLASTİK R 136",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 12cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 60cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU İŞLEMLERİ",
                "qty": 1.0
            },
            {
                "name": "GWEST 22 MM SES-LED FLAŞÖR İKAZLI BUZZER 24V AC-DC",
                "qty": 1.0
            },
            {
                "name": "GWEST AZ-15GW22-B AZ MİKRO SWITCH",
                "qty": 1.0
            },
            {
                "name": "DELTA PMT SERİSİ 24V 100W 4,5A GÜÇ KAYNAĞI",
                "qty": 1.0
            },
            {
                "name": "TTR 6x1,5mm² KABLO",
                "qty": 5.0
            },
            {
                "name": "SCHNEIDER RSZE1S48M SOKETLİ RÖLE İÇİN SOKET",
                "qty": 1.0
            },
            {
                "name": "RSB-2A080BD RÖLE",
                "qty": 1.0
            },
            {
                "name": "ELEKTRONİK KART",
                "qty": 1.0
            },
            {
                "name": "POWER SOKETİ",
                "qty": 1.0
            },
            {
                "name": "POWER KABLOSU",
                "qty": 1.0
            },
            {
                "name": "SWİTCH SOKETİ",
                "qty": 1.0
            },
            {
                "name": "SWİTCH KABLOSU",
                "qty": 1.0
            },
            {
                "name": "1 1/2\" SPİRAL TELLİ HORTUM",
                "qty": 4.0
            },
            {
                "name": "47-51 KELEPÇE",
                "qty": 2.0
            },
            {
                "name": "3 KADEMELİ MONOFAZE MOTOR",
                "qty": 1.0
            }
        ],
        "machineCount": 20
    },
    "MY502": {
        "items": [
            {
                "name": "YÜKLEYİCİ PANO LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "YÜKLEYİCİ PANO BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "MY500-502 LAZER KESİM",
                "qty": 1.0
            },
            {
                "name": "MY500-502 PLASTİK GÖVDE VE KAPAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 KAYNAK MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "HY500 VE MY500-502 BOYA MALİYETİ",
                "qty": 1.0
            },
            {
                "name": "1/2 16 MM PNÖM.DİRSEK REKOR",
                "qty": 3.0
            },
            {
                "name": "1/2\" ALYAN KÖRTAPA İNCE",
                "qty": 1.0
            },
            {
                "name": "1/2” 3/2 Tek bobin valf",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE HAMMADDE + BASIMI",
                "qty": 1.0
            },
            {
                "name": "KARE FİLTRE BEZİ",
                "qty": 1.0
            },
            {
                "name": "YUVARLAK 6 DELİKLİ CONTA",
                "qty": 2.0
            },
            {
                "name": "KARE 4 DELİKLİ CONTA",
                "qty": 1.0
            },
            {
                "name": "PLASTİK POMPA KAPAK",
                "qty": 1.0
            },
            {
                "name": "362-1 U KANCALI TOGGLE CLAMP-HAFİF SERİ",
                "qty": 4.0
            },
            {
                "name": "KULP PLASTİK R 136",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 12cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU - 60cm",
                "qty": 1.0
            },
            {
                "name": "Q38x1,2 POLİSAJLI PASLANMAZ DİKİŞLİ BORU İŞLEMLERİ",
                "qty": 1.0
            },
            {
                "name": "GWEST 22 MM SES-LED FLAŞÖR İKAZLI BUZZER 24V AC-DC",
                "qty": 1.0
            },
            {
                "name": "GWEST AZ-15GW22-B AZ MİKRO SWITCH",
                "qty": 1.0
            },
            {
                "name": "DELTA PMT SERİSİ 24V 100W 4,5A GÜÇ KAYNAĞI",
                "qty": 1.0
            },
            {
                "name": "TTR 6x1,5mm² KABLO",
                "qty": 5.0
            },
            {
                "name": "SCHNEIDER RSZE1S48M SOKETLİ RÖLE İÇİN SOKET",
                "qty": 1.0
            },
            {
                "name": "RSB-2A080BD RÖLE",
                "qty": 1.0
            },
            {
                "name": "ELEKTRONİK KART",
                "qty": 1.0
            },
            {
                "name": "POWER SOKETİ",
                "qty": 1.0
            },
            {
                "name": "POWER KABLOSU",
                "qty": 1.0
            },
            {
                "name": "SWİTCH SOKETİ",
                "qty": 1.0
            },
            {
                "name": "SWİTCH KABLOSU",
                "qty": 1.0
            },
            {
                "name": "1 1/2\" SPİRAL TELLİ HORTUM",
                "qty": 4.0
            },
            {
                "name": "47-51 KELEPÇE",
                "qty": 2.0
            },
            {
                "name": "3 KADEMELİ MONOFAZE MOTOR",
                "qty": 1.0
            }
        ],
        "machineCount": 20
    }
};

// Merkezi Sistem - Default Data
const defaultScreens = [];
const defaultDrivers = [];
const defaultPumps = [];
const defaultPipes = [];
const defaultGeneralItems = [];

