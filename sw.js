importScripts('serviceworker-cache-polyfill.js');

var port;

self.addEventListener('message', function(event) {
  console.log("received a message from main thread");
  console.log(event.data);
  port = event.ports[0];
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('simple-sw-v1').then(function(cache) {
      return cache.addAll([
        './',
        'style.css',
        'logging.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // print the requested URL to the developer console -- to see this
  // in chrome devtools you have to switch the "context menu" in the
  // console (just above the REPL) from "top" to "sw.js"
  console.log("received a fetch request for: " + event.request.url);
  port.postMessage("received a fetch request for: " + event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
