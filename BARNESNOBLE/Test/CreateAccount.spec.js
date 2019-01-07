//Merdan 

var Base = require("../Utilities/Base.js")
var CreateAccount = require('../Pages/CreateAccountLocators.page.js')



describe('Create an Account Testing Functionality ', () => {

    beforeAll(() => {
        Base.websiteUrl()
    });


    it('should behave...', () => {
        CreateAccount.gotoCreateAccountForm();
        browser.sleep(1000);
        browser.switchTo().frame($('iframe[title="Create an Account"]').getWebElement());
        browser.sleep(1000);
    
         expect(element(by.id('dialog-title')).getText()).toContain('Create');
    });
    it('should sendKeys to create an account', () => {
        CreateAccount.createAccountActivation();
        browser.sleep(2000);

    });
    
})