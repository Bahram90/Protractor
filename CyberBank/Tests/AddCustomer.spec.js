require('../Utilities/CustomLocators.js');
require('../Tests/BankManagerSimple.spec.js');
var HomePage = require('../Pages/Home.page.js');
var BankManagerPage = require('../Pages/BankManager.page.js');
var Base=require('../Utilities/Base.js');
var CostumForm=require('../Pages/CostumForm.spec.js');
var Customers = require('../Pages/Customers.page.js')
var BankData=require ('../TestData/BankData.json');
//var using=require('jasmine-data-provider');

describe('Testing Add Customer', () => {
    beforeAll(function(){
        Base.navigateToHome();
        HomePage.managerLoginButton.click();
        BankManagerPage.addCustomerButton.click();

    })
    
    it('should display main Add Custumer Button', function() {
        expect(BankManagerPage.addCustomerButton.isDisplayed()).toBe(true);
        expect(BankManagerPage.addCustomerButton.getText()).toEqual('Add Customer')
    });
        
    it('should display forms for add Costumer',()=>{
        expect(CostumForm.firstLabel.isDisplayed()).toBe(true);
        expect(CostumForm.firstLabel.getText()).toEqual('First Name :');
    });
    it('should display last name: form label for Add Costumer', () => {
        expect(CostumForm.lastLabel.isDisplayed()).toBe(true);
        expect(CostumForm.lastLabel.getText()).toEqual('Last Name :');
    });
    it('should display post code: form label for Add Cosumer', () => {
        expect(CostumForm.postCodeLabel.isDisplayed()).toBe(true);
        expect(CostumForm.postCodeLabel.getText()).toEqual('Post Code :');
    });
    it('should display add costumer button form', () => {
        expect(CostumForm.AddCustomerButton.isDisplayed()).toBe(true);
        expect(CostumForm.AddCustomerButton.getText()).toEqual('Add Customer');
    });
    it('should list First Name label in the form ', () => {
        expect(CostumForm.firstFLD.isDisplayed()).toBe(true);
        // expect(CostumForm.firstFLD.sendKeys('Mike'));
        expect(CostumForm.firstFLD.getAttribute('placeholder')).toEqual('First Name');
    });
    
    it('should list Last Name label in the form', function() {
        expect(CostumForm.lastFLD.isDisplayed()).toBe(true);
        // expect(CostumForm.lastFLD.sendKeys('Smith'));
        expect(CostumForm.lastFLD.getAttribute('placeholder')).toEqual('Last Name');
    });

    
    it('hould list Zip Code label in the form', function() {
        expect(CostumForm.postcodeFLD.isDisplayed()).toBe(true);
        // expect(CostumForm.postcodeFLD.sendKeys('17011'));
        expect(CostumForm.postcodeFLD.getAttribute('placeholder')).toEqual('Post Code');
    });
    it('should add costumer', () => {
        for(let i=0; i<BankData.customers.length;i++){
        expect(CostumForm.firstFLD.sendKeys(BankData.customers[i].fName));
        browser.sleep(1000);
        expect(CostumForm.lastFLD.sendKeys(BankData.customers[i].lName));
        browser.sleep(1000);
        expect(CostumForm.postcodeFLD.sendKeys(BankData.customers[i].pCode));
        browser.sleep(1000);
        expect(CostumForm.AddCustomerButton.click());
        browser.sleep(1000);
        //browser.sleep(5000);
        //expect(browser.switchTo().alert().getText()).toEqual('Customer added successfully with customer id :6');
        expect(browser.switchTo().alert().accept());
        }
        BankManagerPage.addShowCustomerButton.click();
    });

    

    it('should display new customer first name that was created', () => {
        BankManagerPage.addShowCustomerButton.click();
        browser.sleep(2000);
        expect(Customers.getLastRowValue(1).getText()).toEqual('Jeff');
    });
    it('should display new customer last name that was created', () => {
        expect(Customers.getLastRowValue(2).getText()).toEqual('Bezos');
    });

    it('should display new customer post code that was created', () => {
        expect(Customers.getLastRowValue(3).getText()).toEqual('21305');
    });
    //negative test case
    it('should have no account number fot the user that was created', () => {
        expect(Customers.getLastRowValue(4).getText()).toEqual('');
    });
        
        

});

