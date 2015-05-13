var mongoose = require('mongoose');

/**
* Mongoose Schema
* Todo 
*/
var todoSchema = mongoose.Schema({
  text			: String,
  done			: Boolean,
  updated_at	: Date,
  created_at	: Date
}, { versionKey: false });

/**
* Mongoose Middleware
* Pre save 
*/
todoSchema.pre('save', function(next) {
  var todo = this;
  var now = new Date();

  // Add created at and updated at
  todo.updated_at = now;
  if (!todo.created_at)
    todo.created_at = now;

  next();
});

/**
* Mongoose Method
*/
// Done todo
todoSchema.statics.done = function done (id, cb) {
  archive(this, true, id, cb);
};

// Undo todo
todoSchema.statics.undo = function undo(id, cb) {
  archive(this, false, id, cb);
}

/**
* Archive function for middleware
*/ 
function archive(model, done, id, cb) {
  // Update the todo
  model.update({ _id: id }, { $set: { done: done, updated_at : new Date() }}, {}, function(err, nb) {
    if(err) cb(err, false);
      
    // Return the todo in the callback
    model.findOne({_id : id}, function(err, todo) {
      cb(err, todo);
    });
  });
}


module.exports = mongoose.model('Todo', todoSchema);
