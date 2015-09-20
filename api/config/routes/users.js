/*---------------------------/
| Users Ressource
|----------------------------*/

let users = {

  // Name of the ressource
  name: "users",

  // Configuration
  config: {
    // Enabled automatic crud
    CRUD: [
      { action: "all", auth: true }
    ],

    // GET method routes
    GET   : [
      {
        path: "/",
        uses: "users@index"
      }
    ],

    // POST method routes
    POST  : [],

    // PUT methods routes
    PUT   : [],

    // DELETE methods routes
    DELETE: []
  }
};

export {users};
