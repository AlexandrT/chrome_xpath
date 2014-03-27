$(window).load(function() {
  console.log("window load");

  // chrome.tabs.onActivated.addListener
  chrome.tabs.onUpdated.addListener(function(tabId, tabInfo, tab){

    chrome.tabs.connect(tabId);

    chrome.extension.onConnect.addListener(function(port){
      port.onMessage.addListener(function(msg){
        console.log("message from content script");
        console.log(msg);
        //get xpath. set some type for message. if message considered this, set property for window.bgObj
        // may be save all hash in window.bgOdj?
      });
    });

    window.bgObj = {
      pageParse: function() {
        chrome.tabs.executeScript(tabId, { code: "foo()" });
      },

      //srv: chrome.storage.local.get("mk_news_srv"),
      //fields: chrome.storage.local.get("mk_news_fields")
    };

    console.log("change active tab");
    console.log(tabId);

    chrome.commands.onCommand.addListener(function(command) {
      console.log('Command:', command);
      chrome.tabs.executeScript(tabId, { code: "foo()" })
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (key in changes) {
        var storageChange = changes[key];
        console.log('storage key "%s" in namespace "%s" changed', key, namespace);
        console.log(storageChange.oldValue);
        console.log(storageChange.newValue);
      }
    });
  })
})
