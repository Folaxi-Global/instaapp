self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('folaxi-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/dashboard/miner'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
