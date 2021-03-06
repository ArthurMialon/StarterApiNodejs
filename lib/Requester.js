import {config, ressources, routes} from '../api/config/routes';
import Ressource from './Ressource';
import Router from './Router';
import options from '../api/middleware/options';

/**
* Class Requester
*/
export default class Requester {

  /* Constructor */
  constructor() {
    this.ressources = [];
  }

  /**
  * Ressources initialisation
  */
  initRessources() {
    this.ressources = ressources.map( (rsrc) => new Ressource(rsrc.name, rsrc.config, config));
    return this;
  }

  /**
  * Default routes initialisation
  */
  initDefaultRoute() {
    this.baseRouter = new Ressource(false, routes, config);
    return this;
  }

  /**
  * Init all options
  */
  initOptions() {
    global.OPTIONS = [];
    Object.keys(options).forEach( key => { OPTIONS[key] = new options[key](); });
    return this;
  }

  /**
  * Get all routers
  */
  getRouters() {
    let routers = this.ressources.map( (rsrc) => { return rsrc.router; } );
    routers.push(this.baseRouter.router);
    return routers;
  }
}
