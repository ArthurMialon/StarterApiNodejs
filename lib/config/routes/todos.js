module.exports = {

  /**
  | ---------------------------------------------------------------
  | Todos routes
  | ---------------------------------------------------------------
  |
  | routes for todos (others than ressources routes)
  |
  */
  
  // DONE
  '/todos/:id/done': {
    description: 'There you can check a todo and put it to done',
    method: 'PUT',
    uses  : 'todoController@done',
    socket: true
  },

  // UNDO
  '/todos/:id/undo': {
    description: 'There you can uncheck a todo and put it to undo',
    method: 'PUT',
    uses  : 'todoController@undo',
    socket: true
  }

}
