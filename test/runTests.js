var page = require('webpage').create();
	system = require('system');

if (system.args.length === 1) {
	console.log('url not specified');
	phantom.exit();
}

var address = system.args[1];
// page.open('../vendor/components-jasmine/SpecRunner.html', function(){
page.open(address, function(){
	page.injectJs('../lib/jquery-2.1.0.min.js');
		
	var content = page.evaluate(function() {
		return $('.bar.failed').html();
	});
	console.log(content);

	if (content === null) {
		console.log("0");
		phantom.exit();
	} else {
		console.log("1");
		phantom.exit(1);
	}
});