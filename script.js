(function() {

  // set up a communication channel with the service worker
  var chan = new MessageChannel();

  chan.port1.onmessage = function(event) {
    var p = document.createElement('p');
    p.innerHTML = "<b>Service Worker:</b> " + event.data;
    document.body.appendChild(p);
  };

  navigator.serviceWorker.controller.postMessage({ port: chan.port2 }, [chan.port2]);

})();

// attempt to read the source of remote content
function inspectForeignSource() {
  var p = document.createElement('p');
  p.innerText = "Let's print the source code to some remotely loaded functions:";
  document.body.appendChild(p);

  [foreignModuleFunction, secretModuleFunction].forEach((f) => {
    var pre = document.createElement('pre');
    pre.innerText = f.toString();
    document.body.appendChild(pre);
  });
}
