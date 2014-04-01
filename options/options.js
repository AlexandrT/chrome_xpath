function save_options() {
	var listOfFields = $('#fields > span');
	var srvAddress = $('#remote-srv').val().trim();

	var arr = [];
	for (var i = 0; i < listOfFields.length; i++) {
		arr.push(listOfFields[i].innerText);
	}

	if (arr.length != 0 || srvAddress != "") {
		chrome.storage.local.set({"mk_news_srv": srvAddress});
		chrome.storage.local.set({"mk_news_fields": arr});

		$('#status').html('Options saved');
	} else {
		$('#status').html('Nothing to save');
	}
}

function load_options() {
	chrome.storage.local.get("mk_news_fields", function(result) {
		var fields = result;
	});
	chrome.storage.local.get("mk_news_srv", function(result) {
		var srv = result;
	});

	$('#remote-srv').val(srv);
	
	if (fields !== undefined) {
		var listOfFields = $('#fields');

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
		}
	}
}

function add_field() {
	var fieldName = $('#field-name').val().trim();
	var $listOfFields = $('#fields');

	if (fieldName == "") {
		$('#status').html('Field with name is empty');
		return false;
	}

	if (isUniq($listOfFields.attr('span'), fieldName)) {
		var li = $("<li></li>").appendTo("fields");

		$("<span></span>", { 
				html: fieldName 
			}).appendTo(li);
			
			$("<button/>")
				.html("remove")
				.addClass("remove")
				.on('click', remove_field)
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

document.addEventListener('DOMContentLoaded', load_options);
$('#save').on('click', save_options);
$('#add-field').on('click', add_field);
