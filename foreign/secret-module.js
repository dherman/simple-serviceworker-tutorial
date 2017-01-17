(function() {

var p = document.createElement('p');
p.textContent = 'The secret module has been loaded.';
document.body.appendChild(p);

})();

window.secretModuleFunction = function() {
    var tmp = "string in secret module";
    console.log("secret module function");
};

