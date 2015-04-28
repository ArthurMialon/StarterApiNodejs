module.exports = function(io) {
	
	// Routing socket 
	io.on('connection', function (socket) {

		// USER CONNECTION ============================================= 
		// ====
	   	console.log('\x1b[34m%s\x1b[0m: ', "New socket connection.");

	   	// USER LOGOUT ============================================= 
		// ====
	   	socket.on('disconnect', function (socket) {
	   		console.log('\x1b[31m%s\x1b[0m: ', 'User disconnect');
	   	});

	    // ADD TODO / REMOVE TODO ============================================= 
	    // ====
	    socket.on('addTodo', function (data) {
	    	console.log('\x1b[34m%s\x1b[0m: ', '=================== Todo add');
		    socket.emit('newTodo');
	    	socket.broadcast.emit('newTodo');
		});
		socket.on('deleteTodo', function (data) {
			console.log('\x1b[34m%s\x1b[0m: ', '=================== Todo delete');
		    socket.emit('newTodo');
	    	socket.broadcast.emit('newTodo');
		});

		// TYPING / STOP TYPING ============================================= 
	    // ====
	    socket.on('typing', function (data) {
	    	socket.broadcast.emit('isTyping');
		});
		socket.on('stopTyping', function (data) {
	    	socket.broadcast.emit('StopTyping');
		});

		// ADD HEART ============================================= 
		// ====
		socket.on('addHeart', function (data) {
	    	socket.broadcast.emit('heartReceive');
		});
	});

}