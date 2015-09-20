// Configuration routes
import {config, ressources} from '../api/config/routes';

// Ressource Class
import Ressource from './Ressource';

/**
*
*/
export default class Requester {

  /* Constructor */
  constructor() {
    this.ressources = [];
  }

  /**
  *
  */
  initRessources() {
    this.ressources = ressources.map( (rsrc) => new Ressource(rsrc.name, rsrc.config, config));
    return this;
  }

  /**
  *
  */
  getRouters() {
    return this.ressources.map( (rsrc) => { return rsrc.router; } );
  }
}
