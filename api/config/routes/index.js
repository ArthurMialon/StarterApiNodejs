import {users} from './users';

/*---------------------------------------------/
| Default configuration for all routes in app
|----------------------------------------------*/
let config = {
  auth: true,
  need: {
    admin: false
  }
};

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
    {
      path: "/",
      uses: "base@index"
    }
  ]
};

export {config, ressources, routes};
