import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

/**
 * Импорт задач
 */
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import {
  otfToTtf,
  ttfToWoff,
  unloadingWoff,
  fontStyle,
} from "./gulp/tasks/fonts.js";
import { copyFavicon } from "./gulp/tasks/copyFavicon.js";
// import { createSvgSprite } from './gulp/tasks/createSvgSprite.js';
// import { zip } from './gulp/tasks/zip.js';
// import { ftp } from './gulp/tasks/ftp.js';

// Передаем значения в глобальную переменную
global.app = {
  // isBuild: process.argv.includes('--build'),
  // isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
};

// const isBuild = process.argv.includes('--build');
// const isDev = !process.argv.includes('--build');

gulp.task("default", copy);

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.static, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, unloadingWoff, fontStyle);

//Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, copyFavicon, html, scss, js, images)
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(reset, mainTasks);
// const deployZIP = gulp.series(reset, mainTasks, zip);
// const deployFTP = gulp.series(reset, mainTasks, ftp);
const copyFaviconing = copyFavicon
// Выполнение сценария по умолчанию
gulp.task("default", dev);

// Экспорт сценариев
export { dev, build /*deployZIP, deployFTP, isBuild, isDev*/, copyFaviconing };
