//Emrullah
var Base = require('../Utilities/Base.js')
var CreateAccount = require("../Pages/CreateAccountLocators.page.js") //merdan
var SignIn = require('../Pages/SignInLocators.page.js')//Emrullah
describe('Sign In Testing Functionality ', () => {
    beforeAll(function () {
        Base.websiteUrl()
    });
    // browser.manage().timeouts().implicitlyWait(5000)
    it('should go to sign in frame page ', () => {
        //browser.manage().timeouts().implicitlyWait(5000)
        browser.sleep(3000);
        CreateAccount.myAccountLink.click().then(function () {
            browser.sleep(3000);
            SignIn.signInButton.click()
        })
    });
    it('should switch to sign in frame', function(){
        browser.switchTo().frame(SignIn.signInFrame.getWebElement());
        expect(SignIn.dialogTitle.getText()).toEqual("Sign in or Create an Account");
    });
    it('should send keys for email and password field', function(){
        SignIn.emailFieldFrame.sendKeys(CreateAccount.email);
        browser.sleep(2000);
        SignIn.passwordFieldFrame.sendKeys(CreateAccount.password);
        browser.sleep(2000);
        SignIn.secureSignInButton.click();
        browser.sleep(2000);
        expect(SignIn.afterSignInErrorMessage.getText()).toEqual("Your email and password combination does not match our records. Please try again.");
    });
    fit('should create account then sign in account', function(){
        //Create an account 
        browser.sleep(2000);
        CreateAccount.gotoCreateAccountForm()
        browser.sleep(1000)
        browser.switchTo().frame($(".in.focus > div > iframe").getWebElement())
        browser.sleep(2000)
        CreateAccount.createAccountActivation()
        browser.sleep(2000)
        // Signout form webpager
        browser.sleep(2000);
        CreateAccount.myAccountLink.click()
        browser.sleep(1000)
        SignIn.signOutFromAccount.click()
        browser.sleep(5000)
        // Sign in functionality 
        CreateAccount.myAccountLink.click().then(function () {
            browser.sleep(2000)
            SignIn.signInButton.click()
        })
        browser.sleep(2000);
        browser.switchTo().frame(SignIn.signInFrame.getWebElement());
        SignIn.emailFieldFrame.sendKeys(CreateAccount.email)
        browser.sleep(2000)
        SignIn.passwordFieldFrame.sendKeys(CreateAccount.password)
        browser.sleep(1000)
        SignIn.secureSignInButton.click()
        browser.sleep(5000)
    });
});