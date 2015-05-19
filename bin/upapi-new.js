var fs   = require('fs-extra');
var path = require('path');

// Shorter functions
var res = path.resolve;

module.exports = {
  description: 'Create a new API.',
  logs: {
    before: 'Creating your API.',
    after: 'Your API is ready.'
  },

  init: function(root, userRoot, args) {
    if (!args[1]) {
      console.log('Please specify a name for your api');
      return;
    }

    this.name = args[1];

    // apiRoot is the root of the app to create
    // i.e: userRoot/myApp/
    var appRoot = path.join(userRoot, this.name);

    fs.mkdirSync(appRoot);

    fs.copySync(res(root, '.gitignore'), res(appRoot, '.gitignore'));
    fs.copySync(res(root, '.npmignore'), res(appRoot, '.npmignore'));
    fs.copySync(res(root, 'package.json'), res(appRoot, 'package.json'));
    fs.copySync(res(root, 'README.md'), res(appRoot, 'README.md'));
    fs.copySync(res(root, 'server.js'), res(appRoot, 'server.js'));

    // Temporary
    fs.copySync(path.join(root, 'lib'), path.join(appRoot, 'lib'));
    fs.copySync(path.join(root, 'node_modules'), path.join(appRoot, 'node_modules'));
    fs.copySync(path.join(root, 'test'), path.join(appRoot, 'test'));
    fs.copySync(path.join(root, 'api'), path.join(appRoot, 'api'));

    // Todo : copy as if there was no Todo ressources and without the tests
    //        add an option so we can create an app with the todo and the tests
  }
};

