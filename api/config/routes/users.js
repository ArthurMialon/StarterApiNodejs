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
      need: {
        admin: false
      }
    },

    // Enabled CRUD
    CRUD: [
      { action: "all" },
      { action: "read" }
    ],

    // GET method routes
    GET: [
      {
        path: "/test",
        action(req, res) {
          res.send("ok");
        },
        auth: "jwt"
      }
    ],

    // POST method routes
    POST: [
      {
        path: "/signup",
        uses: "users@signup"
      },

      {
        path: "/login",
        uses: "users@login",
        middleware: ["auth.generateAuthToken"]
      }
    ],

    // PUT methods routes
    PUT: [],

    // DELETE methods routes
    DELETE: []
  }
};

export {users};
