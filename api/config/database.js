/*---------------------------------------------/
| Databases configuration
| The framework uses the Waterline ORM
| See documentation at:
| https://github.com/balderdashy/waterline
|----------------------------------------------*/

// All your adapters
let adapters = {
  mongo: require('sails-mongo')
};

// All your databaes
let connections = {

    // Simple mongo connections
    myMongo: {
      adapter: 'mongo',
      host: '127.0.0.1',
      database: 'test'
    }

};

export {connections, adapters};
