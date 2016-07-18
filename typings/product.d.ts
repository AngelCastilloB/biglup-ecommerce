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

interface Product {
    _id?: string;
    category?: Array<string>;
    title: string;
    sku: string;
    description: string;
    color: string;
    size: string;
    pictures?: Array<string>;
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