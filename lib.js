function remove_field() {
	var elem = this;
	var listOfFields = document.querySelector('#fields');

	listOfFields.removeChild(elem.parentNode);
}

function add_field(type) {
	var fieldName = $('#field-name').val();

	if (fieldName == "") {
		$('#status').html('Field with name is empty');
		return false;
	}

	if ($.inArray(fieldName, $('#fields span')) < 0) {
		add_element(type, fieldName, "");
	} else {
		$('#status').html('Field with this name already exists');
	}
}