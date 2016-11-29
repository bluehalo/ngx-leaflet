# Angular2 Component Template

## What is it?
This is a template project for an Angular2 Component

## Using this Template
The best way to use this template is to either fork the repository, or to git clone it and then delete the ./.git directory.
Once you've got your own version of the repo, you will need to make changes to the following files:

### package.json
You will want to modify all of the metadata about the package to be specific to your module.

* dependencies - These should generally be empty. These dependencies will get packaged with your module in NPM, which is probably not what you intend.
* peerDependencies - Specify all of the runtime dependencies of the module that someone using it will need. This would include any Angular2 dependencies referenced from within your code and any third party dependencies on which you depend.
* devDependencies - You can specify all of the dependencies needed to build, run, and test your code in this project.

### LICENSE
If you want the license to be something other than MIT, modify this file. You should make sure the package.json file is consistent with the LICENSE file.

### src/index.ts
This file should export your Angular 2 module(s). The package.json references this file as the main entry point of the NPM module. 

### README.md
You can modify this README.md file by removing this section and updating the other relevant content.


## Project Layout

### ./config/assets.js
This file centralizes paths used by the build.

### ./config/tslint.conf.js
This is a TSLint configuration file. See (https://palantir.github.io/tslint/).

### ./.editorconfig
This is an EditorConfig config file. See (http://editorconfig.org/). IDEs like IntelliJ will automatically pick up and enforce these baseline rules.

### ./tsconfig.json
This is the configuration file for the Typescript compiler. Several of these settings are specific to Angular2, so modify at your own risk.

### ./.gitignore
Git ignore file.

### ./.travis.yml
This is a file that configures Travis. See (https://travis-ci.org/). If you configure this correctly, you can get automated builds working via Travis.

### ./gulpfile.js
This is the Gulp build file. The details of the Gulp build are explained in this README.



THE REST OF THE README IS A TEMPLATE FOR YOUR README FILE

## Getting Started 
To get started, ensure that Node and NPM are installed, and use npm to install gulp globally ```npm install -g gulp```.

* Node and NPM (https://nodejs.org)
* Gulp (https://gulpjs.org)

Next, clone the repository and then run ```npm install``` from within the project directory. At this point, you should be ready to build the project.

## Build Overview
This project uses Gulp as a build framework. To build the bundles, run ```gulp build```. This task will run TSLint over the source Typescript to ensure code quality and consistency. Then, it runs the Typescript compiler to generate ES5 Javascript. Finally, it uses Rollup to bundle the generated Javascript into and then uses Rollup to bundle the Javascript code into a distributable CommonJS format.
