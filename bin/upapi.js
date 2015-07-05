#! /usr/bin/env node

var exec = require('child_process').exec;
var args = process.argv.splice(2);
var path = require('path');
var firstArgs = ['new', 'generate', 'conf', 'routes', 'up'];

// root is the directory of StartApiNodejs globally
var root = path.join(__dirname, '../');

// userRoot is the directory where the user calls the CLI
var userRoot = process.cwd();

// Check gen args that become generate
if (args[0] == 'gen') args[0] = 'generate';
var command = args[0];

if (firstArgs.indexOf(command) === -1) {
  console.log('Invalid argument...');
  console.log('Please read the docs on http://github.com/ArthurMialon/StartApiNodejs');
  // todo, log CLI usage
  return;
}

var cmd = require('./upapi-'+command);

cmd.init(root, userRoot, args);

// ==> GUIDELINE FOR NEXT COMMAND LINES
// // New app
// $ upapi new <appName>

// // Generate code
// $ upapi generate|gen controller <name>
// $ upapi generate|gen model <name>
// $ upapi generate|gen ressource <name>
// $ upapi generate|gen <name>

// // Generate conf
// $ upapi conf dev
// $ upapi conf prod

// // List routes
// $ upapi routes
// $ upapi routes <method>
// $ upapi routes <method>
// $ upapi routes <method>
// $ upapi routes <method>

// // Launch server
// $ upapi up
