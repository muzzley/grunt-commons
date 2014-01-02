var gruntCommons = require('muzzley-grunt-commons');

module.exports = function(grunt) {

  var commonsConfig = gruntCommons.getInitConfig(grunt);

  // Extend the common configuration with specific plugin tasks
  //commonsConfig.someGruntModule = {
  //  taskName: {
  //    taskconfig: { }
  //  }
  //};

  grunt.initConfig(commonsConfig);

  gruntCommons.setup(grunt);

  // Load project-specific Grunt plugins and register tasks
  //grunt.loadNpmTasks('grunt-contrib-compress');
  //grunt.registerTask('package:nomodules', ['gitarchive:master']);
};