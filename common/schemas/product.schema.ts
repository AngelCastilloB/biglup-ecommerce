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

// We need the correct scope of this inside the schemas.
// tslint:disable:only-arrow-functions

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }     from 'meteor/aldeed:simple-schema';
import { I18nStringSchema } from './i18n-string.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @brief product image schema.
 */
export let ProductImageSchema: any = new SimpleSchema({
    id: {
        label: 'ProductImageSchema id',
        type: String
    },
    // Denormalized field: This will avoid the need to query the image collection.
    url: {
        label: 'ProductImageSchema url of the image',
        type: String
    },
    isUploaded: {
        label: 'ProductImageSchema image upload flag',
        type: Boolean
    }
});

/**
 * @summary The product variant schema.
 */
export let ProductVariantSchema: any = new SimpleSchema({
    color: {
        label: 'ProductImageSchema Color',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    size: {
        label: 'ProductImageSchema Size',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    stock: {
        label: 'ProductImageSchema Stock',
        type: Number,
        optional: true
    },
    // Denormalized field: Indicates if this product stock is too low.
    isLowQuantity: {
        label: 'ProductImageSchema is low quantity flag',
        type: Boolean,
        optional: true
    },
    // Denormalized field: Indicates if this product is sold out.
    isSoldOut: {
        label: 'ProductImageSchema is sold out flag',
        type: Boolean,
        optional: true
    },
});

/**
 * @summary The product schema.
 */
export let ProductSchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: 'ProductSchema Id',
        optional: true
    },
    categories: {
        type: [String],
        label: 'ProductSchema categories',
        optional: true
    },
    title: {
        label: 'ProductSchema title',
        type: [I18nStringSchema],
        defaultValue: ''
    },
    images: {
        label: 'ProductSchema images',
        type: [ProductImageSchema],
        optional: true
    },
    slug: {
        label: 'ProductSchema slug',
        type: String,
        optional: true
    },
    sku: {
        type: String,
        label: 'ProductSchema Stock Keeping Unit'
    },
    barcode: {
        type: String,
        label: 'ProductSchema barcode of the product',
        optional: true
    },
    description: {
        label: 'ProductSchema description',
        type: [I18nStringSchema],
        optional: true
    },
    color: {
        label: 'ProductSchema Color',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    size: {
        label: 'ProductSchema Size',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    price: {
        label: 'ProductSchema Price',
        type: Number
    },
    discount: {
        label: 'ProductSchema Discount',
        type: Number
    },
    // Denormalized field: Indicates if this product stock is too low.
    isLowQuantity: {
        label: 'ProductSchema is low quantity flag',
        type: Boolean,
        optional: true
    },
    trackInventory: {
        label: 'ProductSchema inventory tracking',
        type: Boolean,
    },
    stock: {
        label: 'ProductSchema Stock',
        type: Number,
        optional: true
    },
    // Denormalized field: Indicates if this product is sold out.
    isSoldOut: {
        label: 'ProductSchema os sold out flag',
        type: Boolean,
        optional: true
    },
    // Indicates when the seller has allowed the sale of product which is not in stock
    isBackorder: {
        label: 'ProductSchema is backorder flag',
        type: Boolean,
        optional: true
    },
    requiresShipping: {
        label: 'ProductSchema Requires shipping address',
        type: Boolean,
        defaultValue: true,
        optional: true
    },
    hashtags: {
        label: 'ProductSchema hashtags',
        type: [String],
        optional: true,
    },
    isVisible: {
        label: 'ProductSchema Visibility',
        type: Boolean,
        defaultValue: false,
    },
    variantProducts: {
        label: 'ProductSchema Product variants.',
        type: [ProductVariantSchema],
        optional: true
    },
    createdAt: {
        label: 'ProductSchema createdAt',
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
        label: 'ProductSchema updatedAt',
        type: Date,
        autoValue()
        {
            return new Date();
        },
        optional: true
    },
    publishedAt: {
        label: 'ProductSchema publishedAt',
        type: Date,
        optional: true
    },
});
