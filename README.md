# StarterApiNodejs

Create your own ReST API with Nodejs and MongoDB with realtime socket.
Upapi give you an architecture to create quickly your api.
Simple or complex Upapi is a really good way to do it.

Website : [StarterApiNodejs](http://arthurmialon.github.io/StarterApiNodejs)

Soon Upapi will be accessible from an npm package.

# Table of Contents

* [Getting started](#getting-started)
* [Architecture](#architecture)
* [Configuration](#configuration)
* [Routing](#routing)
* [Authentication](#authentication)
* [Controllers](#controllers)
* [Models](#models)
* [Middleware](#middleware)
* [Socket](#socket)
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

## <a name="architecture"></a>Architecture

This is the project architecture after an `$ upapi new blog`

```
blog
|
├───api
|    └───controllers
|    |      |  authController.js
|    |      |  todoController.js
|    |      |  userController.js
|    |      // Here your controllers
|    |
|    └───models
|           |  users.js
|           |  todos.js
|           // Here your models
|
├───lib
|    └───config
|    |      |  configuration.js
|    |      |  ressources.json
|    |      └───routes
|    |            |  default.js
|    |            |  auth.js
|    |            |  users.js
|    |            |  todos.js
|    |            // You own routes
|    |
|    └───core
|    |   ... The core system
|    |
|    └───middleware
|    |      |  custom.js
|    |      |  middleware.js
|    |
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
To configure your routes go in folder lib/config/routes
You will find multiple module where you can define you routes.

##### In routes/default.js
You can add defaults configurations to your routes.
Create new routes module in the folder then add them to default.js  

| Name             |   Type               |    Infos                           |
| ---------------- |:---------------------|:-----------------------------------|
| method           | String               | http method                        |
| controller       | String               | controller name                    |
| action           | String or function   | action name                        |
| parameter        | Array                | required parameter                 |
| auth             | Boolean OR String    | route need auth OR your auth strategy                   |
| socket           | Boolean              | route send socket                  |
| need             | Boolean              | what user need to be (policies)               |
| uses             | String               | controller@action instead of both  |

Here some examples.

#### Default
```javascript
  // lib/config/routes/default.js

  // Default object for all routes
  default: {
    method : 'GET',
    auth   : true,
    socket : false
  },

  // Your ressources from ressources.json
  ressources : require('../ressources.json'),

  // Import your own routes
  'base'  : require('./base'),
  'auth'  : require('./auth'),
  'todos' : require('./todos'),
  'users' : require('./users')

```

#### You own routes
```javascript

  // routes/base.js

  // Action as a function
  '/': {
    action: function(req, res) {
      res.json({message: 'Welcome on our Api', status: 200});
    }
  },


  // routes/todos.js

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
  // Adding policies
  '/todos/create': {
    method : 'POST',
    uses   : 'todoController@post',
    parameters : ['todo'],
    need: {
      administrator: true,
      age: "> 18"
    }
    socket : true,
  },


```
### Ressources
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
### Ressources ++
You can specify accessible routes and if you need authentication

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
This starter come with an JWT (JsonWebToken) authentication.

### How it works ?
All routes with :
>>>>>>> master
```javascript
  auth: true
```
will use a middleware that will check a token in the request.
This token contain multiple information about the user that call the API

To generate this token you can use the 'generateAuth' middleware.
You can use it in a '/login' route for example.

This will check in your DB if a user with username/password match.
In case of match that will create a new token and return it.

This token will have to be send in every request that need authentication.

You can specify your own auth strategy if you don't want to use this one.
Simply change it in configuration.js or directly in your route by passing the name of the strategy

## <a name="controllers"></a>Controllers
Docs comming soon...
## <a name="models"></a> Models
Docs comming soon...
## <a name="middleware"></a>Middleware
Docs comming soon...
## <a name="socket"></a>  Socket
Docs comming soon...
## <a name="cli"></a>CLI
Upapi is a temporary name and it is not on npm yet._
```shell
  $ npm i -g upapi
  $ upapi new blog
  $ cd blog
  $ upapi generate post
  $ npm start
```

Available CLI :
```shell
  $ upapi generate <ressource name>
  $ upapi routes
  $ upapi new
```
Coming soon
```shell
  $ upapi up
  $ upapi doc
```

#### For developers working on the CLI:
- Clone this repo anywhere you want
- Run:
```shell
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
```shell
  $ cd StarterApiNodejs
  $ npm i
  $ npm start
```
And in an other tab
```shell
  $ npm i -g mocha
  $ npm test
```


# Todos
- Finish the documentation
- Unit test - clean [WIP]
- CLI - clean [WIP]
- Better upload system
- Best socket architecture
- Refactor all scripts
- Multiple Database type (mysql, mariaDB, etc..) --> Waterline
- Add the package on npm :)
