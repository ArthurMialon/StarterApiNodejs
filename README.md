Create your own ReST API with Nodejs and MongoDB with realtime socket.

XX-API give you an architecture to create quickly your api.

Simple or complex XX-API is a really good way to do it.

REST : Authentication : Real-Time : Controller - Models

#How to use
 * Clone the repo

```
    $ cd /path/to/dir

    $ npm install

    $ nodemon server.js
```
  
#Documentation

## Architecture

```
   - app
    |-- config/ <!-- Configuration -->
    |  -- configuration.js <!-- File where everything is specify -->
    |  -- errors.js <!-- Config each error code and message -->
    |  -- routes.js <!-- Create your routes -->

    |-- controllers/ <!-- Your controller -->
    
    |-- core/ <!-- Framework core useless for you -->
   
    |-- middleware/ <!-- Middleware for route -->
    |  -- middleware.js <!-- Some initial middleware -->
    |  -- custom.js <!-- your custom middleware-->
   
    |-- models/ <!-- Your mongoose schema --> 
    
    |-- public/ <!-- Public directory accessible from url -->
    
    |-- services/  <!-- Helpers-->
    |  -- upload.js
    
    - package.json <!-- Tells npm which packages we need -->
    - server.js <!-- Server launch -->

```


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
### Create a new route
To configure your routes go in app/config/routes.js
This is a simple object. Each route has his path and you can define options.
- method       -> http method (String - Default 'GET') 
- controller   -> controller use (String - Optional)
- action       -> action use (String || function - Required)
- middlewares  -> middlesware before action (Array - Optional)
- parameters   -> required parameter (Array - Optional)
- auth         -> Route nedd auth (Boolean - Optional - Default false)
- socket       -> Route emit socket ? (Boolean - Optional - Default false)
- need         -> whzt user need to be able to call the route (Object - Optional)
- uses		     -> controller@action instead of controller and action options

```javascript
  // app/config/routes.js
  
  // Default object for all routes
  default: {
    method : 'GET',
    auth   : true,
    socket : false
  },
  
  // Action as a function
  '/': {
    action: function(req, res) {
      res.json({message: 'Welcome on our Api', status: 200});
    }
  },
  
  // Classic routes to get all todos
  // Define a controller ( will use app/controllers/todoController.js )
  // Define a action ( will use todoController.getAll() ) 
  // Define a custom middleware ( will use app/middleware/custom.js and logFinger action )
  // If you want to use a middleware in middleware.js 
  // just type ['myMiddleware'] 
  // with the right function
  '/todos': {
    controller : 'todoController',
    action     : 'getAll', 
    middleware : ['custom.logFinger'],
    auth : false
  },

  // Classic routes to get one todo by id
  // Define a controller and an action with uses
  '/todos/:id': {
    uses       : 'todoController@get',
    auth : false
  },
  
  // Classic routes to post one new todo
  // Define the method POST
  // You can define necessary parameters in an array
  // These parameters will be search req.body.X
  // Else you will receive a error in JSON return
  // That will return a socket to know when a todo will be create
  '/todos/create': {
    method : 'POST',
    uses   : 'todoController@post',
    parameters : ['todo'],
    socket : true,
  },


```


## Authentication
...
## Controllers
...
## Models
...
## Middleware
...


# Todo 
- Clean everything and add features
- Unit test
- Find a name -> if you find -> arthurmialon@gmail.com






