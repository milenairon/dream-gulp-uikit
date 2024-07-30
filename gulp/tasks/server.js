// import { plugins } from '../config/plugins.js';
// import { path } from "../config/path.js";
// import getIp from "dev-ip";

const server = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: app.path.build.html, // baseDir: filePaths.build.html,
    },
    // host: getIp(),
    notify: false,
    port: 3000,
  });
};

export { server };
