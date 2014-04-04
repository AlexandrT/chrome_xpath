function save_options() {
	var listOfFields = $('#fields span');
	var srvAddress = $('#remote-srv').val();

	var arr = [];
	for (var i = 0; i < listOfFields.length; i++) {
		arr.push(listOfFields[i].innerText);
	}

	// if (arr.length != 0 || srvAddress != "") {
		chrome.storage.local.set({"mk_news_srv": srvAddress});
		chrome.storage.local.set({"mk_news_fields": arr});

		$('#status').html('Options saved');
	// } else {
		// $('#status').html('Nothing to save');
	// }
}


document.addEventListener('DOMContentLoaded', load_options("options"));
$('#save').on('click', save_options);
$('#add-field').on('click', function(){add_field("options")});