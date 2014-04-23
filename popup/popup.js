/*function send() {
	var listOfFields = $('#fields > span');
	var srvAddress = $('#remote-srv').val().trim();

	var fieldNames = {};
	for (var i = 0; i < listOfFields.length; i++) {
		var key = listOfFields[i].innerText;
		console.log(key);
		fieldNames[key] = listOfFields[i].nextSibling.innerText;
	}

	console.log(fieldNames);

	var params = JSON.stringify(fieldNames);
	console.log("JSON");
	console.log(params);

	var xhr = new XMLHttpRequest();

	xhr.open("POST", srvAddress, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readystate == 4 && xhr.status == 200) {
			if (xhr.responseText != null) {
				console.log();
			} else {
				console.log("request failed");
			}
		}
		console.log(xhr.responseText);
	}
	xhr.send(params);
	xhr.send();
}*/

function parse(event) {
	var bg_wnd = chrome.extension.getBackgroundPage();
	bg_wnd.bgObj.activeField = event.target.parentElement.id;
	
	bg_wnd.bgObj.pageParse();
}

document.addEventListener('DOMContentLoaded', init_fields);
$('#send').on('click', send);
$('#add-field').on('click', function(){add_field("popup")});
