'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
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

  /*grunt.registerTask('createDefaultTemplate', function () {
      grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });*/
}
