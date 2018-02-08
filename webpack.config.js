const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [ path.resolve('./src/index.js') ],
	output: {
		path: path.resolve('./public/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ 'env' ],
					plugins: [ 'transform-object-rest-spread', 'transform-runtime' ]
				}
			}
		]
	},
	resolve: {
		extensions: [ '.js', '*' ],
		alias: {
			Controllers: path.resolve('./src/controllers/'),
			Services: path.resolve('./src/services/'),
			Directives: path.resolve('./src/directives/'),
			angularApp$: path.resolve('./src/angularApp.js')
		}
	}
};
