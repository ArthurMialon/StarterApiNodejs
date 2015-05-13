module.exports = {

	initModel: function(model) {
		this.model = require('../models/'+ model);
	},

	create: function(req, res, next) {
		var new_data = req.body;

	    this.model.create(new_data, function(err, data) {
	      if (err) res.send(err);
	      res.json(data);
	      next(req, res);
	    });
	},

	read: function(req, res, next) {
		this.model.findById(req.params.id, function(err, data) {
	      if (err) res.send(err);
	      if(!data) res.json({message : 'No data found'});
	      res.json(data);
	    });
	},

	update: function(req, res, next) {

	},

	delete: function(req, res, next) {
		this.model.remove({ _id: req.params.id }, function(err, data) {
	      if (err) res.send(err);
	      res.json({message: 'Data deleted', status : true});
	    });
	},

	getAll: function(req, res, next) {
		this.model.find(function(err, data) {
	      if (err) res.send(err);
	      res.json(data);
	      next(req, res);
	    });
	}

};