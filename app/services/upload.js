var fs            = require('fs');
var configuration = require('../config/configuration');
var path          = './app/' + configuration.publicDir + '/' + configuration.upload.dir + '/';

module.exports = function(files, name, callback) {
  var file = files.file;  
  var buffer = file.buffer;
  var fileName = file.name;

  var stream = fs.createWriteStream(path + fileName);
  stream.write(buffer);
  stream.on('error', function(err) {
    callback(err, false);
  });
  stream.on('finish', function() {
    callback(false, file);
  });
  stream.end();
}
