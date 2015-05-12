var errors = require('../config/errors');

module.exports = {

	sendError: function(code, message){
		if (!message) 
			this.status(code).send({status: code, message: errors[code].message});
		else 
			this.status(code).send({status: code, message: message});
	}

}; 