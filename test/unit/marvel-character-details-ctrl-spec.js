describe('MarvelCharacterDetailsCtrl', function() {
    var marvelCharacterDetailsCtrl;
    var marvelApiMock;
    var $routeParamsMock;
    var characterIdMock;
    var marvelApiGetCharacterDefer;
    var $rootScope;

    beforeEach(module('pages.marvelCharacterDetails'));

    beforeEach(inject(function($controller, $q, _$rootScope_){
        $rootScope = _$rootScope_;

        marvelApiGetCharacterDefer = $q.defer();
        marvelApiMock = jasmine.createSpyObj('marvelApi', ['getCharacter']);
        marvelApiMock.getCharacter.and.returnValue(marvelApiGetCharacterDefer.promise);
        $routeParamsMock = {
            characterId: 'characterIdMock'
        };
        marvelCharacterDetailsCtrl = $controller('MarvelCharacterDetailsCtrl', {
            marvelApi: marvelApiMock,
            $routeParams: $routeParamsMock
        });
    }));

    it('should have an error equal to false', function() {
        expect(marvelCharacterDetailsCtrl.error).toBe(false);
    });

    it('should call marvelApi.getCharacter with character id from route', function(){
        expect(marvelApiMock.getCharacter).toHaveBeenCalledWith('characterIdMock');
    });

    describe('when marvelApi.getCharacter resolved', function() {
        var getCharacterResultMock;
        beforeEach(function() {
            getCharacterResultMock = {};
            marvelApiGetCharacterDefer.resolve(getCharacterResultMock);
            $rootScope.$apply();
        });

        it('should save result to character', function(){
            expect(marvelCharacterDetailsCtrl.character).toBe(getCharacterResultMock);
        });
    });

    describe('when marvelApi.getCharacter rejected', function() {
        beforeEach(function() {
            marvelApiGetCharacterDefer.reject();
            $rootScope.$apply();
        });

        it('should set error to true', function() {
            expect(marvelCharacterDetailsCtrl.error).toBe(true);
        });
    });
});
