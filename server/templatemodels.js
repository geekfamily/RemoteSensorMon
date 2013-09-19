var extend = require('node.extend'),
  nconf = require('nconf');

nconf.argv().file('./config.json');


var common = {
//  authUrl: nconf.get('cigna:oauth:url') + '/security/oauth/authorize',
//  clientId: nconf.get('cigna:oauth:clientId'),
//  redirect: nconf.get('cigna:oauth:redirect')
};

var page = {
  home: {

  }
};

module.exports = function(pageName){
  return extend({}, common, page[pageName]);
};