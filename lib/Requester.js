import {config, ressources} from '../api/config/routes';
import Ressource from './Ressource';

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
  * Get all routers
  */
  getRouters() {
    return this.ressources.map( (rsrc) => { return rsrc.router; } );
  }
}
