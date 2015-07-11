module.exports = {

  // BASE ROUTE =======================
  '/': {
    action: function(req, res) {
      var json = {
        message: 'Welcome on our Api'
      };
      res.json(json);
    },
    auth: false
  }

}
