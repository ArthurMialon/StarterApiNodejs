module.exports = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token');

  // Intercept OPTIONS method
  if ('OPTIONS' == req.method)
    res.send(200);
  else
    next();
}