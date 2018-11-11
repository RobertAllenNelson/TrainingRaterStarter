pe = require('parse-error');//parses error so you can read error message and handle them accordingly

to = function (promise) {
  return promise
    .then(data => {
      return [null, data];
    }).catch(err => [pe(err)])
};


