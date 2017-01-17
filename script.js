var p = document.createElement('p');
p.textContent = 'This content was added via JavaScript!';
document.body.appendChild(p);

// attempt to read the source of remote content
function inspectForeignSource() {
  [foreignModuleFunction, secretModuleFunction].forEach((f) => {
    var elt = document.createElement('pre');
    elt.innerText = f.toString();
    document.body.appendChild(elt);
  });
}
