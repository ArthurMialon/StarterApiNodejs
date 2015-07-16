var config     = require('../config/configuration');
var Middleware = require('../middleware/middleware');
var Routing    = require('./routing');
var routes     = require('../core/routes')().paths;
var CRUD       = require('./crud');
var _          = require('lodash');

var Requester = {

  /**
  * Allow router method
  **/
  allowMethod: ['get', 'post', 'put', 'delete'],

  /**
  * Init Default object for routing
  * @params Object defaults options
  */
  initDefault: function(defaults) {
    this.defaults = defaults;
  },

  /**
  * Create a new route
  * @params router Object Express router object
  * @params path   String route path
  * @params route  Object route infos (method, action, controller etc...)
  * @params io     Object Socket.io object
  */
  createRoute: function(router, path, route, io) {
    // Init the route object
    if (!this.defaults)
      this.defaults = {};

    // Route initialisation
    this.route = this.initRoute(path, route);

    // Create new express router instance
    this.initRouter(router, this.route, io);
  },

  /**
  * Init the route object with the right options
  * @params String path
  * @params Object route
  * @return Object route
  */
  initRoute: function(path, route) {

    // Adding path in route object
    route.path = path;

    // Set the method
    route.method = this.initMethod(route.method);

    // Set controller
    if (route.uses) {
      var uses         = this.initUses(route.uses);
      route.controller = this.initController(uses.controller, uses.action);
      route.action     = uses.action;
    }
    else
      route.controller = this.initController(route.controller, route.action);

    // Set socket
    route.socket = this.initSocket(route.socket);

    // Set middlewares
    route.middleware = this.initMiddleware(route.middleware, route.auth);

    return route;
  },

  /**
  * Init socket
  * @params boolean route socket infos
  * @return boolean
  */
  initSocket: function(socket) {
    return (socket || (this.defaults.socket && socket !== false)) ? true : false;
  },

  /**
  * Init middlewares functions for the routes
  * @params Array   middlewares
  * @params Boolean auth
  * @return Array   middlewares
  */
  initMiddleware: function(middleware, auth) {
    // If there is middlewares
    if (middleware) {
      // Foreach middleware we push it in middlewares
      middleware.forEach(function(v, i) {
        var f = v.split('.');
        middleware[i] = (f.length == 1) ? Middleware[middleware[i]] : require('../middleware/'+f[0])[f[1]];
      });
    }
    else if (this.defaults.middleware) {
      var middleware = [];
      for (m in this.defaults.middleware) {
        middleware[m] = Middleware[this.defaults.middleware[m]];
      }
    }
    else
      middleware = [];

    // Check auth middleware
    if (auth || (this.defaults.auth === true && auth !== false)) {
      middleware.unshift(this.initAuthStrategy(auth, this.defaults.auth));
    }

    return middleware;
  },

  /**
  * Init the auth strategy
  # @param mixed auth
  # @param boolean _auth
  */
  initAuthStrategy:  function(auth, _auth) {
    auth    = auth || _auth;
    return (typeof auth == "boolean") ? this.requireAuth(config.defaultAuthStrategy) : this.requireAuth(auth);
  },

  /**
  * Require the auth strategy in module
  */
  requireAuth: function(auth) {
    auth = auth.split('.')
    return (auth.length == 1) ? Middleware[auth[0]] : require('../middleware/' + auth[0])[auth[1]];
  },

  /**
  * Init uses return controller and action
  * @params String uses
  * @return Object controller and action
  */
  initUses: function(uses) {
    uses = uses.split('@');
    return {
      controller: uses[0],
      action    : uses[1]
    };
  },

  /**
  * Set the controller
  * @params String controller
  * @params String action
  * @return null || controller object
  */
  initController: function(controller, action) {
    // If action is a function there is no controller
    if (typeof action == 'function')
      return null;
    else {
      if (controller)
        return require('../../api/controllers/' + controller);
      else if (this.defaults.controller)
        return require('../../api/controllers/' + this.defaults.controller);
    }

    return null;
  },

  /**
  * Set the method
  * @params String method
  * @return String the method
  */
  initMethod: function(method) {
    if (method) {
      method = method.toLowerCase();
      if (this.allowMethod.indexOf(method) > -1)
        return method;
    }
    else if (this.defaults.method)
      return this.defaults.method.toLowerCase();

    // Default
    return 'get';
  },

  /**
  * Init crud for a ressource
  * @params Function express router
  * @params Object || String ressource
  * @Params Object   Socket
  */
  createCrud: function(router, ressource, io) {
    if(typeof ressource == 'string')
      CRUD.initModel(ressource);
    else
      CRUD.initModel(ressource['data']);

    var routes = CRUD.initRoute(ressource);

    for (var r in routes) {
      routes[r].middleware = this.initMiddleware(routes[r].middleware, routes[r].auth);
      this.initRouter(router, routes[r], io);
    }
  },

  /**
  * Create a new Express Router instance
  * @params Function express router
  * @params Object   route infos
  * @Params Object   Socket
  */
  initRouter: function(router, route, io) {
    Routing(router, route, io);
  }
};

module.exports = function(router, io) {

  // Init Default
  if (routes['default'])
    Requester.initDefault(routes['default']);

  // Init CRUS ressources
  if(routes['ressources']){
    _.forIn(routes['ressources'], function(value, key) {
      Requester.createCrud(router, value, io);
    });
  }

  // Init own routes
  _.forIn(routes, function(value, key) {
    if (key != 'default' && key != "ressources")
      Requester.createRoute(router, key, value, io);
  });

  // In case of routing error 404
  router.all('*', function(req, res, next) {
    res.status(404).send({status: 404, message: config.message404});
  });
};
