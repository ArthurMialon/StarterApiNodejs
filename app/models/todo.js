var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    text        : String,
    done   	    : Boolean
});

module.exports = mongoose.model('Todo', todoSchema);
