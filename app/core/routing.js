var Middleware = require('../middleware/middleware');
var Parameters = require('./parameters');
var Need       = require('./need');
var Socket     = require('./socket');

module.exports = function(router, route, io) {

  router[route.method](route.path, route.middleware, function(req, res, next) {

    if (!Parameters.check(req, route)) {
      res.json({satus: 400, message: 'Bad request: missing parameters'});
      return false;
    }

    if (!Need.check(req, res)) {
      res.status(400).send({status: 400, message: "You don't have permissions."});
      return false;
    }

    // Add route infos in the request
    req.routeInfos = route;

    // Launch the right method from the right controller
    if (route.controller) {
      route.controller[route.action](req, res, function(req, res) {
        // After route
        Middleware.afterRoute(req, res);
        // Emit socket
        if(route.socket)
          Socket.emit(req, io);
      });
    }
    else {
      route.action(req, res, function(req, res) {
        // After route
        Middleware.afterRoute(req, res);
        // Emit socket
        if(route.socket)
          Socket.emit(req, io);
      });
    }

  });
}

