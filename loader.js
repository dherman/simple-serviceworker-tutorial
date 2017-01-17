class Loader {
  constructor() {
    this.registry = Object.create(null);
  }

  // import a "module" by loading a script from a URL
  import(name, url) {
    if (this.registry[name]) {
      return this.registry[name].module;
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
