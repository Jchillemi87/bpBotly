$(document).ready(function() {
    var removedAds = $("tr[bgcolor='#a79dff']");
    if(removedAds){
        removedAds.remove()
    }
    
    var x = $("#manageAds #dataTable tBody tr:last td:last a")[0]; //click the last "Manage Ad"
    if(x){
        x.click();
        console.log("first");
    }
});