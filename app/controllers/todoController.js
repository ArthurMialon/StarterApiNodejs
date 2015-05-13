// Load Model
var Todo = require('../models/todos');

module.exports = {


  /**
  * Update done todo
  */
  done: function(req, res, next) {
   Todo.done(req.params.id, function(err, todo) {
      res.json(todo);
      req.socketData = todo;
      next(req, res);
    });
  },

  undo: function(req, res, next) {
   Todo.undo(req.params.id, function(err, todo) {
      res.json(todo);
      req.socketData = todo;
      next(req, res);
    });
  },

  /**
  * Update todo by id
  */
  put: function(req, res, next) {
    Todo.findById(req.params.id, function(err, todo) {
      if (err) res.send(err);

      todo.text = req.body.todo.text || todo.text;
      todo.done = req.body.todo.done || todo.done;

      todo.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Todo updated', status : true});

        // Send update in socket
        req.socketData = todo;
        next(req, res);
      });
    });
  }
};
