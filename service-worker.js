const CACHE_NAME = "inventory-assistant-v2"; // si actualizas algo luego, v3, v4...
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js"
];

// Instalación: precache de archivos locales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activa el nuevo SW sin esperar
});

// Activación: limpia cachés viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      )
    )
  );
  self.clients.claim(); // controla páginas abiertas de una
});

// Fetch: primero caché, si no, red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
