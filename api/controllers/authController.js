module.exports = {

  /**
  * Send the token and the user authenticate infos
  */
  login: function(req, res) {
    res.json({
      token : req.token,
      user : req.user
    });
  }
};
