import Waterline from 'Waterline';
import {models} from '../api/models/';

export default class Database {

  /**
  * Constructor
  * @param {object} Database Configuration
  */
  constructor(config, callback) {
    // Instance of Waterline
    this.orm = new Waterline();

    // Set config
    this.config = config;

    // Load models
    this.loadModels();

    // Start Waterline passing adapters in
    this.connect(callback);
  }


  /**
  * Launch the connection
  */
  connect(callback) {
    this.orm.initialize(this.config, (err, models) => {
      if (err) throw err;

      // Set all models in global
      global.MODELS = models;

      console.log("Database is running");
      callback();
    });
  }

  /**
  * Load all models in the Waterline ORM
  */
  loadModels() {
    models.map( (model) => { this.orm.loadCollection(model); });
  }


  /**
  * Get a models
  * @param {string} model name
  * @return {object} Waterline model
  */
  static getModel(model) {
    return MODELS.collections[model];
  }
}
