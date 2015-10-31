# API Framework

API Framework based on [Express](http://expressjs.com) and [Socket.io](http://socket.io) written in ECMA2015.

It give you an architecture and tools to create quickly your api (CLI, ressource manager, automatic CRUD, realtime).

This version is in development. You may not use it yet.
There was an other stable version of the framework with more documentation now on the ["alpha"](https://github.com/ArthurMialon/StarterApiNodejs/tree/alpha) branch.

Ideas and contributions are appreciated.

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

## <a name="getting-started"></a>Getting started
* Clone the repo

```shell
$ cd /path/to/dir
$ npm install
$ node index.js
```

* Soon the framework will be accessible from NPM with CLI

## <a name="architecture"></a>Architecture

```
App
|
├───api
|    └───controllers
|    |      |  base.js
|    |      |  user.js
|    |
|    └───models
|    |      |  users.js
|    |      |  index.js
|    |
|    └───config
|    |      |  app.js
|    |      |  configuration.js
|    |      |  database.js
|    |      |  
|    |      └───routes
|    |            |  users.js
|    |            |  index.js
|    |
|    └───middleware
|    |      |  auth.js
|    |      |  
|    |      └───options
|    |            |  auth.js
|    |            |  need.js
|    |            |  index.js
|    |
|    └───socket (coming soon...)

```

## <a name="configuration"></a>Configuration
...
## <a name="routing"></a>Routing
...
## <a name="controllers"></a>Controllers
...
## <a name="model"></a>Models
...
## <a name="middleware"></a>Middleware
...
- #### Simple
...
- #### Options
...
- #### Authentication
...
## <a name="socket"></a>Socket
...
## <a name="cli"></a>CLI
...
