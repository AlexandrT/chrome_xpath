// function save_options() {
// 	var listOfFields = document.querySelector('#fields').getElementsByTagName('span');
// 	var srvAddress = document.querySelector('#remote-srv').value.trim();

// 	var fieldNames = [];
// 	for (var i = 0; i < listOfFields.length; i++) {
// 		fieldNames.push(listOfFields[i].textContent);
// 	}

// 	if (fieldNames.length != 0 || srvAddress != "") {
// 		localStorage["mk_news_srv"] = srvAddress;
// 		localStorage["mk_news_fields"] = fieldNames;

// 		document.querySelector('#status').innerHTML = 'Options saved';
// 	} else {
// 		document.querySelector('#status').innerHTML = 'Nothing to save';
// 	}
// }

function send() {
	var listOfFields = document.querySelector('#fields').getElementsByTagName('span');
	var srvAddress = document.querySelector('#remote-srv').value.trim();

	var fieldNames = {};
	for (var i = 0; i < listOfFields.length; i++) {
		var key = listOfFields.parentNode.innerText;
		console.log(key);
		fieldNames[key] = listOfFields[i].innerText;
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
	var fields = localStorage["mk_news_fields"];
	var srv = localStorage["mk_news_srv"];

	document.querySelector('#remote-srv').value = srv;
	var fieldNames = fields.split(",");

	if (fields != "") {
		var listOfFields = document.querySelector('#fields');

		for (var i = 0; i < fieldNames.length; i++) {
			var li = document.createElement("LI");

			var field = document.createElement("SPAN");
			var button = document.createElement("BUTTON");

			field.innerHTML = fieldNames[i];
			button.innerHTML = 'remove';
			button.setAttribute('class', 'remove');

			listOfFields.appendChild(li);
			li.appendChild(field);
			li.appendChild(button);
		}

		// hack for addListener on remove-buttons
		var removeButtons = document.querySelectorAll('.remove')
		for (var j = 0; j < removeButtons.length; j++) {
			removeButtons[j].addEventListener('click', remove_field);
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

		field.innerHTML = fieldName;
		button.innerHTML = 'remove';
		button.setAttribute('class', 'remove');

		listOfFields.appendChild(li);
		li.appendChild(field);
		li.appendChild(button);

		var tempArray = document.querySelectorAll('.remove')
		for (var i = 0; i < tempArray.length; i++) {
			tempArray[i].addEventListener('click', remove_field);
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

document.addEventListener('DOMContentLoaded', load_options);
document.querySelector('#send').addEventListener('click', send);
document.querySelector('#add-field').addEventListener('click', add_field);
