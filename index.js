var path = require('path');
var pkg = require('./package.json');

// 'muzzley-grunt-commons/node_modules/'
var PLUGINS_BASE_PATH = pkg.name + path.sep + 'node_modules' + path.sep;

var GruntCommons = {

  getInitConfig: function (grunt) {
    return {
      pkg: grunt.file.readJSON('package.json'),

      archiveFolderPrefix: '<%= pkg.name %>', // app
      archiveName: '<%= pkg.name %>_v<%= pkg.version %>.tar.gz', // app_v0.1.0.tar.gz
      archiveNameNoModules: '<%= pkg.name %>_v<%= pkg.version %>_no_modules.tar.gz', // app_v0.1.0_no_modules.tar.gz

      gitarchive: {
        master: {
          options: {
            format: 'tar.gz',
            prefix: '<%= archiveFolderPrefix %>/',
            treeIsh: 'master',
            output: '/tmp/<%= archiveNameNoModules %>'
          }
        }
      },
      shell: {
        // Extract the Git Archive without `npm install`ed modules
        extractArchive: {
          command: [
            'cd /tmp',
            'tar -xzf <%= archiveNameNoModules %>'
          ].join(' && ')
        },
        // Run `npm install` on the extracted files
        npmInstall: {
          command: [
            'cd /tmp/<%= archiveFolderPrefix %>',
            'npm install'
          ].join(' && ')
        }
      },
      compress: {
        // General archiver/compressor for the current directory state
        current: {
          options: {
            mode: 'tgz',
            archive: '<%= pkg.name %>_v<%= pkg.version %>_checkout.tar.gz'
          },
          files: [
            { src: ['**', '!node_modules/**'], dest: '<%= pkg.name %>/' },
          ]
        },
        // Package /tmp/<app> again after `npm install`
        finalPackage: {
          options: {
            mode: 'tgz',
            archive: '/tmp/<%= archiveName %>',
          },
          files: [
            // makes all src relative to cwd
            { expand: true, cwd: '/tmp/<%= archiveFolderPrefix %>', src: ['**', '.*'], dest: '<%= archiveFolderPrefix %>/' },
          ]

        }
      },
      // Bump the app version and commit to git
      bump: {
        options: {
          files: ['package.json'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
        }
      },
      copy: {
        productionUpstart: {
          files: [{expand: true, flatten: true, src: ['production/upstart/*'], dest: '/etc/init/', filter: 'isFile'}]
        },
        productionSysV: {
          files: [{expand: true, flatten: true, src: ['production/init/*'], dest: '/etc/init.d/', filter: 'isFile'}]
        },
        productionLogrotate: {
          files: [{expand: true, flatten: true, src: ['production/logrotate/*'], dest: '/etc/logrotate.d/', filter: 'isFile'}]
        }
      }
    };
  },

  /**
   * Load and register the common Grunt plugins and tasks.
   * 
   * @param  {object} grunt   The Grunt object
   * @param  {object} options An optional configuration object with the following properties:
   *                          - pluginsBasePath: The base path where the common Grunt
   *                          plugins are located. There should be no need to pass this
   *                          parameter. Defaults to: 'muzzley-grunt-commons/node_modules/'
   * @return {undefined}
   */
  setup: function (grunt, options) {

    options = options || {};
    var basePath = (typeof options.pluginsBasePath !== 'undefined') ? options.pluginsBasePath : PLUGINS_BASE_PATH;

    // Prefix the Grunt plugins with our own location because Grunt
    // will search for them in the filesystem.
    grunt.loadNpmTasks(basePath + 'grunt-contrib-compress');
    grunt.loadNpmTasks(basePath + 'grunt-git');
    grunt.loadNpmTasks(basePath + 'grunt-shell');
    grunt.loadNpmTasks(basePath + 'grunt-bump');
    grunt.loadNpmTasks(basePath + 'grunt-contrib-copy');

    grunt.registerTask('package:nomodules', ['gitarchive:master']);
    grunt.registerTask('package:full', ['gitarchive:master', 'shell:extractArchive', 'shell:npmInstall', 'compress:finalPackage']);

    grunt.registerTask('setup:upstart', ['copy:productionUpstart']);
    grunt.registerTask('setup:sysv', ['copy:productionSysV']);
    grunt.registerTask('setup:logrotate', ['copy:productionLogrotate']);
    
    grunt.registerTask('setup:ubuntu', ['copy:productionUpstart', 'copy:productionLogrotate']);
    grunt.registerTask('setup:debian', ['copy:productionSysV', 'copy:productionLogrotate']);
  }
};

exports = module.exports = GruntCommons;