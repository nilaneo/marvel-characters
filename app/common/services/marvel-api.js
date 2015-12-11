(function() {
    'use strict';

    var module = angular.module('marvelApi', []);

    module.factory('marvelApi', function($http) {
        return {
            getCharacters: function() {
                return $http.get("http://gateway.marvel.com/v1/public/characters?orderBy=-modified&apikey=e82e1f8eb16da85c0260676f2cdb05b2").then(function(response) {
                    return response.data.data.results;
                });
            }
        };
    });

})();
