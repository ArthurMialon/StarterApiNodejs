import Option from '../../../lib/Option';
import {defaultAuthentication, jwtConf} from '../../config/configuration';
import base64 from 'base-64';
import utf8 from 'utf8';
import jwt from  'jsonwebtoken';
import Database from '../../../lib/Database';

export default class Need extends Option {

  /**
  * Constructor
  */
  constructor() {
    super();

    /*
      Accept parameter
    */
    this.accept = [
      this.types.BOOLEAN,
      this.types.STRING
    ];

    /*
      Default type of authentication
    */
    this.defaultAuth = defaultAuthentication;

    /*
      User Model
    */
    this.User = Database.getModel('user');
  }


  /**
   * Configuration with boolean
   */
  forBoolean(auth) {
    if (!auth) {
      return function(req, res, next) {next();};
    }else if(this.authExist(this.defaultAuth)) {
      return this[this.defaultAuth].bind(this);
    }
  }


  /**
   * Configuration with string
   */
  forString(auth) {
    if (!this.authExist(auth)) {
      return function(req, res, next) {next();};
    }else {
      return this[auth].bind(this);
    }
  }


  /**
   * Check if  the type of Authentication expiresInMinutes
   * @param {string} type of auth
   * @return {boolean}
   */
  authExist(type) {
    return typeof this[type] === "function";
  }


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
  basic(req, res, next) {

    var authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).send({status: 401, message: 'Unauthorized', infos: 'You need Basic http Authorization'});
    else
      authorization = req.headers.authorization.split(' ');

    if (authorization[0] !== "Basic")
      return res.status(401).send({status: 401, message: 'Unauthorized', infos: 'You need Basic http Authorization'});

    var credentials = utf8.decode(base64.decode(authorization[1])).split(':');

    if(credentials.length === 1) {
      return res.status(401).send({status: 400, message: 'Invalid credentials'});
    }

    this.User.findOne({username: credentials[0]}, function(err, user) {
      if (err) throw err;
      if (!user)
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      if (!user.validPassword(credentials[1]))
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      req.user = user;
      next();
    });
  }

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
  | The use is set in the request to with req.user
  |
  | Render error if invalid or missing token
  |
  */

  jwt(req, res, next) {

    let token = req.body.token || req.param(jwtConf.param) || req.headers[jwtConf.header];

    if (!token)
      return res.status(401).send({status: 401, message: 'Unauthorized'});

    // Verify the token
    jwt.verify(token, jwtConf.secretkey, (err, decoded)  => {
      if (err)
        return res.status(401).send({status: 401, message: 'Unauthorized'});

      // Token decrypt save in the request
      req.tokenInfos = decoded;

      // Save informations about the user in the request object
      this.User.findOne({ id: decoded.id })
      .then((user)  => {
        if (!user)
          return res.status(401).send({status: 401, message: 'Unauthorized'});

        req.user = user;
        next();
      })
      .catch( (err) => {
        if (err) throw err;
      });

    });

  }


}
