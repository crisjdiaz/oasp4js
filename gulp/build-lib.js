/*global config, isProd*/
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('scripts', ['ngTemplates'], function () {
    return gulp.src(config.js.src())
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate())
        .pipe($.concat(config.app.buildLibName()))
        .pipe($.if(isProd(), $.uglify({preserveComments: $.uglifySaveLicense})))
        .pipe($.sourcemaps.write('./'))
        .pipe($.if(isProd(), gulp.dest(config.app.dist())))
        .pipe($.if(!isProd(), gulp.dest(config.app.tmp())))
        .pipe($.size());
});

gulp.task('build:lib', ['scripts', 'html', 'i18n', 'copy-less', 'copy-img']);
