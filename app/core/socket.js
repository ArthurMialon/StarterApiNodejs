module.exports = {

  emit: function(req, io) {
    var data = req.socketData || {};
    io.sockets.emit(req.routeInfos.method + ' ' + req.url, data);
    io.sockets.emit(req.routeInfos.method + ' ' + req.routeInfos.path, data);
  }

}