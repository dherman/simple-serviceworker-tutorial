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
