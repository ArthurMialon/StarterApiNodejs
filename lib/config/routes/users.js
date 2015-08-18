var Policies = require('../policies');

module.exports = {

  /**
  | ---------------------------------------------------------------
  | Users routes ==> Accesible from '/users'
  | ---------------------------------------------------------------
  |
  | routes for your users
  |
  */

  // Sign Up
  '/signup': {
    description: 'Use to create a new user.',
    method    : 'POST',
    uses      : 'userController@signup',
    parameters: ['username', 'password'],
    auth      : false
  },

  // Get a particular user --> You can also use ressourcces.json
  '/:id': {
    description: 'Use to get information about a particular user',
    uses: 'userController@get',
    need: Policies.admin
  }

};
