describe('MarvelCharactersListCtrl', function() {
    var marvelCharactersListCtrl;
    var marvelApiMock;
    var marvelApiGetCharactersDefer;
    var $rootScope;

    beforeEach(module('pages.marvelCharactersList'));

    beforeEach(inject(function($controller, $q, _$rootScope_){
        $rootScope = _$rootScope_;

        marvelApiGetCharactersDefer = $q.defer();
        marvelApiMock = jasmine.createSpyObj('marvelApi', ['getCharacters']);
        marvelApiMock.getCharacters.and.returnValue(marvelApiGetCharactersDefer.promise);

        marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
            marvelApi: marvelApiMock
        });
    }));

    it('should have an error equal to false', function() {
        expect(marvelCharactersListCtrl.error).toBe(false);
    });

    describe('searchCharacters', function(){
        beforeEach(function() {
            marvelCharactersListCtrl.error = true;
            marvelCharactersListCtrl.searchRequest = 'searchRequestMock';
            marvelCharactersListCtrl.itemsPerPage = 'itemsPerPageMock';
            marvelCharactersListCtrl.currentPage = 'currentPageMock';
            marvelCharactersListCtrl.orderBy = 'orderByMock';

            marvelCharactersListCtrl.searchCharacters();
        });

        it('should set error to false', function() {
            expect(marvelCharactersListCtrl.error).toBe(false);
        });

        it('should call marvelApi.getCharacters', function(){
            expect(marvelApiMock.getCharacters).toHaveBeenCalledWith('searchRequestMock', 'itemsPerPageMock', 'currentPageMock', 'orderByMock');
        });

        describe('when marvelApi.getCharacters resolved', function() {
            var getCharactersResultMock;
            beforeEach(function() {
                getCharactersResultMock = {
                    results: [],
                    total: 100500
                };
                marvelApiGetCharactersDefer.resolve(getCharactersResultMock);
                $rootScope.$apply();
            });

            it('should save characters', function(){
                expect(marvelCharactersListCtrl.characters).toBe(getCharactersResultMock.results);
            });

            it('should save total items', function(){
                expect(marvelCharactersListCtrl.totalItems).toBe(getCharactersResultMock.total);
            });
        });

        describe('when marvelApi.getCharacters rejected', function() {
            beforeEach(function() {
                marvelApiGetCharactersDefer.reject();
                $rootScope.$apply();
            });

            it('should set error to true', function() {
                expect(marvelCharactersListCtrl.error).toBe(true);
            });
        });
    });
});
