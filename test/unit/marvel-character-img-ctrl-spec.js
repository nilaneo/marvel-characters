describe('MarvelCharacterImgCtrl', function() {
    var marvelCharacterImgCtrl;
    beforeEach(module('common.directives.marvelCharacterImg'));

    beforeEach(inject(function($controller){
        marvelCharacterImgCtrl = $controller('MarvelCharacterImgCtrl')
    }));

    describe('getThumbnailUrl', function(){
        beforeEach(function(){
            marvelCharacterImgCtrl.character = {
                thumbnail: {
                    path: 'http://example.com/test',
                    extension: 'jpg'
                }
            };
        });

        it('should be a function', function(){
            expect(marvelCharacterImgCtrl.getThumbnailUrl).toEqual(jasmine.any(Function));
        });

        it('should return correct url', function() {
            expect(marvelCharacterImgCtrl.getThumbnailUrl()).toBe('http://example.com/test.jpg');
        });
    });
});
