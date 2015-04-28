var http = require('http');


MovieDB = function(apikey) {

	this.config = {
		'api_key' : apikey,
		'language' : 'en',
		'host' : 'api.themoviedb.org',
		'version' : '3'
	},

	this.parameter = "",

	/**
	* API METHOD
	*/
	// Simple get
	this.get = function(method, parameter, callback) {
		this.callAPI('GET', method, parameter, function(data, err) {
			callback(data, err);
		});
	},

	this.getMovie = function(id, callback) {
		this.callAPI('GET', '/movie/'+id, false, function(data, err) {
			callback(data, err);
		});
	},

	this.getImagesOf = function(id, callback) {
		this.callAPI('GET', '/movie/'+id+'/images', function(data, err) {
			callback(data, err);
		});
	},

	// Method existing
	this.getMovieGenres = function(callback) {
		this.get('/genre/movie/list', false, function(data, err) {
			callback(data, err);
		}); 
	},

	this.getPages = function(method, parameter, callback) {
		this.get(method, parameter, function(data, err) {
			if(err){ callback(false, err); return; }
			if(data.total_pages){ callback(data.total_pages, false); }			
		});
	},

	/**
	* CALLING THE API
	*/
	// Set parameter for the path
	this.setParameter = function(object) {
		for(var key in object) {
			var sep = (this.parameter == "") ? '?' : '&';
			this.parameter += sep + key + '=' + object[key];
		}
		return this.parameter;
	},

	// Http calling 
	this.callAPI = function(httpMethod, method, parameter, callback) {

		var parameter;
		if(!parameter){ parameter = ""; }
		else { parameter = this.setParameter(parameter); }

		var path = "/" + this.config.version + method;

		if(parameter){
			path += parameter + '&api_key=' + this.config.api_key;
		}
		else {
			path += '?api_key=' + this.config.api_key;
		}

		var optionsget = {
		    host : this.config.host,
		    path : path,
		    method : httpMethod,
		    headers : {
		    	'Content-Type': 'application/json',
		    }
		};

		 
		var reqGet = http.request(optionsget, function(res) {	
			res.setEncoding('utf-8');

		    var responseString = '';

		    res.on('data', function(data) {
		    	responseString += data;
		    });		

		    res.on('end', function() {
		    	callback(JSON.parse(responseString), false);
		    }); 

		});
		 
		reqGet.end();
		reqGet.on('error', function(e) {
		    callback(false, e);
		});

	},

	/**
	* ALL SETTERS
	*/

	// Set language
	this.setLanguage = function(l) {
		this.config.language = l;
	},

	// Set version
	this.setVersion = function(v) {
		this.config.version = v;
	}

	return this;
}


module.exports = MovieDB;

