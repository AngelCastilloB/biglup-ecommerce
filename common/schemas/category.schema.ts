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

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The category schema.
 */
export let CategorySchema:any = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    slug: {
        type: String,
        label: "Slug"
    },
    info: {
        type: String,
        label: "Info"
    },
    parentCategory: {
        type: String,
        label: "Parent CategorySchema",
        defaultValue: ""
    },
    image: {
        type: String,
        label: "Image"
    },
    active: {
        type: Boolean,
        label: "Active",
        defaultValue: true
    },
    updated: {
        type: Date,
        label: "Last date this book was updated.",
        autoValue: function() {
            if ( this.isInsert ){
                return new Date();
            } else if ( this.isSet ){
                this.unset();
            }
        }
    },
    sub_categories: {
        type: [Object],
        label: "The list of categories inside this category.",
        optional: true
    }
});