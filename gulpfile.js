var gulp = require('gulp'),
  gutil = require('gulp-util'),
  marked = require('gulp-marked'),
  webserver = require('gulp-webserver');

var mainsrc = 'builds/markdown/';

gulp.task('md', function() {
  gulp.src(mainsrc + '**/*.md')
    .pipe(marked({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    }))
    .pipe(gulp.dest(mainsrc + 'output'));
});

gulp.task('watch', function() {
  gulp.watch(mainsrc + '**/*.md', ['md']);
});

gulp.task('webserver', function() {
  gulp.src(mainsrc + 'output')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'md', 'webserver']);
