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
const pump       = require('pump');
const sequence   = require('run-sequence');

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
        css: {src: './public/theme/css/mdb.min.css'},
        js: {src: './public/theme/js/mdb.min.js'}
    },
    tether: {
        js: {src: './public/theme/js/tether.min.js'}
    },
    local: {
        css: {src: './public/theme/css/style.css'}
    },
    public: {css: './public/theme/css', js: './public/theme/js'},
    compatibility: './client/compatibility'
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
gulp.task('uglify-css', function (callback) {
    const files = [
        PATHS.bootstrap.css.src,
        PATHS.mdb.css.src,
        PATHS.local.css.src,
        PATHS.drag.css.src
    ];

    pump([
            gulp.src(files),
            sourcemaps.init(),
            concatCss('main.css'),
            gulp.dest(PATHS.public.css),
            rename('main.min.css'),
            cleanCss(),
            sourcemaps.write(),
            gulp.dest(PATHS.public.css)
        ],
        callback
    );
});

/**
 * @summary concatenates and minifies the client javascript files
 */
gulp.task('uglify-js', function (callback) {
    const files = [
        PATHS.tether.js.src,
        PATHS.public.js + 'bootstrap.min.js',
        PATHS.mdb.js.src
    ];

    pump([
            gulp.src(files),
            sourcemaps.init(),
            concat('main.js'),
            uglify(),
            sourcemaps.write(),
            gulp.dest(PATHS.compatibility)
        ],
        callback
    );
});

/**
 * @summary sugar for gulp
 */
gulp.task('uglify', ['uglify-css', 'uglify-js']);

/**
 * @summary the tasks to be run when the app installs.
 */
gulp.task('meteor-post-install', function () {
    sequence('copy-meteor-settings', 'copy-bootstrap-files', 'uglify');
});

/**
 * @summary the default gulp task
 */
gulp.task('default', ['uglify']);
