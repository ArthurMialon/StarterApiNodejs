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

module.exports = mongoose.model('Todo', todoSchema);
