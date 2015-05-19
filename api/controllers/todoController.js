// Load Model
var Todo = require('../models/todos');

module.exports = {

  /**
  * Done todo
  */
  done: function (req, res, next) {
   Todo.done(req.params.id, function(err, todo) {
      res.json(todo);
      req.socketData = todo;
      next(req, res);
    });
  },

  /**
  * Undo todo
  */
  undo: function(req, res, next) {
   Todo.undo(req.params.id, function(err, todo) {
      res.json(todo);
      req.socketData = todo;
      next(req, res);
    });
  }

};
