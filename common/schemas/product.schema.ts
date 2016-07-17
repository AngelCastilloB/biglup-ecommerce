/**
 * @file product.ts
 *
 * @summary The product schema.
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

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The product schema.
 */
export let ProductSchema:any = new SimpleSchema({
    _id: {
        type: String,
        label: "ProductSchema Id"
    },
    category: {
        type: String,
        label: "Product category",
        optional: true
    },
    title: {
        type: String,
        defaultValue: ""
    },
    sku: {
        type: String,
        label: "Stock Keeping Unit"
    },
    description: {
        type: String,
        optional: true
    },
    color: {
        label: "Color",
        type: String,
        defaultValue: ""
    },
    size: {
        label: "Size",
        type: String,
        defaultValue: ""
    },
    pictures: {
        type: [String],
        optional: true,
        defaultValue: ['no-picture']
    },
    price: {
        label: "Price",
        type: Number
    },
    discount: {
        label: "Discount",
        type: Number
    },
    // Denormalized field: Indicates when the product
    // 'inventoryQuantity' is lower then the 'lowInventoryWarningThreshold'.
    isLowQuantity: {
        label: "Indicates that the product quantity is too low",
        type: Boolean,
        optional: true
    },
    // Denormalized field: Indicates when the product 'inventoryQuantity' is zero
    isSoldOut: {
        label: "Indicates when the product quantity is zero",
        type: Boolean,
        optional: true
    },
    // Denormalized field: It is 'true' if the product is not in stock, but customers
    // can still order it.
    isBackorder: {
        label: "Indicates when the seller has allowed the sale of product which" +
        " is not in stock",
        type: Boolean,
        optional: true
    },
    requiresShipping: {
        label: "Require a shipping address",
        type: Boolean,
        defaultValue: true,
        optional: true
    },
    hashtags: {
        type: [String],
        optional: true,
    },
    isVisible: {
        type: Boolean,
        defaultValue: false
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if ( this.isInsert ){
                return new Date();
            } else if ( this.isSet ){
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function () {
            return new Date;
        },
        optional: true
    },
    publishedAt: {
        type: Date,
        optional: true
    },
});