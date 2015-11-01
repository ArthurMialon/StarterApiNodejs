/*---------------------------/
| Users Ressource
|----------------------------*/

let users = {

  // Name of the ressource
  name: 'users',

  // Default ressource configuration
  config: {

    // Default config for all ressource endpoint
    default : {
      need: {
        admin: true
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
        auth: false
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
