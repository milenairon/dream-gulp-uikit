// Удаляет папку с резульатом
import { deleteAsync } from "del";
// import { path } from "../config/path";

const reset = () => deleteAsync(app.path.clean);

export { reset };
