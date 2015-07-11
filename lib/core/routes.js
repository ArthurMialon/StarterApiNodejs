var routes     = require('../config/routes/default');

module.exports = function() {

  // All routes paths
  this.paths      = {};
  this.default    = routes.default || {};
  this.ressources = routes.ressources || {};

  /**
  * Init default configuration for routes
  */
  this.initDefault = function() {
    this.paths.default = this.default;
  }

  /**
  * Init all ressources
  */
  this.initRessources = function() {
    this.paths.ressources = this.ressources;
  }

  /**
  * Init all others routes
  */
  this.initOthersRoutes = function() {
    for (var i in routes) {
      if( i != 'default' && i != 'ressources' ) {
        for (j in routes[i]) {
          this.paths[j] = routes[i][j];
        }
      }
    }
  }

  /**
  * Initialisation
  */
  this.init = function() {
    this.initDefault();
    this.initRessources();
    this.initOthersRoutes();

    return this;
  }

  return this.init();
}
