import gulp from 'gulp';
import uglify from 'gulp-uglify'
import md5 from 'gulp-md5-plus';
import changed from 'gulp-changed';
import requirejsOptimize from 'gulp-requirejs-optimize';

function script() {
  return gulp
    .src('./src/static/js/**/*.js')
    .pipe(changed('./dev/js'))
    .pipe(gulp.dest('./dev/js'));
}

gulp.task('js', script);


function rjs() {
  return gulp
    .src('./src/static/js/page/**/*.js')
    .pipe( // 参考 https://github.com/hoyinWong/requirejs-gulp
      requirejsOptimize({
        optimize: 'none', //uglify
        mainConfigFile: 'src/static/js/config.js'
      }))
    .pipe(gulp.dest('./dev/js/page'));
}
// 合并requireJs 模块
gulp.task('rjs', rjs);

// js开发模式
gulp.task('js:dev', () => {
  gulp.watch(['./src/static/js/**/*.js'], (event) => {
    return script(event.path).pipe(global.browserSync.reload({
      stream: true
    }));
  });
  return script();
});

// js 打包压缩
gulp.task('js:dev2dist', () => {
  return gulp.src('dev/js/**/*.js')
    .pipe(uglify())
    .pipe(md5(6, './dist/*.html'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('js:prod', gulp.series('js', 'rjs', 'js:dev2dist'))