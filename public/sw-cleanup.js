// Service Worker Cleanup Script
// Run this in the browser console if you're still seeing PWA errors

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('Found service worker registrations:', registrations.length);
    for(let registration of registrations) {
      console.log('Unregistering service worker:', registration);
      registration.unregister();
    }
  });
  
  // Also clear any cached service worker files
  if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    });
  }
}

console.log('Service worker cleanup completed. Please refresh the page.'); 