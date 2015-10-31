export default {

  port: process.env.PORT || 3000,

  /*---------------------------------------------/
  | Middleware configuration
  | Here you can choose how to sort your Middleware
  | and your options
  |----------------------------------------------*/

  sortMiddleware: [
    "auth",
    "need",
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
    secretkey: "mysupersecretkey"
  },


};
