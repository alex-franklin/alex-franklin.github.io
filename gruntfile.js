module.exports = function(grunt){
	" use strict ";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
		            'head-script-disabled': true,
		            'style-disabled': true,

		            'id-class-value': 'underline'
		        },
		        src: ['index.html']
		    }
		},

		uglify: {
		    build: {
		        files: {
		            'js/main.min.js': ['js/main.js']
		        }
		    }
		},

		cssc: {
		    build: {
		        options: {
		            consolidateViaDeclarations: true,
		            consolidateViaSelectors:    true,
		            consolidateMediaQueries:    true
		        },
		        files: {
		            'dist/css/main.css': 'dist/css/main.css'
		        }
		    }
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
		            'dist/css/main.css': '_sass/main.scss'
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

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);

};