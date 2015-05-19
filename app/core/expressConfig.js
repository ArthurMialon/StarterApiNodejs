var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var multer         = require('multer');
var appPath        = __dirname + '/../';
var cors           = require('./cors');

module.exports = function(configuration) {
  var app = express();

  // Log every request to the console if dev
  if (configuration.dev) app.use(morgan('dev'));

  // Set the static files location /public/img will be /img for users
  app.use(express.static(appPath + configuration.publicDir ));

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({'extended':'true'}));

  // Parse application/json
  app.use(bodyParser.json());

  // Parse application/vnd.api+json as json
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));

  // For Delete and Put method
  app.use(methodOverride());

  // CORS
  app.use(cors);

  // Upload system multer
  app.use(multer({
    dest : './app/' + configuration.publicDir + '/' + configuration.upload.dir,
    limits: {
      fieldNameSize: configuration.upload.fieldNameSize,
      files: configuration.upload.files,
      fields: configuration.upload.fields,
      fileSize: configuration.upload.fileSize
    },
    rename: function(fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function(file) {

    },
    inMemory: true
  }));

  return app;
};
