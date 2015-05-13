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

  default: {
    method: 'GET',
    auth  : true
  },

  ressources: [
    {
      data : 'todos',
      endpoints : ['create', 'read', 'all']
    }
  ],

  // REST API ---------------------------------------------------------------------
  // BASE ROUTE =======================
  '/': {
    action: function(req, res) {
      var json = {
        message: 'Welcome on our Api'
      };
      res.json(json);
    },
    auth: false
  },

  // REQUEST AUTHENTCATION ROUTE =======================
  '/login': {
    method    : 'POST',
    uses      : 'authController@login',
    middleware: ['generateAuth'],
    parameters: ['username', 'password'],
    auth      : false
  },

  // // USER ======================
  // Sign Up
  '/users/signup': {
    method    : 'POST',
    uses      : 'userController@signup',
    parameters: ['username', 'password'],
    auth      : false
  },

  '/users/:id': {
    uses: 'userController@get',
  },

  '/me' : {
    uses: 'userController@me'
  },

  // // TODOS =======================
  // GET ALL
  '/todos': {
    uses      : 'todoController@getAll',
    middleware: ['custom.logFinger']
  },

  // GET
  '/todos/:id': {
    uses: 'todoController@get'
  },

  // POST
  '/todos/create': {
    method: 'POST',
    uses  : 'todoController@post',
    socket: true
  },

  // DONE
  '/todos/:id/done': {
    method: 'PUT',
    uses  : 'todoController@done',
    socket: true
  },

  // UNDO
  '/todos/:id/undo': {
    method: 'PUT',
    uses  : 'todoController@undo',
    socket: true
  },

  // DELETE
  '/todos/:id': {
    method: 'DELETE',
    uses  : 'todoController@delete',
    socket: true
  }

};
