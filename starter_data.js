// Yükleyici Maliyetleri - Default Data
const defaultExchangeRate = 33.5;

const defaultPersonnel = [
    {
        "name": "Samet",
        "netSalary": 298.51,
        "ssk": 37.31,
        "bagkur": 0.0,
        "yemek": 22.39,
        "yol": 52.24
    },
    {
        "name": "Bekir",
        "netSalary": 447.76,
        "ssk": 37.31,
        "bagkur": 0.0,
        "yemek": 22.39,
        "yol": 52.24
    },
    {
        "name": "Fatih",
        "netSalary": 447.76,
        "ssk": 37.31,
        "bagkur": 0.0,
        "yemek": 22.39,
        "yol": 52.24
    },
    {
        "name": "Kamil YAVUZ",
        "netSalary": 208.96,
        "ssk": 37.32,
        "bagkur": 0.0,
        "yemek": 22.38,
        "yol": 52.24
    },
    {
        "name": "Bağkur / Ortaklar",
        "netSalary": 0.0,
        "ssk": 0.0,
        "bagkur": 74.63,
        "yemek": 0.0,
        "yol": 0.0
    }
];

const defaultShopExpenses = [
    {
        "name": "Kira",
        "price": 328.36
    },
    {
        "name": "Güvenlik",
        "price": 6.27
    },
    {
        "name": "Elektrik",
        "price": 104.48
    },
    {
        "name": "Su",
        "price": 10.45
    },
    {
        "name": "Telefon",
        "price": 2.09
    },
    {
        "name": "İnternet",
        "price": 3.88
    },
    {
        "name": "Muhasebe Ücreti",
        "price": 37.31
    }
];

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
const defaultScreens = [
    { name: "GHS-043", price: 141 },
    { name: "GHS-043E", price: 169 },
    { name: "GHPro-070E-WIFI", price: 160 },
    { name: "GHS-070", price: 155 },
    { name: "GHS-070E", price: 184 },
    { name: "GHS-101", price: 290 },
    { name: "GHS-101E", price: 312 },
    { name: "MSG-156E", price: 1055 }
];

const defaultDrivers = [
    { name: "MICNO-00075H", price: 250 },
    { name: "MICNO-00150H", price: 260 },
    { name: "MICNO-00220H", price: 306 },
    { name: "MICNO-00370H", price: 333 },
    { name: "MICNO-00550H", price: 442 },
    { name: "MICNO-00750H", price: 505 },
    { name: "MICNO-01100H", price: 635 },
    { name: "MICNO-01500H", price: 800 },
    { name: "MICNO-01850H", price: 926 },
    { name: "MICNO-02200H", price: 1120 },
    { name: "MICNO-03000HS", price: 1250 }
];

const defaultPumps = [
    { name: "DVP PA 315 CLAW", price: 5160 },
    { name: "BLOWER 0,70 KW TEK TÜRBİN", price: 160 },
    { name: "BLOWER 1,60 KW TEK TÜRBİN", price: 285 },
    { name: "BLOWER 2,2 KW TEK TÜRBİN", price: 300 },
    { name: "BLOWER 5,5 KW TEK TÜRBİN", price: 740 },
    { name: "BLOWER 18,5 KW TEK TÜRBİN", price: 1915 },
    { name: "BLOWER 1,60 KW ÇİFT TÜRBİN", price: 355 },
    { name: "BLOWER 2,2 KW ÇİFT TÜRBİN", price: 375 },
    { name: "BLOWER 3,0 KW ÇİFT TÜRBİN", price: 550 },
    { name: "BLOWER 4,0 KW ÇİFT TÜRBİN", price: 600 },
    { name: "BLOWER 5,50 KW ÇİFT TÜRBİN", price: 810 },
    { name: "BLOWER 7,5 KW ÇİFT TÜRBİN", price: 1500 },
    { name: "BLOWER 11 KW ÇİFT TÜRBİN", price: 1555 }
];

const defaultPipes = [
    { name: "Ø38X1,2 KROM BORU", price: 35, hose: "Ø38 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø38 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø48X1,5 KROM BORU", price: 45, hose: "Ø48 SPİRAL HORTUM", hosePrice: 5, clamp: "Ø48 SPİRAL HORTUM KELEPÇESİ", clampPrice: 1 },
    { name: "Ø60.3X2 KROM BORU", price: 70, hose: "Ø60.3 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø60.3 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø76.1X2 KROM BORU", price: 90, hose: "Ø76.1 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø76.1 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø88.9x2 KROM BORU", price: 105, hose: "Ø88.9 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø88.9 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø38X1,5 SİYAH BORU", price: 0, hose: "Ø38 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø38 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø48X1,5 SİYAH BORU", price: 10, hose: "Ø48 SPİRAL HORTUM", hosePrice: 5, clamp: "Ø48 SPİRAL HORTUM KELEPÇESİ", clampPrice: 1 },
    { name: "Ø60,3X2 SİYAH BORU", price: 0, hose: "Ø60.3 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø60.3 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø76.1X1,5 SİYAH BORU", price: 0, hose: "Ø76.1 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø76.1 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 },
    { name: "Ø88.9x2 SİYAH BORU", price: 0, hose: "Ø88.9 SPİRAL HORTUM", hosePrice: 0, clamp: "Ø88.9 SPİRAL HORTUM KELEPÇESİ", clampPrice: 0 }
];

const defaultGeneralItems = [
    { name: "GMT-396T (PLC)", price: 222, category: "Pano Ekipmanları" },
    { name: "GXM-16IA (Input Modül)", price: 70, category: "Pano Ekipmanları" },
    { name: "GXM-16TA (Output Modül)", price: 96, category: "Pano Ekipmanları" },
    { name: "Transtör Kart", price: 20, category: "Pano Ekipmanları" },
    { name: "Güç Kaynağı", price: 70, category: "Pano Ekipmanları" },
    { name: "Fren Direnci", price: 29, category: "Pano Ekipmanları" },
    { name: "Pano Havalandırma", price: 90, category: "Pano Ekipmanları" },
    { name: "Lobar (Küçük)", price: 30, category: "Pano Ekipmanları" },
    { name: "Lobar (Büyük)", price: 40, category: "Pano Ekipmanları" },
    { name: "Pano", price: 500, category: "Pano Ekipmanları" },
    { name: "Diğer Malzemeler", price: 50, category: "Pano Ekipmanları" },
    { name: "12X1 Kumanda Kablosu", price: 2.5, category: "Kablolar" },
    { name: "6X0,5 Kumanda Kablosu", price: 1.0, category: "Kablolar" },
    { name: "8X1 KUMANDA KABLOSU (Duvar-İstasyon Arası)", price: 1.5, category: "Kablolar" },
    { name: "4x4 Bilendajlı Kablo", price: 4.0, category: "Kablolar" },
    { name: "24LÜ SOKET (DUVAR TİPİ)", price: 35, category: "Soketler" },
    { name: "24LÜ SOKET (MAKİNA TİPİ)", price: 35, category: "Soketler" },
    { name: "16LI SOKET (DUVAR TİPİ)", price: 30, category: "Soketler" },
    { name: "HAZNE", price: 275, category: "İstasyon Ekipmanları" },
    { name: "KUMANDA SETİ", price: 30, category: "İstasyon Ekipmanları" },
    { name: "120x120x4 Profil", price: 10.0, category: "Duvardaki Sistem" },
    { name: "HAT BAĞLANTI EKİPMANLARI", price: 12.3, category: "Duvardaki Sistem" },
    { name: "MA1650 PİSTON", price: 15.0, category: "Duvardaki Sistem" },
    { name: "VALF (1/4\" 5/2 Tek Bobin)", price: 12.0, category: "Duvardaki Sistem" },
    { name: "KLEPE TAKIMI", price: 12.0, category: "Duvardaki Sistem" },
    { name: "ŞASE SİSTEMİ (SİKLON+JETFİLTRE)", price: 1000.0, category: "Pompa Şase" },
    { name: "CONTALI SAÇ KELEPÇE", price: 10.0, category: "Tesisat ve Borulama" },
    { name: "TESİSAT DÖŞEME APARATLARI", price: 10.0, category: "Tesisat ve Borulama" }
];

