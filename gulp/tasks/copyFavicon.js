// Переложить favicon.ico в папку сборки
const copyFavicon = () => {
  return app.gulp
    .src(app.path.src.favicon, { encoding: false })
    .pipe(app.gulp.dest(app.path.build.favicon));
};

export { copyFavicon };
