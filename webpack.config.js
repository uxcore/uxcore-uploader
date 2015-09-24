'use strict';

var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        'uploader': './index.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        libraryTarget: "var",
        filename: "[name].js",
        library: "Uploader",
        sourceMapFilename: "[file].map"
    },
    devtool: '#source-map',
    module: {
        loaders: [{
            test: /\.js$/,
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
        'uploadcore': 'var UploadCore'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
