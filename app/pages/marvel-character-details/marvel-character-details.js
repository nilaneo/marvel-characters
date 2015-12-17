(function(){
    'use strict';

    var module = angular.module('MarvelCharacterDetails', [

    ]);

    module.config(function($routeProvider) {
        $routeProvider
            .when('/characters/:characterId', {
                controller: 'MarvelCharacterDetailsCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/marvel-character-details/marvel-character-details.html'
            });
    });

    module.controller('MarvelCharacterDetailsCtrl', function() {
        var vm = this;
    });

})();
