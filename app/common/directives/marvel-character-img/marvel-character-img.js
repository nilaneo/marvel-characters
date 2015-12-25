(function(){
    'use strict';

    var module = angular.module('common.directives.marvelCharacterImg', [

    ]);

    module.directive('marvelCharacterImg', marvelCharacterImg);

    module.controller('MarvelCharacterImgCtrl', MarvelCharacterImgCtrl);

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

    function MarvelCharacterImgCtrl($scope) {
        var vm = this;

        vm.getThumbnailUrl = getThumbnailUrl;

        function getThumbnailUrl() {
            return vm.character.thumbnail.path + '.' + vm.character.thumbnail.extension;
        }
    };

})();
