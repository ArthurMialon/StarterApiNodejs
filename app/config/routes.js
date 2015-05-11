var uploads = require('../services/upload');

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
    method : 'GET',
    auth   : true,
    socket : false
  },

  // REST API ---------------------------------------------------------------------
  // BASE ROUTE =======================
  '/': {
    action: function(req, res) {
      res.json({message: 'Welcome on our Api', status: 200});
    }
  },

  '/uploads': {
    method : 'POST',
    action: function(req, res) {
      uploads(req.files, false, function(err, file) {
        if (err) 
          console.log(err);
        else 
          console.log('success upload :)');
      });
    },
    auth : false
  },

  // REQUEST AUTHENTCATION ROUTE =======================
  '/login': {
    method     : 'POST',
    uses : 'authController@login',
    middleware: ['generateAuth'],
    parameters : ['username', 'password'],
    auth : false
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
    uses : 'userController@get',
  },

  '/me' : {
    uses : 'userController@me',
  },

  // // TODOS =======================
  // GET ALL
  '/todos': {
    uses : 'todoController@getAll',
    middleware : ['custom.logFinger'],
    auth : false
  },

  // GET
  '/todos/:id': {
    uses : 'todoController@get',
    auth : false
  },

  // POST
  '/todos/create': {
    method : 'POST',
    uses   : 'todoController@post',
    parameters : ['todo'],
    socket : true,
  },

  // DONE
  '/todos/:id/done': {
    method : 'PUT',
    uses  : 'todoController@done',
    socket: true
  },

  '/todos/:id/undo': {
    method : 'PUT',
    uses  : 'todoController@undo',
    socket: true
  },

  // DELETE
  '/todos/:id/delete': {
    method : 'DELETE',
    uses   : 'todoController@delete',
    socket : true
  }

};
