(function(){
    'use strict';

    var module = angular.module('MarvelCharactersApp', [
        'ui.bootstrap',
        'ngRoute',

        'marvelApi',
        'MarvelCharacterInfo',
        'MarvelCharactersList',
        'MarvelCharacterDetails'
    ]);

    module.config(function($routeProvider) {
        $routeProvider.otherwise('/characters');
    });
})();
