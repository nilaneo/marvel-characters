(function(){
    'use strict';

    var module = angular.module('common.directives.marvelCharacterInfo', []);

    module.directive('marvelCharacterInfo', marvelCharacterInfo);

    function marvelCharacterInfo() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/common/directives/marvel-character-info/marvel-character-info.html',
            bindToController: true,
            scope: {
                character: '='
            },
            controller: 'MarvelCharacterInfoCtrl',
            controllerAs: 'vm'
        };

        return directive;
    };

    module.controller('MarvelCharacterInfoCtrl', function($scope) {
        var vm = this;
    });

})();
