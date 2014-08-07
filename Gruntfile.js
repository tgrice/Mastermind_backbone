'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jst: {
      compile: {
        files: {
          ".tmp/scripts/templates.js": ["scripts/templates/*.ejs"]
        }
      }
    },
    coffee: {
      compileScripts: {
        expand: true,
        flatten: true,
        cwd: 'scripts',
        src: '**/*.coffee',
        dest: '.tmp/scripts',
        ext: '.js'
      },
      compileSpecs: {
        expand: true,
        flatten: true,
        cwd: 'spec',
        src: '**/*.coffee',
        dest: '.tmp/spec',
        ext: '.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          protocol: 'https',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jst')

  grunt.registerTask('default', ['jst']);
  grunt.registerTask('compile', ['jst', 'coffee'])
  grunt.registerTask('build', ['jst', 'coffee'])

}
