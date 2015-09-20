var config = require('../config/configuration');

module.exports = {

  /**
  * Array contains all models
  */
  models: [],

  /**
  * Path for all crud routes
  * Order by action with its method and uri
  */
  paths: {
    'all': {
      method: 'get',
      uri: '/%s'
    },
    'read': {
      method: 'get',
      uri: '/%s/:id'
    },
    'create': {
      method: 'post',
      uri: '/%s'
    },
    'update': {
      method: 'put',
      uri: '/%s/:id'
    },
    'delete': {
      method: 'delete',
      uri: '/%s/:id'
    }
  },

  /**
  * Init the model for the ressource
  * @param {String} model name
  */
  initModel: function(model) {
    if (!this.models[model])
      this.models[model] = require('../../api/models/'+ model);
  },

  /**
  * Create a new crud route
  * @param {String || Object}
  * @return {Array} routes object
  */
  initRoute: function(ressource) {
    var routes = [];

    // All route with no auth
    if (typeof ressource == 'string') {
      for (var path in this.paths)
        routes.push(this.newRoute(path, ressource, false));
    }
    else if (typeof ressource == 'object')
      for (var i = 0; i < ressource.endpoints.length; i++)
        routes.push(this.newRoute(ressource.endpoints[i], ressource.data, ressource.auth));

    return routes;
  },

  /**
  * Create route object for requester
  * @param {String} the action
  * @param {String} the name of the ressources
  * @param {Array} || Boolean is authenticate
  * @return {Object} route
  */
  newRoute: function(action, ressource, auth) {
    var route = {
      controller: this,
      middleware: [],
      action    : action,
    };

    if (auth)
      route.middleware = (auth === true || auth.indexOf(action) != -1) ? [config.defaultAuthStrategy] : [];

      if(this.paths[action]) {
        route.path   = this.paths[action].uri.replace(/%s/g, ressource);
        route.method = this.paths[action].method.replace(/%s/g, ressource);
      }else {
        route.path   = '/' + ressource;
        route.method = 'get';
      }

    return route;
  },

  /**
  * Get the model for the right ressource
  * @param {string} url
  * @return {object} mongoose model
  */
  getModel: function(url) {
    return this.models[url.replace(/^\/|\/$/g, '')];
  },

  /**
  * Create - Crud
  */
  create: function(req, res, next) {

    /* Get the model */
    this.model = this.getModel(req.url);

    var new_data = req.body;

    this.model.create(new_data, function(err, data) {
      if (err) res.send(err);
      res.json(data);
      next(req, res);
    });
	},

  /**
  * Read - Crud
  */
	read: function(req, res, next) {

    /* Get the model */
    this.model = this.getModel(req.url);

		this.model.findById(req.params.id, function(err, data) {
      if (err) res.send(err);
      if(!data) res.json({message : 'No data found'});
      res.json(data);
      next(req, res);
    });
	},

  /**
  * Update - Crud
  */
	update: function(req, res, next) {

    /* Get the model */
    this.model = this.getModel(req.url);

    var self = this;

    delete req.body.id;
    delete req.body._id;

    self.model.update({ _id: req.params.id }, req.body, { multi: true }, function(err, data) {
      if(err) throw err;
      self.model.find({ _id: req.params.id}, function(err, data) {
        res.json(data);
        next(req, res);
      });
    });
	},

  /**
  * Delete - Crud
  */
	delete: function(req, res, next) {

    /* Get the model */
    this.model = this.getModel(req.url);

		this.model.remove({ _id: req.params.id }, function(err, data) {
      if (err) res.send(err);
      res.json({message: 'Data deleted', status : true});
      next(req, res);
    });
	},

  /**
  * Get all - Crud
  */
	all: function(req, res, next) {

    /* Get the model */
    this.model = this.getModel(req.url);

    // Pagination
    var page     = parseInt(req.query.page)     || 1;
    var per_page = parseInt(req.query.per_page) || 10;
    var sort     = parseInt(req.query.sort)     || -1;
    var options = {
      page: page,
      limit: per_page,
      sortBy: {
        _id: sort
      }
    };

    // Get all with pagination
    this.model.paginate({}, options, function(err, results, pageCount, itemCount) {
      if (err) throw err;
      res.json({
        items: results,
        total_items: itemCount,
        page: page,
        max_page: pageCount
      });
      next(req, res);
    });
	}

};
