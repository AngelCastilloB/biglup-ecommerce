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

const gulp   = require('gulp');
const rename = require('gulp-rename');
const fs     = require('fs');

// CONSTANTS **********************************************************************************************************/

const PATHS = {
    meteor: {
        settings: './example.meteor.json'
    },
    bootstrap: {
        css: {
            src: './node_modules/bootstrap/dist/css/**/*',
            dest: './public/theme/css'
        },
        js: {
            src: './node_modules/bootstrap/dist/js/bootstrap.min.js',
            dest: './public/theme/js'
        }
    }
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
    gulp.src(PATHS.bootstrap.css.src)
        .pipe(gulp.dest(PATHS.bootstrap.css.dest));

    gulp.src(PATHS.bootstrap.js.src)
        .pipe(gulp.dest(PATHS.bootstrap.js.dest));
});

/**
 * @summary the tasks to be run when the app installs.
 */
gulp.task('meteor-post-install', ['copy-meteor-settings', 'copy-bootstrap-files']);
