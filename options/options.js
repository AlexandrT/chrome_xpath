function save_options() {
	var listOfFields = $('#fields span');
	var srvAddress = $('#remote-srv').val();

	var arr = {};
	for (var i = 0; i < listOfFields.length; i++) {
		arr[listOfFields[i].innerText] = "";
	}

	chrome.storage.local.set({"mk_news_srv": srvAddress});
	chrome.storage.local.set({"mk_news_fields": arr});

	$('#status').html('Options saved');
}


document.addEventListener('DOMContentLoaded', function(){load_options("options")});
$('#save').on('click', save_options);
$('#add-field').on('click', function(){add_field("options")});