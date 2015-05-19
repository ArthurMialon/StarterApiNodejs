#! /usr/bin/env node

var exec = require('child_process').exec;
var args = process.argv.splice(2);

var exec = require('child_process').exec;
var path = require('path');



var firstArgs = ['new', 'generate', 'conf', 'routes', 'up'];
var command = args[0];

if (firstArgs.indexOf(command) === -1) {
  console.log('Invalid argument');
  // todo, log CLI usage
  return;
}


// root is the directory of StartApiNodejs
var root = path.join(__dirname, '../');
// userRoot is the directory where the user calls the CLI
var userRoot = process.cwd();


var cmd = require('./upapi-'+command);

cmd.init(root, userRoot, args);



