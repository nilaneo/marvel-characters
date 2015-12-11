(function () {
	"use strict";
	
	var app = angular.module('MarvelCharactersApp', []);

	app.controller('MarvelCharactersAppCtrl', function($http) {
		var vm = this;

		$http.get("http://gateway.marvel.com/v1/public/characters?orderBy=-modified&apikey=e82e1f8eb16da85c0260676f2cdb05b2")
	    .then(function(response) {
	    	vm.characters = response.data.data.results;
	    });
	});

	app.directive('marvelCharactersApp', function() {
		return {
			templateUrl: "app/marvel-characters-app.html",
			restrict: "E",
			scope: {},
			controller: 'MarvelCharactersAppCtrl',
			controllerAs: 'vm'
		}
	});
}());
