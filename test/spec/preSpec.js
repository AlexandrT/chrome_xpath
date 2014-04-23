describe("add element", function() {
	jasmine.getFixtures().fixturesPath = 'test/fixtures';

	beforeEach(function() {
		loadFixtures('listeners.html');
	});

	it("add elements with options type", function() {
		add_element("options", "title");

		expect($('li#title')).toBeInDOM();
		expect($('li#title > ')).toHaveLength(2);
		expect($('li#title')).toContainElement($('span'));
		expect($('li#title')).toContainElement($('button.remove'));

		expect($('#title > span')).toHaveHtml('title');

		expect($('#title > button')).toHaveHtml('remove');
		expect($('#title > button')).toHaveClass('remove');
		// expect($('#title > button')).toHaveAttr('click', 'remove_field');
	});

	it("add elements with popup type", function() {
		add_element("popup", "author", "/div['@id=author']");

		expect($('li#author')).toBeInDOM();
		expect($('li#author > ')).toHaveLength(4);
		expect($('li#author')).toContainElement($('span'));
		expect($('li#author')).toContainElement($('input'));
		expect($('li#author')).toContainElement($('button.remove'));
		expect($('li#author')).toContainElement($('button.parse'));

		expect($('#author > span')).toHaveHtml('author');

		expect($('#author > button.remove')).toHaveHtml('remove');
		expect($('#author > button.remove')).toBeInDOM();
		// expect($('#author > button.remove')).toHaveAttr('click', 'remove_field');

		expect($('#author > button.parse')).toHaveHtml('parse');
		expect($('#author > button.parse')).toBeInDOM();
		// expect($('#author > button.parse')).toHaveAttr('click', 'remove_field');

		expect($('#author > input')).toHaveAttr('type', 'text');
		expect($('#author > input')).toHaveValue("/div['@id=author']");
	})
})