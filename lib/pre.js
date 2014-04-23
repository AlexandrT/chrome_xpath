function load_options(type) {
	chrome.storage.local.get("mk_news_fields", function(result) {
		var loadFields = result;
		if (typeof loadFields.mk_news_fields !== 'undefined') {
			for (var i = 0; i < loadFields.mk_news_fields.length; i++) {
	      add_element(type, loadFields.mk_news_fields[i], "");
			}
		}
	});

	chrome.storage.local.get("mk_news_srv", function(result) {
		var srv = result;
		if (typeof srv.mk_news_srv !== 'undefined') {
			$('#remote-srv').val(srv.mk_news_srv);
		}
	});
}

function add_element(type, spanValue, inputValue) {
  var li = $("<li></li>").attr('id', spanValue).appendTo("#fields");

	$("<span></span>") 
		.html(spanValue) 
	.appendTo(li);
			
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
			.val(inputValue)
		.appendTo(li);
	}
}

function init_fields() {
	var bg_wnd = chrome.extension.getBackgroundPage();

	if (bg_wnd && bg_wnd.bgObj) {
		var fields = bg_wnd.bgObj.fields;
		console.log(fields);

		$.each(fields, function(key, value) {
			add_element("popup", key, value)
		});
	}
}