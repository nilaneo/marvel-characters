(function() {
    'use strict';

    var module = angular.module('common.services.marvelApi', []);

    module.factory('marvelApi', marvelApi);

    function marvelApi($http) {
        var service = {
            getCharacters: getCharacters,
            getCharacter: getCharacter
        };

        var API_URL = 'http://gateway.marvel.com/v1/public/characters',
            API_KEY = 'e82e1f8eb16da85c0260676f2cdb05b2';

        return service;

        ////////////

        function getCharacters(name, itemsPerPage, currentPage, orderBy) {
            var offset = (currentPage - 1) * itemsPerPage;
            return $http.get(API_URL, {
                params: {
                    apikey: API_KEY,
                    limit: itemsPerPage,
                    offset: offset,
                    nameStartsWith: name ? name : undefined,
                    orderBy: orderBy
                }
            }).then(function(response) {
                return response.data.data;
            });
        };

        function getCharacter(id) {
            return $http.get(API_URL + '/' + id, {
                params: {
                    apikey: API_KEY
                }
            }).then(function(response) {
                return response.data.data.results[0];
            });
        };
    };
})();
