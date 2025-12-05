const CACHE_NAME = 'ronda-cache-v1';
const urlsToCache = [
  '/', 
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/service-worker.js',
  // Inclua outros arquivos usados (lib jsPDF, outras imagens, etc)
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalar e cachear arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Limpar cache antigo ao ativar nova versão
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Interceptar requests para servir o cache offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});