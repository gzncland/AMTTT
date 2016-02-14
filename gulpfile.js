
var fs = require('fs');
var _ = require('lodash');

var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require("gulp-uglify");
var named = require('vinyl-named');
var webpack = require('gulp-webpack');

gulp.task('clean-bin', function() {
  return gulp.src('bin', {read: false})
    .pipe(clean());
});

gulp.task('clean-tmp', function() {
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
    .pipe(webpack({
      'devtool': '#source-map',
      'plugins': [
        new webpack.webpack.BannerPlugin(
          _.template(fs.readFileSync('header.js', 'utf8'))({
            year: new Date().getFullYear()
          }),
          { raw: true }
        )
      ]
    }))
    .pipe(gulp.dest('tmp/out/pack'));
});

gulp.task('build-debug', ['pack'], function() {
  return gulp.src(['tmp/out/pack/*.js', 'tmp/out/pack/*.map'])
    .pipe(gulp.dest('bin/debug'))
});

gulp.task('build', ['build-debug', 'pack', 'clean-bin'], function() {
  return gulp.src(['bin/debug/*.js'])
    .pipe(uglify({
      mangle: false,
      preserveComments: function(node, comment) {
        var s = comment.value;
        return s[0] === '!' || s[0] === ':';
      }
    }))
    .pipe(gulp.dest('bin'));
});