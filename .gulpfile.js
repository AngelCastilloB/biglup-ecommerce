/**
 * @file gulpfile.js.
 *
 * @summary Has the routines needed for the build system.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 31 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

const gulp       = require('gulp');
const rename     = require('gulp-rename');
const fs         = require('fs');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss   = require('gulp-clean-css');
const concatCss  = require('gulp-concat-css');

// CONSTANTS **********************************************************************************************************/

const PATHS = {
    meteor: {
        settings: './example.meteor.json'
    },
    bootstrap: {
        css: {
            glob: './node_modules/bootstrap/dist/css/**/*',
            src: './public/theme/css/bootstrap.css'
        },
        js: {src: './node_modules/bootstrap/dist/js/bootstrap.js'}
    },
    drag: {
        css: {src: './public/theme/css/drag.min.css'}
    },
    mdb: {
        css: {src: './public/theme/css/drag.min.css'},
        js: {src: './public/theme/js/mdb.min.js'}
    },
    tether: {
        js: {src: './public/theme/js/tether.min.js'}
    },
    jquery: {
        js: {src: './public/theme/js/jquery-2.2.3.min.js'}
    },
    local: {
        css: {src: './public/theme/css/style.css'}
    },
    public: {css: './public/theme/css', js: './public/theme/js'}
};

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary copies the example meteor setting with a new name.
 */
gulp.task('copy-meteor-settings', function () {
    // since gulp.dest('.', {overwrite: false}) doesn't work for some reason
    // we have to dig with the node fs to check if the file exist to avoid overwrites
    // https://gulp.readme.io/docs/gulpdestpath-options
    fs.stat('./meteor.json', function (err, stats) {
        // an error could mean file not found (error number -2).
        if ((err && err.errno === -2) || !stats.isFile()) {
            return gulp.src(PATHS.meteor.settings)
                .pipe(rename('meteor.json'))
                .pipe(gulp.dest('.', {overwrite: false}));
        } else if (err) {
            throw err;
        }
    });
});

/**
 * @summary copies related bootstrap files
 */
gulp.task('copy-bootstrap-files', function () {
    gulp.src(PATHS.bootstrap.css.glob)
        .pipe(gulp.dest(PATHS.public.css));

    gulp.src(PATHS.bootstrap.js.src)
        .pipe(gulp.dest(PATHS.public.js));
});

/**
 * @summary concatenates and minifies the client css files
 */
gulp.task('uglify-css', function () {
    const files = [
        PATHS.bootstrap.css.src,
        PATHS.mdb.css.src,
        PATHS.drag.css.src,
        PATHS.local.css.src
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concatCss('main.css'))
        .pipe(gulp.dest(PATHS.public.css))
        .pipe(rename('main.min.css'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.public.css));
});

/**
 * @summary concatenates and minifies the client javascript files
 */
gulp.task('uglify-js', function () {
    const files = [
        PATHS.jquery.js.src,
        PATHS.tether.js.src,
        PATHS.public.js + 'bootstrap.min.js',
        PATHS.mdb.js.src
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(PATHS.public.js))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.public.js));
});

/**
 * @summary the tasks to be run when the app installs.
 */
gulp.task('meteor-post-install', ['copy-meteor-settings', 'copy-bootstrap-files']);

/**
 * @summary the default gulp task
 */
gulp.task('default', ['uglify-css', 'uglify-js']);
