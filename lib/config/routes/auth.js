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
    middleware: ['generateAuth'],
    parameters: ['username', 'password'],
    auth      : false
  }

}
