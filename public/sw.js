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
});

self.addEventListener('fecth', event => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
    
});