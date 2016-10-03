"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglifyjs');
var filter = require('gulp-filter');
var mainBowerFiles = require('gulp-main-bower-files');
var ignore = require('gulp-ignore');
var gulpUtil = require('gulp-util');
var sass = require('gulp-sass');

gulp.task('default', ['sass', 'js'], function () {
    console.log('Build successful');
});
gulp.task('libs', ['backbone', 'underscore', 'bootstrap', 'bootstrapjs', 'fontawesome','fontawesomefonts', 'glyphicons', 'jquery'], function () {
    console.log('Libs copied');
});

// gulp.task('css', function() {
//     return gulp.src('src/css/*.css')
//       .pipe(concat("bundle.css"))
//       .pipe(prefix({
//               browsers: ['last 5 versions']
//           }))
//       .pipe(csso())
//       .pipe(rename("bundle.min.css"))
//       .pipe(gulp.dest('dist/css'));
// });

gulp.task('sass', function () {
  return gulp.src('src/css/*.sass')
    .pipe(concat("styles.sass"))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
    .pipe(concat('script.min.js'))
    //.pipe(uglify()) //compression js
    .pipe(gulp.dest('dist/js'));
});

gulp.task('glyphicons', function () {
    return gulp.src('bower_components/glyphicons/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('fontawesome', function () {
    return gulp.src('bower_components/font-awesome/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fontawesomefonts', function () {
    return gulp.src('bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('jquery', function () {
    return gulp.src('bower_components/jquery/dist/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('bootstrap', function () {
    return gulp.src('bower_components/bootstrap/dist/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('bootstrapjs', function () {
    return gulp.src('bower_components/bootstrap/dist/js/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('backbone', function () {
    return gulp.src('node_modules/backbone/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('underscore', function () {
    return gulp.src('node_modules/underscore/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('bower', function() {
    var filterJS = filter(['**/*.js'], { restore: true });
    var filterCSS = filter(['**/*.css'], { restore: true });
    return gulp.src('bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/bootstrap.css'
                        //'./dist/fonts/*.*'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('libs.min.js'))
        //.pipe(ignore.exclude([ "*.map" ]))
        //.pipe(uglify().on('error', gulpUtil.log))
        //.pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(filterCSS.restore)
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.sass', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
});
