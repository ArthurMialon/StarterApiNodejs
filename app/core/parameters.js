module.exports = {

	/**
	* Check necessary parameters
	*/
	check: function(req, route) {
	  if (route.parameters) {
	    for(var p in route.parameters) {
	      if(!req.body[route.parameters[p]])
	      	return false;
	    }
	  }
	  return true;
	}

}