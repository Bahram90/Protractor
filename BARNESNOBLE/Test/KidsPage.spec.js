var Base = require("../Utilities/Base.js")
var Kids = require("../Pages/KidsPageLocators.page.js")
var MenuBar = require('../Pages/MenuBarLocators.page.js')


describe('Kids Page Testing Functionality ', () => {

    beforeAll(() => {
        Base.websiteUrl()
    });


    it('should confirm kids page ', () => {
        browser.sleep(1000)
        //first way to reach kids page from Fatih
        Kids.kidsLink.click()
        // second way to reach kids page from Bahram
        //MenuBar.Barlocator.get(6).click()

        browser.sleep(1000)
        //expect(browser.getCurrentUrl()).toEqual("https://www.barnesandnoble.com/b/books/kids/_/N-29Z8q8Ztu1")
        // expect(browser.getCurrentUrl()).toContain("kids")
        // expect(browser.getTitle()).toContain("Kids, Books | Barnes & Noble®")
        // expect($("#main-content h1").getText()).toContain("Kids’ Books")

    });

  
  it('should display all 5 ages links ', function() {
   
    browser.sleep(2000)
    for (let i= 0; i<=4; i++){
        Kids.agesLocators.get(i).click()
        browser.sleep(1000)
        
        var ages = Kids.agesHeader.getText()

        
        expect(browser.getTitle()).toBeTruthy(ages)
        expect(browser.getTitle()).toContain("Barnes & Noble®")
        expect(browser.getTitle()).toContain("Years")
        
        browser.navigate().back()
  
    };
    // browser.sleep(1000);
    // browser.navigate().back()

      
  });
  it('should click ages 3-5 and add to cars', () => {
    Kids.agesLocators.get(1).click();
    browser.sleep(2000);
    Kids.pandasBookLocator.click();
    browser.sleep(2000);
    Kids.addCartButton.click();
    browser.sleep(2000);
    expect(Kids.addCartDiologTitle.getText()).toContain('successfully');
  });
      

});