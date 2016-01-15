describe('mocking service http call', function() {
    var $httpBackend;
    var $httpParamSerializer;
    var marvelApi;

    beforeEach(module('common.services.marvelApi'));

    beforeEach(inject(function(_$httpBackend_, _$httpParamSerializer_, _marvelApi_){
        marvelApi = _marvelApi_;
        $httpBackend = _$httpBackend_;
        $httpParamSerializer = _$httpParamSerializer_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getCharacters', function(){
        it('should call Marvel API with correct params', function() {
            $httpBackend
                .expectGET('http://gateway.marvel.com/v1/public/characters?' + $httpParamSerializer({
                    apikey: 'e82e1f8eb16da85c0260676f2cdb05b2',
                    limit: 20,
                    nameStartsWith: 'ironman',
                    offset: 40,
                    orderBy: 'name'
                }))
                .respond({character: 'ironman'});

            marvelApi.getCharacters('ironman', 20, 3, 'name');

            $httpBackend.flush();
        });
    });
});
