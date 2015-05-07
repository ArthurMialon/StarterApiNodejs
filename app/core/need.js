var is = require('is_js');

module.exports = {

  /**
  * Check what the user should be
  */
  check: function(req, route) {
    // TODO
    // =======
    // TESTER FONCTION DU TYPE AVEC IS_JS
    // => BOOLEAN
    // => STRING
    // => INTEGER
    // => FLOAT
    // => DATE

    var need = route.need;
    var user = req.user;

    for(var n in need) {
      if (typeof need[n] == 'boolean') {
        // Is user can and if the variable exist
        if (user[n] != need[n] && user[n])
          return false;
      }else {
        // It's a string
        if (user[n] != need[n] && user[n])
          return false;
      }
    }

    return true;
  },

  /**
  * Check boolean
  */
  isBoolean: function() {

  },

  isInteger: function() {

  },

  isString: function() {

  },

  isFloat: function() {

  },

  isDate: function() {

  }

}