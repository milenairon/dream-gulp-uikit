// import webpack from 'webpack-stream';
// import beautify from "gulp-beautify";
// import { webpackConfig } from '../../webpack.config.js';
import uglify from "gulp-uglify";
import rename from "gulp-rename";

const js = () => {
  return (
    app.gulp
      .src(app.path.src.js, { sourcemaps: true }) //sourcemaps: app.isDev возможность создания карты исходника
      /*//Раскомментировать, когда перестанут бесить вылазиющие ошибки каждые 0,00001сек.pipe(app.plugins.handleError("JS")) // ошибка*/
      .pipe(uglify()) // сжатие
      // .pipe(app.plugins.if(isBuild, beautify({
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
    //   .pipe(rename({ extname: ".min.js" })) // переименует
      .pipe(app.gulp.dest(app.path.build.js)) // выгружаем в папку с результатом
      .pipe(app.plugins.browserSync.stream()) // локальный сервер
  );
};

export { js };
