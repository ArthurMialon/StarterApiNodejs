var Middleware    = require('../middleware/middleware');
var Parameters    = require('./parameters');
var Need    	  = require('./need');
var Socket    	  = require('./socket');

module.exports = function(router, route, io) {

	router[route.method](route.path, route.middlewares, function(req, res, next) {

		// HERE Check necessary parameters 

		// HERE Check need

		// HERE Launch before route

		// Add route infos in the request
		req.routeInfos = route;

		// Launch the right method from the right controller
		if(route.controller) {
			route.controller[route.action](req, res, function(req, res) {
				// Callback next
				// HERE After route
				// HERE Socket
			});
		}else {
			route.action(req, res, function(req, res) {
				// Callback next
				// HERE After route
				// HERE Socket				
			});
		}				

	});	
}