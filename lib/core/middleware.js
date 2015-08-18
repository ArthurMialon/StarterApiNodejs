var Middleware = require('../middleware/middleware');

module.exports = {

  init: function (middleware, auth) {

    return middleware;
  },

  getDefaultMiddleware: function() {
    // return Array of default middleware functions
  }

  getAuthStrategy: function(auth) {
    // return a function
  },

  requireAuth: function(auth) {
    // return a require of the aut strategy middleware
  }



}
