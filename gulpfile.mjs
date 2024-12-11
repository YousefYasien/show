import gulp from 'gulp';
import sass from 'gulp-dart-sass'
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import browserify from 'gulp-browserify';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

// Set the Dart Sass compiler for gulp-sass


const paths = {
  styles: ['./css/*.css', './css/scss/*.scss'],
  output: './dist/css',
  js: './js/*.js',
  jsOutput: './dist/js',
  images: './src/img/*.jpg',
  imagesOutput: './dist/src',
};

// Compile SCSS to CSS, minify and add sourcemaps
function compileCss() {
  return gulp.src(paths.styles)
    .pipe(plumber()) // Prevent pipeline breaking on error
    .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(concat('main.css')) // Concatenate all CSS into one file
    .pipe(cleanCSS()) // Minify the CSS
    .pipe(sourcemaps.write('.')) // Write sourcemaps to the output directory
    .pipe(gulp.dest(paths.output)); // Save to output folder
}

// Process JavaScript (Babel, Browserify, Uglify)
function js() {
  return gulp.src(paths.js)
    .pipe(plumber()) // Prevent pipeline breaking on error
    .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(babel({
      presets: ['@babel/preset-env'] // Compile to compatible JavaScript
    }))
    .pipe(concat('main.js')) // Concatenate all JS into one file
    .pipe(browserify()) // Bundle the JavaScript with Browserify
    .pipe(uglify()) // Minify the JS
    .pipe(sourcemaps.write('.')) // Write sourcemaps to the output directory
    .pipe(gulp.dest(paths.jsOutput)); // Save to output folder
}

// Optimize images
function images() {
  return gulp.src(paths.images)
    .pipe(imagemin()) // Optimize images
    .pipe(gulp.dest(paths.imagesOutput)); // Save optimized images
}

// Watch for changes in files
function watchFiles() {
  gulp.watch(paths.js, js); // Watch for JS changes
  gulp.watch(paths.images, images);
  gulp.watch(paths.styles, compileCss) // Watch for image changes
}



// Default task - to run all tasks in sequence
export default gulp.series(compileCss, js, images, );

// Watch task - to run tasks and then watch for file changes
export const watch = gulp.series( js, images, watchFiles, compileCss);
