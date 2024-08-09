// import gulp from 'gulp';
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Сжатие CSS файла
import webpCss from "gulp-webpcss"; // Вывод WEBP изображений
import autoPrefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа запросов
// import beautify from "gulp-beautify";

const sass = gulpSass(dartSass);

const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: true }) // было sourcemaps: isDev
      .pipe(app.plugins.handleError("SCSS")) // вывод сообщения при ошибке в браузере
      .pipe(sass({ outputStyle: "expanded" })) // перевод в css
      .pipe(app.plugins.replace(/@img\//g, "../images/")) // перевод изображений из "@img\//g" в "../images/"
      .pipe(sass({ outputStyle: "expanded" })) // перевод в css
      .pipe(groupCssMediaQueries()) // медиазапросы // .pipe(app.plugins.if(isBuild, groupCssMediaQueries()))
      .pipe(
        // Раскомментировать при использовании изображениий.webp
        webpCss({
          webpClass: "webp", // перевод картинок в webp (браузер поддерживает)
          noWebpClass: ".no-webp", // не переводить (браузер не поддерживает)
        })
      )
      .pipe(
        // добавить преффиксы для разных версий браузеров
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
      // .pipe(app.plugins.if(isBuild, beautify.css({
      //   "indent_size": "4",
      //   "indent_char": " ",
      //   "max_preserve_newlines": "2",
      //   "preserve_newlines": true,
      //   "keep_array_indentation": false,
      //   "break_chained_methods": true,
      //   "indent_scripts": "keep",
      //   "brace_style": "end-expand",
      //   "space_before_conditional": true,
      //   "unescape_strings": false,
      //   "jslint_happy": false,
      //   "end_with_newline": true,
      //   "wrap_line_length": "0",
      //   "indent_inner_html": false,
      //   "comma_first": false,
      //   "e4x": false,
      //   "indent_empty_lines": false
      // })))
      // Раскомментировать если нужен не сжатый дубль файла стилей
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(cleanCss()) // сжатие файла
      .pipe(rename({ extname: ".min.css" })) // переименует
      .pipe(app.gulp.dest(app.path.build.css)) // выгружаем в папку с результатом
      .pipe(app.plugins.browserSync.stream()) // локальынй сервер
  );
};

export { scss };
