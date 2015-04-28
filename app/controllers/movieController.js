// Load Services
var movieDB 	= require('../services/movieDB')('8841e3ef4b2c9566f9a7c5730a47b993');
var MovieList 	= require('../models/movieList');
var Q = require('q');

module.exports = {

	/**
	* Generate 10 random movies
	*/
	generateNewMovies : function() {

	},

	generate : function(req, res) {
		var self 		= this;
		var movies 		= new Array();
		var parameter 	= {
		    'release_date.gte' : "2014-01-01",
		    'vote_average.gte' : '7',
		    'language' : 'fr',
		    'vote_count.gte' : "100",
		}

		this.hasAlreadyList().then(function(data) {
			if(movies == []) {
				console.log('generer des nouveaux');
			}else {
				self.generateNewMovies();
			}			
		});

		// if(this.hasAlreadyList()) {
		// 	console.log('c ok !');
		// }else {
		// 	movieDB.getPages('/discover/movie', parameter, function(pages, err) {
		// 		if(err) { res.json(err); }

		// 	    var nbPages = pages;
		// 	    var j 		= 0;

		// 	    for (var i = 0; i < 20; i++) {
		// 	        // Random de page
		// 	        parameter.page = Math.floor(Math.random() * nbPages) + 1;

		// 	        movieDB.get('/discover/movie', parameter, function(data, err) {
		// 	        	if(err) { res.json(err); }

		// 	            // Random sur la liste des films
		// 	            var key = Math.floor(Math.random() * data.results.length) + 0;
		// 	            var m = data.results[key];

		// 	            if(!self.allreadySet(m.id, movies)) {
		// 	            	j++;
		// 	            	movies.push(m);
		// 	           		if(j == 5){

		// 	           			var moviesGenerate = {
		// 	           				date : self.getTheDate(),
		// 	           				movies : movies
		// 	           			};

		// 	           			MovieList.create(moviesGenerate, function(err, movieList) {
		// 	           				res.json(movies);
		// 	           			});		           			
		// 	           		}
		// 	            }
			            
		// 	        });
			       
		// 	    };

		// 	});
		// }

		
	},

	hasAlreadyList : function(today) {
		var deferred = Q.defer();
		var d = this.getTheDate();

		MovieList.find({date : d},  function(err, movies) {
            if (err) { return false; }
            deferred.resolve(movies);
        });
        return deferred.promise;
	},


	getTheDate : function() {
		var d = new Date();
       	var date = d.getDay() + "-" + d.getDate() + "-" + d.getFullYear();
       	return date;
	},

	/**
	* Check if there is already this movie set for today
	*/
	allreadySet : function(movieID, movies) {
		for(var movie in movies) {
			if(movies[movie].id == movieID) {
				return true;
			}
		}
		return false;
	}



};