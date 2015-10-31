export default {

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
  | Your secret key
  | Use for authentication
  |----------------------------------------------*/

  token: {
    secretkey: "mysupersecretkey"
  },


};
