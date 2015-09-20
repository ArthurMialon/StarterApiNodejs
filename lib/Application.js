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
  constructor(config) {
    // Init the express app
    this.app = init(express());
    this.initRequester();
    this.connectDatabase({
      adapters   : config.adapters,
      connections: config.connections
    });
  }

  /**
  *
  */
  listen() {
    this.server = this.app.listen(3000,  () => {
      let host = this.server.address().address;
      let port = this.server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });
  }

  /**
  *
  */
  initRequester() {
    let self = this;
    this.requester = new Requester();
    this.requester.initRessources().getRouters().forEach( (router) => {
      self.app.use(router.prefix, router.router);
    });
  }

  /**
  *
  */
  connectDatabase(config) {
    this.db = new Database(config);
  }

}
