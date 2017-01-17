(function() {

  function setupChannel() {
    return new Promise((resolve, reject) => {
      var chan = new MessageChannel();

      chan.port1.onmessage = event => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };

      console.log("sending port to service worker");
      navigator.serviceWorker.controller.postMessage("hello", [chan.port2]);
    });
  }

  setupChannel()
    .then(data => {
      var p = document.createElement('p');
      p.innerHTML = "<b>Service Worker:</b> " + data;
      document.body.appendChild(p);
    })
    .catch(console.log.bind(console));

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
