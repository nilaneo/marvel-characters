(function(){
    'use strict';

    var module = angular.module('marvelCharactersApp', [
        'ui.bootstrap',
        'ngRoute',

        'common.services.marvelApi',
        'common.directives.marvelCharacterInfo',
        'common.directives.marvelCharacterImg',
        'pages.marvelCharactersList',
        'pages.marvelCharacterDetails'
    ]);

    module.config(_configure);

    ////////////////

    function _configure($routeProvider) {
        $routeProvider.otherwise('/characters');
    }
})();
