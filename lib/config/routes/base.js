var configuration = require('../configuration');

module.exports = {

  /**
  | ---------------------------------------------------------------
  | Base route ==> Accessible from '/' URL
  | ---------------------------------------------------------------
  |
  | Base route of your API
  |
  |
  */

  '/': {
    description: 'This is the base route of the API',
    action: function(req, res) {
      var json = {
        message: 'Welcome on our Api ! Edit the lib/config/routes/base.js to change this JSON',
        version: configuration.version,
        website: configuration.website
      };
      res.json(json);
    },
    auth: false
  },


  '/login': {
    description: 'Use this route to authenticate your user',
    method    : 'POST',
    uses      : 'authController@login',
    middleware: ['auth.generateAuthToken'],
    parameters: ['username', 'password'],
    auth      : false
  },

  // Get my own information
  '/me' : {
    description: 'Use to get all information about the authenticate user',
    uses: 'userController@me'
  }

};
