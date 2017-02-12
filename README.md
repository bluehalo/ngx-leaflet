# @asymmetrik/angular2-template

[![Build Status][travis-image]][travis-url]

> Template project for an Angular2 Component.
> Provides a template project structure, Gulp build, and Webpack dev server configuration for packaging an Angular 2 component and for running a local demo of that component. 

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Structure](#structure)
- [Contribute](#contribute)
- [License](#license)

## Install
This package is intended to be a starting point for a new project in a new repository. As such, installation involves forking the repository, or cloning it and optionally removing the .git directory to get rid of the repository history.

Forking the repository will allow you to maintain a common history with this project. This will allow you to periodically perform git merges with this repository to pull in patches and improvements. If you want total freedom and are willing to manually merge changes in the future, feel free to delete the git history of your clone. 

To get started, ensure that Node and NPM are installed.
* Node and NPM (https://nodejs.org)
* Gulp (https://gulpjs.org)

Use npm to install gulp globally:
```
npm install -g gulp
```

Next, clone the repository and then install the npm packages in the project directory: 
```
npm install
```

At this point, you should be ready to build the project.


## Usage
This project uses Gulp as a build framework. There are two primary tasks: build and dev, which build distribution artifacts and run the development server respecitvely. 

### Building Artifacts for Distribution
To build the bundles run:

```
gulp build
```

This task will run TSLint over the source Typescript to ensure code quality and consistency. Then, it runs the Typescript compiler to generate ES5 Javascript. Finally, it uses Rollup to bundle the generated Javascript into and then uses Rollup to bundle the Javascript code into a distributable CommonJS format.

### Run the Demo for Development
To run the demo using Webpack dev server, run
```
gulp dev
```

This task will run Webpack dev server, watch all of the files in the project for changes, and make a server available where you can run the demo application. Gulp watch will monitor for changes to Typescript source and re-run the TSLint.


Once you've got your own copy of the template, you will need to adapt the template to your own project. To do so, make changes to the following files:

### ./package.json
Modify all of the metadata about the package to be specific to your module.

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


## Structure
The template suggests a straightforward project structure for building out your component and the demo. Some of the following project structure is specific to the build and validation of assets and some is related to how the component is bundled for distribution.

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
Typescript configuration file used by the typescipt compiler to build the production component code. See https://www.typescriptlang.org/docs/tutorial.html.

**./tsconfig-dev.json**
Typescript configuration file used by webpack dev server to build the development component code. This file is essentially the same as ```./tsconfig.json``` only it changes a few settings since it is not being bundled for external consumption.

**./tslint.json**
TSLint configuration file. Specifies code conventions and Typescript static analysis checks. See https://palantir.github.io/tslint/.


### ./config/ (Configuration)
Contains most of the major config files used to build and develop

**./config/assets.js**
Centrally specifies paths used by the build

**./config/webpack.config.js**
Webpack configuration file used to build the component and demo and run Webpack Dev Server.


### ./dist (Distributed Files)
The build generates files in here.


### ./src (Source Files)
All the application source code including your component and the demo application for the component

**./src/index.ts**
This file should export everything you wish to publish as part of your Angular2 package 

**./src/demo**
Contains a lightweight Angular 2 application that is built and run using Webpack. Use the demo to embed examples directly in the project for the purposes of development, testing, and demonstration.

**./src/!(demo)**
This is up to you. A good basic convention is to package modules into directories. You can use the example component as a basic guideline.

## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.

## License
See LICENSE in repository for details.

[travis-url]: https://travis-ci.org/Asymmetrik/angular2-template/
[travis-image]: https://travis-ci.org/Asymmetrik/angular2-template.svg
