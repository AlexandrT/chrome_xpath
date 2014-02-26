var collection = document.getElementsByTagName("*");
for (var i = 0; collection && collection.length && i < collection.length; i++) {
  collection[i].addEventListener('click', getXpath);
}

function getXpath(event) {
  var arr = [];
  var DOMelem = this;
  var partXpath = DOMelem.getAttribute("id");
  if (partXpath != null) {
      arr.push(DOMelem.tagName + "//id = " + partXpath);
  } else {
    partXpath = DOMelem.getAttribute("class");
    if (partXpath != null) {
        arr.push(DOMelem.tagName + "//class = " + partXpath);
    // } else if (typeof DOMelem.parent != "undefined") {
        // getXpath(DOMelem.parent);
    } else {
      console.log("impossible parse");
    }
  }
  for (var i = 0; collection && collection.length && i < collection.length; i++) {
    collection[i].removeEventListener('click', getXpath, false);
  }
  // console.log(arr);
  window.fullXpath = arr.join();
  console.log(window.fullXpath);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  // chrome.tabs.sendMessage(sender.id, "response");
  chrome.runtime.sendMessage(sender.id, window.fullXpath);
});
