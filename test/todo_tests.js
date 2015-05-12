// Run `npm start` in an other terminal tab or uncomment this line
// var server = require('../server');

var request  = require('request');
var assert   = require('assert');
var mongoose = require('mongoose');
var is       = require('is_js');

var conf = require('../app/config/configuration');

var db     = conf.db;
var prefix = (conf.apiPrefix) ? conf.apiPrefix : '/';
var url    = 'http://127.0.0.1:8080' + prefix;

try {
  mongoose.connect("mongodb://" + db.host + "/" + db.name);
  console.log("Connected to the database.");
}
catch (err) {
  console.log("Setting up failed to connect to " + db.Host + "/" + db.name);
}




// /!\ Comment if you don't want to drop the DB
describe('Drop DB', function() {
  it('should drop the database', function(done) {
    mongoose.connection.on('open', function() {
      mongoose.connection.db.dropDatabase();
      assert.equal(1,1);
      done();
    });
  })
});


describe('Home', function() {

  describe('GET /', function() {
    it('should respond with status 200 and welcome', function(done) {
      request(url, function(err, resp, body) {
        assert.equal(resp.statusCode, 200);
        // Why do we have to JSON.parse(body) ??
        // assert.equal(is.json(body), true);
        // assert.equal(body.message, 'Welcome on our Api');
        done();
      });
    });
  });

});


describe('Users & Authentication', function() {

  var options = {
    uri: url+'/users/signup',
    method: 'POST',
    json: {
      username: 'test',
      password: 'test'
    }
  };
  describe('POST /users/signup', function() {
    it('should respond JSON with status 200', function(done) {
      request(options, function(err, resp, body) {
        assert.equal(resp.statusCode, 200);
        assert.equal(is.json(body), true);
        assert.equal(body.username, 'test');
        done();
      });
    });
  });
  describe('POST /users/signup with the same username', function() {
    it('should respond with status 400', function(done) {
      request(options, function(err, resp, body) {
        assert.equal(resp.statusCode, 400);
        assert.equal(is.json(body), true);
        assert.equal(body.message, 'Username already exist');
        done();
      });
    });
  });

  describe('POST /login as "test"', function() {
    it('should respond JSON with status 200', function(done) {
      options.uri = url+'/login';
      request(options, function(err, resp, body) {
        assert.equal(resp.statusCode, 200);
        assert.equal(is.json(body), true);
        done();
      });
    });
  });
  describe('POST /login as "anonymous"', function() {
    it('should respond JSON with status 400 \'Invalid credentials\'', function(done) {
      options.uri = url+'/login';
      options.json.username = 'anonymous';
      request(options, function(err, resp, body) {
        assert.equal(resp.statusCode, 400);
        assert.equal(is.json(body), true);
        assert.equal(body.message, 'Invalid credentials');
        done();
      });
    });
  });

});
