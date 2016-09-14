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
    name: {
        type: [I18nStringSchema],
        label: 'SubCategorySchema Name'
    },
    info: {
        type: [I18nStringSchema],
        label: 'SubCategorySchema Info'
    },
    slug: {
        label: 'SubCategorySchema slug',
        type: String,
        optional: true,
    },
    image: {
        type: String,
        label: 'SubCategorySchema Image',
        optional: true
    },
    active: {
        type: Boolean,
        label: 'SubCategorySchema Active',
        defaultValue: true
    },
    createdAt: {
        label: 'SubCategorySchema created at',
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
        label: 'SubCategorySchema updated at',
        autoValue()
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
    _id: {
        type: String,
        label: 'CategorySchema Id',
        optional: true
    },
    name: {
        type: [I18nStringSchema],
        label: 'CategorySchema Name'
    },
    slug: {
        type: String,
        label: 'CategorySchema Slug',
        optional: true,
    },
    info: {
        type: [I18nStringSchema],
        label: 'CategorySchema Info'
    },
    image: {
        type: String,
        label: 'CategorySchema Image',
        optional: true
    },
    active: {
        type: Boolean,
        label: 'CategorySchema Active',
        defaultValue: true
    },
    createdAt: {
        label: 'CategorySchema createdAt',
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
        label: 'CategorySchema updatedAt',
        autoValue()
        {
            return new Date();
        },
        optional: true
    },
    subCategories: {
        type: [SubCategorySchema],
        label: 'CategorySchema list of categories inside this category',
        optional: true
    }
});
