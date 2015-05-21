var mongoose = require('mongoose');

module.exports = function(configuration) {

  var db = configuration.db;

  var o = {
    user: db.user,
    pass: db.password
  };

  mongoose.connection.on("open", function(ref) {
    if (!configuration.dev)
      console.log('\x1b[34m%s\x1b[0m', "Connected to mongo server!");
  });

  mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    console.log("Error message : " + err.message);
  });

  try {
    mongoose.connect("mongodb://" + db.host + "/" + db.name, o);
  }
  catch (err) {
    console.log("Setting up failed to connect to " + db.host + "/" + db.name);
    console.log("");
  }
};
