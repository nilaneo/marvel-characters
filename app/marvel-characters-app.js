(function () {
	"use strict";

	var module = angular.module('MarvelCharactersApp', [
		'ngRoute',
		'marvelApi',
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

	module.controller('MarvelCharactersAppCtrl', function(marvelApi) {
		var vm = this;

		marvelApi.getCharacters().then(function(characters) {
	    	vm.characters = characters;
	    });
	});
}());
