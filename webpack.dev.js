'use strict';

var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        demo: "./src/demo"
    },
    output: {
        path: ".",
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    externals: {
        'react': 'var React',
        'spark-md5': 'var SparkMD5',
        'jquery': 'var jQuery'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
