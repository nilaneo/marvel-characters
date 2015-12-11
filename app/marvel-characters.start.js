(function () {
	"use strict";
	
	var app = angular.module('MarvelCharacters', []);

	app.controller('CharactersCtrl', function($scope, $http) {
		var charactersCtrl = this;

		$http.get("http://gateway.marvel.com/v1/public/characters?orderBy=-modified&apikey=e82e1f8eb16da85c0260676f2cdb05b2")
	    .then(function(response) {
	    	charactersCtrl.characters = response.data.data.results;
	    });
	});

	app.directive('marvelCharacters', function() {
		return {
			templateUrl: "app/characters.tmpl.html",
			restrict: "E",
			scope: {
				characters: "="
			}
		}
	});
}());
