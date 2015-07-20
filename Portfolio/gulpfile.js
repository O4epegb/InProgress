'use strict';

// Инициализируем плагины
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    rename = require("gulp-rename"),
    cache = require('gulp-cache'),
    gutil = require('gulp-util'),
    imageminPngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    exists = require('path-exists').sync,
    mainBowerFiles = require('main-bower-files');

// Функция обработки ошибок
var handleError = function (err) {
    gutil.log(err);
    gutil.beep();
};

// Пути к файлам
var path = {
    html: {
        source: 'source/*.html',
        watch: 'source/*.html',
        destination: './build/'
    },
    css: {
        source: './source/css/*.styl',
        watch: 'source/**/*.styl',
        destination: './build/css/'
    },
    assets: {
        source: './assets/**/*',
        watch: 'assets/**/*',
        destination: './build'
    },
    img: {
        source: './source/img/**/*.{jpg,jpeg,png,gif,svg}',
        watch: 'source/img/**/*',
        destination: './build/img'
    },
    js: {
        plugins: {
            source: './source/js/*.js',
            watch: './source/js/*',
            destination: './build/js'
        }
    }
};

// Собираем html
gulp.task('html', function () {
    gulp.src(path.html.source)
        .on('error', handleError)
        .pipe(gulp.dest(path.html.destination))
        .pipe(reload({
            stream: true
        }));
});

// Локальный сервер
gulp.task('browser-sync', function () {
    browserSync.init([
  '*.html',
  'css/*.css',
  '**/*.{png,jpg,svg}',
  'js/*.js',
  'fonts/*.{eot,woff,woff2,ttf}'
 ], {
        open: true,
        server: {
            baseDir: './build'
        }
    });
});

// Собираем Stylus
gulp.task('stylus', function () {
    gulp.src(path.css.source)
        .pipe(stylus({
            compress: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', '> 5%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .on('error', handleError)
        .pipe(gulp.dest(path.css.destination))
        .pipe(reload({
            stream: true
        }));
});

// Копируем и минимизируем изображения
gulp.task('images', function () {
    gulp.src(path.img.source)
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [imageminPngquant()]
        })))
        .on('error', handleError)
        .pipe(gulp.dest(path.img.destination));
});

// Копируем файлы
gulp.task('copy', function () {
    gulp.src(path.assets.source)
        .on('error', handleError)
        .pipe(gulp.dest(path.assets.destination))
        .pipe(reload({
            stream: true
        }));
	gulp.src('./source/libs/*')
        .on('error', handleError)
        .pipe(gulp.dest('./build/libs/'))
        .pipe(reload({
            stream: true
        }));
});

// Собираем JS
gulp.task('plugins', function () {
    gulp.src(path.js.plugins.source)
		.on('error', handleError)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .on('error', handleError)
        .pipe(gulp.dest(path.js.plugins.destination))
        .pipe(reload({
            stream: true
        }));
});

gulp.task( 'copy-bower-dep', function() {
 
  // Replace files by their minified version when possible
  var bowerWithMin = mainBowerFiles().map( function(path, index, arr) {
    var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
    return exists( newPath ) ? newPath : path;
  });
 
  // Copy them to another directory
  gulp.src( bowerWithMin ).pipe( gulp.dest( './build/libs' ));
});

/*gulp.task('copy-bower-dep', function () {
    gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./build/libs'));
});*/


gulp.task("build", ['copy-bower-dep', 'stylus', 'html', 'images', 'plugins', 'copy']);

gulp.task("default", ["build", "browser-sync"], function () {
    gulp.watch(path.css.watch, ["stylus"]);
    gulp.watch(path.html.watch, ["html"]);
    gulp.watch(path.img.watch, ["images"]);
    gulp.watch(path.js.plugins.watch, ["plugins"]);
    gulp.watch(path.assets.watch, ["copy"]);
});