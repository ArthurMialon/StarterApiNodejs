module.exports = {

  // // USER ======================

  // Get my own information
  '/me' : {
    uses: 'userController@me'
  },

  // Sign Up
  '/users/signup': {
    method    : 'POST',
    uses      : 'userController@signup',
    parameters: ['username', 'password'],
    auth      : false
  },

  // Get a particular user --> You can also use ressourcces.json
  '/users/:id': {
    uses: 'userController@get'
  }

}
