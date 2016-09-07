/**
 * @file cart.ts
 *
 * @summary The cart schema.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// We need the correct scope of this inside the schemas.
// tslint:disable:only-arrow-functions

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Represent an item on the cart.
 */
export let CartItemSchema: any = new SimpleSchema(
{
    productId:
    {
        type: String
    },
    quantity:
    {
        label: 'Quantity',
        type: Number,
        min: 0
    },
    // Denormalized field: Indicates the title of this product.
    title:
    {
        type: [I18nStringSchema]
    },
    // Denormalized field: Indicates the color variant of this product.
    color:
    {
        label: 'Color',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    // Denormalized field: Indicates the size of this product.
    size:
    {
        label: 'Size',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
});

/**
 * @summary The cart schema.
 */
export let CartSchema: any = new SimpleSchema(
{
    _id:
    {
        type: String
    },
    userId:
    {
        type: String,
        autoValue: function ()
        {
            if (this.isInsert)
            {
                return this.userId;
            }
            else
            {
                this.unset();
            }
        },
        optional: true
    },
    items:
    {
        type: [CartItemSchema],
        optional: true
    },
    updatedAt:
    {
        type: Date,
        autoValue: function ()
        {
            if (this.isUpdate || this.isUpsert)
            {
                return new Date;
            }
        },
        optional: true
    }
});
