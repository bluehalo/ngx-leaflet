import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

export default [
	{
		input: 'dist/index.js',
		external: [
			'@angular/core',
			'leaflet'
		],
		output: {
			banner: `/*! @license ${pkg.name} - ${pkg.version} - ${pkg.copyright} + */`,
			file: `./dist/bundles/${pkg.artifactName}.umd.js`,
			format: 'umd',
			globals: {
				'@angular/core': 'ng.core',
				'leaflet': 'L'
			},
			name: pkg.moduleName,
			sourcemap: true
		},
		plugins: [
			resolve(),
			commonjs()
		]
	}
];
