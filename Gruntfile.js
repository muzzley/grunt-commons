var gruntCommons = require('./');

module.exports = function(grunt) {
  var commonsConfig = gruntCommons.getInitConfig(grunt);

  grunt.initConfig(commonsConfig);

  gruntCommons.setup(grunt, { pluginsBasePath: '' });
};
