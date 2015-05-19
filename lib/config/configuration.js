module.exports = {

  /**
  * This is the configuration of your API
  * All these settings are required
  * You can easly add some configuration

  * To get your configuration just require the file

  * Example:
  * var config = require('/path/to/configuration');
  * config.my_settings
  */

  /**
  * This is where you specify your database parameter
  * Only using mongoDB
  * You need a host, a database name, a user and a password
  */
  db : {
    type     : 'mongodb',
    host     : '127.0.0.1',
    name     : 'todo',
    user     : '',
    password : ''
  },

  /**
  * Public directory
  * Where files will accessible from url
  */
  publicDir : 'public',

  /**
  * Upload directory
  * Where files will be upload to
  */
  upload : {
    dir           : 'uploads',
    fieldNameSize : 50,
    files         : 1,
    fields        : 5,
    fileSize      : 1024 * 1024
  },

  /**
  * This is really important
  * This key will be use to crypt tokens
  * All requests could be authenticate with token
  */
  secretKey: 'mysupersecretkey',

  /**
  * A little message show when you start your server
  */
  messageOnConsole: 'Magic happen on port      :  ',

  /**
  * If true, Morgan module will log every request to the console
  */
  dev: true,

  /**
  * This is the prefix use to call the api
  * Example:
  * if apiPrefix => /api
  * calling api will be domain.com/api/user/XX
  * Coming soon !
  * if you are using a subdomain like api.mydomain.com
  * You can just pass it to false
  */
  apiPrefix: '/api'
};
