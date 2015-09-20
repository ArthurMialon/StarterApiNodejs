import Waterline from 'Waterline';

export default class Database {
  constructor(config) {
    this.orm = new Waterline();

    // Start Waterline passing adapters in
    this.orm.initialize(config, (err, models) => {
      if (err) throw err;
      console.log("Databases are running");
    });
  }

  loadModels() {
    // TODO  For each model
    // orm.loadCollection(User);
  }
}
