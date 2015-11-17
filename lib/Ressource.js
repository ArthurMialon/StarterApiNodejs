import Router from './Router';
import {isObject, isArray} from 'lodash';

/**
* Class Ressource
*/
export default class Ressource {

  /**
  * Constructor
  * @param {string} name
  * @param {object} config
  */
  constructor(name, model, config) {
    this.name   = name;
    this.model  = model || null;
    this.config = config;
    this.createRouter();
  }

  /**
  * Create a Router for a Ressource
  */
  createRouter() {
    this.router = new Router(this);
  }

  /**
  * Getter CRUD
  * @return {mixed} crud infos or false
  */
  getCrud() {
    return this.config.CRUD;
  }

  /**
  * Check if the ressource has a CRUD set
  * @return {boolean}
  */
  hasCrud() {
    return !!this.config.CRUD;
  }

  /**
   * Get the model name for the ressource
   * @return {string} model name
   */
  getModel() {
    return this.model;
  }

  /**
  * Get routes by method
  * @param {string} method
  * @return {array} routes infos
  */
  getRoutes(method) {
    return this.config[method];
  }

  /**
  * Know if the ressource has endpoints for a method
  * @param {string} method
  * @return {boolean}
  */
  hasMethod(method) {
    return !!this.config[method];
  }
}
