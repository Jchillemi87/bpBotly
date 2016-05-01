$(window).load(function() {
    console.log("okay");
    var hideWordList = [];
    chrome.storage.sync.get(['hide'], function(data) {
        var words = data.hide;
        console.log(words);
        console.log(words.length);
        $("#hiding").find('option').remove();
        for (var x = 0; x < words.length; x++) {
            $("#hiding").append('<option value="' + words[x] + '">' + words[x] + '</option>');
        };
    });

    chrome.tabs.query({
        "url": ["https://*.craigslist.org/*",
            "http://*.craigslist.org/*"
        ]
    }, function(tabInfo) {
        chrome.tabs.update(tabInfo[0].id, { selected: true });
        //console.log(tabInfo);
    })

});

var hidden = ["hello", "test"];

function updateHiding() {
    var hideWordList = [];
    $("select#hiding option").each(function() {
        hideWordList.push($(this).val());
    });
    console.log(hideWordList);
    chrome.storage.sync.set({ hide: hideWordList }, function() {
        console.log("sync stored: " + hideWordList);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var array;
    // onClick's logic below:
    $('#btn').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabInfo) {
            var array = [""];
            $("#hiding > option").each(function() {
                array.push($(this).text());
            });
            console.log(array);
            chrome.tabs.sendMessage(tabInfo[0].id, array, function(response) {
                console.log(response);
            });
        });
    });

    $('#btnDel').click(function() {
        console.log($("#hiding option:selected"));
        $('#hiding option:selected').remove();
        updateHiding();
    });

    $('#btnAdd').click(function() {
        if ($('#newHide').val() != "" && $('#newHide').val() != " ") { //check if value was entered
            $("#hiding").append('<option value=' + $('#newHide').val() + '>' + $('#newHide').val() + '</option>');
            console.log("Added " + $('#newHide').val() + " to hide");

            updateHiding();
        } else {
            alert("please enter a value");
        }
        $("#newHide").val("");
    });

    $(document).keypress(function(e) {
        if (e.which == 13) {
            $('#btnAdd').click();
        }
    });

    $('#newHide').keypress(function(e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            $('#btnAdd').click();
            return false;
        }
    });
});
