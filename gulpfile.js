
var gulp = require('gulp');
var clean = require('gulp-clean');
var wrap = require("gulp-wrap");
var uglify = require("gulp-uglify");
var named = require('vinyl-named');
var webpack = require('gulp-webpack');

gulp.task('clean-bin', function() {
  // TODO: copy file from tmp to bin
  return gulp.src('bin', {read: false})
        .pipe(clean());
});

gulp.task('clean-tmp', function() {
  // TODO: copy file from tmp to bin
  return gulp.src('tmp', {read: false})
        .pipe(clean());
});

gulp.task('clean', ['clean-bin', 'clean-tmp']);

gulp.task('lint', function() {
  // TODO optional: lint code
});

gulp.task('compile', ['lint', 'clean-tmp'], function() {
  return gulp.src(['src/**/*.js'])
  // TODO optional: insert compilation here
    .pipe(gulp.dest('tmp/out/compile'));
});

gulp.task('pack', ['compile'], function(callback) {
  return gulp.src(['tmp/out/compile/*.js'])
    .pipe(named())
    .pipe(webpack({ 'devtool': '#source-map' }))
    .pipe(gulp.dest('tmp/out/pack'));
});

gulp.task('build', ['pack', 'clean-bin'], function() {
  return gulp.src(['tmp/out/pack/*.js'])
    .pipe(wrap({ src: 'header.js' }))
    .pipe(gulp.dest('bin/debug'))
    .pipe(uglify({
      mangle: false,
      preserveComments: function(node, comment) {
        var s = comment.value;
        return s[0] === '!' || s[0] === ':';
      }
    }))
    .pipe(gulp.dest('bin'));
});