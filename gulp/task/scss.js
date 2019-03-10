import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import md5 from 'gulp-md5-plus';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import cdnify from 'gulp-cdnify';
import spriter from 'gulp-css-spriter-dookay';
import imgCachebust from 'gulp-css-img-cachebust';
import config from '../config';


let devServer = false;

function scss() {
  // let timestamp = +new Date();
  return gulp
    .src('./src/static/css/*.scss')
    .pipe(gulpif(devServer, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpif(devServer, sourcemaps.write()))
    .pipe(changed('./dev/css'))
    .pipe(spriter({ //gulp-css-spriter-dookay
      // 生成的spriter的位置
      // spriteSheet: './dev/images/sprite' + timestamp + '.png',
      spriteSheet: './dev/images/sprite.png',
      // 生成样式文件图片引用地址的路径
      // 如下将生产：backgound:url(../images/sprite20324232.png)
      // pathToSpriteSheetFromCSS: '/images/sprite' + timestamp + '.png',
      pathToSpriteSheetFromCSS: '/images/sprite.png',
      spritesmithOptions: {
        padding: 10,
        //图片排列格式，默认是binary-tree，top-down|left-right|diagonal|alt-diagonal|binary-tree
        algorithm: 'alt-diagonal',
        algorithmOpts: {
          sort: false
        } //是否排序
      },
      matchReg: { // 过滤是否需要合并的图片
        pattern: "\.\./images\/sprite\/"
      }
    }))
    .pipe(gulp.dest('./dev/css'));
}

gulp.task('scss', scss)
// css 开发模式
gulp.task('scss:dev', () => {
  devServer = true
  gulp.watch(['./src/static/css/*.scss'], (event) => {
    return scss(event.path).pipe(global.browserSync.reload({
      stream: true
    }));
  });
  return scss();
});

// css 打包模式
gulp.task('scss:dev2dist', () => {
  return gulp.src('./dev/css/*.css')
    // .pipe(imgCachebust()) // 图像URL 添加随机数
    .pipe(cleanCSS()) // 压缩css
    .pipe(md5(6, ['./dist/*.html'])) 
    .pipe(cdnify({ //添加cdn
      base: config.root.cdnUrl,
      files: ['**/*.{gif,png,jpg,jpeg}']
    }))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('scss:prod', gulp.series('scss', 'scss:dev2dist'));