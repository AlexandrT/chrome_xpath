function send() {
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
	chrome.storage.local.get("mk_news_fields", function(result) {
		var fields = result;
	});

	chrome.storage.local.get("mk_news_srv", function(result) {
		var srv = result;
	});

	$('#remote-srv').val(srv);

	if (fields != "") {

		for (var i = 0; i < fields.length; i++) {
			var li = $("<li></li>").appendTo("fields");

			$("<span></span>", { 
				html: fields[i] 
			}).appendTo(li);
			
			$("<button/>")
				.html("remove")
				.addClass("remove")
				.on('click', remove_field)
			).appendTo(li);

			$("<button/>")
				.html("parse")
				.addClass("parse")
				.on('click', parse)
			).appendTo(li);

			$("<input/>")
				.attr('type', 'text')
			).appendTo(li);
		}
	}
}

function add_field() {
	var fieldName = $('#field-name').val().trim();
	var listOfFields = $('#fields');

	if (fieldName == "") {
		$('#status').html('Field with name is empty');
		return false;
	}

	if (isUniq($('#fields > span'), fieldName)) {
		var li = $("<li></li>").appendTo("fields");

		$("<span></span>", { 
				html: fields[i] 
			}).appendTo(li);
			
			$("<button/>")
				.html("remove")
				.addClass("remove")
				.on('click', remove_field)
			).appendTo(li);

			$("<button/>")
				.html("parse")
				.addClass("parse")
				.on('click', parse)
			).appendTo(li);

			$("<input/>")
				.attr('type', 'text')
			).appendTo(li);

	} else {
		$('#status').html('Field with this name already exists');
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
$('#send').on('click', send);
$('#add-field').on('click', add_field);
