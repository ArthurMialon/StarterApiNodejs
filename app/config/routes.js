module.exports = {

  /**
  * Here your can configure your routes
  * This is a simple JSOM format
  * Each route is identify by its path like /books/:id
  * Then this object can specify a method for the route --> Default GET
  * There must have an action on each route
  * You can specify a controller where you action is define --> in ../controllers directory
  * You can specify middleware to use
  * You can specify if this route must be authenticate
  * You can specify if you want that this route send socket.
  * You can spaecify necessary parameters
  * You can specify what the user should have to be able to call the route
  **/

  /* Work In Progress */
  default: {
    method    : 'GET',
    controller: 'todoController',
    action    : 'get',
    auth      : true,
    socket    : true
  },
  /* Work In Progress */


  // REST API ---------------------------------------------------------------------
  // BASE ROUTE =======================
  '/': {
    action: function(req, res) {
      res.json({message: 'Welcome on our Api', status: 200});
    }
  },

  // REQUEST AUTHENTCATION ROUTE =======================
  '/login': {
    method     : 'POST',
    controller : 'authController',
    action     : 'login',
    middlewares: ['generateAuth'],
    parameters : ['username', 'password']
  },

  // // USER ======================
  // Sign Up
  '/users/signup': {
    method    : 'POST',
    controller: 'userController',
    action    : 'signup',
    parameters: ['username', 'password']
  },

  '/users/:id': {
    method    : 'GET',
    controller: 'userController',
    action    : 'get',
    auth      : true
  },

  // // TODOS =======================
  // GET ALL
  '/todos': {
    method    : 'GET',
    controller: 'todoController',
    action    : 'getAll',
    auth      : true
  },

  // GET
  '/todos/:id': {
    method    : 'GET',
    controller: 'todoController',
    action    : 'get',
    auth      : true
  }

};
