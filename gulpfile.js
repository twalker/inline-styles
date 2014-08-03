var gulp = require('gulp')
  , bump = require('gulp-bump')
  , jshint = require('gulp-jshint')
  , livereload = require('gulp-livereload');

gulp.task('js', function() {
  return gulp.src(['./style2style.js','./test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Increment packages by patch point
gulp.task('bump', function(){
  gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function(){
  livereload.listen();
  gulp.watch([
    './*.js',
    './test/*.js',
  ]).on('change', function(file){
    //console.log(file.path + ' changed')
    livereload.changed(file)
  });

});

gulp.task('default', function(){
  gulp.start('js');
});
