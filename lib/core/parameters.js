module.exports = {

	/**
	* Check necessary parameters
	* @param Object route
	* @param Object route
	*/
	check: function(req, route) {
		this.missing = [];

	  if (route.parameters) {
	    for (var p in route.parameters) {
	      if (!req.body[route.parameters[p]]) {
					this.missing.push({parameter: route.parameters[p], state: 'missing'});
				}
			}
	  }

	  return (this.missing.length > 0) ? false : true;
	}

}
