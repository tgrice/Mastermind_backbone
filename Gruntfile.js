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
      },
      deploy: {
        files: {
          "mastermind_server/MM.WebApi/Scripts/templates.js": ["scripts/templates/*.ejs"]
        }
      }
    },

    coffee: {
      compileScripts: {
        expand: true,
        flatten: true,
        cwd: 'scripts',
        src: '**/**/*.coffee',
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
      },
      deployScripts: {
        expand: true,
        flatten: true,
        cwd: 'scripts',
        src: '**/**/*.coffee',
        dest: 'mastermind_server/MM.WebApi/Scripts',
        ext: '.js'
      }
    },

    copy: {
      bower_components: {
        src: 'bower_components/**',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      styles: {
        src: 'styles/**',
        dest: 'mastermind_server/MM.WebApi/Content/',
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

  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jst']);
  grunt.registerTask('compile', ['jst', 'coffee', 'copy']);
  grunt.registerTask('build', ['jst', 'coffee']);
}
