var Base = function () {

    //method for open website
    this.websiteUrl = function () {
       
        browser.ignoreSynchronization = true
        browser.get("https://www.barnesandnoble.com/")

       
        //
        this.EC = protractor.ExpectedConditions
        this.a = browser.wait(this.EC.presenceOf($(".bx-row-submit-no > button")),12000)
        

        if (this.a) {
            browser.manage().timeouts().implicitlyWait(5000)
            $(".bx-row-submit-no > button").click()
        }
    }





}
module.exports = new Base()