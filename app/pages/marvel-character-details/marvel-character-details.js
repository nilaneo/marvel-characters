(function(){
    'use strict';

    var module = angular.module('pages.marvelCharacterDetails', []);

    module
        .config(_configure)
        .controller('MarvelCharacterDetailsCtrl', MarvelCharacterDetailsCtrl);

    function _configure($routeProvider) {
        $routeProvider
            .when('/characters/:characterId', {
                controller: 'MarvelCharacterDetailsCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/marvel-character-details/marvel-character-details.html'
            });
    }

    function MarvelCharacterDetailsCtrl(marvelApi, $routeParams) {
        var vm = this;

        _activate();

        ////////////

        function _activate() {
            marvelApi.getCharacter($routeParams.characterId).then(function(character){
                vm.character = character;
            });
        };

    };

})();
