// Load Middleware
var Middleware    = require('../middleware/middleware');
var routes        = require('../config/routes');
var Crud          = require('./crud.js');

var requester = {
	createRoute : function(router, path, route, io) {
		// Add socket;
		this.io = io;

		// Express Rouyter
		this.router = router;

		// Config router
		this.route  = route;

		// Adding path in route object
		this.route.path = path;

		// Check the method
		this.checkMethod();

		// Check middlewares
		this.checkMiddleware();

		// Add controller
		this.route.controller = (typeof this.route.action == 'function') ? null : require('../controllers/'+this.route.controller);

		this.initRouter();
	},

	hasController : function(route) {
		return (route.controller) ? true : false;
	},

	checkMethod : function() {

		switch(this.route.method) {
		    case 'GET':
		        this.route.method = 'get';
		        break;
		    case 'POST':
		        this.route.method = 'post';
		        break;
		    case 'PUT': 
		    	this.route.method = 'put';
		    	break;
		   	case 'DELETE': 
		    	this.route.method = 'delete';
		    	break;
		     case 'get':
		        this.route.method = 'get';
		        break;
		    case 'post':
		        this.route.method = 'post';
		        break;
		    case 'put': 
		    	this.route.method = 'put';
		    	break;
		   	case 'delete': 
		    	this.route.method = 'delete';
		    	break;
		    default:
		        this.route.method = 'get';
		}

		return this.route.method;
	},

	checkParameter : function(req, res, route) {
		var parameters = route.parameters;

		var missing = {};
        	missing.message = 'Bad request : Missing parameters';
        	missing.status = 400;

	    if(parameters) {
	        var params = [];
	        for(var p in parameters) {
	            if(!req.body[parameters[p]]) { params.push(parameters[p]); }
	        }
	        missing.parameters = (params.length > 0) ? params : false;                     
	    }

	    if(missing.parameters) {
	        res.json(missing);
	        return false;
	    }

	    return true;

	},

	checkMiddleware : function() {
		if(this.route.middlewares) {
            for(m in this.route.middlewares) {
                this.route.middlewares[m] = Middleware[this.route.middlewares[m]];
            } 
        }else { this.route.middlewares = []; }

        if(this.route.auth) { this.addAuth(); }

        return this.route.middlewares;
	},

	checkNeed : function(req, res, route) {
		var need = route.need;
		var user = req.user;

		for(var n in need) {
			if(typeof need[n] == 'boolean') {
				if(user[n] != need[n]){
					res.status(400).send({ status: 400, message: "You d'ont have permissions." });
	        		return false;	
				}
			}else {
				console.log(' c un string a décodée');
			}
		}

		return true;
	},

	addAuth : function() {
		this.route.middlewares.unshift(Middleware['auth']);
	},	

	callBeforeRoute : function(req, res, next) {
		Middleware.beforeRoute(req, res, next);
	},

	callAfterRoute : function(req, res, next) {
		Middleware.afterRoute(req, res, next);
	},

	useSocket : function(route) {
		return (route.socket) ? true : false;
	},

	sendSocket : function(io, route, req) {
		var t = io.sockets.emit(route.method + ' ' + route.path);
		console.log('Socket sur : (' + route.method + ' ' + route.path + ')');
	},

	initRouter : function() {
		var self = this;

		var routing = function(router, route) {	
			// Lauch router here
			router[route.method](route.path, route.middlewares, function(req, res, next) {

				// Check necessary parameters 
				var p = self.checkParameter(req, res, route);
				if(!p) { return false; }

				// Check need
				var n = self.checkNeed(req, res, route);
				if(!n) { return false; }

				// Launch before route
				self.callBeforeRoute();

				// Add route infos in the request
				req.routeInfos = route;

				// Launch the right method from the righr controller
				(self.hasController(route)) ? route.controller[route.action](req, res) : route.action(req, res);

				if(self.useSocket(route)) { self.sendSocket(self.io, route, req); }

			});			
		}
		routing(this.router, this.route);

	}
};

module.exports = function(router, io) {
	for(var r in routes) {
        requester.createRoute(router, r, routes[r], io);
    }

    router.all('*', function(req, res, next) {
    	res.status(404).send({ status: 404, message: 'No ressources find. Please read the doc.' });
    });
}