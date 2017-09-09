import babel from "gulp-babel";
import babelify from "babelify";
import browserify from "browserify";
import buffer from "vinyl-buffer";
import del from "del";
import eslint from "gulp-eslint";
import gulp from "gulp";
import gutil from "gulp-util";
import mocha from "gulp-mocha";
import reactify from "reactify";
import rename from "gulp-rename";
import sass from "gulp-sass";
import source from "vinyl-source-stream";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";

const paths = {
	build: "build",
	public: "public",
	publicCss: "public/css",
	publicFonts: "public/fonts",
	server: "server/**/*.js",
	test: "test/**/*.js",
	browser: "browser/**/*.js",
	styles: "styles/**/*.scss",
	views: "views/",
	cssDeps: [
		"node_modules/bootstrap/dist/css/*.css",
		"node_modules/font-awesome/css/*.css"
	],
	fontDeps: [
		"node_modules/font-awesome/fonts/*"
	]
};

paths.sources = [paths.test, paths.server, paths.browser];

gulp.task("browser", () => {
	// set up the browserify instance on a task basis
	const b = browserify({
		entries: "./browser/app.js",
		transform: [babelify, reactify]
	});

	return b.bundle()
		.pipe(source("app.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		// Add transformation tasks to the pipeline here.
		.pipe(uglify())
		.on("error", gutil.log)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.public));
});

gulp.task("clean", (cb) => {
	return del([paths.build, paths.public], () => cb());
});

gulp.task("lint", () => {
	return gulp.src(paths.sources)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("test", ["lint", "build", "test:deps"], () => {
	return gulp.src("build/test/**/*-test.js")
		.pipe(mocha());
});

gulp.task("test:deps", ["test:deps:mocha", "test:deps:babel"], () => {});

gulp.task("test:deps:mocha", () => {
	return gulp.src(["test/**/*.opts", "test/helpers/**/*.js"])
		.pipe(gulp.dest("build/test"));
});

gulp.task("test:deps:babel", () => {
	return gulp.src(paths.browser)
		.pipe(babel())
		.pipe(gulp.dest(`${paths.build}/browser`));
});

gulp.task("styles", () => {
	return gulp.src(paths.styles)
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest(paths.public));
});

gulp.task("scripts", ["scripts:source", "scripts:test"], () => {});

gulp.task("scripts:source", () => {
	return gulp.src(paths.server)
		.pipe(babel())
		.pipe(rename((path) => {
			path.basename = path.basename.split(".")[0];
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task("scripts:test", () => {
	return gulp.src(paths.test)
		.pipe(babel())
		.pipe(rename((path) => {
			path.basename = path.basename.split(".")[0];
		}))
		.pipe(gulp.dest(`${paths.build}/test`));
});

gulp.task("views", () => {
	return gulp.src(paths.views)
		.pipe(gulp.dest(paths.public));
});

gulp.task("build", ["scripts", "styles", "views", "browser"]);
