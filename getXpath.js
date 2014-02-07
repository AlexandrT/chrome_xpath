    // google.load("feeds", "1");

    // function initialize() {
    //   var feed = new google.feeds.Feed("http://feeds.labnol.org/labnol");
    //   feed.setNumEntries(10);
    //   var count = 1;
    //   feed.load(function(result) {
    //     if (!result.error) {
    //       var container = document.getElementById("feed");
    //       var html = "";
    //       for (var i = 0; i < result.feed.entries.length; i++) {
    //         var entry = result.feed.entries[i];
    //         html = "<h5>" + count++ + ". <a href='" + entry.link + "'>" + entry.title + "</a></h5>";
    //         var div = document.createElement("div");
    //         div.innerHTML = html;
    //         container.appendChild(div);            
    //       }
    //       document.write(html);
    //     }
    //   });
    // }
    // google.setOnLoadCallback(initialize);

$(document).ready(function(){
    $("body").on("click", function(event) {
        console.log(event.target);
        alert(event.target);
        var arrXpath = getXpath(event.target);
        setXpath(arrXpath);
    });
});
 
var arr = [];

//return array[]
function getXpath(DOMelem) {
    var partXpath = DOMelem.attr("id");
    if (typeof partXpath != "undefined") {
        arr.push("#" + partXpath);
    } else {
        partXpath = DOMelem.attr("class");
        if (typeof partXpath != "undefined") {
            arr.push("@" + partXpath);
        } else if (typeof DOMelem.parent != "undefined") {
            getXpath(DOMelem.parent);
        } else {
            console.log("impossible parse");
        }
    }
 
    return arr;
}

function setXpath(arr){
    var xpath = arr.join();
    console.log(xpath);
    $("#xpath-field").val(xpath);
}