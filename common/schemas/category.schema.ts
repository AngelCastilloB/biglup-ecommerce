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
 * @summary The sub category schema.
 */
export let SubCategorySchema: any = new SimpleSchema({
    name:
    {
        type: [I18nStringSchema],
        label: 'Name'
    },
    info:
    {
        type: [I18nStringSchema],
        label: 'Info'
    },
    slug:
    {
        label: 'The category slug',
        type: String,
        optional: true,
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
    createdAt:
    {
        type: Date,
        autoValue: function ()
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
    updatedAt:
    {
        type: Date,
        label: 'Last date this filter was updated.',
        autoValue: function ()
        {
            return new Date();
        },
        optional: true
    }
});

/**
 * @summary The category schema.
 */
export let CategorySchema: any = new SimpleSchema({
    _id:
    {
        type: String,
        label: 'Category Id',
        optional: true
    },
    name:
    {
        type: [I18nStringSchema],
        label: 'Name'
    },
    slug:
    {
        type: String,
        label: 'Slug',
        optional: true,
    },
    info:
    {
        type: [I18nStringSchema],
        label: 'Info'
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
    createdAt:
    {
        type: Date,
        autoValue: function ()
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
    updatedAt:
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
        type: [SubCategorySchema],
        label: 'The list of categories inside this category.',
        optional: true
    }
});
