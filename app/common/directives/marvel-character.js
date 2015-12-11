(function(){
	'use strict';

	var module = angular.module('MarvelCharacterInfo', [

	]);

	module.controller('MarvelCharacterInfoCtrl', function($scope) {
		var vm = this;
	});

	module.directive('marvelCharacterInfo', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/common/directives/marvel-character.html',
			bindToController: true,
			scope: {
				character: '='
			},
			controller: 'MarvelCharacterInfoCtrl',
			controllerAs: 'vm'
		}
	});
})();
