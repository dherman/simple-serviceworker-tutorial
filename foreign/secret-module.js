loader.registry.foreign = function secretModule() {
  var temp = 'secret string';

  return 17;
};

/*
(function() {

var p = document.createElement('p');
p.textContent = 'The secret module has been loaded.';
document.body.appendChild(p);

})();

window.secretModuleFunction = function() {
    var tmp = "string in secret module";
    console.log("secret module function");
};

// demonstrate that local content can read the function source of remote content
window.inspectForeignSource();
*/
