/**
 * @file accounts-configuration.ts.
 *
 * @summary all the configuration the accounts library needs to run properly.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 14 2016
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

import { UserSchema } from '../../common/schemas/user.schema';
import { Meteor }     from 'meteor/meteor';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary all the configuration the accounts library needs to run properly.
 */
export const startAccountsConfiguration = () =>
{

    /**
     * @summary Attaches the user schema to meteor user collection.
     */
    Meteor.users.attachSchema(UserSchema, {replace: true});
};
