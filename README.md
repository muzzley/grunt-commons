# Muzzley Grunt Commons

This repository provides the common Grunt tasks used among several Muzzley projects.

Instead of constantly repeating the same boilerplate Grunt configuration, we can simply require this module and keep all projects' Grunt configuration up-to-date and equal.

## Installation

In order to use this module, you should first add grunt to your `devDependencies` like so:

    npm install grunt --save-dev

Then, edit `package.json` to include this project's git reference so that you end up with something like this:

    "devDependencies": {
      "grunt": "~0.4.2",
      "muzzley-grunt-commons": "git+ssh://this-projects-location#master"
    }

## Setup

Copy the file `Gruntfile.sample.js` to your project and rename it to `Gruntfile.js`. Use its sample configuration as the starting point.

The common Grunt configuration can be extended to include project-specific Grunt plugins and tasks. Have a look at the sample file for more details.

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

* **`package:nomodules`**: Creates a `tar.gz` file of the current project's master branch.
* **`package:full`**: Creates a `tar.gz` file of the current project's master branch but includes a fully installed and compiled `node_modules/` folder.

#### Version Bumping Tasks

These are simply the tasks provided by the [grunt-bump](https://github.com/vojtajina/grunt-bump) plugin. See that plugin's documentation for full details.

* **`grunt bump`**
* **`grunt bump:patch`**
* **`grunt bump:minor`**
* **`grunt bump:major`**
