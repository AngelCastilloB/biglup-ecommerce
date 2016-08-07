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
 * @summary Product type definition.
 */
interface Product extends Distinguishable, Sluggable {
    categoryId?: Array<string>;
    title: Array<I18nString>;
    description: Array<I18nString>;
    sku: string;
    color: string;
    size: string;
    price: number;
    discount: number;
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
