const cacheName = 'cache-v1';
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
  'img/stars.svg'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToPrecache);
      })
  );
  self.skipWaiting(); //Activate sw immediately
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(
        keys.map((key) => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // Start controlling all clients immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      console.log('Resources fetched or from caches');
      return cachedResponse || fetch(event.request);
    })
  );
  
});