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

    module.controller('MarvelCharactersAppCtrl', MarvelCharactersAppCtrl);

    function MarvelCharactersAppCtrl(marvelApi, $location, $scope) {
        var vm = this;

        vm.itemsPerPageOptions = [10, 15, 20, 30, 50, 100];
        vm.orderItemsByOption = ['name', 'modified'];
        vm.maxSize = 5;
        vm.itemsPerPage = parseInt($location.search().items, 10);
        vm.currentPage = parseInt($location.search().page, 10);
        vm.orderBy = $location.search().orderBy;

        vm.autoGetCharacters = autoGetCharacters;
        vm.resetPagesAndSearch = resetPagesAndSearch;
        vm.saveItemsPerPage = saveItemsPerPage;
        vm.showOrderedItems = showOrderedItems;
        vm.searchCharacters = searchCharacters;
        vm.savePageToUrlAndSearch = savePageToUrlAndSearch;

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

        activate();

        ////////////

        function activate() {
            vm.searchCharacters();
        };

        function resetPagesAndSearch() {
            vm.currentPage = 1;
            savePageToUrlAndSearch();
        };

        function saveItemsPerPage() {
            $location.search('items', vm.itemsPerPage);
            resetPagesAndSearch();
        };

        function showOrderedItems() {
            $location.search('orderBy', vm.orderBy);
            resetPagesAndSearch();
        }

        function searchCharacters() {
            marvelApi.getCharacters(vm.searchRequest, vm.itemsPerPage, vm.currentPage, vm.orderBy).then(function(characters){
                vm.characters = characters.results;
                vm.totalItems = characters.total;
            });
        };

        function savePageToUrlAndSearch() {
            $location.search('page', vm.currentPage);
            searchCharacters();
        };

        function autoGetCharacters(name) {
            var itemsPerSuggestion = 10,
                startPage = 1;

            return marvelApi.getCharacters(name, itemsPerSuggestion, startPage).then(function(characters){
                return characters.results.map(function(item){
                    return item.name;
                });
            });
        };
    };
}());
