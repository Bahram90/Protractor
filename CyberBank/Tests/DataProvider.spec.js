require('../Utilities/CustomLocators.js');
var HomePage =  require('../Pages/Home.page.js');
var BankManagerPage = require('../Pages/BankManager.page.js');
var Base = require('../Utilities/Base.js');
var AddCustomerPage = require('../Pages/AddCustomerPage.page.js');
var Customers = require('../Pages/Customers.page.js');
var BankData = require('../TestData/BankData.json')

var using = require('jasmine-data-provider')




describe('Jasmine Data Provider ', () => {

    beforeAll(function(){
        Base.navigateToHome();
        HomePage.managerLoginButton.click();
        BankManagerPage.addCustomerButton();
    });

    function dataProvider(){
        return [
        {fName:"Elon", lName:'Musk',pCode:'334455'},
        {fName:"Warren", lName:'Buffet',pCode:'112233'},
        {fName:"Amanico", lName:'Ortega',pCode:'112233'}
    ]};

    using(dataProvider, function(data){
        it('should add customer: '+data.fName+' '+data.lName, () => {            
                CostumForm.firstFLD.sendKeys(data.fName);
                CostumForm.lastFLD.sendKeys(data.lName);
                CostumForm.postcodeFLD.sendKeys(data.pCode);
                CostumForm.AddCustomerButton.click();
                expect(browser.switchTo().alert().getText()).
                toContain('Customer added successfully with customer id :');
                browser.switchTo().alert().accept();
                BankManagerPage.customersButton.click();
                expect(Customers.getLastRowValue(1).getText()).toEqual(data.fName);
                expect(Customers.getLastRowValue(2).getText()).toEqual(data.lName);
                expect(Customers.getLastRowValue(3).getText()).toEqual(data.pCode);
                BankManagerPage.addCustomerButton();
        });    
    });               
});