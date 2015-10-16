/*---------------------------/
| Users Ressource
|----------------------------*/

let users = {

  // Name of the ressource
  name: "users",

  // Configuration
  config: {

    // Enabled CRUD
    CRUD: [
      { action: "all" },
      { action: "delete" }
    ],

    // GET method routes
    GET: [],

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
