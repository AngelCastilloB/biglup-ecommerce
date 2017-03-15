/**
 * @file category.ts
 *
 * @summary Category schema definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 16 2016
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

const CAT_SCHEMA_NAME     = 'UserSchema';

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The category schema.
 */
export let CategorySchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: `${CAT_SCHEMA_NAME} _id`,
        optional: true
    },
    name: {
        type: [I18nStringSchema],
        label: `${CAT_SCHEMA_NAME} name`
    },
    slug: {
        type: String,
        label: `${CAT_SCHEMA_NAME} slug`,
        optional: true,
    },
    info: {
        type: [I18nStringSchema],
        label: `${CAT_SCHEMA_NAME} info`
    },
    image: {
        type: String,
        label: `${CAT_SCHEMA_NAME} image`,
        optional: true
    },
    active: {
        type: Boolean,
        label: `${CAT_SCHEMA_NAME} active`,
        defaultValue: true
    },
    isRootCategory: {
        type: Boolean,
        label: `${CAT_SCHEMA_NAME} isRootCategory`,
        defaultValue: true
    },
    parentCategory: {
        type: String,
        label: `${CAT_SCHEMA_NAME} parentCategory`,
        optional: true
    },
    createdAt: {
        label: `${CAT_SCHEMA_NAME} createdAt`,
        type: Date,
        autoValue()
        {
            if (this.isInsert)
            {
                return new Date();
            }
            else if (this.isSet)
            {
                this.unset();
            }
        },
        optional: true
    },
    updatedAt: {
        type: Date,
        label: `${CAT_SCHEMA_NAME} updatedAt`,
        autoValue()
        {
            return new Date();
        },
        optional: true
    }
});
