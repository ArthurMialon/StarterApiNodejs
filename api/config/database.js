// The framework uses the Waterline ORM
// You can read the doc here
// https://github.com/balderdashy/waterline

// All your adapters
let adapters = {
  mongo: require('sails-mongo')
};

// All your databaes
let connections = {
    // Setup connections using the named adapter configs
    // Simple mongo connections
    myMongo: {
      adapter: 'mongo',
      host: '127.0.0.1', // defaults to `localhost` if omitted
      database: 'dragand' // or omit if not relevant
    }

};

export {connections, adapters};
