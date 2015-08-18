var fs   = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;

// Shorter functions
var res = path.resolve;

module.exports = {
  description: 'Your routes list',
  logs: {
  },

  init: function(root, userRoot, args) {

    var paths_parent = require(process.cwd() + "/lib/config/routes/default");
    var crud         = require(process.cwd() + "/lib/core/crud");

    console.log('\x1b[32m%s\x1b[0m: ', " \n===> Your ressources");
    // ressources
    for (var r in paths_parent.ressources) {
      routes = crud.initRoute(paths_parent.ressources[r]);
      var name = paths_parent.ressources[r].data || paths_parent.ressources[r];
      console.log('\x1b[32m%s\x1b[0m: ', "\n" + capitalize(name));
      for (var i in routes) {
        method = routes[i].method.toUpperCase();
        while(method.length < 6) { method += " "; }
        console.log(method + " ---> " + routes[i].path);
      }
    }

    console.log("\n");
    // Own routes
    console.log('\x1b[32m%s\x1b[0m: ', "===> Your own routes");
    method = paths_parent['default'].method || "GET";
    for (var p in paths_parent) {
      if(p != "default") {
        if(p != "ressources") {
          console.log('\x1b[32m%s\x1b[0m: ', "\n" + capitalize(p));
          for (r in paths_parent[p]) {
            method = paths_parent[p][r].method || method;
            while(method.length < 6) { method += " "; }
            console.log(method.toUpperCase() + " ---> " + r);
          }
        }
      }
    }

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
