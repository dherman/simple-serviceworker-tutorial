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

class Loader {
  constructor() {
    this.registry = Object.create(null);
  }

  import(name, url) {
    if (this.registry[name]) {
      return this.registry[name].load;
    }

    var loaded = new Promise((resolve, reject) => {
      var script = document.createElement('script');
      script.src = url;
      script.onload = () => { resolve(); };
      document.getElementsByTagName('head')[0].appendChild(script);
    });

    var entry = {
      body: null,
      module: loaded.then(() => {
        return entry.body.call(null);
      })
    };

    this.registry[name] = entry;

    return entry.module;
  }

  inspect() {
    return Object.keys(this.registry)
                 .map((name) => {
                   return name + ": " + this.registry[name].body.toString()
                 })
                 .join("\n");
  }
}

loader = new Loader();
