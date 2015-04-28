module.exports = {

        /**
        * This is the configuration of your API
        * All these settings are required
        * You can easly add some configuration

        * You can add every types but no function
        * All your settings will be available in the app

        * Example : 
        * app.get('my_setting'); return configuration.my_setting

        * If you don't have access to app variable
        * Then you can require this file and get the object

        * Example : 
        * config = require('/path/to/configuration');
        * config.my_settings
        */
        
        /**        
        * This is where you write your database parameter
        * Only using mongoDB
        * You need a host, a database name, a user and a password
        */
        dbType : 'mongodb',
        dbHost : 'mongodb://127.0.0.1/',
        dbName : 'todo',
        dbUser : '',
        dbPassword : '',


        /*        
        You can add some configurationabout your API
        For example the title or the domain
        */
        title : 'My website title',
        domain : 'mydomain.com',


        /**
        * This is really important
        * This key will be use to crypt tokens
        * All requests could need to be authenticate with token 
        */
        secretKey : 'mysupersecretkey',


        /**        
        * A little message show when you start your server
        */
        messageOnConsole : 'Magic happen on port :',


        /**
        * If true, Morgan module will log every request to the console
        */
        dev : true,

        /**        
        * If you want to use socket.io
        * You can specify this in your routes too
        */
        useSocket : true,

        /**        
        * This is the prefix use to call the api
        * Example : 
        * if apiPrefix => /api
        * calling api will be domain.com/api/user/XX
        * Coming soon !
        * if you are using a subdomain like api.mydomain.com
        * You can just pass it to false
        */
        apiPrefix : '/api',

        /**
        * This is the version of your api
        * Coming soon
        */
        apiVersion : '1'
    };