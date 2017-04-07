'use strict';

let
	path = require('path'),
	webpack = require('webpack'),

	pkg = require(path.posix.resolve('./package.json')),
	assets = require(path.posix.resolve('./config/assets.js'));

module.exports = () => {

	// The main webpack config object to return
	let wpConfig = {};


	/**
	 * Source map configuration
	 */
	// Source maps for development (provides trace back to original TS)
	wpConfig.devtool = 'source-map';


	/**
	 * Entry points for the program
	 *
	 *   'vendor' - All third-party dependencies of the application
	 *   'application' - Application code
	 */
	wpConfig.entry = {
		application: path.posix.resolve('./src/demo/main.ts'),
		vendor: path.posix.resolve('./src/demo/vendor.ts')
	};


	/**
	 * Bundle output definitions
	 *   Defines how output bundles are generated and named
	 */
	wpConfig.output = {};

	// Set up for dev middleware
	wpConfig.output.path = path.posix.resolve('./public');
	wpConfig.output.publicPath = '/';
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
				loader: 'awesome-typescript-loader'
			},

			// Template Loader
			{
				test: /\.ts$/,
				loader: 'angular2-template-loader',
				enforce: 'pre',
				exclude: [/\.(spec|e2e)\.ts$/]
			},

			// CSS loader
			{ test: /\.css$/, loaders: [ 'style-loader', 'css-loader' ] },

			// SCSS loader
			{ test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ] },

			// Image file loader
			{ test: /\.png$/, loader: 'file-loader' },
			{ test: /\.(gif|jpg|jpeg)$/, loader: 'file-loader' },

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
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.posix.resolve('./src')
		)
	);

	return wpConfig;
};
