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

// CONSTANTS **********************************************************************************************************/

const PRODUCT_IMAGE_SCHEMA_NAME   = 'ProductImageSchema';
const PRODUCT_VARIANT_SCHEMA_NAME = 'ProductVariantSchema';
const PRODUCT_SCHEMA_NAME         = 'ProductSchema';

// IMPORTS ************************************************************************************************************/

import { SimpleSchema }                   from 'meteor/aldeed:simple-schema';
import { I18nStringSchema }               from './i18n-string.schema';
import { ColorVariantAttributeSchema,
         SizeVariantAttributeSchema,
         MaterialVariantAttributeSchema } from './variant-attributes.schema';

// EXPORTS ************************************************************************************************************/

/**
 * @brief product image schema.
 */
export let ProductImageSchema: any = new SimpleSchema({
    id: {
        label: `${PRODUCT_IMAGE_SCHEMA_NAME} id`,
        type: String
    },
    // Denormalized field: This will avoid the need to query the image collection.
    url: {
        label: `${PRODUCT_IMAGE_SCHEMA_NAME} url`,
        type: String
    },
    isUploaded: {
        label: `${PRODUCT_IMAGE_SCHEMA_NAME} isUploaded`,
        type: Boolean
    },
    file:
    {
        label: 'The image file object.',
        type: Object,
        autoValue()
        {
            if (this.isInsert || this.isSet)
                this.unset();
        },
        optional: true
    }
});

/**
 * @summary The product variant schema.
 */
export let ProductVariantSchema: any = new SimpleSchema({
    sku: {
        type: String,
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} sk`,
    },
    barcode: {
        type: String,
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} barcode`,
        optional: true
    },
    color: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} color`,
        type: ColorVariantAttributeSchema,
        defaultValue: '',
        optional: true
    },
    size: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} size`,
        type: SizeVariantAttributeSchema,
        defaultValue: '',
        optional: true
    },
    material: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} material`,
        type: MaterialVariantAttributeSchema,
        defaultValue: '',
        optional: true
    },
    price: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} price`,
        type: Number
    },
    discount: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} discount`,
        type: Number
    },
    // Denormalized field: Indicates if this product stock is too low.
    isLowQuantity: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} isLowQuantity`,
        type: Boolean,
        optional: true
    },
    stock: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} stock`,
        type: Number,
        optional: true
    },
    // Denormalized field: Indicates if this product is sold out.
    isSoldOut: {
        label: `${PRODUCT_VARIANT_SCHEMA_NAME} isSoldOut`,
        type: Boolean,
        optional: true
    }
});

/**
 * @summary The product schema.
 */
export let ProductSchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: `${PRODUCT_SCHEMA_NAME} _id`,
        optional: true
    },
    categories: {
        type: [String],
        label: `${PRODUCT_SCHEMA_NAME} categories`,
        optional: true
    },
    title: {
        label: `${PRODUCT_SCHEMA_NAME} title`,
        type: [I18nStringSchema],
        defaultValue: ''
    },
    images: {
        label: `${PRODUCT_SCHEMA_NAME} images`,
        type: [ProductImageSchema],
        optional: true
    },
    slug: {
        label: `${PRODUCT_SCHEMA_NAME} slug`,
        type: String,
        optional: true
    },
    sku: {
        type: String,
        label: `${PRODUCT_SCHEMA_NAME} sk`,
    },
    barcode: {
        type: String,
        label: `${PRODUCT_SCHEMA_NAME} barcode`,
        optional: true
    },
    description: {
        label: `${PRODUCT_SCHEMA_NAME} description`,
        type: [I18nStringSchema],
        optional: true
    },
    color: {
        label: `${PRODUCT_SCHEMA_NAME} color`,
        type: ColorVariantAttributeSchema,
        defaultValue: '',
        optional: true
    },
    size: {
        label: `${PRODUCT_SCHEMA_NAME} size`,
        type: SizeVariantAttributeSchema,
        defaultValue: '',
        optional: true
    },
    material: {
        label: `${PRODUCT_SCHEMA_NAME} material`,
        type: MaterialVariantAttributeSchema,
        defaultValue: '',
        optional: true
    },
    price: {
        label: `${PRODUCT_SCHEMA_NAME} price`,
        type: Number
    },
    discount: {
        label: `${PRODUCT_SCHEMA_NAME} discount`,
        type: Number
    },
    // Denormalized field: Indicates if this product stock is too low.
    isLowQuantity: {
        label: `${PRODUCT_SCHEMA_NAME} isLowQuantity`,
        type: Boolean,
        optional: true
    },
    trackInventory: {
        label: `${PRODUCT_SCHEMA_NAME} trackInventory`,
        type: Boolean,
    },
    stock: {
        label: `${PRODUCT_SCHEMA_NAME} stock`,
        type: Number,
        optional: true
    },
    // Denormalized field: Indicates if this product is sold out.
    isSoldOut: {
        label: `${PRODUCT_SCHEMA_NAME} isSoldOut`,
        type: Boolean,
        optional: true
    },
    // Indicates when the seller has allowed the sale of product which is not in stock
    isBackorder: {
        label: `${PRODUCT_SCHEMA_NAME} isBackorder`,
        type: Boolean,
        optional: true
    },
    requiresShipping: {
        label: `${PRODUCT_SCHEMA_NAME} requiresShipping`,
        type: Boolean,
        defaultValue: true,
        optional: true
    },
    hashtags: {
        label: `${PRODUCT_SCHEMA_NAME} hashtags`,
        type: [String],
        optional: true,
    },
    isVisible: {
        label: `${PRODUCT_SCHEMA_NAME} visibility`,
        type: Boolean,
        defaultValue: false,
    },
    variantProducts: {
        label: `${PRODUCT_SCHEMA_NAME} variantProducts`,
        type: [ProductVariantSchema],
        optional: true
    },
    createdAt: {
        label: `${PRODUCT_SCHEMA_NAME} createdAt`,
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
        label: `${PRODUCT_SCHEMA_NAME} updatedAt`,
        type: Date,
        autoValue()
        {
            return new Date();
        },
        optional: true
    },
    publishedAt: {
        label: `${PRODUCT_SCHEMA_NAME} publishedAt`,
        type: Date,
        optional: true
    },
});
