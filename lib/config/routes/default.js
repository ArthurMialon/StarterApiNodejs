module.exports = {

  /**
  * Doc for routing
  * Here your can configure your routes, this is a simple JSON format
  * Each route is identify by its path like /books/:id
  * Then this object can specify an http method for the route --> Default GET
  * There must have an action on each route
  * You can specify a controller where your action is define --> in api/controllers directory
  * You can specify middleware to use
  * You can specify if this route must be authenticate
  * You can specify if you want that this route send socket.
  * You can specify necessary parameters
  * You can specify what the user should have to be able to call the route ex : administrator: true
  **/

  // Default configuration
  default : {
    method: 'GET',
    auth  : true
  },

  // Your ressources from ressources.json
  ressources : require('../ressources.json'),

  // Import your own routes
  'base'  : require('./base'),
  'auth'  : require('./auth'),
  'todos' : require('./todos'),
  'users' : require('./users')
}
