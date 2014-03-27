function save_options() {
	var listOfFields = document.querySelector('#fields').getElementsByTagName('span');
	var srvAddress = document.querySelector('#remote-srv').value.trim();

	var arr = [];
	for (var i = 0; i < listOfFields.length; i++) {
		arr.push(listOfFields[i].innerText);
	}

	/*var arr = {};
	for (var i = 0; i < listOfFields.length; i++) {
		arr.push(listOfFields[i].innerText);
	}*/

	if (arr.length != 0 || srvAddress != "") {
		chrome.storage.local.set({"mk_news_srv": srvAddress});
		chrome.storage.local.set({"mk_news_fields": arr});

		document.querySelector('#status').innerHTML = 'Options saved';
	} else {
		document.querySelector('#status').innerHTML = 'Nothing to save';
	}
}

function load_options() {
	var fields = chrome.storage.local.get("mk_news_fields");
	var srv = chrome.storage.local.get("mk_news_srv");

	document.querySelector('#remote-srv').value = srv;
	var arr = fields.split(",");

	if (fields != "") {
		var listOfFields = document.querySelector('#fields');

		for (var i = 0; i < arr.length; i++) {
			var li = document.createElement("LI");

			var field = document.createElement("SPAN");
			var button = document.createElement("BUTTON");
			// var input = document.createElement("INPUT");

			field.innerHTML = arr[i];
			button.innerHTML = 'remove';
			button.setAttribute('class', 'remove');
			// input.setAttribute('type', 'text');

			listOfFields.appendChild(li);
			li.appendChild(field);
			// li.appendChild(input);
			li.appendChild(button);
		}

		var tempArray = document.querySelectorAll('.remove')
		for (var j = 0; j < tempArray.length; j++) {
			tempArray[j].addEventListener('click', remove_field);
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
		// var input = document.createElement("INPUT");

		field.innerHTML = fieldName;
		button.innerHTML = 'remove';
		button.setAttribute('class', 'remove');
		// input.setAttribute('type', 'text');

		listOfFields.appendChild(li);
		li.appendChild(field);
		// li.appendChild(input);
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
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#add-field').addEventListener('click', add_field);
