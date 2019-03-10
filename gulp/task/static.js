import gulp from 'gulp';
//favicon 开发处理
gulp.task('favicon:dev', () => {
  return gulp.src('./favicon.ico')
    .pipe(gulp.dest('./dev'));
});
// favicon 打包处理
gulp.task('favicon:dist', () => {
  return gulp.src('./favicon.ico')
    .pipe(gulp.dest('./dist'));
});