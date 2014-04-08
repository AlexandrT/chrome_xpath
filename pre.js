function load_options(type) {
	var loadFields;
	chrome.storage.local.get("mk_news_fields", function(result) {
		loadFields = result;
		if (typeof loadFields.mk_news_fields !== 'undefined') {
			for (var i = 0; i < loadFields.mk_news_fields.length; i++) {
	      add_element(type, loadFields.mk_news_fields[i]);
			}
		}
	});

	var srv;
	chrome.storage.local.get("mk_news_srv", function(result) {
		srv = result;
		if (typeof srv.mk_news_srv !== 'undefined') {
			$('#remote-srv').val(srv.mk_news_srv);
		}
	});
}

function add_element(type, spanValue) {
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
		.appendTo(li);
	}
}

function init_fields() {
	var bg_wnd = chrome.extension.getBackgroundPage();
	// var result = bg_wnd.bgObj.pageParse();

	var fields = bg_wnd.bgObj.fields;

	$.each(fields, function(key, value) {
		var li = $("<li></li>").attr('id', key).appendTo("#fields");
	
		$("<span></span>") 
			.html(key) 
		.appendTo(li);
				
		$("<button/>")
			.html("remove")
			.addClass("remove")
			.on('click', remove_field)
		.appendTo(li);
		
		$("<button/>")
		  .html("parse")
			.addClass("parse")
			.on('click', parse)
			.appendTo(li);
	
			$("<input/>")
				.attr('type', 'text')
				.val(value)
			.appendTo(li);
	})
}