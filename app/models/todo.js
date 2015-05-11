var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  text			: String,
  done			: Boolean,
  updated_at	: Date,
  created_at	: Date
}, { versionKey: false });

todoSchema.pre('save', function(next) {
  var todo = this;
  var now = new Date();

  // Add created at
  todo.updated_at = now;
  if (!todo.created_at)
    todo.created_at = now;

  next();
});

todoSchema.statics.done = function done (id, cb) {
  var self = this;
  var conditions = { _id: id };
  var update = { $set: { done: true }};
  var options = {};

  self.update(conditions, update, options, function(err, nb) {
    if(err)
      cb(err, false);
    
    self.findOne({_id : id}, function(err, todo) {
      cb(err, todo);
    });
  });
};

todoSchema.statics.undo = function undo(id, cb) {
  var self = this;
  var conditions = { _id: id };
  var update = { $set: { done: false }};
  var options = {};

  self.update(conditions, update, options, function(err, nb) {
    if(err)
      cb(err, false);
    
    self.findOne({_id : id}, function(err, todo) {
      cb(err, todo);
    });
  });
}


module.exports = mongoose.model('Todo', todoSchema);
