// Копируем папку с файлами static
const copy = () => {
  return app.gulp.src(app.path.src.static)
  .pipe(app.gulp.dest(app.path.build.static));// было .pipe(gulp.dest(path.build.static));
};

export { copy };