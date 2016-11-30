# Angular2 Leaflet Component

[![Build Status][travis-image]][travis-url]

## Getting Started 
To get started, ensure that Node and NPM are installed, and use npm to install gulp globally ```npm install -g gulp```.

* Node and NPM (https://nodejs.org)
* Gulp (https://gulpjs.org)

Next, clone the repository and then run ```npm install``` from within the project directory. At this point, you should be ready to build the project.

## Build Overview
This project uses Gulp as a build framework. 

To build the bundles, run ```gulp build```. This task will run TSLint over the source Typescript to ensure code quality and consistency. Then, it runs the Typescript compiler to generate ES5 Javascript. Finally, it uses Rollup to bundle the generated Javascript into and then uses Rollup to bundle the Javascript code into a distributable CommonJS format.

To develop, run ```gulp develop```. This task will run Webpack dev server, watch all of the files in the project for changes, and make a server available where you can run the demo application.


[travis-url]: https://travis-ci.org/Asymmetrik/angular2-leaflet/
[travis-image]: https://travis-ci.org/Asymmetrik/angular2-leaflet.svg
