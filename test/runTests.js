var page = require('webpage').create();
page.open('../vendor/components-jasmine/SpecRunner.html', function(){
	setTimeout(function(){
		var content = page.evaluate(function() {
			return window.body;
		});
		phantom.exit();
	}, 20000);
});