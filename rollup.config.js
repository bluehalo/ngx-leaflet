const pkg = require('./package.json');

export default {
	input: 'dist/index.js',
	external: [
		'@angular/core',
		'leaflet'
	],
	output: {
		banner: `/*! ${pkg.name} - ${pkg.version} - ${pkg.copyright} + */`,
		file: `./dist/bundles/${pkg.artifactName}.js`,
		format: 'umd',
		globals: {
			'@angular/core': 'ng.core',
			'leaflet': 'L'
		},
		name: pkg.moduleName,
		sourcemap: true
	}
};
