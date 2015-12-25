(function(){
    'use strict';

    var module = angular.module('pages.marvelCharacterDetails', []);

    module
        .config(configure)
        .controller('MarvelCharacterDetailsCtrl', MarvelCharacterDetailsCtrl);

    function configure($routeProvider) {
        $routeProvider
            .when('/characters/:characterId', {
                controller: 'MarvelCharacterDetailsCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/marvel-character-details/marvel-character-details.html'
            });
    }

    function MarvelCharacterDetailsCtrl(marvelApi, $routeParams) {
        var vm = this;

        vm.error = false;

        _activate();

        ////////////

        function _activate() {
            vm.error = false;
            marvelApi.getCharacter($routeParams.characterId).then(function(character){
                vm.character = character;
            }, function() {
                vm.error = true;
            });
        };

    };

})();
