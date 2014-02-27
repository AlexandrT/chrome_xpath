// $(document).ready(function(){
// 	var tempArr = [];
// 	var resultArr = [];
// 	tempArr = document.getElementById('fields').getElementsByTagName('button');
// 	for (var i = 0; i < tempArr.length; i++){
// 		resultArr.push(tempArr[i].getAttribute('class'));
// 	}
// 	loadFromStorage(resultArr);
// })

$(function() {
  $('div > button').click(function() { //change selector, something... div#fields > button
  	//console.log(this);
  	var xPathType = this.getAttribute("class");
  	// console.log(buttonId);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      var tabId = tabs[0].id;
      sendMessage(tabId, xPathType);
      chrome.tabs.executeScript(null, {file: "addListener.js" });

      chrome.runtime.sendMessage({method: "getLocalStorage", key: xPathType}, function(response) {
  			console.log(response);
			});
    });
  });
});

function sendMessage(lastTabId, type){
	chrome.tabs.sendMessage(lastTabId, type);
}

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  // console.log("received message: " + message);
  // var elem = 'input.' + window.xPathButtonClass
  // $(elem).attr("value", message);
// });


// function loadFromStorage(arrayOfKeys){
// 	arrayOfKeys.forEach(function(key){
// 		// chrome.tabs.executeScript(null, {code: 'var ' + key + ' = "";' });
// 		// chrome.storage.local.get(key, function(result){
// 			// chrome.tabs.executeScript(null, {code: key + ' = result.' + key + ';' });
// 			// $('input.' + key).val(key);
// 			console.log(localStorage[key]);
// 	});
// }