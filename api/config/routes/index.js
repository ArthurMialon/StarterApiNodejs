import {users} from './users';

/*---------------------------------------------/
| Import your ressources here
|----------------------------------------------*/
let ressources = [
  users
];


/*---------------------------------------------/
| Default routes configuration
| Routes not uses with ressources
| accessible from "/"
|----------------------------------------------*/
let routes = {
  GET: [

    /* Root of the api */
    {
      path: "/",
      uses: "base@index"
    },

    /* Redirection when route not found */
    {
      path: "*",
      uses: "base@notFound"
    }
  ],
  
  POST: [
    /* Redirection when route not found */
    {
      path: "*",
      uses: "base@notFound"
    }
  ],

  PUT: [
    /* Redirection when route not found */
    {
      path: "*",
      uses: "base@notFound"
    }
  ],

  DELETE: [
    /* Redirection when route not found */
    {
      path: "*",
      uses: "base@notFound"
    }
  ]
};

export {ressources, routes};
