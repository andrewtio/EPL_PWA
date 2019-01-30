importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '2' },
  { url: '/nav.html', revision: '2' },
  { url: '/index.html', revision: '2' },
  { url: '/article.html', revision: '2' },
  { url: '/css/materialize.min.css', revision: '2' },
  { url: '/js/materialize.min.js', revision: '2' },
  { url: '/js/nav.js', revision: '2' },
  { url: '/js/api.js', revision: '2' },
  { url: '/js/idb.js', revision: '2' },
  { url: '/js/db.js', revision: '2' },
  { url: '/js/main.js', revision: '2' },
  { url: '/icon.png', revision: '2' },
  { url: '/manifest.json', revision: '2' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cahcename: 'pages'
  })
);

// const CACHE_NAME = "firstpwa-v30";
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/article.html",
//   "/pages/home.html",
//   "/pages/scorers.html",
//   "/pages/standings.html",
//   "/pages/saved.html",
//   "/css/materialize.min.css",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/api.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/main.js",
//   "/icon.png",
//   "/manifest.json"
// ];
 
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//       caches
//         .match(event.request, { cacheName: CACHE_NAME })
//         .then(function(response) {
//           if (response) {
//             console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//             return response;
//           }
   
//           console.log(
//             "ServiceWorker: Memuat aset dari server: ",
//             event.request.url
//           );
//           return fetch(event.request);
//         })
//     );
//   });

//   self.addEventListener("activate", function(event) {
//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheName != CACHE_NAME) {
//               console.log("ServiceWorker: cache " + cacheName + " dihapus");
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });

  self.addEventListener('push', function(event) {
    var body;

    if (event.data) {
      body = event.data.text();
    } else{
      body = 'Push message no payload';
    }

    var options = {
      body: body,
      icon: 'icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });