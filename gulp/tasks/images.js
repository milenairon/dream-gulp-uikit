import webp from "gulp-webp"; // !!! при установке возникает 11 серьезных ошибок
import imageMin from "gulp-imagemin"; // !!! при установке возникает 8 серьезных ошибок

// import { isBuild } from "../../gulpfile.js";

const images = () => {
  return app.gulp
    .src(app.path.src.images, { encoding: false })
    .pipe(app.plugins.handleError("IMAGES"))
    .pipe(app.plugins.newer(app.path.build.images)) // обработка неизмененных изображений или таких, которых не было в dest
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images, { encoding: false })) // опять получить доступ к исходным изображениям
    .pipe(app.plugins.newer(app.path.build.images)) // обработка неизмененных изображений или таких, которых не было в dest
    .pipe(
      imageMin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 5, // 0 to 7
      })
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream()); // обновляем браузер
};

export { images };
