 module.exports = {

    /**
    * Here your can configure your routes
    * This is a simple JSOM format
    * Each route is identify by its path like /books/:id
    * Then this object can specify a method for the route --> Default GET
    * There must have an action on each route
    * You can specify a controller where you action is define --> in ../ controllers directory
    * You can specify middleware to use
    * You can specify if this route must be authenticate
    * You can specify is you want that this route render socket at the end.
    * You can spaecify necessary parameters
    **/
    
    // REST API ---------------------------------------------------------------------
    // BASE ROUTE ======================= 

    default : {

    },

    '/' : {
        action : function(req, res) {
            res.json({message: 'Welcome on our Api', status : 200});
        },
        socket : true
    },

    // REQUEST AUTHENTCATION ROUTE ======================= 
    '/authenticate' : {
        method : 'POST',
        controller : 'authController',
        action : 'generate',
        middlewares : ['generateAuth'],
        parameters : ['username', 'password']
    },

    // // USER ======================
    // Sign Up
    '/users/signup' : {
        method : 'POST',
        controller : 'userController',
        action : 'signup',
        parameters : ['username', 'password']
    },

    // // TODOS =======================  
    // GET ALL
    '/todos' : {
        controller : 'todoController',
        action : 'getAll',
        socket : true,
        auth : false
    },

    // GET
    '/todo/:id' : {
        controller : 'todoController',
        action : 'getAll',
        socket : true,
        auth : false
    }

    // Generate CRUD for these ressources
    // ressources : ['users', 'todos'] 

}
