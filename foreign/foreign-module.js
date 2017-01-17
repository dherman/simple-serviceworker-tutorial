loader.registry['foreign'].body = function() {
  console.log("executing foreign module");
  return loader.import('secret', 'https://xoscript.surge.sh/secret-module.js')
               .then(secret => {
                 console.log("foreign module loaded secret module");
               });
};
