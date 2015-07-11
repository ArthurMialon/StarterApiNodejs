var configuration = require('../configuration');

module.exports = {

  // BASE ROUTE =======================
  '/': {
    description: 'This is the base route of the API',
    action: function(req, res) {
      var json = {
        message: 'Welcome on our Api ! Edit the lib/config/routes/base.js to change this JSON',
        version: configuration.version,
        website: configuration.website
      };
      res.json(json);
    },
    auth: false
  }

}
