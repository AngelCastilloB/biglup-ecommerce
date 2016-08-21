/**
 * @file check-meteor-settings.ts.
 *
 * @summary this script checks if the app settings are properly set.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 20 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPORTS ************************************************************************************************************/

import { Meteor } from 'meteor/meteor';

/* EXPORTS ************************************************************************************************************/

export function checkMeteorSettings() {
    const throwMalformedError = function (key: string) {
        throw new Meteor.Error(`"${key.toUpperCase()}" settings could not be found.`,
            'The meteor.json file may be malformed,' +
            'please run "gulp --gulpfile .gulpfile.js to fix it.", if the meteor.json already exist, ' +
            'please consider removing it and then run gulp.');
    };

    if (!Meteor.settings.loaded)
        throw new Meteor.Error('Application settings not found.',
            'This application needs its settings loaded to properly function, please run ' +
            'it as "meteor run --settings meteor.json" or simply run "npm start".');

    if (!Meteor.settings.user)
        throwMalformedError('user');

    if (!Meteor.settings.migrations)
        throwMalformedError('migrations');

    if (!Meteor.settings.facebook)
        throwMalformedError('facebook');

    if (!Meteor.settings.facebook.appId || !Meteor.settings.facebook.secret)
        throw new Meteor.Error('"FACEBOOK" setting details could not be found or are incomplete.',
            'Please check inside meteor.json ' +
            'and add them, please refer to the README for more info.');
}
