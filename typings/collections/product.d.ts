/**
 * @file product.d
 *
 * @summary The product type definition.
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

/**
 * @brief Image order definition.
 */
interface OrderedImage {
    position: number; // Since the image upload is simultaneous, this is the easier way to enforce order.
    id: string;
}

/**
 * @summary Product type definition.
 */
interface ProductVariant {
    color?: Array<I18nString>;
    size?: Array<I18nString>;
    isLowQuantity?: boolean; // defaults to false
    stock?: number;
    isSoldOut?: boolean; // defaults to false
}

/**
 * @summary Product type definition.
 */
interface Product {
    _id?: string;
    slug?: string;
    categoryId?: Array<string>;
    title: Array<I18nString>;
    images?: Array<OrderedImage>;
    description: Array<I18nString>;
    barcode: string;
    sku: string;
    color?: Array<I18nString>;
    size?: Array<I18nString>;
    variantProducts?: Array<ProductVariant>;
    price: number;
    discount: number;
    trackInventory: boolean;
    stock?: number;
    isLowQuantity?: boolean; // defaults to false
    isSoldOut?: boolean; // defaults to false
    isBackorder?: boolean; // defaults to false
    requiresShipping?: boolean; // defaults to true
    hashtags?: Array<string>;
    isVisible: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
}
