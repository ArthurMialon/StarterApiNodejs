module.exports = {

  // REQUEST AUTHENTCATION ROUTE =======================
  '/login': {
    description: 'Use this route to authenticate your user'
    method    : 'POST',
    uses      : 'authController@login',
    middleware: ['generateAuth'],
    parameters: ['username', 'password'],
    auth      : false
  }

}
