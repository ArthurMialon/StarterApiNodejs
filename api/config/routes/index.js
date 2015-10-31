import {users} from './users';

/*---------------------------------------------/
| Default configuration w/ all routes in app
! NOT AVAILABLE YET !
|----------------------------------------------*/
let config = {

};

/*---------------------------------------------/
| Import your ressources here
|----------------------------------------------*/
let ressources = [
  users
];


/*---------------------------------------------/
| Default routes configuration
| Routes not uses with ressources from "/""
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
