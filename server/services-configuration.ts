/**
 * @file services-configuration.ts.
 *
 * @summary Creates the database information needed for the accounts library to work
 * properly with the external services and oauth.
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

/* IMPLEMENTATION *****************************************************************************************************/

ServiceConfiguration.configurations.upsert({
    service: 'facebook'
}, {
    $set: {
        loginStyle: 'popup',
        appId: Meteor.settings.facebook.appId,
        secret: Meteor.settings.facebook.secret
    }
});

ServiceConfiguration.configurations.upsert({
    service: 'twitter'
}, {
    $set: {
        loginStyle: 'popup',
        consumerKey: Meteor.settings.twitter.consumerKey,
        secret: Meteor.settings.twitter.secret
    }
});

ServiceConfiguration.configurations.upsert({
    service: 'google'
}, {
    $set: {
        loginStyle: 'popup',
        clientId: Meteor.settings.google.clientId,
        secret: Meteor.settings.google.secret
    }
});
