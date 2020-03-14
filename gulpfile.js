const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');

//compile scss into css
function style() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        port: 5000,
        server: {
           baseDir: ".",
           index: "index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', style)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}


gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/pke.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});

exports.style = style;
exports.watch = watch;
