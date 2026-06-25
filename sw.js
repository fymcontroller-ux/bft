const CACHE_NAME = "fy-portal-v2";
const ASSETS = [
    "index.html",
    "styles.css",
    "starter_data.js",
    "main.js",
    "yukleyici.js",
    "merkezi.js",
    "pnomatik.js",
    "teklifver.js",
    "bft_logo.png",
    "manifest.json",
    "favicon.svg"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activate and clean old caches
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Assets from Network First, fallback to Cache
self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request)
            .then((response) => {
                // If response is valid, clone it and save to cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // If network fails (offline), load from cache
                return caches.match(e.request);
            })
    );
});
