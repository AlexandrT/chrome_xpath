chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log(message);
  if (message.method == "getLocalStorage")
    sendResponse({data: localStorage[message.key]});
  else
    sendResponse({data: 'before'});
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
      fullXpath = arr.join();
      // console.log(fullXpath);

      saveToStorage(message, fullXpath);
    }

    function saveToStorage(key, value){
      // chrome.storage.local.set({key: value}, function(){
        localStorage[key] = value;
        // console.log(key + ": " + value);
    }

    // chrome.tabs.sendMessage(sender.id, "response");
    //chrome.runtime.sendMessage(sender.id, window.fullXpath);

    sendResponse({data: 'lol'});
});