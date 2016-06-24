chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, { file: "jquery-2.2.3.min.js" }, function() {
        var newURL = "https://my.backpage.com/classifieds/central/ManageAds";
        chrome.tabs.create({ url: newURL });
        chrome.tabs.executeScript(null, { file: "content.js" }, afterContent);
    })
});

function afterContent() {
    chrome.tabs.onUpdated.addListener(function updateListener(tabId, changeInfo, tab) {
        if (tab.status !== "complete") {
            return;
        }

        if (changeInfo.status == "complete") {
            if (tab.url.search("backpage.com/online/classifieds/VerifyAd") !== -1) {
                chrome.tabs.executeScript(tabId, { "code": "$(\"a:contains('Move')\")[0].click();" }); //click the "Move" your ad to the top of the listing
                console.log("Current URL: " + tab.url);
            }

            if (tab.url.search("backpage.com/online/classifieds/PurchaseMoveAdToTopPPI") !== -1) {
                chrome.tabs.executeScript(tabId, { "code": "$(\"input[value='single']\").prop( \"checked\", true ); $(\"input[type='submit'][value='Continue']\").trigger('click');" }); //select the Single Radio Button
                console.log("Current URL: " + tab.url);

                chrome.tabs.onUpdated.removeListener(updateListener);
            }
        }
    });
}