module.exports = function(grunt){
	" use strict ";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
        	server: {
        		options: {
        			'port': 8000,
        			'keepalive': true
        		}
        	}
        },

        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': false,
		            'spec-char-escape': true,
		            'id-unique': true,
		            // 'head-script-disabled': true,
		            'style-disabled': true,

		            // 'id-class-value': 'underline'
		        },
		        src: ['index.html']
		    }
		},

		// specify prettified js files currently being developed
		uglify: {
		    build: {
		        files: [{
		            'js/main.min.js': ['js/main.js'],
		        },{
		            'js/lightbox.min.js': ['js/lightbox.js']
		        },{
		        	'js/router.min.js': ['js/router.js']
		        }]
		    }
		},

		concat: {
		    options: {
		    	separator: ';',
		    },
		    dist: {
		    	src: [
		    		  'js/jquery-2.0.0.min.js',
		    		  'js/angular.min.js',
		    		  'js/angular-route.min.js',
		    		  'js/angular-touch.min.js',
		    		  'js/angular-animate.min.js',
		    		  'js/angular-sanitize.min.js',
		    		  'js/router.js',
		    		  'js/webfontloader.js',
		    		  // 'js/blazy.js',
		    		  'js/modernizer-2.6.2.min.js',
		    		  'js/webfontloader.js',
		    		  'js/bootstrap.min.js',
		    		  'js/lightbox.min.js',
		    		  'js/main.min.js'
		    		 ],
		    	dest: 'dist/js/built.js',
		    },
		  },

		cssmin: {
		    build: {
		        src: 'dist/css/main.css',
		        dest: 'dist/css/main.min.css'
		    }
		},

		sass: {
		    build: {
		        files: {
		            'dist/css/main.css': 'sass/main.scss'
		        }
		    }
		},

		watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    },
		    css: {
		        files: ['sass/**/*.scss'],
		        tasks: ['buildcss']
		    },
		    js: {
		        files: ['js/main.js'],
		        tasks: ['uglify']
			}
		}

    });

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

  // Register the default tasks.
	grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);
    grunt.registerTask('buildjs', ['uglify', 'concat']);

};