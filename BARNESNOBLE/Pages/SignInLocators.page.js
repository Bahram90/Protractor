//Emrullah 
var SignIn = function () {


    ///variable 



    ///locator 
    this.signInButton = $(".acct-link-sign-in > a");
    

    //locators in iframe
    this.signInFrame = $(".modal.focus iframe");
    this.dialogTitle = element(by.id('dialog-title'));
    this.emailFieldFrame = element(by.id('email'));
    this.passwordFieldFrame = element(by.id('password'));
    this.secureSignInButton = $(".modal__body > div:nth-child(4)  button");
    this.afterSignInErrorMessage = $("#mloginErrors em");

    //locators in sign in page
    this.signOutFromAccount = $('.logout-color > a');


    //methods 



}
module.exports = new SignIn()