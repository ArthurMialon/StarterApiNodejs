var User          = require('../../api/models/user');
var jwt           = require('jsonwebtoken');
var configuration = require('../config/configuration');
var base64        = require('base-64');
var utf8          = require('utf8');


module.exports = {

  //======================================================================
  //  Token based Authentication
  // ===================================

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

  authToken: function(req, res, next) {

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (!token)
      return res.status(401).send({status: 401, message: 'Unauthorized'});

    // Verify the token
    jwt.verify(token, configuration.secretKey, function(err, decoded) {
      if (err)
        return res.status(401).send({status: 401, message: 'Unauthorized'});

      // Token decrypt save in the request
      req.tokenInfos = decoded;

      // Save informations about the user in the request object
      User.findOne({ _id: decoded.id }).select('-password').exec(function(err, user) {
        if (err) throw err;
        if (!user)
          return res.status(401).send({status: 401, message: 'Unauthorized'});

        req.user = user;
        next();
      });

    });

  },


  /**
  | ---------------------------------------------------------------
  | Generate Authentication Token Middleware
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

  generateAuthToken: function(req, res, next) {

    // Check credentials in the request
    if (!req.body.username || !req.body.password)
      return res.status(400).send({status: 400, message: "Missing credentials"});

    // Find user with the username
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) throw err;

      if (!user)
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      if (!user.validPassword(req.body.password))
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      // Generate a token signed and pass it in the request
      req.token = jwt.sign({id: user.id, username: user.name}, configuration.secretKey, {
        expiresInMinutes: 2880 // expires in 48 hours
      });
      req.user = user;
      next();

    });
  },


  //======================================================================
  //  HTTP Basic Authentication
  // ===================================

  /**
  | ---------------------------------------------------------------
  | Basic http authorization Middleware
  | ---------------------------------------------------------------
  |
  | Check if credentials in authorization header are valid
  | In case of validation the user is set in the request
  | to be able to use it in other Middlewares or controllers
  |
  */

  authHttpBasic: function (req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).send({status: 401, message: 'Unauthorized', infos: 'You need Basic http Authorization'});
    else
      authorization = req.headers.authorization.split(' ');

    if (authorization[0] != "Basic")
      return res.status(401).send({status: 401, message: 'Unauthorized', infos: 'You need Basic http Authorization'});

    var credentials = utf8.decode(base64.decode(authorization[1])).split(':');

    if(credentials.length == 1) {
      return res.status(401).send({status: 400, message: 'Invalid credentials'});
    }

    User.findOne({username: credentials[0]}, function(err, user) {
      if (err) throw err;
      if (!user)
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      if (!user.validPassword(credentials[1]))
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      req.user = user;
      next();
    });
  }

};
