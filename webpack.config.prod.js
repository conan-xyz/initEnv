/**
 * Created by Conan on 2016/12/1.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './app/index'
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loaders: ['file']
            }
        ]
    }
};