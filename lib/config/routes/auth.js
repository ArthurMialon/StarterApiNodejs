module.exports = {

  /**
  | ---------------------------------------------------------------
  | Authentication route
  | ---------------------------------------------------------------
  |
  | Route to authenticate your users
  |
  */

  '/login': {
    description: 'Use this route to authenticate your user',
    method    : 'POST',
    uses      : 'authController@login',
    middleware: ['auth.generateAuthToken'],
    parameters: ['username', 'password'],
    auth      : false
  }

}
