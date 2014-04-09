$(window).load(function() {

  // chrome.tabs.onActivated.addListener
  chrome.tabs.onUpdated.addListener(function(tabId, tabInfo, tab){

    chrome.tabs.connect(tabId);

    chrome.extension.onConnect.addListener(function(port){
      port.onMessage.addListener(function(msg){
        console.log("message from content script");
        console.log(msg);
        window.bgObj.fields[window.bgObj.activeField] = msg;
      });
    });

    window.bgObj = {
      pageParse: function() {
        chrome.tabs.executeScript(tabId, { code: "foo()" });
      },

      srv: chrome.storage.local.get("mk_news_srv", function(result) {
        window.bgObj.srv = result;
        console.log(result);
      }),

      fields: chrome.storage.local.get("mk_news_fields", function(result) {
        window.bgObj.fields = result.mk_news_fields;
        console.log(result);
      }),

      activeField: ""
    };


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
