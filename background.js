chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, { file: "jquery-2.2.3.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "content.js" });
    });
    /*var newURL = "http://www.dotabuff.com/";
    chrome.tabs.create({ url: newURL});*/
});
