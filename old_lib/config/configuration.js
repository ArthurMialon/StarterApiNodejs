module.exports = {

  /**
  | ---------------------------------------------------------------
  | API configuration
  | ---------------------------------------------------------------
  |
  | This is the configuration of your API
  | All these settings are required
  | You can easly add some configuration
  |
  | To get your configuration just require the file
  |
  | Example:
  | var config = require('/path/to/configuration');
  | config.my_settings
  |
  */

  /**
  | ---------------------------------------------------------------
  | Database
  | ---------------------------------------------------------------
  |
  | This is where you specify your database parameter
  | On this version you can only use mongoDB
  | You need a host, a database name, a user and a password
  |
  */

  db : {
    type     : 'mongodb',
    host     : '127.0.0.1',
    name     : 'todo',
    user     : '',
    password : ''
  },


  /**
  | ---------------------------------------------------------------
  | Public files
  | ---------------------------------------------------------------
  |
  | Public directory
  | Where files will accessible from url
  |
  */

  publicDir : 'public',


  /**
  | ---------------------------------------------------------------
  | Secret key
  | ---------------------------------------------------------------
  |
  | This is really important
  | This key will be use to crypt tokens
  | All requests could be authenticate with token
  |
  */

  secretKey: 'mysupersecretkey',


  /**
  | ---------------------------------------------------------------
  | Default Authentication strategies
  | ---------------------------------------------------------------
  |
  | This is the middleware that will be exectute by Default
  | if your routes has
  | auth: true
  | You can use something like custom.auth
  | By default it will find it in the middleware module
  |
  */

  defaultAuthStrategy : 'auth.authHttpBasic',


  /**
  | ---------------------------------------------------------------
  | Development
  | ---------------------------------------------------------------
  |
  | If true, Morgan module will log every request to the console
  | If true, you can't use the cache system
  |
  */

  dev: true,


  /**
  | ---------------------------------------------------------------
  | CORS
  | ---------------------------------------------------------------
  |
  | Allow methods, header and website call your API
  |
  */

  cors: {
    origin  : '*',
    methods : 'GET,PUT,POST,DELETE,OPTIONS',
    headers  : 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token'
  },

  /**
  | ---------------------------------------------------------------
  | 404 Message
  | ---------------------------------------------------------------
  |
  | Message when there is a 404 route on your API
  |
  */

  message404: 'No ressources find. Please read the doc',

  /**
  | ---------------------------------------------------------------
  | API prefix
  | ---------------------------------------------------------------
  |
  | This is the prefix use to call the api
  | Example:
  | if apiPrefix => /api
  | calling api will be domain.com/api/user/XX
  | Coming soon !
  | if you are using a subdomain like api.mydomain.com
  | You can just pass it to false
  |
  */

  apiPrefix: false,


  /**
  | ---------------------------------------------------------------
  | API version
  | ---------------------------------------------------------------
  |
  | The version of your API
  |
  */

  version: 1,


  /**
  | ---------------------------------------------------------------
  | Project website
  | ---------------------------------------------------------------
  |
  | Url to your project website
  |
  */

  website: "http://arthurmialon.github.io/StarterApiNodejs"
};
