(function () {
    "use strict";

    var module = angular.module('MarvelCharactersApp', [
        'ui.bootstrap',
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

        // Pagination
        vm.itemsPerPageOptions = [5, 10, 20, 50, 100];
        vm.itemsPerPage = vm.itemsPerPageOptions[1];
        vm.currentPage = 1;
        vm.maxSize = 5;

        vm.resetPagesAndSearch = function() {
            vm.currentPage = 1;
            vm.searchCharacters();
        };

        vm.searchRequest = $location.search().q;

        vm.searchCharacters = function() {
            marvelApi.getCharacters(vm.searchRequest, vm.itemsPerPage, vm.currentPage).then(function(characters){
                vm.characters = characters.results;
                vm.totalItems = characters.total;
            });

            $location.search('q', vm.searchRequest);
        };

        $scope.$watch(function() {
            return vm.searchRequest;
        }, function() {
            vm.resetPagesAndSearch();
        });
    });
}());
