var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
  app_js: ['./evird/src/js/app.jsx'],
  js: ['./evird/src/js/*.js']
};

gulp.task('clean', function(done) {
  del(['build'], done);
});

gulp.task('js', ['clean'], function() {
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./evird/static/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch', 'js']);
