'use strict';

const
	path = require('path'),
	webpack = require('webpack'),
	StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin,

	pkg = require('./package.json');

module.exports = () => {

	// The main webpack config object to return
	let wpConfig = {
		mode: 'development'
	};


	/**
	 * Dev Server Configuration
	 */
	wpConfig.devServer = {
		port: 9000,
		stats: {
			modules: false,
			colors: true
		},
		watchOptions: {
			aggregateTimeout: 500,
			poll: 1000
		}
	};


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
		application: path.posix.resolve('./src/demo/main.ts')
	};


	/**
	 * Bundle output definitions
	 *   Defines how output bundles are generated and named
	 */
	wpConfig.output = {
		path: path.posix.resolve('./public'),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[name].js'
	};


	/**
	 * List of extensions that webpack should try to resolve
	 */
	wpConfig.resolve = {
		extensions: [ '.ts', '.js','.json' ]
	};

	/**
	 * Module Loaders for webpack
	 *   Teach webpack how to read various types of referenced dependencies
	 */
	wpConfig.module = {

		// Configured loaders
		rules: [

			// Typescript loader
			{
				test: /\.ts$/,
				use: 'awesome-typescript-loader'
			},

			// Template Loader
			{
				test: /\.ts$/,
				use: 'angular2-template-loader',
				enforce: 'pre',
				exclude: [/\.(spec|e2e)\.ts$/]
			},

			// Add source maps for dependencies
			{
				test: /node_modules\/*\.js$/,
				use: 'source-map-loader',
				enforce: 'pre'
			},

			// CSS loader
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },

			// SCSS loader
			{ test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },

			// Image file loader
			{ test: /\.png$/, use: 'file-loader' },
			{ test: /\.(gif|jpg|jpeg)$/, use: 'file-loader' },

			// Font file loader (mostly for bootstrap/font-awesome)
			{ test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },

			// Font file loader (mostly for bootstrap/font-awesome)
			{ test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, use: 'file-loader' },

			// HTML file loader (for ngx templates)
			{ test: /\.html$/, use: 'html-loader' }
		]

	};

	wpConfig.optimization = {
		splitChunks: {
			chunks: 'all',
		}
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
		}),
		// Stats writer generates a file with webpack stats that can be analyzed at https://chrisbateman.github.io/webpack-visualizer/
		new StatsWriterPlugin({
			chunkModules: true,
			filename: 'webpack-stats.json',
			fields: null
		}),
		new webpack.ContextReplacementPlugin(
			/(.+)?angular(\\|\/)core(.+)?/,
			path.posix.resolve('./src')
		)
	);

	return wpConfig;
};
