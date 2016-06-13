'use strict';

var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer'),
    minifycss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat');
    // imagemin    = require('gulp-imagemin');

// browser-sync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});
});

// style
gulp.task('style', function() {
	return sass('./_assets/_css/main.scss')
	    .pipe(plumber())
	    .pipe(prefix('last 3 version'))
	    .pipe(minifycss())
	    .pipe(gulp.dest('./assets/css/'))
	    .pipe(browserSync.reload({stream:true}));
});

// javascript
gulp.task('js', function(){
	return gulp.src('_assets/_js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'));
});

// images
// gulp.task('imagemin', function() {
// 	return gulp.src('assets/_img/**/*.{jpg,png,gif}')
// 		.pipe(plumber())
// 		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
// 		.pipe(gulp.dest('assets/img/'));
// });


gulp.task('default', ['js', 'style', 'browser-sync']);