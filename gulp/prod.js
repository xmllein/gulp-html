import gulp from 'gulp';

gulp.task('prod',
  gulp.series(
    'clean',
    'svgsprites',
    'html:prod',
    gulp.parallel('scss:prod', 'js:prod', 'favicon:dist'),
    'img:prod'
  ))