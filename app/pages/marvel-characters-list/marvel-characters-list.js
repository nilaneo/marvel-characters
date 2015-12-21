(function () {
    "use strict";

    var module = angular.module('pages.marvelCharactersList', [
        'common.services.marvelApi'
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
        vm.orderItemsByOption = ['name', 'modified'];
        vm.maxSize = 5;
        vm.itemsPerPage = parseInt($location.search().items, 10);
        vm.currentPage = parseInt($location.search().page, 10);
        vm.orderBy = $location.search().orderBy;

        if(isNaN(vm.itemsPerPage) || !_.includes(vm.itemsPerPageOptions, vm.itemsPerPage)) {
            vm.itemsPerPage = 10;
            $location.search('items', vm.itemsPerPage);
        }

        if(isNaN(vm.currentPage) || vm.currentPage < 1) {
            vm.currentPage = 1;
            $location.search('page', vm.currentPage);
        }

        if(!(vm.orderBy) || !_.includes(vm.orderItemsByOption, vm.orderBy)) {
            vm.orderBy = 'name';
            $location.search('orderBy', vm.orderBy);
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

        vm.showOrderedItems = function() {
            $location.search('orderBy', vm.orderBy);
            vm.resetPagesAndSearch();
        }

        vm.searchCharacters = function() {
            marvelApi.getCharacters(vm.searchRequest, vm.itemsPerPage, vm.currentPage, vm.orderBy).then(function(characters){
                vm.characters = characters.results;
                vm.totalItems = characters.total;
            });
        };

        vm.savePageToUrlAndSearch = function() {
            $location.search('page', vm.currentPage);
            vm.searchCharacters();
        };

        vm.autoGetCharacters = function(name) {
            var itemsPerSuggestion = 10,
                startPage = 1;

            return marvelApi.getCharacters(name, itemsPerSuggestion, startPage).then(function(characters){
                return characters.results.map(function(item){
                    return item.name;
                });
            });
        };

        vm.searchCharacters();
    });
}());
