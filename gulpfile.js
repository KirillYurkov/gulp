"use strict";
import gulp from "gulp";
import * as dartSass from "sass"; //работа с препроцессором sass,scss
import gulpSass from "gulp-sass"; //работа с препроцессором sass,scss
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer"; //добавляет префиксы стилям для разных браузеров
import sourcemaps from "gulp-sourcemaps"; //путь к файлу в devtools
import cleanCSS from "gulp-clean-css"; //минификация css
import browserSync from "browser-sync"; //локальный сервер
import rename from "gulp-rename"; // просто переименовывает фаулы
import fileInclude from "gulp-file-include"; //добавление кусочко кода
import { deleteAsync } from "del";
import ttf2woff2 from "gulp-ttf2woff2"; // конвертер шрифтов в формат woff2
import webp from "gulp-webp"; // конвертер изображений в формат webp
import babel from "gulp-babel"; //конвертер js кода из новых версий в тарые для браузеров
import uglify from "gulp-uglify"; //минификация js
import concat from "gulp-concat"; //объединяет и переминовывает все файлы в один
import svgSprite from "gulp-svg-sprite"; //создание svg файла с готовыми id

//массивы путей для return gulp.src
const cssFiles = [
  "./src/css/star_rating.css",
  "./src/css/swiper-bundle.min.css",
  "./src/css/calendar.css",
];
const scssFiles = ["./src/scss/**/*.scss"];
const jsFiles = [
  "./src/js/main.js",
];
const jsLibsFiles = [
  "./src/js/js_libs/star_rating.js",
  "./src/js/js_libs/swiper-bundle.js",
];
const jsonFiles = ["./src/json_files/*.json"];
const phpFiles = ["./src/*.php"];
const phpMailer = ["./src/PHPMailer-master/PHPMailer-master/**/*.*"];

//одиночные пути для return gulp.src и gulp.dest
const paths = {
  htmls: {
    src: "./src/**/*.html",
    dest: "./app/",
  },
  styles: {
    dest: "./app/css/",
  },
  scripts: {
    dest: "./app/js/",
  },
  images: {
    src: "./src/img/**/*.*",
    dest: "./app/img/",
  },
  svgMono: {
    src: "./src/img/svg_mono/*.svg",
    dest: "./app/img/",
  },
  svgMulti: {
    src: "./src/img/svg_multi/*.svg",
    dest: "./app/img/",
  },
  fonts: {
    src: "./src/fonts/*.*",
    dest: "./app/fonts/",
  },
  json: {
    dest: "./app/json_files/",
  },
  php: {
    dest: "./app/",
  },
  phpMailer: {
    dest: "./app/PHPMailer-master/",
  },
};
// Удаление папки Арр
export function delApp() {
  return deleteAsync(["./app"]);
}
// Работа с кусочками html
export function htmlInclude() {
  return gulp
    .src([paths.htmls.src])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(gulp.dest([paths.htmls.dest]))
    .pipe(browserSync.stream());
}
// Перегонка шрифтов
export function fontsToApp() {
  return gulp.src([paths.fonts.src]).pipe(gulp.dest([paths.fonts.dest]));
}
// Конвертация шрифтов
export function fontsToWoff2() {
  return gulp
    .src([paths.fonts.src], {
      encoding: false, // Important!
      removeBOM: false,
    })
    .pipe(ttf2woff2())
    .pipe(gulp.dest([paths.fonts.dest]));
}
// Работа со стилями
export function css() {
  return gulp
    .src(cssFiles)
    .pipe(gulp.dest([paths.styles.dest]))
    .pipe(browserSync.stream());
}
export function scss() {
  return gulp
    .src(scssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
      }),
    )
    .pipe(
      cleanCSS({
        level: 2,
      }),
    )
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest([paths.styles.dest]))
    .pipe(browserSync.stream());
}

// Простое копирование картинок без сжатия
export function imgToApp() {
  return gulp
    .src([paths.images.src], { encoding: false })
    .pipe(gulp.dest([paths.images.dest]));
}
// Сжатие картинок
export function imgToWebp() {
  return gulp
    .src([paths.images.src], { encoding: false })
    .pipe(webp())
    .pipe(gulp.dest([paths.images.dest]));
}
export function svgMono() {
  return gulp
    .src([paths.svgMono.src])
    .pipe(
      svgSprite({
        mode: {
          //объединяем svg в спрайт
          stack: {
            sprite: "../svg-mono.svg",
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                //плагин для обработки svg
                plugins: [
                  "removeStyleElement",
                  {
                    name: "removeAttrs",
                    params: {
                      attrs: "(|class|data-name|fill|stroke|width|height)",
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    )
    .pipe(gulp.dest([paths.svgMono.dest]));
}
export function svgMulti() {
  return gulp
    .src([paths.svgMulti.src])
    .pipe(
      svgSprite({
        mode: {
          //объединяем svg в спрайт
          stack: {
            sprite: "../svg-multi.svg",
          },
        },
      }),
    )
    .pipe(gulp.dest([paths.svgMulti.dest]));
}

export function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}
export function scriptsLibs() {
  return gulp
    .src(jsLibsFiles)
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}
// Работа с json
export function json() {
  return gulp
    .src(jsonFiles)
    .pipe(gulp.dest([paths.json.dest]))
    .pipe(browserSync.stream());
}
// php
export function php() {
  return gulp
    .src(phpFiles)
    .pipe(gulp.dest([paths.php.dest]))
    .pipe(browserSync.stream());
}
// phpMailer
export function phpMail() {
  return gulp
    .src(phpMailer)
    .pipe(gulp.dest([paths.phpMailer.dest]))
    .pipe(browserSync.stream());
}
//Слежение за файлами(онлайн обновление)
export function watcher() {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });
  gulp.watch(paths.htmls.src, htmlInclude);
  gulp.watch(paths.fonts.src, fontsToApp);
  gulp.watch(paths.fonts.src, fontsToWoff2);
  gulp.watch(cssFiles, css);
  gulp.watch(scssFiles, scss);
  gulp.watch(paths.images.src, imgToApp);
  gulp.watch(paths.images.src, imgToWebp);
  gulp.watch(paths.svgMono.src, svgMono);
  gulp.watch(paths.svgMulti.src, svgMulti);
  gulp.watch(jsFiles, scripts);
  gulp.watch(jsFiles, scriptsLibs);
  gulp.watch(jsonFiles, json);
  gulp.watch(phpFiles, php);
  gulp.watch(phpMailer, phpMail);
}
//Cборка для dev
const dev = gulp.series(
  delApp,
  fontsToApp,
  htmlInclude,
  gulp.parallel(css, scss, scripts, scriptsLibs, svgMono, svgMulti, json),
  imgToWebp,
  php,
  phpMail,
  watcher,
);
export { dev };
gulp.task("default", dev);

//Cборка для prod
const prod = gulp.series(
  delApp,
  fontsToWoff2,
  htmlInclude,
  gulp.parallel(css, scss, scripts, scriptsLibs, svgMono, svgMulti),
  imgToWebp,
  php,
  phpMail,
  watcher,
);
export { prod };
gulp.task("prod", prod);
