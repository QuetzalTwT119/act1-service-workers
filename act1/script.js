let registration = null;

function updateStatus(message) {
  document.querySelector('#status').textContent = message;
}

function register_service_worker() {
  if ('serviceWorker' in navigator) {
    window.navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(res => {
        registration = res;
        console.log('SW successfully registered.');
        updateStatus('Service worker successfully registered. Reload once to activate control of this page.');
      })
      .catch(err => {
        console.log('Could not register service worker.', err);
        updateStatus('Could not register the service worker.');
      });
  } else {
    updateStatus('This browser does not support service workers.');
  }
}

function unregister_service_worker() {
  navigator.serviceWorker.getRegistrations()
    .then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
        console.log('Service Worker unregistered.');
      });
    })
    .catch(err => console.log('Could not unregister service worker.', err));
}

window.addEventListener('click', () => {
  fetch('./obj.png')
    .then(res => {
      console.log('From script.js, I got the response:', res);
      updateStatus('obj.png fetched. Check DevTools Console and Cache Storage.');
    });
});

register_service_worker();
