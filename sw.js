const CACHE_NAME = "study-app-cache-v3"; // ⭐ bumped version
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.png",
  "/success.mp3",   // ⭐ ensure cached
  "/complete.mp3"   // ⭐ ensure cached
];

self.addEventListener("install", event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>{
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event=>{
  event.respondWith(
    caches.match(event.request).then(response=>{
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event=>{
  event.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(
        keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))
      );
    })
  );
});
