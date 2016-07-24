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
interface Product {
    _id?: string;
    categoryId?: Array<string>;
    categoryName?: Array<I18nString>;
    title: Array<I18nString>;
    sku: string;
    title: Array<I18nString>;
    color: string;
    size: string;
    price: number;
    discount: number;
    isLowQuantity: boolean;
    isSoldOut: boolean;
    isBackorder: boolean;
    requiresShipping: boolean;
    hashtags: Array<string>;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}