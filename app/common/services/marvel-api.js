(function() {
    'use strict';

    var module = angular.module('marvelApi', []);

    module.factory('marvelApi', function($http) {
        return {
            getCharacters: function(name) {
                return $http.get("http://gateway.marvel.com/v1/public/characters", {params: {apikey: "e82e1f8eb16da85c0260676f2cdb05b2", nameStartsWith: name ? name : undefined}}).then(function(response) {
                    return response.data.data.results;
                });
            }
        };
    });

})();
