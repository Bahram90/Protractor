require('../Utilities/CustomLocators.js');
var HomePage = require('../Pages/Home.page.js');
var BankManagerPage = require('../Pages/BankManager.page.js');
var Base=require('../Utilities/Base.js');
var BankData=require ('../TestData/BankData.json');
//var CustomerPage=require('../Pages/CustomerPage');

describe('Login', () => {


    beforeEach(function () {
        Base.navigateToHome ();
        //browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
    });

    it('should have correct page title', () => {
        expect(browser.getTitle()).toEqual("Protractor practice website - Banking App");
    });

    it('should display home button', () => {
        expect(HomePage.homeButton.isDisplayed()).toBe(true);
        expect(HomePage.homeButton.getText()).toEqual('Home');
    });

    it('should display page header', () => {
        expect(HomePage.pageHeader.isDisplayed()).toBe(true);
        ///////////
        expect(HomePage.pageHeader.getText()).toEqual(BankData.appData.bankName);
    });

    it('should display login option for Bank Manager', () => {
        expect(HomePage.managerLoginButton.isDisplayed()).toBe(true);
        expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');
    });

    it('should stay at the homepage when Home Button is clicked', () => {
        HomePage.homeButton.click();
        expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
        expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');
    });

    it("should login as Bank Manager", function () {
        HomePage.managerLoginButton.click();
        expect(BankManagerPage.addCustomerButton.isDisplayed()).toBe(true);
    });


    it('should show the buttons on Bank Manager Page  ', function () {
        HomePage.managerLoginButton.click();
        expect(BankManagerPage.addCustomerButton.isDisplayed()).toBe(true);
        expect(BankManagerPage.addOpenAccountButton.isDisplayed()).toBe(true);
        expect(BankManagerPage.addOpenAccountButton.getText()).toEqual('Open Account');
        expect(BankManagerPage.addShowCustomerButton.isDisplayed()).toBe(true);
    });

    it('should show the home button in Bank Manager Page', () => {
        HomePage.managerLoginButton.click();
        HomePage.homeButton.click();
        expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
    })
    //For negative 
    // it('should navigate back to home page from Manager Login Page', () => {
    //     HomePage.managerLoginButton.click();
    //     HomePage.homeButton.click();
    //      expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Blahblah');
    // });


});
