module.exports = {

  /**
  | ---------------------------------------------------------------
  | Before Route Middleware
  | ---------------------------------------------------------------
  |
  | This function will be executing before route
  |
  */

  beforeRoute: function(req, res, next) {
    console.log('before route');
    next();
  },


  /**
  | ---------------------------------------------------------------
  | After Route Middleware
  | ---------------------------------------------------------------
  |
  | This function will be executing after route
  | /!\ WARNING /!\
  | -----
  | If you already wrote header in your route you will set can't one other
  | -----
  |
  */
  afterRoute: function(req, res) {

    // Do stuff
    console.log('after route');

    // Check if header already be send
    if(!res.headersSent)
      res.json({message: 'after route'});
  }
};
