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
        label: 'SubCategorySchema name'
    },
    info: {
        type: [I18nStringSchema],
        label: 'SubCategorySchema info'
    },
    slug: {
        label: 'SubCategorySchema slug',
        type: String,
        optional: true,
    },
    image: {
        type: String,
        label: 'SubCategorySchema image',
        optional: true
    },
    active: {
        type: Boolean,
        label: 'SubCategorySchema active',
        defaultValue: true
    },
    createdAt: {
        label: 'SubCategorySchema createdAt',
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
        label: 'SubCategorySchema updatedAt',
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
        label: 'CategorySchema _id',
        optional: true
    },
    name: {
        type: [I18nStringSchema],
        label: 'CategorySchema name'
    },
    slug: {
        type: String,
        label: 'CategorySchema slug',
        optional: true,
    },
    info: {
        type: [I18nStringSchema],
        label: 'CategorySchema info'
    },
    image: {
        type: String,
        label: 'CategorySchema image',
        optional: true
    },
    active: {
        type: Boolean,
        label: 'CategorySchema active',
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
        label: 'CategorySchema subCategories',
        optional: true
    }
});
