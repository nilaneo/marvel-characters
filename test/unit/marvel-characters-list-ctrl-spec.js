describe('MarvelCharactersListCtrl', function() {
    var marvelCharactersListCtrl;
    var marvelApiMock;
    var marvelApiGetCharactersDefer;
    var $rootScope;
    var $location;

    beforeEach(module('pages.marvelCharactersList'));

    beforeEach(inject(function($q, _$rootScope_, _$location_){
        $rootScope = _$rootScope_;
        $location = _$location_;

        marvelApiGetCharactersDefer = $q.defer();
        marvelApiMock = jasmine.createSpyObj('marvelApi', ['getCharacters']);
        marvelApiMock.getCharacters.and.returnValue(marvelApiGetCharactersDefer.promise);
    }));

    describe('when there is no search params', function() {
        beforeEach(inject(function($controller){
            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have an error equal to false', function() {
            expect(marvelCharactersListCtrl.error).toBe(false);
        });

        it('should have an itemsPerPageOptions equal to [10, 15, 20, 30, 50, 100]', function() {
            expect(marvelCharactersListCtrl.itemsPerPageOptions).toEqual([10, 15, 20, 30, 50, 100]);
        });

        it('should have an orderItemsByOption equal to [\'name\', \'modified\']', function() {
            expect(marvelCharactersListCtrl.orderItemsByOption).toEqual(['name', 'modified']);
        });

        it('should have a maxSize equal to 5', function() {
            expect(marvelCharactersListCtrl.maxSize).toBe(5);
        });

        it('should have an itemsPerPage equal to 10', function() {
            expect(marvelCharactersListCtrl.itemsPerPage).toBe(10);
        });

        it('should have a currentPage equal to 1', function() {
            expect(marvelCharactersListCtrl.currentPage).toBe(1);
        });

        it('should have a totalItems equal to 10', function() {
            expect(marvelCharactersListCtrl.totalItems).toBe(10);
        });

        it('should have a orderBy equal to name', function() {
            expect(marvelCharactersListCtrl.orderBy).toBe('name');
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

                it('should set error to true', function(){
                    expect(marvelCharactersListCtrl.error).toBe(true);
                });
            });
        });


        describe('autoGetCharacters', function(){
            var result;

            beforeEach(function() {
                result = marvelCharactersListCtrl.autoGetCharacters('captain america');
            });

            it('should call marvelApi.getCharacters', function(){
                expect(marvelApiMock.getCharacters).toHaveBeenCalledWith('captain america', 10, 1);
            });

            describe('when marvelApi.getCharacters resolved', function() {
                var getCharactersResultMock;
                beforeEach(function() {
                    getCharactersResultMock = {
                        results: [
                            {
                                name: 'ironman'
                            },
                            {
                                name: 'captain america'
                            }
                        ],
                        total: 100500
                    };
                    marvelApiGetCharactersDefer.resolve(getCharactersResultMock);
                    $rootScope.$apply();
                });

                it('result should be resolved with array of names', function(done){
                    result.then(function(resolvedValue) {
                        expect(resolvedValue).toEqual(['ironman', 'captain america']);
                        done();
                    });
                    $rootScope.$apply();
                });
            });

            describe('when marvelApi.getCharacters rejected', function() {
                var errorCallbackSpy;

                beforeEach(function() {
                    errorCallbackSpy = jasmine.createSpy('errorCallback');
                    result.catch(errorCallbackSpy);
                    marvelApiGetCharactersDefer.reject();
                    $rootScope.$apply();
                });

                it('result should be rejected', function(){
                    expect(errorCallbackSpy).toHaveBeenCalled();
                });
            });
        });

        describe('activate', function() {
            beforeEach(function() {
                spyOn(marvelCharactersListCtrl, 'searchCharacters');

                marvelCharactersListCtrl.activate();
            });

            it('should call searchCharacters', function() {
                expect(marvelCharactersListCtrl.searchCharacters).toHaveBeenCalledWith()
            });
        });

        describe('resetPagesAndSearch', function() {
            beforeEach(function(){
                marvelCharactersListCtrl.currentPage = 25;

                spyOn(marvelCharactersListCtrl, 'savePageToUrlAndSearch');

                marvelCharactersListCtrl.resetPagesAndSearch();
            });

            it('should reset page to 1', function() {
                expect(marvelCharactersListCtrl.currentPage).toBe(1);
            });

            it('should call savePageToUrlAndSearch', function() {
                expect(marvelCharactersListCtrl.savePageToUrlAndSearch).toHaveBeenCalledWith()
            });
        });

        describe('savePageToUrlAndSearch', function() {
            beforeEach(function() {
                marvelCharactersListCtrl.currentPage = 25;

                spyOn(marvelCharactersListCtrl, 'searchCharacters');

                marvelCharactersListCtrl.savePageToUrlAndSearch();
            });

            it('should show page 125', function() {
                expect($location.search().page).toBe(25)
            });

            it('should call searchCharacters', function() {
                expect(marvelCharactersListCtrl.searchCharacters).toHaveBeenCalledWith()
            });
        });
    });

    describe('when there is valid items in search params', function() {
        beforeEach(inject(function($controller){
            $location.search('items', '20');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have an itemsPerPage equal to 20', function() {
            expect(marvelCharactersListCtrl.itemsPerPage).toBe(20);
        });

        it('should have a totalItems equal to 20', function() {
            expect(marvelCharactersListCtrl.totalItems).toBe(20);
        });
    });

    describe('when there is not numeric items in search params', function() {
        beforeEach(inject(function($controller){
            $location.search('items', 'notNumericValue');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have an itemsPerPage equal to 10', function() {
            expect(marvelCharactersListCtrl.itemsPerPage).toBe(10);
        });
    });

    describe('when there is numeric value of items but it is not in itemsPerPageOptions', function() {
        beforeEach(inject(function($controller){
            $location.search('items', '12');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have an itemsPerPage equal to 10', function() {
            expect(marvelCharactersListCtrl.itemsPerPage).toBe(10);
        });
    });

    describe('when there is valid page in search params', function() {
        beforeEach(inject(function($controller){
            $location.search('page', '20');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have a page equal to 20', function() {
            expect(marvelCharactersListCtrl.currentPage).toBe(20);
        });

        it('should have a totalItems equal to 200', function() {
            expect(marvelCharactersListCtrl.totalItems).toBe(200);
        });
    });

    describe('when there is not numeric page in search params', function() {
        beforeEach(inject(function($controller){
            $location.search('page', 'notNumericValue');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have a page equal to 1', function() {
            expect(marvelCharactersListCtrl.currentPage).toBe(1);
        });
    });

    describe('when there is a valid orderBy in search params', function() {
        beforeEach(inject(function($controller){
            $location.search('orderBy', 'modified');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have an orderBy value equal to modified', function() {
            expect(marvelCharactersListCtrl.orderBy).toBe('modified');
        });
    });

    describe('when an orderBy in search params is not from orderItemsByOption', function() {
        beforeEach(inject(function($controller){
            $location.search('orderBy', 'lol');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have an orderBy equal to name', function() {
            expect(marvelCharactersListCtrl.orderBy).toBe('name');
        });
    });

    describe('when there is a valid searchRequest ', function() {
        beforeEach(inject(function($controller){
            $location.search('q', 'ironman');

            marvelCharactersListCtrl = $controller('MarvelCharactersListCtrl', {
                marvelApi: marvelApiMock
            });
        }));

        it('should have a searchRequest equal to ironman', function() {
            expect(marvelCharactersListCtrl.searchRequest).toBe('ironman');
        });
    });
});
