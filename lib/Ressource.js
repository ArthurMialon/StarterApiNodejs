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
  constructor(name, config) {
    this.name         = name;
    this.config       = config;
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
