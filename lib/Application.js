import express from 'express';
import init from '../api/config/app';
import Requester from './Requester';
import Database from './Database';

/**
* Class Application
*/
export default class Application {

  /**
  * Constructor
  * @param {object} config
  */
  constructor(config, callback) {
    // Init the express app
    this.app = init(express());

    let databaseConf = {
      adapters   : config.adapters,
      connections: config.connections
    };

    // Connection to DB
    this.connectDatabase(databaseConf, () => {
      this.initRequester();
      if (callback) {
        callback();
      }      
    });
  }

  /**
  * Listen server on specific port
  * @param {integer} port
  */
  listen(port) {
    this.server = this.app.listen(port,  () => {
      let host = this.server.address().address;
      let port = this.server.address().port;
      console.log('Your app at http://%s:%s', host, port);
    });
  }

  /**
  * Requester initialisation
  */
  initRequester() {
    let self = this;
    this.requester = new Requester();
    this.requester
      .initOptions()
      .initDefaultRoute()
      .initRessources()
      .getRouters()
      .forEach( (router) => {
        self.app.use(router.prefix, router.router);
       });
  }

  /**
  * Set globals variables
  */
  setGlobals() {
    global.Application = this;
  }

  /**
  * Connect the Application to databases
  * @param {object} config
  * @param {function} callback
  */
  connectDatabase(config, cb) {
    this.db = new Database(config, cb);
  }

}
