var Search = function (){
    
    //variable 
    this.EC = protractor.ExpectedConditions



// var isClickable = EC.elementToBeClickable(button);

    // locators 
    this.searchInputBox= element(by.id('searchBarBN'));
    this.searchButton = $("#searchForm > div.icon-search-2")
    this.searchResult= $(".col-lg-6 > h1")



    // methods 
    this.isClickable = function(){
       return this.EC.elementToBeClickable(this.searchButton)
    }



}

module.exports = new Search()