module.exports = function(req, res, next) {

	res.sendError = function(code, message){
		var errors = require('../config/errors');
		if (!message) 
			this.status(code).send({status: code, message: errors[code].message});
		else 
			this.status(code).send({status: code, message: message});
	}

	next();

}; 