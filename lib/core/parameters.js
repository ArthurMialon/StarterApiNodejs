module.exports = {

	/**
	* Check necessary parameters
	*/
	check: function(req, route) {
	  if (route.parameters) {
	    for (var p in route.parameters)
	      if (!req.body[route.parameters[p]])
					var m = {parameter: route.parameters[p], state: 'missing'}
					this.missing.push(m);
	  }
	  return (this.missing.length > 0) ? false : true;
	},

	missing: []

}
