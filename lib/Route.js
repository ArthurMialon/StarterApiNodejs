/**
* Class Route
*/
export default class Route {

  /**
  * Constructor
  * @param {string} method
  * @param {object} route config
  */
  constructor(method, config) {
    this.path       = config.path || "/";
    this.middleware = [];
    this.method     = this.getMethod(method);
    this.action     = this.initAction(config);

    return this;
  }

  /**
  * Render a route as an object
  * @return {object} route object
  */
  toObject() {
    return {
      method    : this.method,
      path      : this.path,
      middleware: this.middleware,
      action    : this.action
    };
  }

  /**
  * Intialisation of the action
  * @param {object} route config
  * @return {function} action
  */
  initAction(config) {
    let controller = config.controller;
    let action     = config.action;

    var baseAction = (req, res) => {
      return res.send('Action or Controller not specified');
    };

    if (typeof action == "function") return action;

    if (config.uses && typeof config.uses == "string") {
      let endpoint   = config.uses.split("@");
      controller = endpoint[0];
      action     = endpoint[1];
    }

    controller = this.getController(controller);

    if (!controller) return baseAction;

    controller = new controller();
    if (!controller[action]) return baseAction;
    return controller[action].bind(controller);
  }

  /**
  * Get the class controller
  * @param {string} controller class name
  * @return {object} controller
  */
  getController(controller) {
    if (!controller) return false;
    return require('../api/controllers/' + controller );
  }

  /**
  * Get the http method
  * @param {string} method
  * @return {string} method
  */
  getMethod(method) {
    return method.toLowerCase();
  }

  /**
  * Get an array of middleware functions
  */
  getMiddleware() {
    // Init Default middleware
    // Init route middleware
  }
}
