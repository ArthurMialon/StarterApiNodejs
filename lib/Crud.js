import Route from './Route';
import Database from './Database';
import pluralize from 'pluralize';

// All Available endpoints for CRUD
let endpoints = {
  "all":   {
    method: "GET",
    path: "/"
  },
  "create": {
    method: "POST",
    path: "/"
  },
  "read": {
    method: "GET",
    path: "/:id"
  },
  "update": {
    method: "PUT",
    path: "/:id"
  },
  "delete": {
    method: "DELETE",
    path: "/:id"
  }
};

/**
* Class CRUD
*/
export default class CRUD extends Route {

  /**
  * Constructor
  * @param {object} config object
  * @param {string} ressource name
  */
  constructor(config, name) {
    // Parent constructor
    let method  = endpoints[config.action].method;
    config.path = endpoints[config.action].path;

    // Construct the base route
    super(method, config);

    // Necessary for CRUD class
    this.ressource = pluralize(name, 1);
    this.model     = Database.getModel(this.ressource);

    // Get the action from the endpoints object
    this.action = this[config.action].bind(this);
  }

  /**
  * ALL
  * @return {promise} request from Database
  */
  all(req, res) {
    let page  = req.query.page || 0;
    let limit = req.query.limit || 10;
    return this.response(res, this.model.find().paginate({page: page, limit: limit}));
  }

  /**
  * CREATE
  * @return {promise} request from Database
  */
  create(req, res) {
    return this.response(res, this.model.create(req.body));
  }

  /**
  * READ
  * @return {promise} request from Database
  */
  read(req, res) {
    return this.response(res, this.model.findOne().where({ id: req.params.id }));
  }

  /**
  * UPDATE
  * @return {promise} request from Database
  */
  update(req, res) {
    return this.response(res, this.model.update().where({ id: req.params.id }));
  }

  /**
  * DELETE
  * @return {promise} request from Database
  */
  delete(req, res) {
    return this.response(res, this.model.destroy().where({ id: req.params.id }));
  }

  /**
  * Send a response based on a promise
  * @param {object} res object
  * @param {promise} request from Database
  */
  response(res, promise) {
    promise
      .then((data) => {
        if (!data) return res.status(404).send({message: "Not Found", status: 404});
        return res.send(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).end();
      });
  }
}
