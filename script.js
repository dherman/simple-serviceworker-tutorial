// set up a channel of communication with the service worker
function setupChannel(cb) {
  var controller = navigator.serviceWorker.controller;

  if (!controller)
    return;

  var chan = new MessageChannel();

  chan.port1.onmessage = event => {
    if (event.data.error) {
      console.log(event.data.error);
    } else {
      cb(event.data);
    }
  };

  console.log("sending port to service worker");
  controller.postMessage("hello", [chan.port2]);
}

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
