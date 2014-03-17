$(window).load(function() {
  console.log("window load");
  
  // chrome.tabs.onActivated.addListener
  chrome.tabs.onUpdated.addListener(function(tabId, tabInfo, tab){

    chrome.tabs.connect(tabId);

    chrome.extension.onConnect.addListener(function(port){
      port.onMessage.addListener(function(msg){
        console.log("message from content script");
        console.log(msg);
      });
    });


    console.log("change active tab");
    console.log(tabId);

    chrome.commands.onCommand.addListener(function(command) {
      console.log('Command:', command);
      chrome.tabs.executeScript(tabId, { code: "foo()" })
    });
  })
})
