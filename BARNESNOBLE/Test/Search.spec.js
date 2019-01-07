// Ahsen 
var Base = require("../Utilities/Base.js")
var Search = require("../Pages/SearchLocators.page.js")






describe('Testing Search section ', () => {

    beforeAll(() => {
        Base.websiteUrl()
    });



    it('should display search place holder', function () {
        expect(Search.searchInputBox.getAttribute("placeholder")).toEqual("Search")
    });

    it('should button is clickable or not ', () => {
        //explicity wait 
        browser.wait(Search.isClickable(), 2000)
    });


    it('should not be empty for searching item ', function () {
        //current url ways
        Search.searchInputBox.click().sendKeys("")
        Search.searchButton.click()
        expect(browser.getCurrentUrl()).toEqual("https://www.barnesandnoble.com/")

        // title way
        expect(browser.getTitle()).toEqual("Online Bookstore: Books, NOOK ebooks, Music, Movies & Toys | Barnes & Noble®")
        expect(browser.getTitle()).toContain("Online")


    });
    it('should display the result of item', () => {

        Search.searchInputBox.click().sendKeys("Harry Potter")
        Search.searchButton.click()
        expect(Search.searchResult.getText()).toContain("Harry Potter")
        expect(Search.searchResult.getText()).toEqual("1 - 20 of 1842 results for Harry Potter")

    });


});