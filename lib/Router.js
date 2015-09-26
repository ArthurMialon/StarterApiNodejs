import express from 'express';
import Route from './Route';
import CRUD from './Crud';

let expressRouter = express.Router();
let methods       = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

/**
* Class Router
*/
export default class Router {

  /**
  * Constructor
  * @param {Ressource} ressource
  * @return {object} router infos
  */
  constructor(ressource) {
    this.expressRouter = expressRouter;
    this.routes = [];

    methods.forEach((method) => {
      if (ressource.hasMethod(method)) {
        this.initRoutesFor(method, ressource.getRoutes(method));
      }
    });

    if(ressource.hasCrud()) {
      this.createCrud(ressource.getCrud(), ressource.name);
    }

    return {
      prefix: "/" + ressource.name,
      router: this.expressRouter
    };
  }

  /**
  * Create all new routes by method
  * @param {string} http method
  * @param {array} routes
  */
  initRoutesFor(method, routes) {
    let self = this;
    return routes
      .map((route) => { return new Route(method, route, this).toObject(); })
      .forEach((route) => {
        if(!self.hasRoute(route)) {
          self.addRoute(route);
        }
      });
  }

  /**
  * Init CRUD endpoints for the ressources
  */
  createCrud(crud, model) {
    let self = this;
    return crud
      .map((endpoint) => { return new CRUD(endpoint, model).toObject(); })
      .forEach((route) => {
      if(!self.hasRoute(route)) {
        self.addRoute(route);
      }
    });
  }

  /**
  * Check if a route is already set in the router
  * @param {object} route
  * @return {boolean}
  */
  hasRoute(route) {
    let test = this.routes.filter((item) => {
      return (item.method === route.method && item.path === route.path);
    });
    return (test.length > 0);
  }

  /**
  * Create the routing system inside the express router
  * @param {object} route infos
  */
  addRoute(route) {
    this.routes.push(route);
    return this.expressRouter[route.method](route.path, route.middleware, route.action);
  }
}
