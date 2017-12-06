var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browser = require('browser-sync');
var reload = browser.reload;
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var image = require('gulp-image');
var spritesmith = require('gulp.spritesmith');
var phantomjssmith = require('phantomjssmith');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var mmq = require('gulp-merge-media-queries');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var svgSymbols = require('gulp-svg-symbols');
var svgmin = require('gulp-svgmin');
var htmllint = require('gulp-htmllint');
var gutil = require('gulp-util');

var projectConfig = JSON.parse(fs.readFileSync('./static-html-config.json'));

// Browser syn server
gulp.task('serve', ['sass'], function() {
    browser({
        port: process.env.PORT || 4500,
        open: false,
        ghostMode: false,
        server: {
            baseDir: '.'
        }
    });
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(projectConfig.path + 'src/sass/**', ['sass']);
    gulp.watch([projectConfig.path + '*.html', projectConfig.path + 'tpl/**/*.js'], reload);
});

// Copy files task
gulp.task('copy', function() {
    gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('tpl/js/vendor'));
});

// Sass task
// - run sourcemaps
// - run sass
// - run autoprefixer
// - run reload
gulp.task('sass', function () {
    gulp.src(projectConfig.path + './src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 ie version'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./tpl/css'))
        .pipe(reload({
            stream: true
        }));
});


// Sprites SVG task
gulp.task('sprites-svg', function () {
    return gulp.src('html/src/img/svg-symbols/*.svg')
        .pipe(svgSymbols())
        .pipe(gulp.dest('tpl/img'));
});

// Sprites SVG Minify
gulp.task('sprites-svg-minify', function () {
    return gulp.src('tpl/img/svg-symbols.svg')
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            }]
        })).pipe(gulp.dest('tpl/img'));
});

// Image compress
gulp.task('image', function () {
    gulp.src(projectConfig.path + 'tpl/img/**')
        .pipe(image())
        .pipe(gulp.dest('tpl/img'));
});

// Lint task
gulp.task('lint', function () {
    return gulp.src([projectConfig.path + 'tpl/js/main.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// HTML Lint
gulp.task('htmllint', function() {
    return gulp.src('./index-new.html')
        .pipe(htmllint({}, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}

// Minify HTML task
gulp.task('minify-html', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            caseSensitive: false,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            html5: true,
            ignoreCustomComments: false,
            processConditionalComments: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }));
});

// Minify css task
gulp.task('minify-css', function() {
    gulp.src('tpl/css/main.css')
        .pipe(mmq({
          // log: true
        }))
        .pipe(cssnano())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('tpl/css'));
});

// Minify JS jQuery file
// - run concat task
// - run uglify task
// - copy file to new place
gulp.task('minify-js-jquery', function() {
    return gulp.src(projectConfig.path + 'tpl/js/vendor/jquery.js')
        .pipe(concat('jquery.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('tpl/js/vendor'));
});

// Minify JS Main.js file
// - run concat task
// - run uglify task
// - copy file to new place
gulp.task('minify-js-main', function() {
    return gulp.src(projectConfig.path + 'tpl/js/main.js')
        .pipe(concat('main.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('tpl/js'));
});

// Minify JS plugins files
// - run concat task
// - run uglify task
// - copy file to new place
gulp.task('minify-js-plugins', function() {
    return gulp.src(projectConfig.plugins)
        .pipe(concat(projectConfig.path + 'plugins.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('tpl/js'));
});

// Minify all JS files
gulp.task('minify-js-all', function() {
    return gulp.src([
        projectConfig.path + 'tpl/js/vendor/jquery.js',
        projectConfig.path + 'tpl/js/plugins.min.js',
        projectConfig.path + 'tpl/js/main.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('tpl/js'));
});

// Default task
gulp.task('default', ['sass', 'copy', 'watch', 'serve']);

// Compile task
gulp.task('compile', ['sass']);

// Compress images
gulp.task('compress-images', ['image']);

// Compress jQuery
gulp.task('compress-js-jquery', ['minify-js-jquery']);

// Compress plugins
gulp.task('compress-js-plugins', ['minify-js-plugins']);

// Compress main file
gulp.task('compress-js-main', ['minify-js-main']);

// Compress JS all
gulp.task('compress-js-all', ['minify-js-all']);

// Compress CSS
gulp.task('compress-css', ['minify-css']);

// Publish task
gulp.task('publish', ['minify-css', 'minify-js-main']);
