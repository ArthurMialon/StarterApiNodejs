# StarterApiNodejs

Create your own ReST API with Nodejs and MongoDB with realtime socket.
Upapi give you an architecture to create quickly your api.
Simple or complex Upapi is a really good way to do it.

# Table of Contents
 
* [Getting started](#getting-started)
* [Architecture](#architecture)
* [Configuration](#configuration)
* [Routing](#routing)
* [Authentication](#authentication)
* [Controllers](#controllers)
* [Models](#models)
* [Middleware](#middleware)
* [CLI](#cli)
* [Testing](#testing)

# Documentation
## <a name="getting-started"></a>Getting started || How to use
 * Clone the repo

```shell
    $ cd /path/to/dir

    $ npm install

    $ nodemon server.js
```

* Soon Upapi will be accessible from an npm package.

##  <a name="architecture"></a>Architecture

```
Project Name
|
├───api
|    └───controllers
|           |  authController.js
|           |  todoController.js
|           |  userController.js
|           // Here your controllers
|    └───models
|           |  users.js
|           |  todos.js
|           // Here your models
|
├───lib
|    └───config
|           |  configuration.js
|           |  errors.js
|           |  ressources.json
|           |  routes.js
|    └───core
|        ... The core system
|    └───middleware
|           |  custom.js
|           |  middleware.js
|    └───services
|           // Here your Services / Helpers
|
├───test
|    |  todo_tests.js
|
|  package.json
|  server.js

```

## <a name="configuration"></a>Configuration
You can specify a lot of configurations.
All configurations are in lib/config/configuration.js
This is a simple object. Some of variables are necessary but you can add everything you want
In your files just require this configuration and you have access to then.

```javascript
  var configuration = require('/path/to/config/configuration');
  var title = configuration.title;
```

## <a name="routing"></a>Routing
### Create a new route
To configure your routes go in lib/config/routes.js
This is a simple object. Each route has his path and you can define options.
- method       -> http method (String - Default 'GET')
- controller   -> controller use (String - Optional)
- action       -> action use (String || function - Required)
- middlewares  -> middlesware before action (Array - Optional)
- parameters   -> required parameter (Array - Optional)
- auth         -> Route nedd auth (Boolean - Optional - Default false)
- socket       -> Route emit socket ? (Boolean - Optional - Default false)
- need         -> whzt user need to be able to call the route (Object - Optional)
- uses         -> controller@action instead of controller and action options

```javascript
  // lib/config/routes.js

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
  // Define a controller ( will use api/controllers/todoController.js )
  // Define a action ( will use todoController.getAll() )
  // Define a custom middleware ( will use lib/middleware/custom.js and logFinger action )
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

You can create ressources object. Then your ressource will automaticly have a CRUD.
You just have to create you model in api/models/<ressources>.js.

```javascript

ressources: ['todos', 'fruits']

// Here you will have 5 new routes with autmoatic crud
// GET /todos     -> All todos
// GET /todos/:id -> Only one todo
// POST /todos -> Create new todo
// PUT /todos/:id -> Update one todo
// Delete /todos/:id ->delete todo

```

You can specify accessible routes and if you need authenticate

```javascript

// Here my todos will be accessible by anyone but to create, update or delete
// you will need to be authenticate
ressources: [{
      data : 'todos',
      endpoints : ['create', 'read', 'update', 'delete', 'all'],
      auth : ['create', 'update', 'delete']
  }]
```

## <a name="authentication"></a>Authentication
...
## <a name="controllers"></a>Controllers
...
## <a name="models"></a> Models
...
## <a name="middleware"></a>Middleware
...
## <a name="cli"></a>CLI
_Upapi is a temporary name and it is not on npm yet._
```
  $ npm i -g upapi
  $ upapi new blog
  $ cd blog
  $ upapi generate post
  $ npm start
```

#### For developers working on the CLI:
- Clone this repo anywhere you want
- Run:
```
  $ cd StartApiNodejs
  $ npm link
```
You can now modify the CLI and use it was if it was installed globally.

## <a name="testing"></a>Unit testing
The unit tests made with Mocha are only here to test the general purpose of this Starter.
- They are mainly meant to test the core.
- They are not meant to test your API once you changed it.

It tests Authentication, users and /todos routes as an example.

### Run the tests
```
  $ cd StarterApiNodejs
  $ npm i
  $ npm start
```
And in an other tab
```
  $ npm i -g mocha
  $ npm test
```


# Todo
- Unit test [WIP]
- CLI [WIP]
- Clean everything and add features
- Find a name -> have an idea ? -> arthurmialon@gmail.com
