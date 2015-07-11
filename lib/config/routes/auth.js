module.exports = {

  // REQUEST AUTHENTCATION ROUTE =======================
  '/login': {
    method    : 'POST',
    uses      : 'authController@login',
    middleware: ['generateAuth'],
    parameters: ['username', 'password'],
    auth      : false
  }
  
}
