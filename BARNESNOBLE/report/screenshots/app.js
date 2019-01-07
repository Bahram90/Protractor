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
        "description": "should confirm kids page |Kids Page Testing Functionality ",
        "passed": false,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 21058,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.110"
        },
        "message": [
            "Failed: Wait timed out after 12005ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 12005ms\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2188:20)\n    at ControlFlow.wait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2517:12)\n    at Driver.wait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:934:29)\n    at run (/usr/local/lib/node_modules/protractor/built/browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (/usr/local/lib/node_modules/protractor/built/browser.js:67:16)\n    at Base.websiteUrl (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Utilities/Base.js:12:26)\n    at UserContext.beforeAll (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:9:14)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\n    at UserContext.fn (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:5325:13)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:8:5)\n    at addSpecsToSuite (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039744824,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039744824,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039744824,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039744824,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039744824,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039762388,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039762389,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039762390,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039762391,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039762391,
                "type": ""
            }
        ],
        "screenShotFile": "images/003b0086-005c-0033-0016-005e00d3001f.png",
        "timestamp": 1544039760554,
        "duration": 6607
    },
    {
        "description": "should display all 5 ages links |Kids Page Testing Functionality ",
        "passed": false,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 21058,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.110"
        },
        "message": [
            "Failed: Wait timed out after 12005ms",
            "Failed: No element found using locator: By(css selector, .text-container .text)"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 12005ms\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2188:20)\n    at ControlFlow.wait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2517:12)\n    at Driver.wait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:934:29)\n    at run (/usr/local/lib/node_modules/protractor/built/browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (/usr/local/lib/node_modules/protractor/built/browser.js:67:16)\n    at Base.websiteUrl (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Utilities/Base.js:12:26)\n    at UserContext.beforeAll (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:9:14)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\n    at UserContext.fn (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:5325:13)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:8:5)\n    at addSpecsToSuite (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "NoSuchElementError: No element found using locator: By(css selector, .text-container .text)\n    at elementArrayFinder.getWebElements.then (/usr/local/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (/usr/local/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (/usr/local/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (/usr/local/lib/node_modules/protractor/built/element.js:831:22)\n    at UserContext.<anonymous> (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:36:36)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\nFrom: Task: Run it(\"should display all 5 ages links \") in control flow\n    at UserContext.<anonymous> (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:29:3)\n    at addSpecsToSuite (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039770578,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039770578,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039770578,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039770578,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039770579,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039773847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039773847,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039773848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039773848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039773848,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039777543,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039777543,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039777544,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039777544,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039777545,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039781024,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039781024,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039781025,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039781025,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039781025,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039785499,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039785500,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039785500,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039785501,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039785501,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039789123,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039789123,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039789124,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039789125,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039789125,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039792835,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039792835,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039792835,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039792836,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039792836,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039796769,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039796769,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039796770,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039796771,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039796771,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039801594,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 10 A parser-blocking, cross site (i.e. different eTLD+1) script, https://cdn.optimizely.com/js/11189840458.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039801594,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b7dbfa664746d450c005152.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039801595,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-59f2b3a864746d35d20076a4.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039801595,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/satelliteLib-c247216a2145ee58039f29269709adbc59bd1aa8.js 9 A parser-blocking, cross site (i.e. different eTLD+1) script, https://assets.adobedtm.com/a6ce917b5fc2d1d613b7b801115955bcaacab070/scripts/satellite-5b3ad4d464746d604d0077fb.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1544039801596,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.barnesandnoble.com/b/books/teens/_/N-29Z8q8Z19r4 9061 Mixed Content: The page at 'https://www.barnesandnoble.com/b/books/teens/_/N-29Z8q8Z19r4' was loaded over HTTPS, but requested an insecure image 'http://img1.nook.com/p/9780310763475_s600.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1544039802160,
                "type": ""
            }
        ],
        "screenShotFile": "images/002f0040-00c2-00f8-0070-005e008400f5.png",
        "timestamp": 1544039768028,
        "duration": 39073
    },
    {
        "description": "should click ages 3-5 and add to cars|Kids Page Testing Functionality ",
        "passed": false,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 21058,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.110"
        },
        "message": [
            "Failed: Wait timed out after 12005ms",
            "Failed: Index out of bound. Trying to access element at index: 1, but there are only 0 elements that match locator By(css selector, #sidebar-section-Ages > li > a)"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 12005ms\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2188:20)\n    at ControlFlow.wait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2517:12)\n    at Driver.wait (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:934:29)\n    at run (/usr/local/lib/node_modules/protractor/built/browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (/usr/local/lib/node_modules/protractor/built/browser.js:67:16)\n    at Base.websiteUrl (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Utilities/Base.js:12:26)\n    at UserContext.beforeAll (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:9:14)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\n    at UserContext.fn (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:5325:13)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\nFrom asynchronous test: \nError\n    at Suite.describe (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:8:5)\n    at addSpecsToSuite (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
            "NoSuchElementError: Index out of bound. Trying to access element at index: 1, but there are only 0 elements that match locator By(css selector, #sidebar-section-Ages > li > a)\n    at selenium_webdriver_1.promise.all.then (/usr/local/lib/node_modules/protractor/built/element.js:274:27)\n    at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (/usr/local/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/usr/local/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/usr/local/lib/node_modules/protractor/built/element.js:831:22)\n    at UserContext.it (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:52:30)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\nFrom: Task: Run it(\"should click ages 3-5 and add to cars\") in control flow\n    at UserContext.<anonymous> (/usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /usr/local/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:51:3)\n    at addSpecsToSuite (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/usr/local/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/Users/aizada/Desktop/ElnarCourse/CyberFramework/BARNESNOBLE/Test/KidsPage.spec.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images/00410095-005a-007b-00a8-00c9006900ee.png",
        "timestamp": 1544039807934,
        "duration": 25
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
