var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00bd0056-00d4-00cd-00cd-008d004a0050.png",
        "timestamp": 1546157973746,
        "duration": 4119
    },
    {
        "description": "should display home button|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00ca001b-0062-0042-0003-006b008400d4.png",
        "timestamp": 1546157978446,
        "duration": 880
    },
    {
        "description": "should display page header|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00b100ed-00c0-0003-0076-005d00e60056.png",
        "timestamp": 1546157979808,
        "duration": 731
    },
    {
        "description": "should display login option for Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/009000d7-00b8-0030-00cf-0079005f0093.png",
        "timestamp": 1546157981004,
        "duration": 743
    },
    {
        "description": "should stay at the homepage when Home Button is clicked|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/007e0074-0006-00d2-0017-001500640025.png",
        "timestamp": 1546157982214,
        "duration": 704
    },
    {
        "description": "should login as Bank Manager|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00db00b3-004d-0040-00e4-00bc000b00a7.png",
        "timestamp": 1546157983386,
        "duration": 1070
    },
    {
        "description": "should show the buttons on Bank Manager Page  |Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/007a00fe-008f-0093-00fb-009900bc00a0.png",
        "timestamp": 1546157984922,
        "duration": 773
    },
    {
        "description": "should show the home button in Bank Manager Page|Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00b10090-00bd-00ad-0040-00a400440029.png",
        "timestamp": 1546157986157,
        "duration": 957
    },
    {
        "description": "should display main Add Custumer Button|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00dc000f-008a-00a7-0099-000600b800a1.png",
        "timestamp": 1546157988245,
        "duration": 465
    },
    {
        "description": "should display forms for add Costumer|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00f5006c-004f-0003-0049-00a400d000f7.png",
        "timestamp": 1546157989171,
        "duration": 51
    },
    {
        "description": "should display last name: form label for Add Costumer|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/003e0052-0074-00bc-0002-005b00ff0027.png",
        "timestamp": 1546157989737,
        "duration": 50
    },
    {
        "description": "should display post code: form label for Add Cosumer|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/007a0084-001f-0036-00c0-006a006700b5.png",
        "timestamp": 1546157990245,
        "duration": 56
    },
    {
        "description": "should display add costumer button form|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00a300c2-0003-00c6-007b-009f008e00b3.png",
        "timestamp": 1546157990760,
        "duration": 55
    },
    {
        "description": "should list First Name label in the form |Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/000b00db-0030-00b0-002e-006800b6001d.png",
        "timestamp": 1546157991275,
        "duration": 36
    },
    {
        "description": "should list Last Name label in the form|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/0096000d-0085-00a1-000b-003f00d000c9.png",
        "timestamp": 1546157991770,
        "duration": 39
    },
    {
        "description": "hould list Zip Code label in the form|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00fb004d-00d7-0081-00ae-003900a0002f.png",
        "timestamp": 1546157992269,
        "duration": 38
    },
    {
        "description": "should add costumer|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/003100f1-009d-0045-00c3-002600fc00c6.png",
        "timestamp": 1546157992769,
        "duration": 12931
    },
    {
        "description": "should display new customer first name that was created|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00cb00fe-00a9-0092-0048-00350070009a.png",
        "timestamp": 1546158006210,
        "duration": 2430
    },
    {
        "description": "should display new customer last name that was created|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/003500d8-00b7-00a6-008b-003400a500ce.png",
        "timestamp": 1546158009126,
        "duration": 40
    },
    {
        "description": "should display new customer post code that was created|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00eb000a-0012-0064-000f-008f005f0081.png",
        "timestamp": 1546158009630,
        "duration": 36
    },
    {
        "description": "should have no account number fot the user that was created|Testing Add Customer",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/000d00d2-0059-0016-0080-007e00a5006d.png",
        "timestamp": 1546158010132,
        "duration": 34
    },
    {
        "description": "should check if element is displayed|Demonstrating Jasmine spec reporter",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 25822,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00aa00e2-003f-003a-00c0-00fa00020063.png",
        "timestamp": 1546158010624,
        "duration": 2245
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
