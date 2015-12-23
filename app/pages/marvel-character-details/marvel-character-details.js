(function(){
    'use strict';

    var module = angular.module('pages.marvelCharacterDetails', []);

    module.config(function($routeProvider) {
        $routeProvider
            .when('/characters/:characterId', {
                controller: 'MarvelCharacterDetailsCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/marvel-character-details/marvel-character-details.html'
            });
    });

    module.controller('MarvelCharacterDetailsCtrl', MarvelCharacterDetailsCtrl);

    function MarvelCharacterDetailsCtrl(marvelApi, $routeParams) {
        var vm = this;

        vm.getCharacter = getCharacter;

        vm.getCharacter();

        ////////////

        function getCharacter() {
            marvelApi.getCharacter($routeParams.characterId).then(function(character){
                vm.character = character;
            });
        };

    };

})();
