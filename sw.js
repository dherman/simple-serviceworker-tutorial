importScripts('serviceworker-cache-polyfill.js');

var port;

self.addEventListener('message', function(event) {
  port = event.ports[0];
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('simple-sw-v1').then(function(cache) {
      return cache.addAll([
        './',
        'style.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("received a fetch request for: " + event.request.url);

  // send the intercepted URL to the main thread
  if (port) {
    port.postMessage(event.request.url);
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
