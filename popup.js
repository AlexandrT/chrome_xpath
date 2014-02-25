$(function() {
  $('#butest').click(function() {
    chrome.tabs.query({'active': true}, function(tabs){
      var tabId = tabs[0].id;
      console.log(tabs[0].url);
      chrome.tabs.executeScript(null, {file: "addListener.js" });
    });
  });
});