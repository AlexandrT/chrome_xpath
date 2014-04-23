module.exports = function(grunt) {

	grunt.initConfig({
		vendor: grunt.file.readJSON('.bowerrc'),
		//bower: grunt.file.readJSON('bower.json'),

		jasmine: {
			pivotal: {
				src: [
					'content.js',
					'lib/*.js',
					'options/*.js',
					'popup/*.js'
				],
				options: {
					vendor: [
						'lib/jquery-2.1.0.min.js',
						'<%= vendor.directory %>/jasmine-jquery/lib/jasmine-jquery.js'
					],
					specs: 'test/spec/*Spec.js'
				}
			}
		},

		/*bowerInstall: {
			target: {
				src: [

				]
			}
		}*/
	});

	// load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	// grunt.loadNpmTasks('grunt-bower-install');

	// integrate specific tasks
	//grunt.loadTasks("build/tasks");

	// grunt.registerTask("bower", "bowercopy");
	grunt.registerTask('default', ['jasmine']);
}