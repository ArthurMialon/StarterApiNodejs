/*---------------------------/
| Users Ressource
|----------------------------*/

let users = {

  // Name of the ressource
  name: "users",

  // Configuration
  config: {

    // Enabled CRUD
    CRUD: false,

    // GET method routes
    GET: [
      {
        path: "/",
        action: (req, res, next) => {
          res.send("ok");
        },
        need: true
      },
      {
        path: "/test",
        action: (req, res, next) => {
          res.send("ok");
        },
        need: false
      }
    ],

    // POST method routes
    POST: [
      {
        path: "/signup",
        uses: "users@signup",
      },

      {
        path: "/login",
        uses: "users@login",
        middleware: ["auth.generateAuthToken"],
      }
    ],

    // PUT methods routes
    PUT: [],

    // DELETE methods routes
    DELETE: []
  }
};

export {users};
