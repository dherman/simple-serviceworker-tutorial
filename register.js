navigator.serviceWorker.register('sw.js', { scope: './' });

// set up a channel of communication with the service worker
function setupChannel(cb) {
  var controller = navigator.serviceWorker.controller;

  if (!controller) {
    return;
  }

  var chan = new MessageChannel();

  chan.port1.onmessage = event => {
    if (event.data.error) {
      console.log(event.data.error);
    } else {
      cb(event.data);
    }
  };

  controller.postMessage("hello", [chan.port2]);
}

setupChannel(data => {
  var div = document.getElementById('interceptions');
  var p = document.createElement('p');
  p.innerHTML = "<b>Intercepted:</b> " + data;
  div.appendChild(p);
});
