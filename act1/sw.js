self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('v1')
            .then(cache => {
                cache.addAll([
                    './', // the index.html
                    './script.js', // the main script
                    './obj.png' // local img; same dir as script.js
                ]);
                console.log("Assets cached.");
            })
            .catch(err => console.log("Could not cache."))
    )
});

self.addEventListener('fetch', event => {
    console.log("INTERCEPTED");

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log("V1 The request: ", event.request);
                console.log("V1 Got the response...", response);
                return response || fetch(event.request);
            })
            .catch(err => {
                console.log("Could not find matching request.");
                return null;
            })
    );
});
