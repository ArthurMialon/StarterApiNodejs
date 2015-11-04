/*---------------------------/
| Users Ressource
|----------------------------*/

let users = {

  // Name of the ressource (plurial)
  name: 'users',

  // Ressource configuration
  config: {

    // Default configuration for all ressource endpoints
    default : {
      auth: true
    },

    // Enabled CRUD
    CRUD: [
      { action: "all" },
      // { action: "create" },
      { action: "read" },
      { action: "update" },
      { action: "delete" }
    ],

    // GET method routes
    GET: [
      {
        path: "/test",
        action(req, res) {
          res.send("ok");
        },
        auth: false
      }
    ],

    // POST method routes
    POST: [
      {
        path: "/signup",
        uses: "users@signup",
        parameters: ["first_name", "last_name", "username", "password"],
        auth: false
      },

      {
        path: "/login",
        uses: "users@login",
        middleware: ["auth.generateAuthToken"],
        parameters: ["username", "password"],
        auth: false
      }
    ],

    // PUT methods routes
    PUT: [],

    // DELETE methods routes
    DELETE: []
  }
};

export {users};
