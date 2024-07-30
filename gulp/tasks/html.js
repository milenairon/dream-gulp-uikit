import fileInclude from "gulp-file-include"; // чтобы файл html собирался и разбирал @@include
// УСТАНОВКА ПЛАГИНА ВЫЗЫВАЕТ ОШИБКУ
// import webpHtmlNosvg from "gulp-webp-html-nosvg"; // УСТАНОВКА ПЛАГИНА ВЫЗЫВАЕТ СЕРЬЕЗНУЮ ОШИБКУ
// import versionNumber from "gulp-version-number"; // УСТАНОВКА ПЛАГИНА ВЫЗЫВАЕТ СЕРЬЕЗНУЮ ОШИБКУ
// import htmlMin from "gulp-htmlmin"; // !!! Не работает сборка из-за него
// УСТАНОВКА ПЛАГИНА ВЫЗЫВАЕТ ОШИБКУ beautify from "gulp-beautify";

// import { isBuild } from "../../gulpfile.js";

const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(app.plugins.handleError("HTML")) // вывод сообщения при ошибке в браузере
      .pipe(fileInclude()) // разбирает @@include на код
      .pipe(app.plugins.replace(/@images\//g, "images/")) // искать все @images... и менять на images/
      /* // Раскомментировать, если надо обернуть в picture .pipe(webpHtmlNosvg()) // обворачивает в picture и подключается в формате webp //.pipe(plugins.if(app.isBuild, webpHtml()))*/
      // .pipe(
      //   htmlMin({
      //     useShortDoctype: true,
      //     sortClassName: true,
      //     collapseWhitespace: false,
      //     removeComments: false,
      //   })
      // )
      // .pipe(
      //   plugins.if(
      //     isBuild,
      //     beautify.html({
      //       indent_size: "4",
      //       indent_char: " ",
      //       max_preserve_newlines: "2",
      //       preserve_newlines: true,
      //       keep_array_indentation: false,
      //       break_chained_methods: true,
      //       indent_scripts: "keep",
      //       brace_style: "end-expand",
      //       space_before_conditional: true,
      //       unescape_strings: false,
      //       jslint_happy: false,
      //       end_with_newline: true,
      //       wrap_line_length: "0",
      //       indent_inner_html: false,
      //       comma_first: false,
      //       e4x: false,
      //       indent_empty_lines: false,
      //     })
      //   )
      // )
      // .pipe(
      //   // решает проблему с кэшэм в браузере // УСТАНОВКА ПЛАГИНА ВЫЗЫВАЕТ СЕРЬЕЗНУЮ ОШИБКУ
      //   // plugins.if(
      //   //   app.isBuild,
      //   versionNumber({
      //     value: "%DT%",
      //     append: {
      //       key: "_v",
      //       cover: 0,
      //       to: ["css", "js"],
      //     },
      //     output: {
      //       file: "gulp/version.json", // создаться папка с ключом
      //     },
      //   })
      //   // )
      // )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browserSync.stream()) // отслеживает изменения и корректирует локальный сервер
  );
};

export { html };
