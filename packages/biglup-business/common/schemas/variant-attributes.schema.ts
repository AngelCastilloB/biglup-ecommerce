/**
 * @file i18n-string.schema.ts
 *
 * @summary Internationalization string schema.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 23 2016
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

const COLOR_SCHEMA_NAME = 'ColorVariantAttributeSchema';
const SIZE_SCHEMA_NAME = 'SizeVariantAttributeSchema';
const MATERIAL_SCHEMA_NAME = 'MaterialVariantAttributeSchema';

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The color variant attribute schema.
 */
export let ColorVariantAttributeSchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: `${COLOR_SCHEMA_NAME} _id`,
        optional: true
    },
    name: {
        label: `${COLOR_SCHEMA_NAME} The translations`,
        type: [I18nStringSchema],
    },
    value: {
        label: `${COLOR_SCHEMA_NAME} the color value`,
        type: String,
        defaultValue: ''
    }
});

/**
 * @summary The color variant attribute schema.
 */
export let SizeVariantAttributeSchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: `${SIZE_SCHEMA_NAME} _id`,
        optional: true
    },
    size: {
        label: `${SIZE_SCHEMA_NAME} The translations`,
        type: [I18nStringSchema],
    }
});

/**
 * @summary The material variant attribute schema.
 */
export let MaterialVariantAttributeSchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: `${MATERIAL_SCHEMA_NAME} _id`,
        optional: true
    },
    material: {
        label: `${MATERIAL_SCHEMA_NAME} The translations`,
        type: [I18nStringSchema],
    }
});
