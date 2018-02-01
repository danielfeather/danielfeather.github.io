// Gulp and gulp utilities
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

// Create the browserSync server
let browserSync = require("browser-sync").create("dfeather.me");

gulp.task("compile-css", () => {
    return gulp.src("./scss/site.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
});

gulp.task("minify-css", ["compile-css"], () => {
    return gulp.src("./css/site.css")
        .pipe(cleanCSS())
        .pipe(rename("site.min.css"))
        .pipe(gulp.dest("./css"))
});

gulp.task('browsersync', ["minify-css"], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Dev task with browsersync
gulp.task('dev', ['browsersync'], () => {
    gulp.watch('scss/**/*', ['minify-css'])
    gulp.watch('css/*.min.css', browserSync.reload);
    // Reloads the browser whenever HTML files change
    gulp.watch('*.html', browserSync.reload);
});