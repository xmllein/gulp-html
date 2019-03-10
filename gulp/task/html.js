import gulp from 'gulp';
import minifyHtml from 'gulp-minify-html';
import fileinclude from 'gulp-ex-file-include';
import changed from 'gulp-changed';
import cachebust from 'gulp-cache-hyper-bust';
import cdnify from 'gulp-cdnify';
import gulpRemoveHtml from 'gulp-remove-html';

import config from '../config';

// 处理html 任务
function html() {
  return gulp
    .src('./src/html/**/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file', //引用文件路径
      indent: true //保留文件的缩进
    }))
    .pipe(changed('./dev'))
    .pipe(gulp.dest('./dev'))
}

gulp.task('html', html);

// 开发模式
gulp.task('html:dev', () => {

  gulp.watch('./src/html/**/*.html', (event) =>{
    return html(event.path)
      .pipe(global.browserSync.reload({
        stream: true
      }))
  });

  return html();
});


// 打包模式
gulp.task('html:dev2dist', () => {
  return gulp
    .src(['./dev/**/*.html','!./dev/common/**/*.html'])
    .pipe(minifyHtml(config.tasks.html.htmlmin)) //html 压缩
    .pipe(cachebust({ //后缀添加当前时间戳
      images: true,
      showLog: true,
      type: 'timestamp'
    }))
    .pipe(gulpRemoveHtml()) //打包删除多余的html代码
    .pipe(cdnify({ //添加cdn
      base: config.root.cdnUrl,
      html:{
        'script[data-main]': 'data-main'
      }
    }))
    
    .pipe(gulp.dest('./dist'))
})

gulp.task('html:prod', gulp.series('html', 'html:dev2dist'));