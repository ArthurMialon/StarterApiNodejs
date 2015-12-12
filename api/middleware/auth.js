import base64 from 'base-64';
import utf8 from 'utf8';
import jwt from  'jsonwebtoken';
import Database from '../../lib/Database';
import {jwtConf} from '../config/configuration';

let User = Database.getModel('user');

export default {

  /**
  | ---------------------------------------------------------------
  | Generate Authentication Token Middleware
  | ---------------------------------------------------------------
  |
  | Generate a token for the future request
  | Your user send his or her credentials
  |
  | ==> username
  | ==> password
  |
  | If match it will generate a new token (JWT) with informations about the user
  | Render error if invalid or missing credentials
  |
  */

  generateAuthToken(req, res, next) {

    // Check credentials in the request
    if (!req.body.username || !req.body.password)
      return res.status(400).send({status: 400, message: "Missing credentials"});

    // Find user with the username
    User.findOne({username: req.body.username})
    .then( (user) => {

      if (!user)
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      if (!user.validPassword(req.body.password))
        return res.status(400).send({status: 400, message: 'Invalid credentials'});

      // Generate a token signed and pass it in the request
      req.token = jwt.sign({id: user.id, username: user.username}, jwtConf.secretkey, {
        expiresInMinutes: jwtConf.expires || 2880 // expires in 48 hours
      });
      req.user = user;
      next();

    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({message: "Something went wrong"});
    });


  }

};
