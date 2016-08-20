/**
 * @file services-configuration.ts.
 *
 * @summary TODO add summary on services-configuration.ts.
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
        appId: Meteor.settings.facebook.appId,
        loginStyle: 'popup',
        secret: Meteor.settings.facebook.secret
    }
});
