(function () {
	"use strict";
	
	var module = angular.module('MarvelCharactersApp', [
		'ngRoute',
		'MarvelCharacterInfo'
	]);

	module.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'MarvelCharactersAppCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/marvel-characters-app.html'
			})
			.otherwise('/');
	});

	module.controller('MarvelCharactersAppCtrl', function($http) {
		var vm = this;

		$http.get("http://gateway.marvel.com/v1/public/characters?orderBy=-modified&apikey=e82e1f8eb16da85c0260676f2cdb05b2")
		    .then(function(response) {
		    	vm.characters = response.data.data.results;
		    });
	});
}());
