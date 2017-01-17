loader.registry['foreign'].body = function() {
  console.log("executing foreign module");
  return loader.import('secret', 'https://xoscript.surge.sh/secret-module.js')
               .then(secret => {
                 console.log("foreign module loaded secret module");
               });
};

/*
(function() {

//var script = document.createElement('script');
//script.src = 'https://xoscript.surge.sh/secret-module.js';
//document.getElementsByTagName('head')[0].appendChild(script);

importModule('https://xoscript.surge.sh/secret-module.js');

})();

window.foreignModuleFunction = function() {
    var tmp = "string in foreign module";
    console.log("foreign module function");
};

*/
