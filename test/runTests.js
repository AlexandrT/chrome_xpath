var page = require('webpage').create();
page.open('../vendor/components-jasmine/SpecRunner.html', function(){
	phantom.exit();
});