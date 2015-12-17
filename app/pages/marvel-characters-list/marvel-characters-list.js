(function () {
    "use strict";

    var module = angular.module('MarvelCharactersList', [
    ]);

    module.config(function($routeProvider) {
        $routeProvider
            .when('/characters', {
                controller: 'MarvelCharactersAppCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/marvel-characters-list/marvel-characters-list.html',
                reloadOnSearch: false
            });
    });

    module.controller('MarvelCharactersAppCtrl', function(marvelApi, $location, $scope) {
        var vm = this;

        vm.itemsPerPageOptions = [5, 10, 20, 50, 100];
        vm.maxSize = 5;
        vm.itemsPerPage = parseInt($location.search().items, 10);
        vm.currentPage = parseInt($location.search().page, 10);
        if(isNaN(vm.itemsPerPage) || !_.includes(vm.itemsPerPageOptions, vm.itemsPerPage)) {
            vm.itemsPerPage = 10;
            $location.search('items', vm.itemsPerPage);
        }
        if(isNaN(vm.currentPage) || vm.currentPage < 1) {
            vm.currentPage = 1;
            $location.search('page', vm.currentPage);
        }
        vm.totalItems = vm.currentPage*vm.itemsPerPage;
        vm.searchRequest = $location.search().q;

        vm.resetPagesAndSearch = function() {
            vm.currentPage = 1;
            vm.savePageToUrlAndSearch();
        };

        vm.saveItemsPerPage = function() {
            $location.search('items', vm.itemsPerPage);
            vm.resetPagesAndSearch();
        };

        vm.searchCharacters = function() {
            marvelApi.getCharacters(vm.searchRequest, vm.itemsPerPage, vm.currentPage).then(function(characters){
                vm.characters = characters.results;
                vm.totalItems = characters.total;
            });
        };

        vm.savePageToUrlAndSearch = function() {
            $location.search('page', vm.currentPage);
            vm.searchCharacters();
        };

        var itIsTheFirstRunOfSearchRequestWatcher = true;

        $scope.$watch(function() {
            return vm.searchRequest;
        }, function() {
            if (itIsTheFirstRunOfSearchRequestWatcher) {
                itIsTheFirstRunOfSearchRequestWatcher = false;
                vm.searchCharacters();
            } else {
                $location.search('q', vm.searchRequest);
                vm.resetPagesAndSearch();
            }
        });
    });
}());
