// Load Model
var Todo = require('../models/todo');


module.exports = {

	/**
	* Get All todos
	*/
	getAll : function(req, res) {
		Todo.find(function(err, todos) {
            if (err) { res.send(err) }
            res.json(todos);
        });
	},

	/**
	* Get one todo by id
	*/
	get : function(req, res, id) {
		Todo.findById(id, function(err, todo) {
            if (err) { res.send(err); }
            res.json(todo);
        });
	},

	/**
	* Create a new todo
	*/
	post : function(req, res, todo) {
		Todo.create(todo, function(err, todo) {
            if (err) { res.send(err); }   

            Todo.find(function(err, todos) {
                if (err) { res.send(err); }
                res.json(todos);
            });
        });
	},

	/**
	* Update todo by id
	*/
	put : function(req, res, id, data) {
		Todo.findById(id, function(err, todo) {
            if (err) { res.send(err); }

            todo.text = data.text || todo.text;
            todo.text = data.done || todo.done;

            todo.save(function(err) {
                if (err) { res.send(err); }
                res.json({ message: 'Todo updated' });
            });

        });
	},

	/**
	* Delete todo by id
	*/
	delete : function(req, res, id) {
		Todo.remove({
            _id : id
        }, function(err, todo) {
            if (err) { res.send(err); }

            Todo.find(function(err, todos) {
                if (err) { res.send(err); }
                res.json(todos);
            });
        });
	}

};