const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Using Dart Sass
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const paths = {
  'styles': ['./css/*.css', './css/scss/*.scss'],
  'output': './dist/css'
}

function compileCss() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
  .pipe(gulp.dest(paths.output))
}
function watchFiles() {
  return gulp.watch(paths.styles , compileCss())
}

exports.default = gulp.series(compileCss);
exports.watch = gulp.series(compileCss, watchFiles);
