module.exports = {

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
      uri: '/%s/'
    },
    'update': {
      method: 'put',
      uri: '/%s/:id/'
    },
    'delete': {
      method: 'delete',
      uri: '/%s/:id/delete'
    }
  },

  /**
  * Init the model for the ressource
  * @params String model name
  */
  initModel: function(model) {
    this.model = require('../../api/models/'+ model);
  },

  /**
  * Create a new crud route
  * @params String || Object
  * @return Array routes object
  */
  initRoute: function(ressource) {
    var routes = new Array();

    // All route with no auth
    if (typeof ressource == 'string') {
      for (var path in this.paths)
        routes.push(this.newRoute(path, ressource, false));
    }
    else if (typeof ressource == 'object')
      for (var i = 0; i < ressource['endpoints'].length; i++)
        routes.push(this.newRoute(ressource['endpoints'][i], ressource.data, ressource['auth']));

    return routes;
  },

  /**
  * Create route object for requester
  * @params String the action
  * @params String the name of the ressources
  * @params Array || Boolean is authenticate
  * @return route object
  */
  newRoute: function(action, ressource, auth) {
    var r = {
      controller: this,
      middleware: [],
      action    : action,
    };

    if (auth)
      if (auth === true)
        r.middleware = ['auth'];
      else
        r.middleware = (auth.indexOf(action) != -1) ? ['auth'] : [];

      if(this.paths[action]) {
        r.path = this.paths[action]['uri'].replace(/%s/g, ressource);
        r.method = this.paths[action]['method'].replace(/%s/g, ressource);
      }else {
        r.path = '/' + ressource;
        r.method = 'get';
      }

    return r;
  },

  /**
  * Create - Crud
  */
  create: function(req, res, next) {
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
		this.model.findById(req.params.id, function(err, data) {
      if (err) res.send(err);
      if(!data) res.json({message : 'No data found'});
      res.json(data);
    });
	},

  /**
  * Update - Crud
  */
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

  /**
  * Delete - Crud
  */
	delete: function(req, res, next) {
		this.model.remove({ _id: req.params.id }, function(err, data) {
      if (err) res.send(err);
      res.json({message: 'Data deleted', status : true});
    });
	},

  /**
  * Get all - Crud
  */
	all: function(req, res, next) {

    // Pagination
    var page     = parseInt(req.query.page) || 1;
    var per_page = parseInt(req.query.per_page) || 10;
    var sort     = parseInt(req.query.sort) || 1;

    this.model.paginate({}, page, per_page, function(err, pageCount, paginatedResults, itemCount) {
      if (err) throw err;

      res.json({
        items : paginatedResults,
        total_items : itemCount,
        page : page,
        max_page : pageCount
      });

    }, {sortBy : { _id : sort }});
	}

};