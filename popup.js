$(function() {
  $('div > button').click(function() { //change selector, something... div#fields > button
  	var buttonId = this.id;
  	// console.log(buttonId);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      var tabId = tabs[0].id;
      //sendMessage(tabId);
      chrome.tabs.executeScript(null, {file: "addListener.js" });
    });
  });
});

function sendMessage(lastTabId){
	chrome.tabs.sendMessage(lastTabId, "Background page started.");
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log("received message: " + message);
});