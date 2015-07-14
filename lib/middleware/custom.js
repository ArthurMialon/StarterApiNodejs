module.exports = {

  /**
  * Middleware custom
  * Log a finger to the console
  */
  logFinger: function(req, res, next) {
    console.log('HERE - This is a finger.');
    next();
  },

  strategy: function(req, res, next) {
    console.log("My own strategy");
    next();
  }
}
