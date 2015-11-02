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
    {
      path: "/",
      uses: "base@index"
    }
  ]
};

export {ressources, routes};
