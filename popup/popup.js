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

function load_options() {
	chrome.storage.local.get("mk_news_fields", function(result) {
		var fields = result;
	});
	chrome.storage.local.get("mk_news_srv", function(result) {
		var srv = result;
	});

	$('#remote-srv').val(srv);

	if (fields !== undefined) {

		for (var i = 0; i < fields.length; i++) {
			add_element("popup", fields[i]);
		}
	}
}

function add_field() {
	var fieldName = $('#field-name').val().trim();

	if (fieldName == "") {
		$('#status').html('Field with name is empty');
		return false;
	}

	if ($.inArray(fieldName, $('#fields > span')) < 0) {
		add_element("popup", fieldName);
	} else {
		$('#status').html('Field with this name already exists');
	}
}

function parse() {
	var bg_wnd = chrome.extension.getBackgroundPage();
	var result = bg_wnd.bgObj.pageParse();
}

document.addEventListener('DOMContentLoaded', load_options);
$('#send').on('click', send);
$('#add-field').on('click', add_field);
