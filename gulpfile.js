/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
*/
var gulp = require('gulp');
var requireDir = require('require-dir');
// Require all tasks in gulp/tasks, including sub folders
requireDir('./gulp/tasks', { recurse: true });
gulp.task('build', ['browserify-libs','browserify']);
gulp.task('build-fast', ['browserify']);
gulp.task('default', ['watch']);
