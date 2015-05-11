module.exports = {

  /**
  * Middleware custom
  * Log a finger to the console
  */
  logFinger: function(req, res, next) {

    console.log("     __");
    console.log("    (  \\ ");
    console.log("     \\ =\\ ");
    console.log("    __\\_'-\\ ");
    console.log("  (____))( \\----");
    console.log("  (____)) - ");
    console.log("  (____))    ");
    console.log("  (____))____/----");
    console.log(" ______________________");
    console.log("");    

    next();
  }
}