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

// CONSTANTS **********************************************************************************************************/

const CART_ITEM_SCHEMA_NAME = 'cartItemSchema';
const CART_SCHEMA_NAME      = 'CartSchema';

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';
import { CartItem }         from '../models';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The cart schema.
 */
export const CartSchema: any = new SimpleSchema({
    items: {
        label: `${CART_SCHEMA_NAME} items`,
        type: Array,
        optional: true,
        defaultValue: []
    },
    'items.$': {
        label: `${CART_SCHEMA_NAME} items $`,
        type: <any>CartItem
    },
    'items.$.productId': {
        label: `${CART_SCHEMA_NAME} productId`,
        type: String
    },
    'items.$.image': {
        label: `${CART_SCHEMA_NAME} image`,
        type: String
    },
    'items.$.quantity': {
        label: `${CART_ITEM_SCHEMA_NAME} quantity`,
        type: Number,
        min: 0
    },
    // Denormalized field: Indicates the title of this product.
    'items.$.title': {
        label: `${CART_ITEM_SCHEMA_NAME} title`,
        type: [I18nStringSchema]
    },
    // Denormalized field: Indicates the color variant of this product.
    'items.$.color': {
        label: `${CART_ITEM_SCHEMA_NAME} color`,
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    // Denormalized field: Indicates the size of this product.
    'items.$.size': {
        label: `${CART_ITEM_SCHEMA_NAME} size`,
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    updatedAt: {
        label: `${CART_SCHEMA_NAME} updateAt`,
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
