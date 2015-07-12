var User          = require('../../api/models/user');
var jwt           = require('jsonwebtoken');
var configuration = require('../config/configuration');

module.exports = {

  /**
  | ---------------------------------------------------------------
  | Authentication Middleware
  | ---------------------------------------------------------------
  |
  | Check if a token is pass in the request
  | If 'OK' information's token go in the request object
  | You can the see then in your routes with
  |
  | ==> user_id  -> req.tokenInfos.id
  | ==> username -> req.tokenInfos.username
  |
  | Render error if invalid or missing token
  |
  */

  auth: function(req, res, next) {

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (!token)
      return res.status(401).send({status: 401, message: 'Unauthorized'});
    else {
      // Verify the token
      jwt.verify(token, configuration.secretKey, function(err, decoded) {
        if (err)
          return res.status(401).send({status: 401, message: 'Unauthorized'});
        else {
          // Token decrypt save in the request
          req.tokenInfos = decoded;
          // Save informations about the user in the request object
          User.findOne({ _id: decoded.id }).select('-password').exec(function(err, user) {
            if (err) throw err;
            if (user) {
              req.user = user;
              next();
            }
            else
              return res.status(401).send({status: 401, message: 'Unauthorized'});
          });
        }
      });
    }
  },


  /**
  | ---------------------------------------------------------------
  | Generate Authentication Middleware
  | ---------------------------------------------------------------
  |
  | Generate a token for the future request
  | Your user send his credentials
  |
  | ==> username
  | ==> password
  |
  | If match it will generate a new token (JWT) with informations about the user
  | Render error if invalid or missing credentials
  |
  */

  generateAuth: function(req, res, next) {

    // Check credentials in the request
    if (!req.body.username || !req.body.password)
      res.status(400).send({status: 400, message: "Missing credentials"});
    else {
      // Find user with the username
      User.findOne({username: req.body.username}, function(err, user) {
        if (err) throw err;

        if (!user)
          res.status(400).send({status: 400, message: 'Invalid credentials'});
        else {
          if (!user.validPassword(req.body.password))
            res.status(400).send({status: 400, message: 'Invalid credentials'});
          else {
            // Generate a token signed and pass it in the request
            req.token = jwt.sign({id: user.id, username: user.name}, configuration.secretKey, {
              expiresInMinutes: 2880 // expires in 48 hours
            });
            req.user = user;
            next();
          }
        }
      });
    }
  },


  /**
  | ---------------------------------------------------------------
  | Before Route Middleware
  | ---------------------------------------------------------------
  |
  | This function will be executing before route
  |
  */

  beforeRoute: function(req, res, next) {
    console.log('before route');
    next();
  },


  /**
  | ---------------------------------------------------------------
  | After Route Middleware
  | ---------------------------------------------------------------
  |
  | This function will be executing after route
  | /!\ WARNING /!\
  | -----
  | If you already wrote header in your route you will set can't one other
  | -----
  |
  */
  afterRoute: function(req, res) {

    // Do stuff
    console.log('after route');

    // Check if header already be send
    if(!res.headersSent)
      res.json({message: 'after route'});
  }
};
