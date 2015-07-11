# <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNEASWyqZ07TYXnQs76ulBj1ppt8ogpVPFr926PMzL7ragdMJwjA" width="50"> StarterApiNodejs

Create your own ReST API with Nodejs and MongoDB with realtime socket.
Upapi give you an architecture to create quickly your api.
Simple or complex Upapi is a really good way to do it.

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

## <img src="http://www.google.fr/url?source=imglanding&ct=img&q=http://www.vector15.com/img/icons/128/Folder%20Structure%20128x128%20vCharc.png&sa=X&ei=ofRdVYJkhapT2PeA-As&ved=0CAkQ8wc&usg=AFQjCNHmKsQUUzN3txKOdfOFxzS5rsdFWw" width="50"> <a name="architecture"></a>Architecture

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

## <img src="http://www.google.fr/url?source=imglanding&ct=img&q=http://cdns2.freepik.com/photos-libre/_318-9479.jpg&sa=X&ei=FfVdVdCOH4LXUeacgKgM&ved=0CAkQ8wc&usg=AFQjCNFgtRMT18Jrm7StZeyoj-_IkblHcw" width="50">  <a name="configuration"></a>Configuration
You can specify a lot of configurations.
All configurations are in lib/config/configuration.js
This is a simple object. Some of variables are necessary but you can add everything you want
In your files just require this configuration and you have access to then.

```javascript
  var configuration = require('/path/to/config/configuration');
  var title = configuration.title;
```

## <img src="http://www.google.fr/url?source=imglanding&ct=img&q=https://www.neustar.biz/base/img/icon-routing-big-gry.png&sa=X&ei=TfVdVe7JBMiuU_6egYAD&ved=0CAkQ8wc&usg=AFQjCNFtPItDfyVkHaO3cor6gYg-sZ58LQ" width="50"><a name="routing"></a>Routing
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
| auth             | Boolean              | route need auth                    |
| socket           | Boolean              | route send socket                  |
| need             | Boolean              | what user need to be               |
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
  '/todos/create': {
    method : 'POST',
    uses   : 'todoController@post',
    parameters : ['todo'],
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

## <img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-4/512/padlock-lock-icon.png" width="50"> <a name="authentication"></a>Authentication
Docs comming soon...
## <a name="controllers"></a>Controllers
Docs comming soon...
## <a name="models"></a> Models
Docs comming soon...
## <a name="middleware"></a>Middleware
Docs comming soon...
## <img src="http://www.pubnub.com/blog/wp-content/uploads/2014/07/SOCKETIOICON.gif" width="40" style="margin-right: 10px;"><a name="socket"></a>  Socket
Docs comming soon...
## <img src="http://png-3.findicons.com/files/icons/2711/free_icons_for_windows8_metro/512/command_line.png" width="50">  <a name="cli"></a>CLI
_Upapi is a temporary name and it is not on npm yet._
```shell
  $ npm i -g upapi
  $ upapi new blog
  $ cd blog
  $ upapi generate post
  $ npm start
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
- Unit test [WIP]
- CLI [WIP]
- Clean everything and add features
- Best socket options
- Multiple authentication strategies
- Automatic documentation system
- Need (policies) system
- Better upload system
- Find a name -> have an idea ? -> arthurmialon@gmail.com
