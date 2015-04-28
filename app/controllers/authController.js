module.exports = {

	/**
	* Get All todos
	*/
	generate : function(req, res) {
		res.json({status : 200, token : req.token, user : req.user});
	}

};