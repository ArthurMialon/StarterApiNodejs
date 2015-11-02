/*---------------------------------------------/
| Databases configuration
| The framework uses the Waterline ORM
| See documentation at:
| https://github.com/balderdashy/waterline
|----------------------------------------------*/

/**
 *  Your adapters
 *  @type {object}
 */
let adapters = {
  mongo: require('sails-mongo')
};


/**
 *  Your connections
 *  @type {Object}
 */
let connections = {

    /* Simple mongo connection */
    myMongo: {
      adapter: 'mongo',
      host: '127.0.0.1',
      database: 'test'
    }

};

export {connections, adapters};
