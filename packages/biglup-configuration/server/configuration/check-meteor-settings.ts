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

/* CONSTANTS **********************************************************************************************************/

const USER_SETTINGS = {
    name: 'user',
    email: 'user@app.com',
    password: '123'
};

const FACEBOOK_SETTINGS = {
    appId: '',
    secret: ''
};

const GOOGLE_SETTINGS = {
    clientId: '',
    secret: ''
};

const TWITTER_SETTINGS = {
    consumerKey: '',
    secret: ''
};

/* EXPORTS ************************************************************************************************************/

/**
 * @summary check if the different settings keys exist in the meteor settings object,
 * if none are found, will set the defaults.
 *
 * The Meteor.settings.public['something'] is accessible only to the client side.
 */
export const checkMeteorSettings = () =>
{
    if (!Meteor.settings['user'])
    {
        Meteor.settings['user'] = USER_SETTINGS;
    }

    if (!Meteor.settings['facebook'])
    {
        Meteor.settings['facebook']     = FACEBOOK_SETTINGS;
        Meteor.settings.public.facebook = false;
    }
    else
    {
        Meteor.settings.public.facebook = true;
    }

    if (!Meteor.settings['google'])
    {
        Meteor.settings['google']     = GOOGLE_SETTINGS;
        Meteor.settings.public.google = false;
    }
    else
    {
        Meteor.settings.public.google = true;
    }

    if (!Meteor.settings['twitter'])
    {
        Meteor.settings['twitter']     = TWITTER_SETTINGS;
        Meteor.settings.public.twitter = false;
    }
    else
    {
        Meteor.settings.public.twitter = true;
    }
};
