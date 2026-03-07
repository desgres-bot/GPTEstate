// Minimal service worker for PWA standalone mode
const CACHE_NAME = "gptestate-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Only cache navigation requests for offline fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/generate"))
    );
  }
});
