/*---------------------------/
| Users Ressource
|----------------------------*/

let users = {

  // Name of the ressource
  name: "users",

  // Default ressource Configuration
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
        middleware: ["auth.generateAuthToken"],
        need: false
      },
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
