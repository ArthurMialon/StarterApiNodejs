import {users} from './users';

// Default configuration for routes and ressources
let config = {

};

// All ressources import
let ressources = [
  users
];

let routes = {
  GET: [
    {
      path: "/",
      uses: "base@index"
    }
  ]
};

export {config, ressources, routes};
