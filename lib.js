function remove_field() {
	var elem = this;
	var listOfFields = document.querySelector('#fields');

	listOfFields.removeChild(elem.parentNode);
}

function add_element(type, spanValue) {
  var li = $("<li></li>").appendTo("#fields");

	$("<span></span>", { 
		html: spanValue 
	}).appendTo(li);
			
	$("<button/>")
		.html("remove")
		.addClass("remove")
		.on('click', remove_field)
	.appendTo(li);
	
	if (type == "popup") {
	  $("<button/>")
		  .html("parse")
			.addClass("parse")
			.on('click', parse)
		.appendTo(li);

		$("<input/>")
			.attr('type', 'text')
		.appendTo(li);
	}
}

function add_field(type) {
	var fieldName = $('#field-name').val();

	if (typeof fieldName == 'undefined') {
		$('#status').html('Field with name is empty');
		return false;
	}

	if ($.inArray(fieldName, $('#fields span')) < 0) {
		add_element(type, fieldName);
	} else {
		$('#status').html('Field with this name already exists');
	}
}

function load_options(type) {
	var fields;
	chrome.storage.local.get("mk_news_fields", function(result) {
		fields = result;
		if (typeof fields !== 'undefined') {
			for (var i = 0; i < fields.mk_news_fields.length; i++) {
	      add_element(type, fields.mk_news_fields[i]);
			}
		}
	});

	var srv;
	chrome.storage.local.get("mk_news_srv", function(result) {
		srv = result;
		if (typeof srv !== 'undefined') {
			$('#remote-srv').val(srv.mk_news_srv);
		}
	});
}