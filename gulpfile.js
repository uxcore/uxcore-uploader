var path = require("path");
var fs = require("fs");

// https://github.com/gulpjs/gulp/tree/master/docs
// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');

var webpack = require("webpack");

var gutil = require("gulp-util");

// http://browsersync.io/
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// https://www.npmjs.com/package/gulp-less
var less = require('gulp-less');

// https://github.com/floridoo/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

var webpackDevConfig = require("./webpack.dev");

gulp.task("default", ["server"]);
gulp.task("watch", ["server"]);
gulp.task("start", ["server"]);
gulp.task("server", ["pack_demo", "less_demo"], function (callback) {
    browserSync.init({
        server: {
            baseDir: './',
            index: './index.html'
        },
        open: 'local'
    });

    gulp.watch('demo/index.html').on('change', browserSync.reload);

    gulp.watch(['src/**/*.js'], ['reload_by_js']);

    gulp.watch(['src/**/*.less'], ['reload_by_css']);

    callback();
});

gulp.task('pack_demo', function (callback) {
    webpack(webpackDevConfig, function (err) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        callback();
    });
});

gulp.task('less_demo', function (callback) {
    gulp.src(['src/demo.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
    callback();
});

gulp.task('reload_by_css', function (callback) {
    gulp.src(['src/demo.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
    callback();
});

gulp.task('reload_by_js', ['pack_demo'], function () {
    browserSync.reload()
});
