(function () {
    "use strict";

    var module = angular.module('MarvelCharactersApp', [
        'ngRoute',
        'marvelApi',
        'MarvelCharacterInfo'
    ]);

    module.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'MarvelCharactersAppCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/marvel-characters-app.html',
                reloadOnSearch: false
            })
            .otherwise('/');
    });

    module.controller('MarvelCharactersAppCtrl', function(marvelApi, $location, $scope) {
        var vm = this;

        vm.searchRequest = $location.search().q;

        vm.searchCharacters = function() {
            marvelApi.getCharacters(vm.searchRequest).then(function(characters){
                vm.characters = characters;
            });

            $location.search('q', vm.searchRequest);
        };

        $scope.$watch(function() {
            return vm.searchRequest;
        }, function() {
            vm.searchCharacters();
        });

    });
}());
