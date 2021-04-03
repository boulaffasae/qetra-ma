var gulp = require("gulp");
var gulpif = require("gulp-if");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

var paths = {
  styles: {
    src: "./scss/**/*.scss",
    dest: "./css",
  },
};

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(styles);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.styles = styles;
exports.watch = gulp.series(styles, watch);
exports.build = build;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
