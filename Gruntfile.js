module.exports = function(grunt) {

	grunt.initConfig({
		jasmine: {
			pivotal: {
				src: 'content.js',
				options: {
					specs: 'test/spec/*Spec.js'
				}
			}
		},

		bowerInstall: {
			target: {
				src: [

				]
			}
		}
	});

	// load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-bower-install');

	// integrate specific tasks
	//grunt.loadTasks("build/tasks");

	// grunt.registerTask("bower", "bowercopy");
	grunt.registerTask('default', ['jasmine']);
}