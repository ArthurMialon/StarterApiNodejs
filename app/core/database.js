var mongoose = require('mongoose');

module.exports = function(configuration) {

  var o = {
    user: configuration.dbUser,
    pass: configuration.dbPassword
  };

  mongoose.connection.on("open", function(ref) {
    console.log("");
    console.log('\x1b[34m%s\x1b[0m', "Connected to mongo server!");
  });

  mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    console.log("Error message : " + err.message);
  });

  try {
    mongoose.connect("mongodb://" + configuration.dbHost + "/" + configuration.dbName, o);
    db = mongoose.connection;
    console.log("Started connection on mongodb://" + configuration.dbHost + "/" + configuration.dbName);
  } catch (err) {
    console.log("Setting up failed to connect to " + configuration.dbHost + "/" + configuration.dbName);
  }
};
