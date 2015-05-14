module.exports = {

  initModel: function(model) {
    this.model = require('../models/'+ model);
  },

  initRoute: function(ressource) {
    var routes = new Array();

    if (typeof ressource == 'string') {
      // All functions
      routes[0] = this.newRoute('all', ressource);
      routes[1] = this.newRoute('read', ressource);
      routes[2] = this.newRoute('create', ressource);
      routes[3] = this.newRoute('update', ressource);
      routes[4] = this.newRoute('delete', ressource);
    }
    else if (typeof ressource == 'object') {
      for (var i = 0; i < ressource['endpoints'].length; i++) {
        routes.push(this.newRoute(ressource['endpoints'][i], ressource.data));
      }
    }

    return routes;
  },

  newRoute: function(action, ressource) {
    var r = {
      controller: this,
      middleware: [],
      action    : action
    };

    switch(action) {
      case 'all':
        r.path = '/' + ressource;
        r.method = 'get';
        break;
      case 'read':
        r.path = '/' + ressource + '/:id';
        r.method = 'get';
        break;
      case 'create':
        r.path = '/' + ressource + '/';
        r.method = 'post';
        break;
      case 'update':
        r.path = '/' + ressource + '/:id/';
        r.method = 'put';
        break;
      case 'delete':
        r.path = '/' + ressource + '/:id/delete';
        r.method = 'delete';
        break;
      default:
         r.path = '/' + ress;ource;
         r.method = 'get'
    }

    return r;
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
    var self = this;
    delete req.body.id;
    delete req.body._id;

    self.model.update({ _id: req.params.id }, req.body, { multi: true }, function(err, data) {
      if(err) throw err;
      self.model.find({ _id: req.params.id}, function(err, data) {
        res.json(data);
      });
    });
	},

	delete: function(req, res, next) {
		this.model.remove({ _id: req.params.id }, function(err, data) {
      if (err) res.send(err);
      res.json({message: 'Data deleted', status : true});
    });
	},

	all: function(req, res, next) {
		this.model.find(function(err, data) {
      if (err) res.send(err);
      res.json(data);
      next(req, res);
    });
	}

};