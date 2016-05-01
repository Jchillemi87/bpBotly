function run(hide) {
    if (hide != "") {
        var jqHide = "span.txt:contains('" + hide + "')";
        console.log("hiding: " + hide);
        $(jqHide).find("span.banish").click();
    }
}

$(document).ready(function() {
    $("span#titletextonly").map(function(i, e) {
        $(e).replaceWith($(e).text().toLowerCase());
        console.log();
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension:");


        $.each(request, function() { run(this); });
        /*var otherArray = ["joe", "bob", "mike"];
        $.each(otherArray, function(){console.log(this);});
        sendResponse({test: "turtle",bob:"the builder"});*/
    });
