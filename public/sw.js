const CACHE_NAME = 'static-cache';
const resourcesToPrecache = [
  '/',
  'css/main.css',
  'icons/favicon.png',
  'icons/icon-512.png',
  'img/human-1.svg',
  'img/human-2.svg',
  'img/human-3.svg',
  'img/logo-light.png',
  'img/noise-bg.png',
  'img/stars.svg',
  'img/screenshot1.jpg',
  'img/screenshot2.jpg',
  'img/screenshot3.jpg',
  'img/today.jpg',
  'img/tomorrow.jpg',
  'manifest.json'
];

// Install event: Precache static assets
self.addEventListener('install', event => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
  );
  self.skipWaiting(); // Immediately take control
});

// Activate event: Clean up any old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Serve from cache, update in background (stale-while-revalidate)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If network fails, just use cached version
          return cachedResponse;
        });

      // Serve cached version first (if exists), then update in background
      return cachedResponse || fetchPromise;
    })
  );
});
