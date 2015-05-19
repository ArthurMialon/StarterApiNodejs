// Set up ======================================================
var configPath    = './lib/config/';
var corePath      = './lib/core/';
var configuration = require(configPath + 'configuration');
var app           = require(corePath + 'expressConfig')(configuration);
var router        = require('express').Router();
var requester     = require(corePath + 'requester');
var database      = require(corePath + 'database');
var prefix        = (configuration.apiPrefix) ? configuration.apiPrefix : '/';
var http          = require('http');
var port          = process.env.PORT || 8080;
var io            = require('socket.io');
var logger        = require(corePath + 'logger');
var server;

// Configuration ==============================================
// ============================================================
// Database ===================================================
database(configuration);

// Create server http  // Add Socket.io // Routing HTTP ===============================================
requester(router, io.listen(http.createServer(app).listen(port, logger())));

// Adding prefix for the api ==================================
app.use(prefix, router);

// Routing Socket.io =======================================
// require(configPath + 'routesSockets')(io.listen(server));