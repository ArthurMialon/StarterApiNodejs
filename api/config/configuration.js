export default {

  /* Listen port */
  port: process.env.PORT || 3000,


  /*---------------------------------------------/
  | Middleware configuration
  | Here you can choose how to sort your Middleware
  | and your options
  |----------------------------------------------*/

  sortMiddleware: [
    "auth",      // First middleware option
    "need",      // Second middleware option
    "middleware" // ==> Example: array middleware ["auth.generate"]
  ],


  /*---------------------------------------------/
  | Default type of authentication
  |----------------------------------------------*/

  defaultAuthentication: "basic",


  /*---------------------------------------------/
  | Your secret key
  | Use for authentication
  |----------------------------------------------*/

  jwtConf: {
    secretkey: "mysupersecretkey",
    header   : "x-access-token",
    param    : "token"
  },


  /*---------------------------------------------/
  | Default pagination for CRUD routes
  |----------------------------------------------*/

  /* Default limit */
  limit: 10


};
