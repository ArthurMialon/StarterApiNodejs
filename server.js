// Set up ======================================================
var configPath      = './app/config/';				
var corePath        = './app/core/';		
var configuration   = require(configPath + 'configuration');
var app  			= require(corePath + 'expressConfig')(configuration);
var router 			= require('express').Router();
var requester 		= require(corePath + 'requester');
var database 		= require(corePath + 'database');
var prefix 			= (configuration.apiPrefix) ? configuration.apiPrefix : '/';
var http 			= require('http');			
var pjson			= require('./package.json');		
var port     		= process.env.PORT || 8080;          
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

// Add Socket.io ==============================================
io = io.listen(server);
// Faire la connexion .on('connection') ici
// Envoyer socket à router

// Routing HTTP ===============================================
requester(router, io);

// // Error Handler ===========================================xs
// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.json('error', { error: err });
// }
// app.use(errorHandler);

// Adding prefix for the api ==================================
app.use(prefix, router);

// Routing Socket.io =======================================
// require(configPath + 'routesSockets')(io.listen(server));

// Log when launch on the server ==============================
console.log('\x1b[32m%s\x1b[0m: ', "Your amazing app          :  " + pjson.name);
console.log('\x1b[32m%s\x1b[0m: ', "Creating by               :  " + pjson.author);
console.log('\x1b[32m%s\x1b[0m: ', "Runnig version            :  " + pjson.version);
console.log('\x1b[32m%s\x1b[0m: ', app.get('messageOnConsole') + port);




