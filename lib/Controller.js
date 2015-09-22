import Database from './Database';

/**
* Class Controller
*/
export default class Controller {

  /* Constructor */
  constructor() {

  }

  /**
  * Load a model
  */
  loadModel(model) {
    return Database.getModel(model);
  }

}
