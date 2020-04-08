/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-08 10:25:55
 * @LastEditors: lax
 * @LastEditTime: 2020-04-08 10:35:46
 */
/* gulp-js */
const
    path = require("path"),
    STATIC = require("../gulpfile-static"),
    gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    browserify = require("browserify"),
    watchify = require("watchify"),
    uglify = require("gulp-uglify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    gif = require("gulp-if"),
    babel = require("gulp-babel"),
    logger = require("gulp-logger"),
    livereload = require("gulp-livereload"),
    errorHandler = require("./../gulpUtils/gulp-errorHandler"),
    requireDir = require("require-dir");
    requireDir("../gulpModule");

function toJs(){
    return browserify({
        entries: [path.join(STATIC.ASSETS_PATH + "index.js")],
        plugin: [watchify],
    }).bundle()
    .on("error",errorHandler)
    .pipe(plumber())
    .pipe(source(STATIC.JS_FILE_NAME))
    .pipe(buffer())
    .pipe(logger({showChange: true}))
    .pipe(babel({presets: [STATIC.ES_PRESET]}))
    /* compress code */
    .pipe(gif(STATIC.ISPRODUCTION, uglify()))
    .pipe(gulp.dest(STATIC.SOURCE_PATH + STATIC.PROJECT_PATH + "js/"))
    .pipe(gulp.dest(STATIC.BULID_PATH + STATIC.PROJECT_PATH + "rev/js"));
}

function jsWatch(){
    livereload.listen();
    return gulp.watch(
        STATIC.ASSETS_PATH+STATIC.PROJECT_PATH+"js/*js",
        gulp.series("js","rev")
    );
}

gulp.task("js",toJs);
gulp.task("jsWatch",jsWatch);