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

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Represent an item on the cart.
 */
export let CartItemSchema: any = new SimpleSchema({
    productId: {
        label: 'Cart Item product id',
        type: String
    },
    quantity: {
        label: 'Cart Item Quantity',
        type: Number,
        min: 0
    },
    // Denormalized field: Indicates the title of this product.
    title: {
        label: 'Cart Item Title',
        type: [I18nStringSchema]
    },
    // Denormalized field: Indicates the color variant of this product.
    color: {
        label: 'Cart Item Color',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    // Denormalized field: Indicates the size of this product.
    size: {
        label: 'Cart Item Size',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
});

/**
 * @summary The cart schema.
 */
export let CartSchema: any = new SimpleSchema({
    _id: {
        label: 'CartSchema id',
        type: String
    },
    userId: {
        unique: true,
        label: 'CartSchema related user\'s id',
        type: String,
        autoValue()
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
    items: {
        label: 'CartSchema items',
        type: [CartItemSchema],
        optional: true
    },
    updatedAt: {
        label: 'CartSchema updateAt',
        type: Date,
        autoValue()
        {
            if (this.isUpdate || this.isUpsert)
            {
                return new Date();
            }
        },
        optional: true
    }
});
