var configuration = require('../config/configuration');
var pjson         = require('../../package.json');
var port          = process.env.PORT || 8080;

module.exports = function() {
	// Log when launch on the server ==============================
	console.log('\x1b[34m%s\x1b[0m', "     ___");
	console.log('\x1b[34m%s\x1b[0m',"    (   \\ ");
	console.log('\x1b[34m%s\x1b[0m',"     \\  =\\     LEVEL UP YOUR ReST API ! :)");
	console.log('\x1b[34m%s\x1b[0m',"    __\\_ -\\ ");
	console.log('\x1b[34m%s\x1b[0m',"  (____))( \\----");
	console.log('\x1b[34m%s\x1b[0m',"  (____)) -        Created by Arthur Mialon.");
	console.log('\x1b[34m%s\x1b[0m',"  (____))          url : http://www.arthurmialon.fr");
	console.log('\x1b[34m%s\x1b[0m',"  (____))____/----");
	console.log('\x1b[34m%s\x1b[0m'," ______________________");
	console.log("");
	console.log('\x1b[32m%s\x1b[0m: ', "Your amazing app          :  " + pjson.name + " is launching !");
	console.log('\x1b[32m%s\x1b[0m: ', "Runnig version            :  " + pjson.version);
	console.log('\x1b[32m%s\x1b[0m: ', configuration.messageOnConsole + port);
}