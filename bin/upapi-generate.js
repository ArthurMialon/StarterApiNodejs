var fs   = require('fs-extra');
var path = require('path');
var _    = require('lodash');

// Shorter functions
var res = path.resolve;

module.exports = {
  description: 'Generate a controller, model, ressource or all of them.',
  logs: {
    before: 'Generating.',
    after: 'Generated.'
  },

  init: function(root, userRoot, args) {
    // check if userRoot is really an upapi app
    // Basically if templates and ressources.json exist
    var err = false;

    // TODO: try catch everything
    // careful: fs.exists will be deprecated soon...
    var stats = fs.lstatSync(path.join(userRoot, 'api/controllers'));
    if (!stats.isDirectory()) err = true;
    stats = fs.lstatSync(path.join(userRoot, 'api/models'));
    if (!stats.isDirectory()) err = true;
    stats = fs.lstatSync(res(userRoot, 'lib/config/ressources.json'));
    if (!stats.isFile()) err = true;

    if (err) {
      console.log('Are you sure you are in the good directory?');
      return false;
    }


    var types = ['controller', 'model', 'ressource'];
    this.name  = '';

    // Minimum 2 arguments: generate <name>
    // args[1] can't be in types
    if (args.length === 2 && types.indexOf(args[1]) === -1) {
      this.name = args[1];
      this.generate(root, userRoot);
    }

    // Maximum 3 arguments: generate <type> <name>
    // args[1] has to be in types
    else if (args.length === 3 && types.indexOf(args[1]) > -1) {
      this.name = args[2];
      // generate the right file
      this['generate'+_.capitalize(args[1])](root, userRoot);
    }

    else {
      console.log('Bad usage');
      return false;
    }
  },

  generate: function(root, userRoot) {
    this.generateController(root, userRoot);
    this.generateModel(root, userRoot);
    // this.generateRessource(root, userRoot);
  },

  generateController: function(root, userRoot) {
    console.log('Generating Controller ' + this.name);

    var content = fs.readFileSync(res(root, 'templates/controller.template'));
    content = _.template(content);
    var fileName = res(userRoot, 'api/controllers/' + this.name + 'Controller.js' );
    fs.writeFileSync(fileName, content({ 'ressource': this.name }));
  },

  generateModel: function(root, userRoot) {
    console.log('Generating Model ' + this.name);

    var content = fs.readFileSync(res(root, 'templates/model.template'));
    content = _.template(content);
    var fileName = res(userRoot, 'api/models/' + this.name + '.js' );
    fs.writeFileSync(fileName, content({ 'ressource': this.name }));
  },

  generateRessource: function(root, userRoot) {
    console.log('Generating ressource ' + this.name);
    // TODO: edit /lib/config/ressources.json
  },
};

