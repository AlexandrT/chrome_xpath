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
	).appendTo(li);
	
	if (type == "popup") {
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