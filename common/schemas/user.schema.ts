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

// CONSTANTS **********************************************************************************************************/

const SCHEMA_NAME = 'UserSchema';

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
        label: `${SCHEMA_NAME} _id`,
        type: String
    },
    emails: {
        label: `${SCHEMA_NAME} emails`,
        type: Array,
        optional: true
    },
    'emails.$': {
        label: `${SCHEMA_NAME} emails.$`,
        type: Object
    },
    'emails.$.address': {
        label: `${SCHEMA_NAME} emails.$.address`,
        type: String
    },
    'emails.$.verified': {
        label: `${SCHEMA_NAME} emails.$.verified`,
        type: Boolean
    },
    createdAt: {
        label: `${SCHEMA_NAME} createdAt`,
        type: Date
    },
    services: {
        label: `${SCHEMA_NAME} services`,
        type: Object,
        blackbox: true
    },
    profile: {
        label: `${SCHEMA_NAME} profile`,
        type: Object,
        blackbox: true
    },
    isAdmin: {
        label: `${SCHEMA_NAME} isAdmin`,
        type: Boolean,
        optional: true,
        autoValue()
        {
            return false;
        }
    }
});
