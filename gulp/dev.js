import gulp from 'gulp'

gulp.task('dev',
  gulp.series(
    'clean:dev',
    'svgsprites',
    gulp.parallel('html:dev', 'scss:dev', 'js:dev'),
    'img:dev',
    'server'
  ))