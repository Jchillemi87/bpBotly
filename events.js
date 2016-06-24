chrome.alarms.clearAll();

function createAlarm(hrs, mins) {
    var now = new Date();
    var day = now.getDate();
    if (now.getHours() >= hrs && now.getMinutes() >= mins) {
        // 12 AM already passed
        day += 1;
    }
    // '+' casts the date to a number, like [object Date].getTime();
    var timestamp = +new Date(now.getFullYear(), now.getMonth(), day, hrs, mins, 0, 0);
    //                        YYYY               MM              DD  HH MM SS MS
    //console.log("mins: " + mins);
    //console.log("timestamp: " + timestamp);
    // Create
    var t = new String(hrs);
    t += " : " + String(mins);
    chrome.alarms.create(t, { when: timestamp });
    //console.log(t);
    //chrome.alarms.create('1am', { periodInMinutes : 1 });
}

// Listen
chrome.alarms.onAlarm.addListener(function(alarm) {
    moveAd(null);
    console.log(alarm.name);
    //console.log(alarm.name);
});
createAlarm(8, 30);
createAlarm(9, 45);
createAlarm(11, 15);
createAlarm(12, 00);
createAlarm(12, 30);
createAlarm(13, 00);
createAlarm(13, 30);
createAlarm(14, 00);
createAlarm(16, 00);
createAlarm(17, 00);
createAlarm(17, 30);
createAlarm(18, 00);
createAlarm(19, 00);
createAlarm(20, 15);
//createAlarm(21, 00);
createAlarm(21, 45);
//createAlarm(22, 00);
createAlarm(23, 00);
createAlarm(23, 45);
createAlarm(0, 30);
createAlarm(1, 00);
createAlarm(1, 30);
createAlarm(2, 30);
createAlarm(3, 00);
createAlarm(3, 21);

createAlarm(7, 15);
//createAlarm(8, 00);
//****************** 

chrome.browserAction.onClicked.addListener(moveAd);

function moveAd(tab) {
    var newURL = "https://my.backpage.com/classifieds/central/ManageAds";
    chrome.tabs.create({ url: newURL }, function(tab) {
        chrome.tabs.executeScript({ file: "jquery-2.2.3.min.js" }, function() {
            chrome.tabs.executeScript({ file: "content.js" }, afterContent);
        });
    });
}

function afterContent() {
    chrome.tabs.onUpdated.addListener(function updateListener(tabId, changeInfo, tab) {
        if (tab.status !== "complete") {
            return;
        }

        if (changeInfo.status == "complete") {
            if (tab.url.search("backpage.com/online/classifieds/VerifyAd") !== -1) {
                chrome.tabs.executeScript(tabId, { "code": "$(\"a:contains('Move')\")[0].click();" }); //click the "Move" your ad to the top of the listing
                //console.log("Current URL: " + tab.url);
            }

            if (tab.url.search("backpage.com/online/classifieds/PurchaseMoveAdToTopPPI") !== -1) {
                chrome.tabs.executeScript(tabId, { "code": "$(\"input[value='single']\").prop( \"checked\", true ); $(\"input[type='submit'][value='Continue']\").trigger('click');" }); //select the Single Radio Button
                //console.log("Current URL: " + tab.url);
                /*if($("div:contains('Thank You') .mainBody")){
                    chrome.tabs.remove(tabId);
                }*/
            }

            if (tab.url.search("secure.backpage.com/payment?") !== -1) {
                //chrome.tabs.executeScript(tabId, { "code": "$(\"div#payment-option-pay-with-credits\");" }); //Click on "Pay Now with Credits"
                chrome.tabs.executeScript(tabId, { "code": "$(\"span.title:contains('Pay Now with Credits')\").click();" });
                //console.log("Current URL: " + tab.url);

                console.log("Completed at: " + new Date());
                chrome.tabs.onUpdated.removeListener(updateListener);
                //chrome.tabs.remove(tabId);
            }
        }
    });
}
