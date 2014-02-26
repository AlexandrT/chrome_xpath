$(function() {
  $('div > button').click(function() { //change selector, something... div#fields > button
  	console.log(this);
  	// var window.xPathButtonClass = this.getAttribute("class");
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
  // var elem = 'input.' + window.xPathButtonClass
  // $(elem).attr("value", message);
});