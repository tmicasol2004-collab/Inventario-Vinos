const CACHE_NAME = 'inventory-assistant-v1';
const urlsToCache = [
    './', // Raíz
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com' // Almacena el CDN de Tailwind para offline
];

// Evento de Instalación: Almacena los archivos estáticos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de Fetch: Sirve los recursos desde la caché si están disponibles
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si encontramos el recurso en caché, lo devolvemos
                if (response) {
                    return response;
                }
                // Si no, lo buscamos en la red (internet)
                return fetch(event.request);
            }
        )
    );
});

// Evento de Activación: Limpia cachés viejas para mantener la aplicación actualizada
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
