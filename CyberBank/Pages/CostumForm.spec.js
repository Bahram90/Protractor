require('../Utilities/CustomLocators.js');

var CostumForm = function () {
    ////Labels
    this.firstLabel = $('form > div:nth-child(1) > label');
    this.lastLabel=$(' form > div:nth-child(2) > label');
    this.postCodeLabel=$('form > div:nth-child(3) > label');
    this.AddCustomerButton=$('form > button');
    //this.formRequiredFields=element.all(by.css('input:required'));

    ////input fields
    this.AddCostumerBtn=element(by.model('addCust()'))
    this.firstFLD=element(by.model('fName'));
    this.lastFLD=element(by.model('lName'));
    this.postcodeFLD=element(by.model('postCd'));
    
}
module.exports = new CostumForm();