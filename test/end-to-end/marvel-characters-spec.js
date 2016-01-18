describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('http://localhost:3000/#/characters');

        expect(browser.getTitle()).toBe('Marvel Characters');
    });
});
