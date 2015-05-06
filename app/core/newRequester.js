var Middleware    = require('../middleware/middleware');
var Routing 	  = require('./routing');
var routes        = require('../config/routes');

var Requester = {

	/**
	* Init Default object for routing
	*/
	initDefault : function(defaults) {
		this.defaults = defaults;
	},

	/**
	* Create a new route
	* @params router Object Express router object
	* @params path   String route path
	* @params route  Object route infos (method, action, controller etc...)
	* @params io     Object Socket.io object	 
	*/
	createRoute : function(router, path, route, io) {
		// Express Router
		this.router = router;

		// Socket object
		this.io = io;		

		// Init the route object
		this.route = this.initRoute(path, route);

		this.initRouter();
	},

	initRoute : function(path, route) {

		// Adding path in route object
		route.path = path;

		// Set the method
		route.method = this.initMethod(this.route.method);

		// Set controller
		route.controller = this.initController(route.controller, route.action);

		// Set middlewares
		route.middlewares = this.initMiddleware(route.middlewares);

		return route;
	},

	initMiddleware : function(middlewares, auth) {

		// If there is middlewares
		if(middlewares) {
			// Foreach middleware we push it in middlewares
            for(m in middlewares) {
                middlewares[m] = Middleware[middlewares[m]];
            } 
        }else { middlewares = []; }

        // Check auth middleware
        if(auth) { middlewares.unshift(Middleware['auth']); }

        return middlewares;
	}

	/**
	* Set the controller 
	* @return null || controller object 
	*/ 
	initController : function(controller, action) {
		// If action is a function there is no controller
		if(typeof action == 'function') {
			return null;
		}else {
			// If there is a controller return the module
			if(controller) {
				return require('../controllers/' + controller);

			// If there is a default controller
			}else if(this.defaults.controller){
				return require('../controllers/' + this.defaults.controller);

			// No controller
			}else {
				return null;
			}
		}
	},

	/**
	* Set the method 
	* @return String the method 
	*/ 
	initMethod : function(method) {

		// Switch the method
		if(method) {
			switch(method.toLowerCase()) {
			    case 'get':
			        method = 'get';
			        break;
			    case 'post':
			        method = 'post';
			        break;
			    case 'put':
			    	method = 'put';
			    	break;
			   	case 'delete':  
			    	method = 'delete';
			    	break;
			    default:
			        method = 'get';
			}
		}else {
			// Check the default method
			if(this.defaults.method) { 
				method = this.defaults.method; 
			}
			// Return get if no method
			else { 
				method = 'get'; 
			}
		}

		return method;
	},

	/**
	* Create a new Express Router instance
	*/
	initRouter : function() {
		Routing(this.router, this.route, this.io);
	}

}

module.exports = function(router, io) {

	if(routes['default']) {
		Requester.initDefautl();
	}
	for(var r in routes) {
		if(r != 'default') {
			Requester.createRoute(router, r, routes[r], io);	
		}		
    }

    router.all('*', function(req, res, next) {
    	res.status(404).send({ status: 404, message: 'No ressources find. Please read the doc.' });
    });
}