(function () {
	"use strict";
	
	var app = angular.module('MarvelCharacters', []);

	app.controller('charactersCtrl', function($scope, $http) {
		$http.get("http://gateway.marvel.com/v1/public/characters?orderBy=-modified&apikey=e82e1f8eb16da85c0260676f2cdb05b2")
	    .then(function(response) {
	    	$scope.characters = response.data.data.results;
	    });
	});

	app.directive('marvelCharacter', function() {
		return {
			templateUrl: "app/characters.tmpl.html",
			restrict: "E"
		}
	});
}());
