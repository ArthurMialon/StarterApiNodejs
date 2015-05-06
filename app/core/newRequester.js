// Besoin des routes

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

		return route;
	},

	/**
	* Set the controller 
	* @return null || controllet object 
	*/ 
	initController : function(controller, action) {
		// Verifier le controller par defaut
		return (typeof action == 'function') ? null : require('../controllers/' + controller);
	},

	/**
	* Set the method 
	* @return String the method 
	*/ 
	initMethod : function(method) {

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
			if(this.defaults.method) { return this.defaults.method; }
			else { return 'get'; }
		}

		return method;
	},

	initRouter : function() {
		// Using Routing
		// Routing : router, route, middleware
	}

}