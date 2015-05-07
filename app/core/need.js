module.exports = function(req, route) {

  // TODO
  // =======
  // TESTER FONCTION DU TYPE
  // => BOOLEAN
  // => STRING
  // => INTEGER
  // => FLOAT
  // => DATE

  var need = route.need;
  var user = req.user;

  for(var n in need) {
    if (typeof need[n] == 'boolean') {
      // Is user can and if the variable exist
      if (user[n] != need[n] && user[n])
        return false;
    }else {
      // It's a string
      if (user[n] != need[n] && user[n])
        return false;
    }
  }

  return true;
}