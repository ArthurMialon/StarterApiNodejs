var mongoose = require('mongoose');

module.exports = mongoose.model('MovieList', {
	date: String,
	movies : Array
});