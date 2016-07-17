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

import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// EXPORTS ************************************************************************************************************/

export let Carts:any = new Mongo.Collection<Cart>('carts');

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary Represent an item on the cart.
 */
var CartItem = new SimpleSchema({
    _id: {
        type: String
    },
    productId: {
        type: String
    },
    quantity: {
        label: "Quantity",
        type: Number,
        min: 0
    },
    title: {
        type: String
    },
    // Denormalized field: Indicates the color variant of this product.
    color: {
        label: "Color",
        type: String,
        defaultValue: ""
    },
    // Denormalized field: Indicates the size of this product.
    size: {
        label: "Size",
        type: String,
        defaultValue: ""
    },
});

/**
 * @summary The cart schema.
 */
var Cart = new SimpleSchema({
    _id: {
        type: String
    },
    userId: {
        type: String,
        unique: true,
        autoValue: function () {
            if (this.isInsert || this.isUpdate) {
                if (!this.isFromTrustedCode) {
                    return this.userId;
                }
            } else {
                this.unset();
            }
        }
    },
    sessionId: {
        type: String,
    },
    email: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email
    },
    items: {
        type: [CartItem],
        optional: true
    },
    shipping: {
        type: String,
        optional: true,
        blackbox: true
    },
    billing: {
        type: String,
        optional: true,
        blackbox: true
    },
    updatedAt: {
        type: Date,
        autoValue: function () {
            if (this.isUpdate || this.isUpsert) {
                return new Date;
            }
        },
        optional: true
    }
});

Carts.attachSchema(Cart);