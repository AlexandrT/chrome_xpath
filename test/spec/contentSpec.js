describe("build xpath", function(){
	var arr = [];

	it("revert and join array", function(){
		arr = ["1", "2", "3"];
		expect(buildXpath(arr)).toEqual("4321");
	});
});