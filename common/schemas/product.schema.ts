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
        label: 'ProductImageSchema url',
        type: String
    },
    isUploaded: {
        label: 'ProductImageSchema isUploaded',
        type: Boolean
    }
});

/**
 * @summary The product variant schema.
 */
export let ProductVariantSchema: any = new SimpleSchema({
    color: {
        label: 'ProductImageSchema color',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    size: {
        label: 'ProductImageSchema size',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    stock: {
        label: 'ProductImageSchema stock',
        type: Number,
        optional: true
    },
    // Denormalized field: Indicates if this product stock is too low.
    isLowQuantity: {
        label: 'ProductImageSchema isLowQuantity',
        type: Boolean,
        optional: true
    },
    // Denormalized field: Indicates if this product is sold out.
    isSoldOut: {
        label: 'ProductImageSchema isSoldOut',
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
        label: 'ProductSchema _id',
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
        label: 'ProductSchema sku'
    },
    barcode: {
        type: String,
        label: 'ProductSchema barcode',
        optional: true
    },
    description: {
        label: 'ProductSchema description',
        type: [I18nStringSchema],
        optional: true
    },
    color: {
        label: 'ProductSchema color',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    size: {
        label: 'ProductSchema size',
        type: [I18nStringSchema],
        defaultValue: '',
        optional: true
    },
    price: {
        label: 'ProductSchema price',
        type: Number
    },
    discount: {
        label: 'ProductSchema discount',
        type: Number
    },
    // Denormalized field: Indicates if this product stock is too low.
    isLowQuantity: {
        label: 'ProductSchema isLowQuantity',
        type: Boolean,
        optional: true
    },
    trackInventory: {
        label: 'ProductSchema trackInventory',
        type: Boolean,
    },
    stock: {
        label: 'ProductSchema stock',
        type: Number,
        optional: true
    },
    // Denormalized field: Indicates if this product is sold out.
    isSoldOut: {
        label: 'ProductSchema isSoldOut',
        type: Boolean,
        optional: true
    },
    // Indicates when the seller has allowed the sale of product which is not in stock
    isBackorder: {
        label: 'ProductSchema isBackorder',
        type: Boolean,
        optional: true
    },
    requiresShipping: {
        label: 'ProductSchema requiresShipping',
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
        label: 'ProductSchema visibility',
        type: Boolean,
        defaultValue: false,
    },
    variantProducts: {
        label: 'ProductSchema variantProducts',
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
