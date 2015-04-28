#StarterApiNodejs
This a starter (not really a framework.. yet) to build api with nodeJs and mongoDB.

#How to use
 1. Clone the repo
 2. Do it
 ```
    $ cd /path/to/dir
 ```
 
 3.
 ```
    $ npm install
 ```
 
 4.
 ```
    $ nodemon server.js
 ```
  
#Documentation

## Architecture
...
## Configuration
You can specify a lot of configurations. 
All configurations are in app/config/configuration.js
This is a simple object. Some of variables are necessary but you can add everything you want
In your files just require this configuration and you have access to then.

```javascript
	var configuration = require('/path/to/config/configuration');
    var title = configuration.title;
```

## Routing
To configure your routes go in app/config/routes.js
This is a simple object. Each route has his path and you can define options.
- method --> http method (String - Default 'GET') 
- controller -> controller use (String - Optional)
- action -> action use (String || function - Required)
- middlewares -> middlesware before action (Array - Optional)
- parameters -> required parameter (Array - Optional)
- auth -> Route nedd auth (Boolean - Optional - Default false)
- socket -> Route emit socket ? (Boolean - Optional - Default false)
- need -> whzt user need to be able to call the route (Object - Optional)

## Authentication
...
## Controllers
...
## Models
...
## Middleware
...


# Todo 
- Upgrading socket system
- Add configuration for request error
- Cut Requester to be more scalable
- Create a little doc
- Find a name -> if you find -> arthurmialon@gmail.com
