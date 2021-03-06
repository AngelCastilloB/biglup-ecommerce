/**
 * @file main.ts
 *
 * @summary Entry point on the server app.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
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

import { checkMeteorSettings,
         startServicesConfiguration,
         startAccountsConfiguration  } from './server/configuration';
import { Meteor }                      from 'meteor/meteor';

// App email templates
import './server/email-templates/password-reset';

/* METEOR SERVER START UP *********************************************************************************************/

Meteor.startup(() =>
{
    checkMeteorSettings();
    startServicesConfiguration();
    startAccountsConfiguration();
});
