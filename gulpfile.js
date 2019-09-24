/*
GULP 4.0 asset (CSS, JS) compiler
https://gulpjs.com/

Instructions:
Run `npm install`

If everything installs correctly, you will have several Gulp commands available,

`gulp` = runs default task of watching files for changes and then compiling
`gulp watch` = same as default task above, watches files
`gulp build` = compiles the assest on command then stops
`gulp resync` = sync WP theme folders with the Docker environment

If issues installing try 
`rm -rf node_modules/` and `rm package-lock.json` then run `sudo npm i --unsafe-perm`
The --unsafe-perm flag ignores some issues caused by running in root (locally)
*/

// constants

const {
  src,
  dest,
  task,
  parallel,
  series,
  watch
} = require("gulp");

const sass = require("gulp-sass");
uglify = require("gulp-uglify");
rename = require("gulp-rename");
notifier = require("node-notifier");
csso = require("gulp-csso");
cssnano = require("cssnano");
postcss = require("gulp-postcss");
del = require("del");
concat = require("gulp-concat");
plumber = require("gulp-plumber");
autoprefixer = require("autoprefixer");
standard = require('gulp-standard');

/* Source Gulp glob vars
 * Be careful on source order, make sure to follow
 * https://gulpjs.com/docs/en/getting-started/explaining-globs
 */

// SASS/CSS
const scssSRC = ["includes/admin/src/css/*.scss"];
const scssPubSRC = ["includes/pub/src/css/*.scss"];
// formatting
const cssASSETS = ["includes/assets/css/*.css"];

// JS
const jsSRC = ["includes/admin/src/js/**.js"];
const jsPubSRC = ["includes/pub/src/js/**.js"];

// tasks

function css() {
  return src(scssSRC)
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: "node_modules"
      })
    )
    .pipe(concat("cookie-compliance-for-wordpress-admin.css"))
    .pipe(dest("includes/assets/css"));
}

function cssPub() {
  return src(scssPubSRC)
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: "node_modules"
      })
    )
    .pipe(concat("cookie-compliance-for-wordpress.css"))
    .pipe(dest("includes/assets/css"));
}

function js() {
  return src(jsSRC)
    .pipe(plumber())
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
    .pipe(concat("cookie-compliance-for-wordpress-admin.js"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(
      uglify({
        ie8: true,
        mangle: {
          reserved: ["$", "jQuery"]
        }
      })
    )
    .pipe(dest("inc/assets/js"));
}

function jsPub() {
  return src(jsPubSRC)
    .pipe(plumber())
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
    .pipe(concat("cookie-compliance-for-wordpress.js"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(
      uglify({
        ie8: true,
        mangle: {
          reserved: ["$", "jQuery"]
        }
      })
    )
    .pipe(dest("inc/assets/js"));
}

// format final CSS file to spec

function formatCSS() {
  return src(cssASSETS)
    .pipe(plumber())
    .pipe(csso())
    .pipe(postcss())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(dest("includes/assets/css"));
}

function clean() {
  return del(["includes/assets/css/*", "inc/assets/js/*"]);
}

function watchFiles() {
  // watch and process files in order
  watch(scssSRC, series([clean, css, formatCSS]));
  watch(scssPubSRC, series([clean, cssPub, formatCSS]));
  watch(jsSRC, series([js]));
  watch(jsPubSRC, series([jsPub]));

  notifier.notify({
    title: "Gulp running",
    message: "(•_•) watching plugin asset files"
  });
}

// consolidate two main functions (watching and building) into variables

let watcher = parallel(watchFiles);
let build = series([clean, css, cssPub, formatCSS, js, jsPub]);

// expose functions

exports.js = js;
exports.cssPub = cssPub;
exports.css = css;
exports.clean = clean;
exports.formatCSS = formatCSS;
exports.build = build;

/*
 * allow the running of Gulp tasks via cmd
 * run `gulp --tasks` to view task structure
 */
task("default", watcher);
task("watch", watcher);
task("build", build);