/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-08 10:25:55
 * @LastEditors: lax
 * @LastEditTime: 2020-04-08 10:31:39
 */
const
    gulp = require("gulp"),
    requireDir = require("require-dir");
    requireDir("./gulpModule");


/* default */

gulp.task("jsV",gulp.series("js"));

gulp.task("default",
    gulp.series(
        "jsV",
        gulp.parallel("jsWatch")
    )
);