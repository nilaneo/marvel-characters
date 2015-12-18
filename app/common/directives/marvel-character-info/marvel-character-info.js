(function(){
	'use strict';

	var module = angular.module('common.directives.marvelCharacterInfo', [

	]);

	module.controller('MarvelCharacterInfoCtrl', function($scope) {
		var vm = this;

		function thumbnailUrl() {
			return vm.character.thumbnail.path + '.' + vm.character.thumbnail.extension;
		}

		vm.thumbnailUrl = thumbnailUrl;
	});

	module.directive('marvelCharacterInfo', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/common/directives/marvel-character-info/marvel-character-info.html',
			bindToController: true,
			scope: {
				character: '='
			},
			controller: 'MarvelCharacterInfoCtrl',
			controllerAs: 'vm'
		}
	});
})();
