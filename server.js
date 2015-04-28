// Set up ======================================================
var configPath      = './app/config/';				
var corePath        = './app/core/';		
var configuration   = require(configPath + 'configuration');
var app  			= require(corePath + 'expressConfig')(configuration); // Initial express configuration
var router 			= require('express').Router();
var database 		= require(corePath + 'database');
var prefix 			= (configuration.apiPrefix) ? configuration.apiPrefix : '/';
var http 			= require('http');							// Need http module to use socket with express easly
var pjson			= require('./package.json');				// Package.json to get some informations about the application
var port     		= process.env.PORT || 8080;                 // Port using
var io 				= require('socket.io');
var server;

// Configuration ==============================================
// ============================================================
// Database =================================================== 
database(configuration);

// Adding configuration in app object =========================
for(var i in configuration) { (typeof configuration[i] != 'function') ? app.set(i, configuration[i]) : undefined; }

// Create server http =========================================
server = http.createServer(app).listen(port);

// Add Socket.io ==========================================
io = io.listen(server);

// Routing HTTP ===============================================
require(corePath + 'requester')(router, io);
function errorHandler(err, req, res, next) {
  res.status(500);
  res.json('error', { error: err });
}
// Adding prefix for the api
app.use(prefix, router);
app.use(errorHandler);



// // Routing Socket.io ==========================================
// require(configPath + 'routesSockets')(io.listen(server));

// Log when launch on the server ==============================
console.log('\x1b[32m%s\x1b[0m: ', "Your amazing app          :  " + pjson.name);
console.log('\x1b[32m%s\x1b[0m: ', "Creating by               :  " + pjson.author);
console.log('\x1b[32m%s\x1b[0m: ', "Runnig version            :  " + pjson.version);
console.log('\x1b[32m%s\x1b[0m: ', app.get('messageOnConsole') + port);




