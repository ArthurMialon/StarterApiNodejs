var User          = require('../models/user');
var jwt           = require('jsonwebtoken');
var configuration = require('../config/configuration');

module.exports = {

  /**
  * Check if a token is pass in the request
  * If 'OK' information's token go in the request object
  * You can the see then in your routes with
  *
  * ==> user_id  -> req.tokenInfos.id
  * ==> username -> req.tokenInfos.username
  *
  * Render error if invalid or missing token
  */
  auth: function(req, res, next) {

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (!token)
      return res.sendError(401);
    else {
      // Verify the token
      jwt.verify(token, configuration.secretKey, function(err, decoded) {
        if (err)
          return res.sendError(401);
        else {
          // Token decrypt save in the request
          req.tokenInfos = decoded;
          // Save informations about the user in the requet object
          User.findOne({ _id: decoded.id }, function(err, user) {
            if (err) throw err;
            if (user) {
              req.user = user;
              next();
            }
            else
              return res.sendError(401);
          });
        }
      });
    }
  },

  /**
  * Generate a token for the future request
  * Your user send his credentials
  *
  * ==> username
  * ==> password
  *
  * If match it will generate a new token (JWT) with informations about the user
  * Render error if invalid or missing credentials
  */
  generateAuth: function(req, res, next) {

    // Check credentials in the request
    if (!req.body.username || !req.body.password)
      res.status(400).send({status: 400, message: "Missing credentials"});
    else {
      // Find user with the username
      User.findOne({username: req.body.username}, function(err, user) {
        if (err) throw err;

        if (!user) {
          // Invalid username
          res.sendError(400, 'Invalid credentials');
        }
        else {
          if (!user.validPassword(req.body.password)) {
            // Invalid password
            res.sendError(400, 'Invalid credentials');
          }
          else {
            // Generate a token signed and pass it in the request
            req.token = jwt.sign({id: user.id, username: user.name}, configuration.secretKey, {
              expiresInMinutes: 2880 // expires in 48 hours
            });
            user.password = '';
            req.user = user;
            next();
          }
        }
      });
    }
  },

  /**
  * This function will be executing before route
  * /!\ WARNING /!\
  * -----
  * Don't set header before this function
  * -----
  */
  beforeRoute: function(req, res, next) {
    next();
  },

  /**
  * This function will be executing after route
  * /!\ WARNING /!\
  * -----
  * If you already wrote header in your route it will not be executing
  * -----
  */
  afterRoute: function(req, res) {

    // Do stuff
    console.log('after route');

    // Check if header already be send
    if(!res.headersSent)
      res.json({message: 'after route'});
  }
};
