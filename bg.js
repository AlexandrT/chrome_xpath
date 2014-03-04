// $(document).ready(function(){
// 	var tempArr = [];
// 	var resultArr = [];
// 	tempArr = document.getElementById('fields').getElementsByTagName('button');
// 	for (var i = 0; i < tempArr.length; i++){
// 		resultArr.push(tempArr[i].getAttribute('class'));
// 	}
// 	loadFromStorage(resultArr);
// })

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});

$(window).load(function() {
  console.log("window load");

  chrome.extension.onConnect.addListener(function(port){
    port.onMessage.addListener(factory);
  });


  chrome.tabs.onUpdated.addListener(function(tabId, tabInfo, tab){
    console.log("change active tab");
    console.log(tabId);

    chrome.tabs.executeScript(tabId, { code: "addListener()" })

  })

  /*chrome.tabs.onUpdated.addListener(function(tabId, tabInfo, tab){
    console.log("tab updated");
    console.log(tabId);
    console.log(tabInfo);
    console.log(tab);
  })*/
  // $(function() {
  //   $('div > button').click(function() {
  //     var xPathType = this.getAttribute("class");
  //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  //       var tabId = tabs[0].id;
  //       sendMessage(tabId, xPathType);
  //       chrome.tabs.executeScript(null, {file: "addListener.js" });

  //       chrome.runtime.sendMessage({method: "getLocalStorage", key: xPathType}, function(response) {
  //         console.log(response);
  //       });
  //     });
  //   });

  // function sendMessage(lastTabId, type){
  //   chrome.tabs.sendMessage(lastTabId, type);
  // }

  // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    // console.log("received message: " + message);
    // var elem = 'input.' + window.xPathButtonClass
    // $(elem).attr("value", message);
  // });


  // function loadFromStorage(arrayOfKeys){
  //  arrayOfKeys.forEach(function(key){
  //    // chrome.tabs.executeScript(null, {code: 'var ' + key + ' = "";' });
  //    // chrome.storage.local.get(key, function(result){
  //      // chrome.tabs.executeScript(null, {code: key + ' = result.' + key + ';' });
  //      // $('input.' + key).val(key);
  //      console.log(localStorage[key]);
  //  });
  // }
})