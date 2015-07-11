module.exports = {

  // // TODOS =======================
  // DONE
  '/todos/:id/done': {
    method: 'PUT',
    uses  : 'todoController@done',
    socket: true
  },

  // UNDO
  '/todos/:id/undo': {
    method: 'PUT',
    uses  : 'todoController@undo',
    socket: true
  }

}
