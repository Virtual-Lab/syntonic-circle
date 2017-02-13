var browserSync  = require('browser-sync');
var source       = require('vinyl-source-stream');
var gutil        = require('gulp-util');
var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var concat       = require('gulp-concat');

var ghPages     = require('gulp-gh-pages');

var prod = false;

var onError = function(err) {
  console.log(err.message);
  this.emit('end');
};

// deploy to gh-pages
gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
    .pipe(ghPages());
    });


// libs: the third-party libs like Three.js, TweenLite, etc.
gulp.task('libs', function() {
 return gulp.src('./js/vendor/*.js')
 .pipe(gulp.dest('./build/js/vendor'));
 });

// js
gulp.task('js', function() {
  return gulp.src('./js/*.js')
  .pipe(gulp.dest('build/js'))
  });

// html
gulp.task('html', function() {
  return gulp.src('./*.html')
  //.pipe(processhtml())f
  .pipe(gulp.dest('build'))
  });

// css
gulp.task('css', function() {
  return gulp.src('./css/*.css')
  .pipe(gulp.dest('build/css'))
  });

// images
gulp.task('images', function() {
  return gulp.src('./images/*.*')
  .pipe(gulp.dest('build/images'))
  });


// sass
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
  .pipe(sass({
      includePaths: [].concat(['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src'])
      }))
  .on('error', onError)
  .pipe(prod ? minifycss() : gutil.noop())
  .pipe(prod ? autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
      }) : gutil.noop())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
  });


// browser sync server for live reload
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
        });
    gulp.watch('./*.html', ['html']);
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./js/*.css', ['js']);
    });

// use gulp-sequence to finish building html, sass and js before first page load
gulp.task('default', gulpSequence(['images', 'html', 'sass', 'css', 'libs', 'js'], 'serve'));