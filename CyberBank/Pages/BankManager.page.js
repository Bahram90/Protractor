require('../Utilities/CustomLocators.js');

var BankManagerPage = function () {
    this.addCustomerButton = element(by.ngClick("addCust()"));
    this.addOpenAccountButton = element(by.ngClick('openAccount()'));
    this.addShowCustomerButton = element(by.ngClick('showCust()'));
}
// module.exports provides to export your file.
// Which means, with this code you can use your function in another file. 
//But, you have to use require also. 
//They work together. you have to write require code where you want to use your function.
module.exports = new BankManagerPage();
