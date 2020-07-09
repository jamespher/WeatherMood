const path = require('path');

module.exports = {
	resolve: {
		alias: {
			api: path.resolve(path.resolve(__dirname, 'src'), 'api'),
			components: path.resolve(path.resolve(__dirname, 'src'), 'components'),
			utilities:  path.resolve(path.resolve(__dirname, 'src'), 'utilities'),
		}
	},
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './main.jsx',
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					}
				]

			},
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {'modules': false}],
								'@babel/preset-react'
							],
							plugins: [
                                '@babel/plugin-proposal-class-properties', 'transform-object-rest-spread'
                            ]
						}
					}
				]

			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					minChunks: 2,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 8000
	}
};