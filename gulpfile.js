var path = require("path");
var fs = require("fs");

// https://github.com/gulpjs/gulp/tree/master/docs
// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');

var webpack = require("webpack");

var gutil = require("gulp-util");

// http://browsersync.io/
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var webpackConfig = require("./webpack.config");

gulp.task("default", ["server"]);
gulp.task("watch", ["server"]);
gulp.task("start", ["server"]);
gulp.task("server", ["demo"], function (callback) {
    browserSync({
        server: {
            baseDir: './',
            index: './demo/index.html'
        },
        open: 'external'
    });

    gulp.watch(['src/**/*.js', 'src/**/*.less', 'demo/**/*.js'], ['reload_demo']);

    callback();
});

gulp.task("demo", function (callback) {
    var config = Object.create(webpackConfig);
    config.debug = true;
    config.entry.demo = './demo/index.js';

    config.output.path = path.join(__dirname, "cache");

    webpack(config, function (err) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        callback();
    });
});

gulp.task('reload_demo', ['demo'], function () {
    reload();
});
