(function(){
    'use strict';

    var module = angular.module('common.directives.marvelCharacterImg', [

    ]);

    module.controller('MarvelCharacterImgCtrl', function($scope) {
        var vm = this;

        function thumbnailUrl() {
            return vm.character.thumbnail.path + '.' + vm.character.thumbnail.extension;
        }

        vm.thumbnailUrl = thumbnailUrl;
    });

    module.directive('marvelCharacterImg', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/common/directives/marvel-character-img/marvel-character-img.html',
            bindToController: true,
            scope: {
                character: '='
            },
            controller: 'MarvelCharacterImgCtrl',
            controllerAs: 'vm'
        }
    });
})();
