(function() {
    'use strict';

    var module = angular.module('common.services.marvelApi', []);

    module.factory('marvelApi', marvelApi);

    function marvelApi($http) {
        var factory = {
            getCharacters: getCharacters,
            getCharacter: getCharacter
        };

        var apiUrl = 'http://gateway.marvel.com/v1/public/characters',
            apikey = 'e82e1f8eb16da85c0260676f2cdb05b2';

        return factory;

        ////////////

        function getCharacters(name, itemsPerPage, currentPage, orderBy) {
            var offset = (currentPage - 1) * itemsPerPage;
            return $http.get(apiUrl, {
                params: {
                    apikey: apikey,
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
            return $http.get(apiUrl + '/' + id, {
                params: {
                    apikey: apikey
                }
            }).then(function(response) {
                return response.data.data.results[0];
            });
        };
    };
})();
