'use strict';

module.exports = {
	// Build related items
	build: {
		js: [ 'gulpfile.js', 'config/assets.js' ]
	},

	// Test files
	tests: {
		js: [ ]
	},

	// Source files and directories
	src: {
		allTs: [ 'src/**/*.ts' ],
		ts: [ 'src/**/*.ts', '!src/demo/**/*.ts' ]
	},

	// Distribution related items
	dist: {
		dir: 'dist',
		bundleDir: 'dist/bundles'
	}
};
