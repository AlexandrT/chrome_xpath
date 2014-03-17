var port = chrome.runtime.connect({name: "sendXpath"});
port.onMessage.addListener(function(msg){
  console.log("new message!");
  console.log(msg);
})

function foo(){
  var collection = document.getElementsByTagName("*");
    for (var i = 0; collection && collection.length && i < collection.length; i++) {
      collection[i].addEventListener('click', getXpath);
    }

  function getXpath(event) {
    var attrForXpath = [];
    var DOMelem = this;
    var partXpath = DOMelem.getAttribute("id");
    if (partXpath != null) {
        attrForXpath.push(DOMelem.tagName + "//id = " + partXpath);
    } else {
      partXpath = DOMelem.getAttribute("class");
      if (partXpath != null) {
          attrForXpath.push(DOMelem.tagName + "//class = " + partXpath);
      // } else if (typeof DOMelem.parent != "undefined") {
          // getXpath(DOMelem.parent);
      } else {
        console.log("impossible parse");
      }
    }
    for (var i = 0; collection && collection.length && i < collection.length; i++) {
      collection[i].removeEventListener('click', getXpath, false);
    }

    fullXpath = attrForXpath.join();
    console.log(fullXpath);
    console.log(Date.now());
    port.postMessage(fullXpath);
  }
}