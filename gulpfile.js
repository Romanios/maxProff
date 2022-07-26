const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");


// Плагины
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const cheerio      = require('gulp-cheerio');
const svgSprite    = require('gulp-svg-sprite');
const replace      = require('gulp-replace');
const imagemin     = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
// const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;



// Обработка HTML
const html = function() {
  return src("./src/html/*.html")
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: "HTML",
      message: error.message
    }))
  }    
  ))
  .pipe(fileInclude())
  .pipe(size({ title: "HTML до сжатия" }))
  .pipe(htmlmin( {
    collapseWhitespace: true
  }
  ))
  .pipe(size({ title: "HTML после сжатия" }))
  .pipe(dest("./dist")) 
  .pipe(browserSync.stream());
   
}


//Конвертация стилей из препроцессора в css, создание карты стилей
function styles() {
  return src('./src/scss/main.scss')
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: "SCSS",
      message: error.message
    }))
  }    
  ))
    .pipe(sourcemaps.init())
    .pipe(size({ title: "SCSS до сжатия" }))
    .pipe(scss({outputStyle: 'expanded'})) // Если в build нуже сжатый файл, expanded заменить на compressed
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(sourcemaps.write())
    .pipe(size({ title: "CSS после сжатия" }))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
}


//Создание svg-спрайтa

function svgsprite() {
  return src('./src/img/svg/**.svg')
  .pipe(cheerio({
     run: function ($) {  //убираем атрибуты svg
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
     },
     parserOptions: {xmlMode: true}
  }))
  .pipe(replace('&gt;', '>'))  //исправляем ошибки, если есть
     .pipe(svgSprite({
        mode: {
           stack: {
              sprite: "../sprite.svg"  //sprite file name
           }
        },
     }
  ))
     .pipe(dest('./dist/img'));
}



// Сжатие картинок и перенос в папку dist
function imagesmin() {
  return src(['./src/img/**/*.*', '!./src/img/svg/*.svg'])
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('./dist/img'));
}

function images() {
  return src(['./src/img/**/*.*', '!./src/img/svg/*.svg'])
  .pipe(dest('./dist/img'));
}

// Конвертация шрифтов
function fonts() {
  return src(['./src/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(dest('./dist/fonts/'));
}
function fonts2() {
  return src(['./src/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(dest('./dist/fonts/'));
}



// Минимификация и переименование js-файлов
function script() {
  return src([
    // 'node_modules/jquery/dist/jquery.js',
    './src/js/main.js'
 ])
 .pipe(concat('main.min.js'))
 .pipe(uglify())
 .pipe(dest('./dist/js/'))
 .pipe(browserSync.stream());
}


// Копирование файлов
function copyJs() {
  return src("./src/js/libs/*.js")
  .pipe(dest("./dist/js/libs/"));
}

function copyCss() {
  return src("./src/scss/libs/*.css")
  .pipe(dest("./dist/css/libs/"));
}


// Удаление директории dist
const clear = function() {
  return del("./dist")
}


// Синхронизация (сервер)
const server = function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}


// Наблюдение за файлами
const watcher = function() {
  watch("./src/html/**/*.html", html);
  watch(['./src/scss/**/*.scss'], styles);
  watch("./src/js/**/*.js", script);
  watch(['./src/img/**/*.*', '!./src/img/svg/*.svg'], images);
  watch(['./src/img/svg/**/*.svg'], svgsprite);
  watch(['./src/js/libs/*.js'], copyJs);
  watch(['./src/scss/libs/*.css'], copyCss);
}


// Задачи
exports.html = html;
exports.styles = styles;
exports.imagesmin = imagesmin;
exports.images = images;
exports.svgsprite = svgsprite;
exports.fonts = fonts;
exports.fonts2 = fonts2;
exports.script = script;
exports.watch = watcher;
exports.clear = clear;
exports.copyJs = copyJs;
exports.copyCss = copyCss;


// Конвертация и подключение шрифтов
exports.font = series(
  fonts,
  fonts2,
)

// Разаработка
exports.dev = series(
  html,
  script,
  svgsprite,
  images,
  parallel(styles, copyJs, copyCss, watcher, server)
);

// Сборка проекта
exports.build = series(
  clear,
  html,
  script,
  svgsprite,
  imagesmin,
  // fonts,
  // fonts2,
  parallel(styles, copyJs, copyCss, watcher, server)
);