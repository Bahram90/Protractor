//Merdan

var CreateAccount = function (){


    //variable 
    this.d = new Date();
    this.random= this.d.getMilliseconds();
    //this.random = Date.now()
    this.firstName = `Sample${this.random}` //Sample1
    this.lastName = `Test${this.random}`
    this.email = `sample.test${this.random}@gmail.com` 
    this.password = "Test123456"

    // this.firstName = `Sample235` //Sample1
    // this.lastName = `Test`
    // this.email = `sample.test235@gmail.com` 
    // this.password = "Test123456"




    // elements locators 
    this.myAccountLink = element(by.id('myAccountLink-old'));
    this.createAccountLink = element(by.id('createAcctLink'));

    this.firstNameField = element(by.id('fName'));
    this.lastNameField = element(by.id('lName'));
    this.emailField = element(by.id('email'));
    this.confirmEmailField = element(by.id('confirmEmail'));
    this.passwordField = element(by.id('password'));
    this.confirmPasswordField = element(by.id('confPassword'));
    this.securityQuestionOptions = element(by.id('securityQuestion-replacement'));
    this.securityQuestion = $("#securityQuestion-option-1>a")
    this.securityAnswer = element(by.id('securityAnswer'));
    this.createAccountButton = element(by.id('btnCreateAccount'));

    //methods 
    this.gotoCreateAccountForm = function(){

        
        this.myAccountLink.click()
        browser.sleep(2000)
        this.createAccountLink.click()
    }

    this.createAccountActivation = function (){
        this.firstNameField.sendKeys(this.firstName)
        this.lastNameField.sendKeys(this.lastName)
        this.emailField.sendKeys(this.email)
        this.confirmEmailField.sendKeys(this.email)
        this.passwordField.sendKeys(this.password)
        this.confirmPasswordField.sendKeys(this.password)
        this.securityQuestionOptions.click()
        this.securityQuestion.click()
        this.securityAnswer.sendKeys("Las Vegas")
        this.createAccountButton.click()

    }




}
module.exports = new CreateAccount()