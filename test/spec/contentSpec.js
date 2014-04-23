describe("build xpath", function() {
	beforeEach(function() {
		loadFixtures('listeners.html');
	});

	var arr = [];

	it("revert and join array", function() {
		arr = ["1", "2", "3"];
		expect(buildXpath(arr)).toEqual("321");
	});
});

/*describe("foo", function() {
	jasmine.getFixtures().fixturesPath = 'test/fixtures';


	it("add listeners to all elements", function() {
		foo();
		
		spyEvent = spyOnEvent('#fields', "click");
		$('#fields').trigger("click");
		expect('click').toHaveBeenTriggeredOn('#fields');
		expect(spyEvent).toHaveBeenTriggered();
	});
})*/