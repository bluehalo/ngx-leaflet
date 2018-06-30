# @asymmetrik/ngx-template

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/ngx-template/
[travis-image]: https://travis-ci.org/Asymmetrik/ngx-template.svg

> Template project for an Angular.io (v2+) Component.
> Provides a template project structure, npm script build, and Webpack dev server configuration for packaging an Angular.io component and for running a local demo of that component. 


## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Structure](#structure)
- [Changelog](#changelog)
- [Contribute](#contribute)
- [License](#license)


## Install
This package is intended to be a starting point for a new project in a new repository.
As such, installation involves forking the repository, or cloning it and optionally removing the .git directory to get rid of the repository history.

Forking the repository will allow you to maintain a common history with this project.
This will allow you to periodically perform git merges with this repository to pull in patches and improvements. If you want total freedom and are willing to manually merge changes in the future, feel free to delete the git history of your clone. 

To get started, ensure that Node and Yarn are installed.
We recommend using NVM to manage your node versions.
* NVM  (https://github.com/creationix/nvm)
* Node (https://nodejs.org)
* Yarn (https://yarnpkg.com)

Clone the repository and then install the npm packages in the project directory: 
```
yarn install
```

At this point, you should be ready to build the project.


## Usage
This project uses Node scripts as a build framework.
There are two primary tasks: build and demo, which build distribution artifacts and run the development server respecitvely. 

### Building Artifacts for Distribution
To build the distribution bundle run:

```
npm run build
```

This task runs TSLint over the source Typescript to ensure code quality and consistency. 
Then, it uses the Angular compiler (ngc) to compile the Typescript-based Angular source code into ES5 Javascript.
Finally, it uses Rollup to bundle the generated JS files into a single distributable JS library using CommonJS.

The build generates all artifacts necessary for consuming libraries to utilize Angular's Ahead-of-Time compiler.


### Run the Demo for Development
To run the demo using Webpack dev server, run
```
npm run demo
```

This task will run lint and watch for changes and start the Webpack dev server.
Webpack dev server will make a server available where you can run the demo application.
In dev mode, tsc (as opposed to ngc) is used.
This means the bundle that is served by Webpack dev server is not utilizing AOT.

### Customize
Once you've got your own copy of the template, you will need to adapt the template to your own project.
To do so, make changes to the following files:

#### ./package.json
Modify all of the metadata about the package to be specific to your module.

* dependencies - These should generally be empty. These dependencies will get packaged with your module in NPM, which is probably not what you intend.
* peerDependencies - Specify all of the runtime dependencies of the module that someone using it will need. This would include any Angular.io dependencies referenced from within your code and any third party dependencies on which you depend.
* devDependencies - You can specify all of the dependencies needed to build, run, and test your code in this project.

#### ./LICENSE
If you want the license to be something other than MIT, modify this file. You should make sure the package.json file is consistent with the LICENSE file.

#### ./README.md
You can modify this README.md file by removing this section and updating the other relevant content.

#### ./src/index.ts
This file should export your Angular.io module(s).
The build treats this as the primary library entry point.
In other words, this file should create a dependency tree of and export your entire library. 

#### ./src
This is where all your library code should go. Obviously. Change stuff here.

### Polyfills
We're using a few polyfills to help with building and bundling.

#### core-js
https://github.com/zloirock/core-js
core-js bundles a bunch of es5/es6/es7 polyfills.
We're importing the es6 and some of the es7 ones into our demo example application.


## Structure
The template suggests a straightforward project structure for building out your component and the demo. Some of the following project structure is specific to the build and validation of assets and some is related to how the component is bundled for distribution.

### ./ (Root of the project)
**.editorconfig**
EditorConfig config file. See http://editorconfig.org/. IDEs like IntelliJ will automatically pick up and enforce these baseline code formatting rules.

**./.gitignore**
Git ignore file.

**./.travis.yml**
Travis CI configuration file. See (https://travis-ci.org/). If you configure this correctly, you can get automated builds working via Travis.

**./tsconfig-aot.json**
Typescript configuration file used by ngc to build the production component code. See https://www.typescriptlang.org/docs/tutorial.html.
This config is used for bundling. The Gulp build runs ngc using this config file, and generates es5 Javascript, but uses es2015 modules. This is because the output of this compile step is fed into Rollup to generate the bundle files. Rollup will change the module format to umd. 

**./tsconfig.json**
Typescript configuration file used by webpack dev server to build the development component code. This file is essentially the same as ```./tsconfig-aot.json``` only it changes a few settings since it is not being bundled for external consumption and not using ngc.
This config is used by Webpack dev server to compile the Typescript files in memory and serve them for the demo example application. In this config, we disable declaration since the d.ts files aren't needed, and we build to es5 with commonjs as the module system (so it's compatible with es5).

**./tslint.json**
TSLint configuration file. Specifies code conventions and Typescript static analysis checks. See https://palantir.github.io/tslint/.

**./webpack.config.js**
Webpack configuration file used to build the component and demo and run Webpack Dev Server.


### ./dist (Distributed Files)
The build generates files in here.


### ./src (Source Files)
All the application source code including your component and the demo application for the component

**./src/index.ts**
This file should export everything you wish to publish as part of your Angular.io package 

**./src/demo**
Contains a lightweight Angular.io application that is built and run using Webpack. Use the demo to embed examples directly in the project for the purposes of development, testing, and demonstration.

**./src/!(demo)**
This is up to you. A good basic convention is to package modules into directories. You can use the example component as a basic guideline.


## Changelog

### 3.0.0
- Angular 6
- Migrated to npm scripts from gulp for build system
- Upgrade to Webpack 4.x

## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.

## License
See LICENSE in repository for details.
