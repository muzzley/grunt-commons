# Muzzley Grunt Commons

This repository provides the common Grunt tasks used in several [Muzzley](http://www.muzzley.com) projects.

It also serves as an example for other teams on how to create common and reusable Grunt tasks. Instead of constantly repeating the same boilerplate Grunt configuration, we can simply require this module and keep all projects' Grunt configuration up-to-date and equal.

This project shouldn't be used as is by anyone else - we might break backwards compatibility. Rather, it should serve as an example on how to minimize Grunt boilerplate. Just fork this repo and adapt it to your needs with the Grunt plugins and tasks you prefer.

## Installation

In order to use this module, you should first add `grunt` and this very module to your `devDependencies` like so:

    npm install grunt --save-dev
    npm install git+https://github.com/muzzley/grunt-commons.git#master --save-dev

## Setup

Copy the file `Gruntfile.sample.js` to your project and rename it to `Gruntfile.js`. Use its sample configuration as the starting point.

The common Grunt configuration can be extended to include project-specific Grunt plugins and tasks. Have a look at the sample file for more details.

### Gruntfile.js sample

    var gruntCommons = require('muzzley-grunt-commons');

    module.exports = function (grunt) {

      // Get the common Grunt config object
      var commonsConfig = gruntCommons.getInitConfig(grunt);

      // Extend the common configuration with other project-specific plugin tasks
      //commonsConfig.someGruntModule = {
      //  taskname: {
      //    taskconfig: { }
      //  }
      //};

      grunt.initConfig(commonsConfig);

      gruntCommons.setup(grunt);

      // Load project-specific Grunt plugins and register tasks
      //grunt.loadNpmTasks('some-grunt-npm-plugin');
      //grunt.registerTask('sometask', ['someGruntModule:taskname']);
    };

## Usage

The usage is exactly the same as with any other Grunt setup. Just run:

    grunt <taskname>

## Included Grunt Plugins

* [grunt-bump](https://github.com/vojtajina/grunt-bump)
* [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress)
* [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
* [grunt-git](https://github.com/rubenv/grunt-git)
* [grunt-shell](https://github.com/sindresorhus/grunt-shell)

## Included Tasks

#### Packaging Tasks

These tasks allow creating distributable tarballs.

* `package:nomodules`: Creates a `tar.gz` file of the current project's master branch.
* `package:full`: Creates a `tar.gz` file of the current project's master branch but includes a fully installed and compiled `node_modules/` folder. When deploying this package, it is enough to run `npm rebuild`.

#### Version Bumping Tasks

These are simply the tasks provided by the [grunt-bump](https://github.com/vojtajina/grunt-bump) plugin. See that plugin's documentation for full details.

* `grunt bump`
* `grunt bump:patch`
* `grunt bump:minor`
* `grunt bump:major`

## Why this works

Grunt doesn't easily support loading plugins that aren't installed in the base project. That is, plugins must be in the `node_modules/` folder. However, by prepending a different path to the plugin name, we can trick the Grunt plugin loader into looking for plugins somewhere else. For instance, to load the `grunt-git` plugin, this project does the following:

    grunt.loadNpmTasks('muzzley-grunt-commons/node_modules/grunt-git');
