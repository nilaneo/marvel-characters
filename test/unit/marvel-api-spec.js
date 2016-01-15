describe('mocking service http call', function() {
    var $httpBackend;
    var $httpParamSerializer;
    var $rootScope;
    var marvelApi;
    var result;

    beforeEach(module('common.services.marvelApi'));

    beforeEach(inject(function(_$httpBackend_, _$httpParamSerializer_, _marvelApi_, _$rootScope_){
        marvelApi = _marvelApi_;
        $httpBackend = _$httpBackend_;
        $httpParamSerializer = _$httpParamSerializer_;
        $rootScope = _$rootScope_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getCharacters', function(){
        describe('when name is not empty', function() {
            beforeEach(function() {
                $httpBackend
                    .expectGET('http://gateway.marvel.com/v1/public/characters?' + $httpParamSerializer({
                        apikey: 'e82e1f8eb16da85c0260676f2cdb05b2',
                        limit: 20,
                        nameStartsWith: 'ironman',
                        offset: 40,
                        orderBy: 'name'
                    }))
                    .respond({
                        data: {
                            results: [
                                {
                                    character: 'ironman'
                                }
                            ]
                        }
                    });

                result = marvelApi.getCharacters('ironman', 20, 3, 'name');

                $httpBackend.flush();
            });

            it('should call Marvel API with correct params', angular.noop);

            it('should be resolved with an object with results', function(){
                result.then(function(resolvedValue) {
                    expect(resolvedValue).toEqual({
                        results: [
                            {
                                character: 'ironman'
                            }
                        ]
                    });
                });
            });
        });

        describe('when name is empty', function() {
            beforeEach(function() {
                $httpBackend
                    .expectGET('http://gateway.marvel.com/v1/public/characters?' + $httpParamSerializer({
                        apikey: 'e82e1f8eb16da85c0260676f2cdb05b2',
                        limit: 20,
                        offset: 40,
                        orderBy: 'name'
                    }))
                    .respond({
                        data: {
                            results: [
                                {
                                    character: 'ironman'
                                }
                            ]
                        }
                    });

                result = marvelApi.getCharacters('', 20, 3, 'name');

                $httpBackend.flush();
            });

            it('should call Marvel API without nameStartsWith param', angular.noop);
        });
    });

    describe('getCharacter', function(){
        beforeEach(function () {
            $httpBackend
                .expectGET('http://gateway.marvel.com/v1/public/characters/25?' + $httpParamSerializer({
                    apikey: 'e82e1f8eb16da85c0260676f2cdb05b2'
                }))
                .respond({
                    data: {
                        results: [
                            {
                                character: 'ironman'
                            }
                        ]
                    }
                });

            result = marvelApi.getCharacter(25);

            $httpBackend.flush();
        });

        it('should call Marvel API with correct params to get one certain character', angular.noop);

        it('should be resolved with an object with results', function(){
            result.then(function(resolvedValue) {
                expect(resolvedValue).toEqual({character: 'ironman'});
            });
        });
    });
});
