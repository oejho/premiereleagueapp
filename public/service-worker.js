const CACHE_NAME = "premiere-league-v1";
var urlsToCache = [
  "/", 
  "/index.html", 
  "/manifest.json", 
  "/css/materialize.min.css", 
  "/css/custom.css", 
  "/img/icon-ios.jpg",
  "/img/logo-192.png",
  "/img/logo-512.png",
  "/nav.html",
  "/pages/home.html", 
  "/pages/matches.html", 
  "/pages/favoriteteams.html", 
  "/pages/about.html", 
  "/pages/teams.html", 
  "/js/materialize.min.js", 
  "/js/nav.js", 
  "/js/api.js", 
  "/js/db.js", 
  "/js/idb.js",  
  "/main.js", 
  "/push.js", 

];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        }
      );
    })
  );
});

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "img/icon-192.jpg",
    vibration: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
