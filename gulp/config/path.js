// файл с различными уптями
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // папка со сборкой
const srcFolder = `./src`; //исходники

const path = {
  // пути
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
    favicon: `${buildFolder}/`,
  },
  src: {
    js: `${srcFolder}/js/**/*`,
    scss: `${srcFolder}/scss/style.scss`, //1 файл scss
    html: `${srcFolder}/*.html`, // мб несколько страниц
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    static: `${srcFolder}/static/**/*.*`,
    favicon: `${srcFolder}/favicon.ico`,
    // fonts шрифты редко меняютсЯ, поэтоум их здесь нет
    // svgIcons: `${srcFolder}/sprite_icons/*.svg`,
  },
  //наблюдатель за изменениями
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`, // "**/*.html" = все файлы с расширением
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`, // "**/*.*" = все файлы
    // svgIcons: `${srcFolder}/sprite_icons/*.svg`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: ``, // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
};

export { path };
