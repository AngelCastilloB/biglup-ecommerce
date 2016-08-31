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

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The category schema.
 */
export let CategorySchema: any = new SimpleSchema(
{
    name:
    {
        type: [I18nStringSchema],
        label: 'Name'
    },
    slug:
    {
        type: [I18nStringSchema],
        label: 'Slug'
    },
    info:
    {
        type: [I18nStringSchema],
        label: 'Info'
    },
    isParentCategory:
    {
        type: Boolean,
        label: 'This category contains a list of subcategories',
        defaultValue: true
    },
    parentCategory:
    {
        type: String,
        label: 'Parent Category',
        defaultValue: ''
    },
    image:
    {
        type: String,
        label: 'Image',
        optional: true
    },
    active:
    {
        type: Boolean,
        label: 'Active',
        defaultValue: true
    },
    updated:
    {
        type: Date,
        label: 'Last date this category was updated.',
        autoValue: function ()
        {
            return new Date();
        },
        optional: true
    },
    subCategories:
    {
        type: [Object],
        label: 'The list of categories inside this category.',
        optional: true
    }
});
