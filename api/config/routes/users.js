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
    GET: [
      // Example of a route
      {
        path: "/test",
        uses: "users@index",
        requires: ["page", "sort"],
        need: [
          {
            administrator: true,
            age: "> 18"
          }
        ],
        need2: {
          administrator: true
        },
        socket: true,
        auth: true,
        auth2: "authService.myFunction",
        auth3: "myFunction"
      }
    ],

    // POST method routes
    POST: [],

    // PUT methods routes
    PUT: [],

    // DELETE methods routes
    DELETE: []
  }
};

export {users};
