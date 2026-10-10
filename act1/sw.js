const CACHE_NAME = 'v2';
const ASSETS = ['./', './script.js', './obj.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => console.log('Assets cached.'))
      .catch(err => console.log('Could not cache.', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  console.log('Intercepted:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('Response:', response);
      return response || fetch(event.request);
    })
  );
});
