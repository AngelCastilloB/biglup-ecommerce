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
    drag: {
        css: {src: './public/theme/css/drag.min.css'}
    },
    // https://github.com/angular/material2/blob/master/GETTING_STARTED.md#additional-setup-for-md-menu-and-md-tooltip
    ng2Material: {
        css: {
            src: './node_modules/@angular2-material/core/overlay/overlay.css'
        }
    },
    // TODO: Remove once Angular Team provides its own polyfill for web animation.
    webAnimationPolyfill: {
        js: {src: './node_modules/web-animations-js/src/web-animations.min.js'}
    },
    public: {css: './public/theme/css', js: './public/theme/js'},
    compatibility: './client/compatibility'
};

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary copies the example meteor setting with a new name.
 */
gulp.task('copy-meteor-settings', function ()
{
    // since gulp.dest('.', {overwrite: false}) doesn't work for some reason
    // we have to dig with the node fs to check if the file exist to avoid overwrites
    // https://gulp.readme.io/docs/gulpdestpath-options
    fs.stat('./meteor.json', function (err, stats)
    {
        if ((err && err.code === 'ENOENT') || !stats.isFile())
        {
            return gulp.src(PATHS.meteor.settings)
                .pipe(rename('meteor.json'))
                .pipe(gulp.dest('.'));
        }
        else if (err)
        {
            throw err;
        }
    });
});

/**
 * @summary concatenates and minifies the client css files
 */
gulp.task('uglify-css', function (callback)
{
    const files = [
        PATHS.drag.css.src,
        PATHS.ng2Material.css.src
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
    ], callback);
});

/**
 * @summary concatenates and minifies the client javascript files
 */
gulp.task('concat-js', function (callback)
{
    const files = [
        PATHS.webAnimationPolyfill.js.src
    ];

    pump([
        gulp.src(files),
        sourcemaps.init(),
        concat('main.js'),
        sourcemaps.write(),
        gulp.dest(PATHS.compatibility)
    ], callback);
});

/**
 * @summary sugar for gulp
 */
gulp.task('uglify', function ()
{
    sequence('uglify-css', 'concat-js');
});

/**
 * @summary the tasks to be run when the app installs.
 */
gulp.task('meteor-post-install', function ()
{
    sequence('copy-meteor-settings', 'uglify');
});

/**
 * @summary the default gulp task
 */
gulp.task('default', ['uglify']);
