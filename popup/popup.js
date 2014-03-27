function send() {
	var listOfFields = document.querySelector('#fields').getElementsByTagName('span');
	var srvAddress = document.querySelector('#remote-srv').value.trim();

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
	// xhr.onreadystatechange = function() {
		/*if (xhr.readystate == 4 && xhr.status == 200) {
			if (xhr.responseText != null) {
				console.log();
			} else {
				console.log("request failed");
			}
		}*/
		// console.log(xhr.responseText);
	// }
	// xhr.send(params);
	xhr.send();

}

function load_options() {
	var fields = chrome.storage.local.get("mk_news_fields");
	var srv = chrome.storage.local.get("mk_news_srv");

	document.querySelector('#remote-srv').value = srv;
	var fieldNames = fields.split(",");

	if (fields != "") {
		var listOfFields = document.querySelector('#fields');

		for (var i = 0; i < fieldNames.length; i++) {
			var li = document.createElement("LI");

			var field = document.createElement("SPAN");
			var button = document.createElement("BUTTON");
			var buttonParse = document.createElement("BUTTON");
			var input = document.createElement("INPUT");

			field.innerHTML = fieldNames[i];
			button.innerHTML = 'remove';
			button.setAttribute('class', 'remove');
			buttonParse.innerHTML = 'parse';
			buttonParse.setAttribute('class', 'parse');
			input.setAttribute('type', 'text');

			listOfFields.appendChild(li);
			li.appendChild(field);
			li.appendChild(input);
			li.appendChild(button);
			li.appendChild(buttonParse);
		}

		// hack for addListener on remove-buttons
		var removeButtons = document.querySelectorAll('.remove')
		for (var j = 0; j < removeButtons.length; j++) {
			removeButtons[j].addEventListener('click', remove_field);
		}

		var parseButtons = document.querySelectorAll('.parse')
		for (var j = 0; j < parseButtons.length; j++) {
			parseButtons[j].addEventListener('click', parse);
		}

	}
}

function add_field() {
	var fieldName = document.querySelector('#field-name').value.trim();
	var listOfFields = document.querySelector('#fields');

	if (fieldName == "") {
		document.querySelector('#status').innerHTML = 'Field with name is empty';
		return false;
	}

	if (isUniq(listOfFields.getElementsByTagName('span'), fieldName)) {
		var li = document.createElement("LI");

		var field = document.createElement("SPAN");
		var button = document.createElement("BUTTON");
		var buttonParse = document.createElement("BUTTON");
		var input = document.createElement("INPUT");

		field.innerHTML = fieldName;
		button.innerHTML = 'remove';
		button.setAttribute('class', 'remove');
		buttonParse.innerHTML = 'parse';
		buttonParse.setAttribute('class', 'parse');
		input.setAttribute('type', 'text');

		listOfFields.appendChild(li);
		li.appendChild(field);
		li.appendChild(input);
		li.appendChild(button);
		li.appendChild(buttonParse);

		var tempArray = document.querySelectorAll('.remove')
		for (var i = 0; i < tempArray.length; i++) {
			tempArray[i].addEventListener('click', remove_field);
		}

		var parseBtn = document.querySelectorAll('.parse')
		for (var j = 0; j < parseBtn.length; j++) {
			parseBtn[j].addEventListener('click', parse);
		}

	} else {
		document.querySelector('#status').innerHTML = 'Field with this name already exists';
	}

	function isUniq(arrayOfFields, field) {
		if (arrayOfFields.length == 0) {
			return true;
		}

		for (var i = 0; i < arrayOfFields.length; i++) {
			if (arrayOfFields[i].innerText == field) {
				return false;
			}
		}

		return true;
	}
}

function remove_field(){
	var elem = this;
	var listOfFields = document.querySelector('#fields');

	listOfFields.removeChild(elem.parentNode);
}

function parse() {
	var bg_wnd = chrome.extension.getBackgroundPage();
	var result = bg_wnd.bgObj.pageParse();
}

document.addEventListener('DOMContentLoaded', load_options);
document.querySelector('#send').addEventListener('click', send);
document.querySelector('#add-field').addEventListener('click', add_field);
