var cors = require('../config/configuration').cors;

module.exports = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', cors.origin);
  res.header('Access-Control-Allow-Methods', cors.methods);
  res.header('Access-Control-Allow-Headers', cors.headers);

  // Intercept OPTIONS method
  if ('OPTIONS' == req.method)
    res.status(200).json({message: 'ok'}).end()
  else
    next();
}
