module.exports = function(req, route) {
  var need = route.need;
  var user = req.user;

  for(var n in need) {
    if (typeof need[n] == 'boolean') {
      // Is user can and if the variable exist
      if (user[n] != need[n] && user[n])
        return false;
    }else {
      // Couper la string
      // Récuperer les 2 premiers mots
      // First time --> Just a simple string --> Use a module for next !!!
      if (user[n] != need[n] && user[n])
        return false;
    }
  }

  return true;
}