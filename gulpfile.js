/* Requires */
var gulp = require('gulp');
var sass = require('gulp-sass');

// Create method required by Browsersync
var browserSync = require('browser-sync').create();

// postcss required for autoprefixer
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


/* Tasks */
gulp.task('scss', function() {
    
    // Add support to last two versions of modern browsers
    var processors = [
        autoprefixer({ browsers: ['last 2 versions']}),
    ];
    
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'))
        
        // Make sure Browsersync runs after the css is finished compiling
        .pipe(browserSync.reload({
            stream:true
    }))
})

// Initiallize Browsersync
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
})

// Watch for changes and show updates
gulp.task('watch', ['browser-sync', 'scss'], function() {
    // glob watches for files and files inside folders
    gulp.watch('./scss/**/*.scss', ['scss'])
})