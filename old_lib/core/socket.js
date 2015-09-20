module.exports = {

  emit: function(req, io) {
    var data = req.socketData || {};
    var socket_1 = req.routeInfos.method + ' ' + req.url;
    var socket_2 = req.routeInfos.method + ' ' + req.routeInfos.path;

    console.log('socket sur : ' + socket_1);
    console.log('socket sur : ' + socket_2);

    if (socket_1 == socket_2) {
      io.sockets.emit(socket_2, data);
    }else {
      io.sockets.emit(socket_2, data);
      io.sockets.emit(socket_1, data);
    }
    
  },

  connection: function() {
    // Parcourir les routes
    // Eviter les routes authentifiée
    // Voir pour les middlewares
  }

}