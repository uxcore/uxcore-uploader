'use strict';

var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: "./demo/index",
    output: {
        path: "./cache",
        sourceMapFilename: "[file].map"
    },
    devtool: '#source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                "presets": ["es2015", "react"]
            }
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
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
