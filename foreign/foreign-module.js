(function() {

var script = document.createElement('script');
script.src = 'https://xoscript.surge.sh/secret-module.js';
document.getElementsByTagName('head')[0].appendChild(script);

})();

window.foreignModuleFunction = function() {
    var tmp = "string in foreign module";
    console.log("foreign module function");
};

