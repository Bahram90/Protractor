let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {

    directConnect: true,

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--start-fullscreen',
                //'--incognito'
            ]
        }
    },

    // specs: ['../Tests/DataProvider.spec.js'],
    suites:{
        smoke:['../Tests/AddCustomer.spec.js','../Tests/Demo.spec.js'],
        //regression:['../Tests/*.spec.js']
    },

    onPrepare: function () {
        //browser.driver.manage().window().maximize();
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true,
            showstack: false
        }));
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: '../report/screenshots',
            preserveDirectory: false,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docName: 'CyberBank-Report.html'
        }).getJasmine2Reporter());

        var AllureReporter=require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir:'allure-results'
        }));

    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () { }

    }
};