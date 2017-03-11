'use strict';

module.exports = {
	// Build related items
	build: {
		js: [ 'gulpfile.js', 'config/assets.js' ]
	},

	// Test files
	tests: [],

	// Source files and directories
	src: {
		allTs: [ 'src/**/*.ts' ]
	},

	// Distribution related items
	dist: {
		dir: 'dist',
		bundleDir: 'dist/bundles'
	}
};
