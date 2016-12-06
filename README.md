# Angular2 Component Template

[![Build Status][travis-image]][travis-url]

## What is it?
This is a template project for an Angular2 Component

## Using this Template
The best way to use this template is to either fork the repository, or to git clone it and then delete the ./.git directory.
Once you've got your own version of the repo, you will need to make changes to the following files:

### ./package.json
You will want to modify all of the metadata about the package to be specific to your module.

* dependencies - These should generally be empty. These dependencies will get packaged with your module in NPM, which is probably not what you intend.
* peerDependencies - Specify all of the runtime dependencies of the module that someone using it will need. This would include any Angular2 dependencies referenced from within your code and any third party dependencies on which you depend.
* devDependencies - You can specify all of the dependencies needed to build, run, and test your code in this project.

### ./LICENSE
If you want the license to be something other than MIT, modify this file. You should make sure the package.json file is consistent with the LICENSE file.

### ./README.md
You can modify this README.md file by removing this section and updating the other relevant content.

### ./src/index.ts
This file should export your Angular 2 module(s). The package.json references this file as the main entry point of the NPM module. 

### ./src
Obviously. Change stuff here.


## Project Layout

### ./ (Root of the project)
**.editorconfig**
EditorConfig config file. See http://editorconfig.org/. IDEs like IntelliJ will automatically pick up and enforce these baseline code formatting rules.

**./.gitignore**
Git ignore file.

**./.travis.yml**
Travis CI configuration file. See (https://travis-ci.org/). If you configure this correctly, you can get automated builds working via Travis.

**./gulpfile.js**
Gulp build file. The details of the Gulp build are explained in this README.

**./tsconfig.json**
Typescript configuration file used by the compiler to build the component code. See https://www.typescriptlang.org/docs/tutorial.html.

**./tsconfig-dev.json**
Typescript configuration file used by Webpack to run the demo. We locate this at the root of the project to help IDEs pick it up.


### ./config/ (Configuration)
Contains most of the major config files used to build and develop

**./config/assets.js**
Centrally specifies paths used by the build

**./config/tslint.config.js**
TSLint configuration file. Specifies code conventions and Typescript static analysis checks. See https://palantir.github.io/tslint/.

**./config/webpack.config.js**
Webpack configuration file used to build the component and demo and run Webpack Dev Server.


### ./dist (Distributed Files)
The build generates files in here.


### ./src (Source Files)
All the application source code

**./src/index.ts**
This file should export everything you wish to publish in your Angular2 package 

**./src/demo**
The purpose of this directory is to contain a lightweight Angular 2 application that can be run using Webpack. This will allow you to embed examples directly in this project, making development easier.

**./src/!(demo)**
This is up to you. A good basic convention is to package modules into directories.




THE REST OF THE README IS A TEMPLATE FOR YOUR README FILE

## Getting Started 
To get started, ensure that Node and NPM are installed, and use npm to install gulp globally ```npm install -g gulp```.

* Node and NPM (https://nodejs.org)
* Gulp (https://gulpjs.org)

Next, clone the repository and then run ```npm install``` from within the project directory. At this point, you should be ready to build the project.

## Build Overview
This project uses Gulp as a build framework. 

To build the bundles, run ```gulp build```. This task will run TSLint over the source Typescript to ensure code quality and consistency. Then, it runs the Typescript compiler to generate ES5 Javascript. Finally, it uses Rollup to bundle the generated Javascript into and then uses Rollup to bundle the Javascript code into a distributable CommonJS format.

To develop, run ```gulp dev```. This task will run Webpack dev server, watch all of the files in the project for changes, and make a server available where you can run the demo application. Gulp watch will monitor for changes to Typescript source and re-run the TSLint.


[travis-url]: https://travis-ci.org/Asymmetrik/angular2-template/
[travis-image]: https://travis-ci.org/Asymmetrik/angular2-template.svg
