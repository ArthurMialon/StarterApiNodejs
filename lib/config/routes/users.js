module.exports = {

  // // USER ======================

  // Get my own information
  '/me' : {
    description: 'Use to get all information about the authenticate user'
    uses: 'userController@me'
  },

  // Sign Up
  '/users/signup': {
    description: 'Use to create a new user.'
    method    : 'POST',
    uses      : 'userController@signup',
    parameters: ['username', 'password'],
    auth      : false
  },

  // Get a particular user --> You can also use ressourcces.json
  '/users/:id': {
    description: 'Use to get information about a particular user'
    uses: 'userController@get'
  }

}
