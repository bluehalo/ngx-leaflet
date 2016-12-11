'use strict';

let
	path = require('path'),
	webpack = require('webpack'),

	pkg = require(path.resolve('./package.json')),
	assets = require(path.resolve('./config/assets.js'));

module.exports = () => {

	// The main webpack config object to return
	let wpConfig = {};


	/**
	 * Source map configuration
	 */
	// Eval source maps for development (provides trace back to original TS)
	wpConfig.devtool = 'eval-source-map';


	/**
	 * Entry points for the program
	 *
	 *   'vendor' - All third-party dependencies of the application
	 *   'application' - Application code
	 */
	wpConfig.entry = {
		application: path.resolve('./src/demo/main.ts'),
		vendor: path.resolve('./src/demo/vendor.ts')
	};


	/**
	 * Bundle output definitions
	 *   Defines how output bundles are generated and named
	 */
	wpConfig.output = {};

	// Set up for dev middleware
	wpConfig.output.path = path.resolve('./public');
	wpConfig.output.publicPath = 'http://localhost:9000/';
	wpConfig.output.filename = '[name].js';
	wpConfig.output.chunkFilename = '[name].js';


	/**
	 * List of extensions that webpack should try to resolve
	 */
	wpConfig.resolve = {
		extensions: [
			'.ts', '.js','.json',
			'.woff', '.woff2', '.ttf', '.eot', '.svg',
			'.gif', '.jpg', '.jpeg', '.png',
			'.css', '.scss',
			'.html'
		]
	};

	/**
	 * Module Loaders for webpack
	 *   Teach webpack how to read various types of referenced dependencies
	 */
	wpConfig.module = {

		// Configured loaders
		loaders: [

			// Typescript loader
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					configFileName: path.resolve('./tsconfig-dev.json')
				}
			},

			{
				test: /\.ts$/,
				loader: 'angular2-template-loader'
			},

			// CSS loader
			{ test: /\.css$/, loaders: [ 'style-loader', 'css-loader' ] },

			// SCSS loader
			{ test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] },

			// Image file loader
			{ test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
			{ test: /\.(gif|jpg|jpeg)$/, loader: 'url-loader?limit=10000' },

			// Font file loader (mostly for bootstrap/font-awesome)
			{ test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },

			// Font file loader (mostly for bootstrap/font-awesome)
			{ test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file-loader' },

			// HTML file loader (for angular2 templates)
			{ test: /\.html$/, loader: 'html-loader' }
		]

	};


	/**
	 * Webpack plugins
	 */
	wpConfig.plugins = [];

	// Chunk common code if we're not running in test mode
	wpConfig.plugins.push(
		new webpack.ProvidePlugin({
			// Declare global libraries here (eg. D3, JQuery, etc)
			// d3: 'd3'
			leaflet: 'leaflet'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: [ 'vendor' ]
		}),
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/
		)
	);

	return wpConfig;
};
