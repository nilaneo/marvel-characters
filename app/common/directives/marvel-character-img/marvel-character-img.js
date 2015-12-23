(function(){
    'use strict';

    var module = angular.module('common.directives.marvelCharacterImg', [

    ]);

    module.directive('marvelCharacterImg', marvelCharacterImg);

    function marvelCharacterImg() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/common/directives/marvel-character-img/marvel-character-img.html',
            bindToController: true,
            scope: {
                character: '='
            },
            controller: 'MarvelCharacterImgCtrl',
            controllerAs: 'vm'
        };

        return directive;
    };

    module.controller('MarvelCharacterImgCtrl', function($scope) {
        var vm = this;
        vm.thumbnailUrl = thumbnailUrl;

        function thumbnailUrl() {
            return vm.character.thumbnail.path + '.' + vm.character.thumbnail.extension;
        }

    });
})();
