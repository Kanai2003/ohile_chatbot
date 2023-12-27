// Service Worker
const CACHE_NAME = 'chatbot-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/index.js',
  '/manifest.json',
  '/icon.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});


