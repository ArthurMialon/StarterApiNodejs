import express from 'express';
import Route from './Route';
import CRUD from './Crud';
import {merge} from 'lodash';

let methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

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
    this.expressRouter = express.Router();
    this.routes = [];

    methods.forEach((method) => {
      if (ressource.hasMethod(method)) {
        this.initRoutesFor(method, ressource.getRoutes(method), ressource.defaultConfig);
      }
    });

    if(ressource.hasCrud()) {
      this.createCrud(ressource.getCrud(), ressource.name, ressource.defaultConfig);
    }

    let prefix = "/";
    if (ressource.name) {
      prefix += ressource.name;
    }

    return {
      prefix: prefix,
      router: this.expressRouter
    };
  }

  /**
  * Create all new routes by method
  * @param {string} http method
  * @param {array} routes
  */
  initRoutesFor(method, routes, defaultConfig) {
    let self = this;
    return routes
      .map((route) => { return this.bindDefaultConfig(route, defaultConfig); })
      .map((route) => { return new Route(method, route).toObject(); })
      .forEach((route) => {
        if(!self.hasRoute(route)) {
          self.addRoute(route);
        }
      });
  }

  /**
  * Init CRUD endpoints for the ressources
  */
  createCrud(crud, model, defaultConfig) {
    let self = this;
    return crud
      .map((endpoint) => { return this.bindDefaultConfig(endpoint, defaultConfig); })
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
  * Add the default configuration for a route definition
  * @param {object} route
  * @param {object} default configuration
  * @return {object} merge configuration
  */
  bindDefaultConfig(route, defaultConfig) {
    return merge(defaultConfig, route);
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
