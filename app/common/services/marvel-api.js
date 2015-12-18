(function() {
    'use strict';

    var module = angular.module('common.services.marvelApi', []);

    module.factory('marvelApi', function($http) {
        return {
            getCharacters: function(name, itemsPerPage, currentPage) {
                var offset = (currentPage - 1) * itemsPerPage;
                return $http.get('http://gateway.marvel.com/v1/public/characters', {
                    params: {
                        apikey: 'e82e1f8eb16da85c0260676f2cdb05b2',
                        limit: itemsPerPage,
                        offset: offset,
                        nameStartsWith: name ? name : undefined
                    }
                }).then(function(response) {
                    return response.data.data;
                });
            },
            getCharacter: function(id) {
                return $http.get('http://gateway.marvel.com/v1/public/characters/' + id, {
                    params: {
                        apikey: 'e82e1f8eb16da85c0260676f2cdb05b2'
                    }
                }).then(function(response) {
                    return response.data.data.results[0];
                });
            }
        };
    });
})();
