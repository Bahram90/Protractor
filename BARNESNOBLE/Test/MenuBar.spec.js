//Bahram 
//#bx-element-822426-txSrrII > button
var Base = require('../Utilities/Base.js');
var MenuBar = require('../Pages/MenuBarLocators.page.js');
describe('Check Menu Bar is Displayed', () => {
    beforeAll(function () {
        Base.websiteUrl();
    })
    it('should display all Menu Bar item', () => {
        MenuBar.BarLocator.
            getText().then(text => {
                console.log(text);
                console.log(text.length);
                expect(text.length).toBe(13);
                //browser.sleep(1000);
                // for (var i = 0; i < 13; i++) {
                //     MenuBar.BarLocator.get(i).click();
                //     //browser.sleep(2000);
                //     browser.getTitle().then(title => {
                //         console.log("Title name is: " + title);
                //         expect(browser.getTitle()).toBe(title);
                //         //console.log("Titli name is: "+title);
                //     })
                // }
            })
    });
    it('should click each item in menu bar and match Currebt Title', () => {
        for (var i = 0; i < 13; i++) {
            MenuBar.BarLocator.get(i).click();
            browser.sleep(1000);
            expect(MenuBar.BarLocator1.getText().isDisplayed()).toBe(true);
            expect(browser.getTitle()).toContain("Barnes & Noble®");
            
        }


    })



});

