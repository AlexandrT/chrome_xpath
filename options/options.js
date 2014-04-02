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
	    
		for (var i = 0; i < fields.length; i++) {
            add_element("options", fields[i]);
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
		add_element("options", fieldName);
	} else {
		$('#status').html('Field with this name already exists');
	}
}

document.addEventListener('DOMContentLoaded', load_options);
$('#save').on('click', save_options);
$('#add-field').on('click', add_field);
