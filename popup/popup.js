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

function parse(target) {
	var bg_wnd = chrome.extension.getBackgroundPage();
	var result = bg_wnd.bgObj.pageParse();
	var callerId = target.currentTarget.parentElement.id;
	var targetInput = '#' + callerId + ' input';
	$(targetInput).val(bg_wnd.bgObj.xpath);
}

document.addEventListener('DOMContentLoaded', load_options("popup"));
$('#send').on('click', send);
$('#add-field').on('click', function(){add_field("popup")});
