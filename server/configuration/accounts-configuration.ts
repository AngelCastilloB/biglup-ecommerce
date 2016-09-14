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

import { Accounts }   from 'meteor/accounts-base';
import { UserSchema } from '../../common/schemas/user.schema';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary all the configuration the accounts library needs to run properly.
 */
export const startAccountsConfiguration = () =>
{

    /**
     * @summary updates the user schema with new fields.
     *
     * @see https://guide.meteor.com/accounts.html#requiring-username-email
     */
    Accounts.validateNewUser((user) =>
    {
        UserSchema.validate(user);

        // Return true to allow user creation to proceed
        return true;
    });
};
