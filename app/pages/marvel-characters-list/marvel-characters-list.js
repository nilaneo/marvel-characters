(function () {
    "use strict";

    var module = angular.module('pages.marvelCharactersList', [
        'ngRoute',
        'common.services.marvelApi'
    ]);

    module
        .config(configure)
        .controller('MarvelCharactersAppCtrl', MarvelCharactersAppCtrl);

    function configure($routeProvider) {
        $routeProvider
            .when('/characters', {
                controller: 'MarvelCharactersAppCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/marvel-characters-list/marvel-characters-list.html',
                reloadOnSearch: false
            });
    }

    function MarvelCharactersAppCtrl(marvelApi, $location, $scope) {
        var vm = this;

        var DEFAULT_PAGE = 1,
            DEFAULT_ITEMS_PER_PAGE = 10,
            DEFAULT_ORDER_BY = 'name';


        vm.error = false;
        vm.itemsPerPageOptions = [10, 15, 20, 30, 50, 100];
        vm.orderItemsByOption = ['name', 'modified'];
        vm.maxSize = 5;
        vm.itemsPerPage = _getInitialItemsPerPage();
        vm.currentPage = _getInitialCurrentPage();
        vm.orderBy = _getInitialOrderBy();
        vm.totalItems = vm.currentPage*vm.itemsPerPage;
        vm.searchRequest = $location.search().q;

        vm.autoGetCharacters = autoGetCharacters;
        vm.resetPagesAndSearch = resetPagesAndSearch;
        vm.saveItemsPerPage = saveItemsPerPage;
        vm.showOrderedItems = showOrderedItems;
        vm.searchCharacters = searchCharacters;
        vm.savePageToUrlAndSearch = savePageToUrlAndSearch;


        _activate();

        ////////////

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
            vm.error = false;
            marvelApi.getCharacters(vm.searchRequest, vm.itemsPerPage, vm.currentPage, vm.orderBy).then(function(characters){
                vm.characters = characters.results;
                vm.totalItems = characters.total;
            }, function() {
                vm.error = true;
            });
        };

        function savePageToUrlAndSearch() {
            $location.search('page', vm.currentPage);
            searchCharacters();
        };

        function autoGetCharacters(name) {
            var ITEMS_PER_PAGE = 10,
                START_PAGE = 1;

            return marvelApi.getCharacters(name, ITEMS_PER_PAGE, START_PAGE).then(function(characters){
                return characters.results.map(function(item){
                    return item.name;
                });
            });
        };

        function _getInitialItemsPerPage() {
            var itemsPerPage = parseInt($location.search().items, 10);

            if(isNaN(vm.itemsPerPage) || !_.includes(vm.itemsPerPageOptions, vm.itemsPerPage)) {
                return DEFAULT_ITEMS_PER_PAGE;
            } else {
                return itemsPerPage;
            }
        };

        function _getInitialCurrentPage() {
            var page = parseInt($location.search().page, 10);

            if(isNaN(page) || page < 1) {
                return DEFAULT_PAGE;
            } else {
                return page;
            }
        };

        function _getInitialOrderBy() {
            var orderBy = $location.search().orderBy;

            if(!(vm.orderBy) || !_.includes(vm.orderItemsByOption, vm.orderBy)) {
                return DEFAULT_ORDER_BY;
            } else {
                return orderBy;
            }
        };

        function _activate() {
            vm.searchCharacters();
        };
    };
}());
