'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var serverConfigs = {
    port       : 8000,
    protocol   : 'https',
    hostname   : 'localhost'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        options: {
            nospawn: true
        },
        coffee: {
            files: ['app/scripts/{,*/}*.coffee'],
            tasks: ['coffee:dist']
        },
        build: {
            files: ['app/**/{,*/}*.{scss,coffee,html,js,css}'],
            tasks: ['build']
        },
        coffeeTest: {
            files: ['app/spec/{,*/}*.coffee'],
            tasks: ['test']
        },
        livereload: {
            options: {
            },
            files: [
            ]
        },
        jst: {
            files: [
                'app/scripts/**/*.ejs'
            ],
            tasks: ['jst']
        }
    },

    jst: {
      compile: {
        files: {
          ".tmp/app/scripts/templates.js": ["app/scripts/templates/*.ejs"]
        }
      },
      deploy: {
        files: {
          "mastermind_server/MM.WebApi/Scripts/templates.js": ["app/scripts/templates/*.ejs"]
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['dist/index.html']
        }
      }
    },
    rev: {
        dist: {
            files: {
                src: [
                    'dist/scripts/{,*/}*.js',
                    'dist/styles/*.css',
                    'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    'dist/styles/fonts/*'
                ]
            }
        }
    },
    coffee: {
      dist: {
          files: [{
              expand: true,
              cwd: 'app/scripts',
              src: '**/**/*.coffee',
              dest: '.tmp/scripts',
              ext: '.js'
          }]
      },
      compileScripts: {
        expand: true,
        flatten: true,
        cwd: 'app/scripts',
        src: '**/**/*.coffee',
        dest: '.tmp/app/scripts',
        ext: '.js'
      },
      compileSpecs: {
        expand: true,
        flatten: true,
        cwd: 'app/spec',
        src: '**/**/*.coffee',
        dest: '.tmp/app/spec',
        ext: '.js'
      },
      uxConfig: {
          files: {
              '.tmp/app/scripts/endpoints.js': 'app/config/ux_endpoints.coffee'
          }
      },
      deployScripts: {
        expand: true,
        flatten: true,
        cwd: 'app/scripts',
        src: '**/**/*.coffee',
        dest: 'mastermind_server/MM.WebApi/Scripts',
        ext: '.js'
      }
    },
    useminPrepare: {
        html: 'app/index.html',
        options: {
            dest: 'dist'
        }
    },
    usemin: {
        html: ['dist/{,*/}*.html'],
        css: ['dist/styles/{,*/}*.css'],
        options: {
            dirs: ['dist']
        }
    },
    copy: {
      dist: {
          files: [{
              expand: true,
              dot: true,
              cwd: 'app',
              dest: 'dist',
              src: [
                  '*.{ico,txt,html}',
                  '.htaccess',
                  'images/{,*/}*.{webp,gif,svg}'
              ]
          }]
      },
      jquery: {
        src: 'app/bower_components/jquery/jquery.js',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      jquery_ui: {
        src: 'app/bower_components/jquery-ui/jquery-ui.min.js',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      jquery_validation: {
        src: 'app/bower_components/jquery-validation/dist/jquery.validate.min.js',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      jquery_validation_addl: {
        src: 'app/bower_components/jquery-validation/dist/additional-methods.min.js',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      underscore: {
        src: 'app/bower_components/underscore/underscore.js',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      backbone: {
        src: 'app/bower_components/backbone/backbone.js',
        dest: 'mastermind_server/MM.WebApi/Scripts/',
      },
      styles: {
        src: 'app/styles/**',
        dest: 'mastermind_server/MM.WebApi/Content/',
      }
    },
    connect: {
      options: serverConfigs,
      server: {
        options: serverConfigs
      },
      livereload: {
          options: {
              middleware: function (connect) {
                  return [
                      lrSnippet,
                      mountFolder(connect, '.tmp'),
                      mountFolder(connect, 'app')
                  ];
              }
          }
      },
      dist: {
          options: {
              middleware: function (connect) {
                  return [
                      mountFolder(connect, 'dist')
                  ];
              }
          }
      }
    },
    open: {
      server: {
        path: 'https://localhost:8000'
      }
    },
    clean: {
        dist: ['.tmp', 'dist'],
        server: '.tmp'
    }
  });

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['buildDev', 'open', 'connect:dist:keepalive']);
      } else if (target === 'test') {
          return grunt.task.run([
              'clean:server',
              'coffee',
              'createDefaultTemplate',
              'jst',
              'connect:test:keepalive'
          ]);
      }

      grunt.task.run([
          'clean:server',
          'buildDev',
          'sass',
          'coffee:dist',
          'createDefaultTemplate',
          'jst',
          'connect:livereload',
          'open',
          'watch'
      ]);
  });

  grunt.registerTask('build', [
      'coffee:dist',
      'copy',
      'createDefaultTemplate',
      'jst',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'rev',
      'usemin',
      'processhtml'
  ]);

  grunt.registerTask('buildUx', ['clean:dist', 'coffee:uxConfig', 'build']);
  grunt.registerTask('uxServer', ['buildUx', 'connect:livereload', 'open', 'watch']);
  grunt.registerTask('default', ['jst']);
  grunt.registerTask('compile', ['jst', 'coffee', 'copy']);
  grunt.registerTask('build', ['jst', 'coffee']);
}
