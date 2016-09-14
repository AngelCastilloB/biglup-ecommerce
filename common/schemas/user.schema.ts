/**
 * @file user.schema.ts.
 *
 * @summary The user schema.
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

// IMPORTS ************************************************************************************************************/

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The user schema.
 *
 * @type {SimpleSchema<User>}
 */
export const UserSchema = new SimpleSchema({
    _id: {
        label: 'Accounts.validateNewUser _id',
        type: String
    },
    emails: {
        label: 'Accounts.validateNewUser emails',
        type: Array
    },
    'emails.$': {
        label: 'Accounts.validateNewUser emails.$',
        type: Object
    },
    'emails.$.address': {
        label: 'Accounts.validateNewUser emails.$.address',
        type: String
    },
    'emails.$.verified': {
        label: 'Accounts.validateNewUser emails.$.verified',
        type: Boolean
    },
    createdAt: {
        label: 'Accounts.validateNewUser createdAt',
        type: Date
    },
    services: {
        label: 'Accounts.validateNewUser services',
        type: Object,
        blackbox: true
    },
    isAdmin: {
        label: 'Accounts.validateNewUser isAdmin',
        type: Boolean
    }
});
