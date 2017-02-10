/**
 * @file product-variant.ts.
 *
 * @summary The product variant type.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 08 2016
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

import { ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute } from './variant-attributes';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The product variant type.
 */

/**
 * @summary The product category model.
 */
export class ProductVariant
{
    /**
     * @summary Initialises a new instance of the ProductVariant class.
     *
     * @param _id              The variant unique id.
     * @param barcode          The barcode of the product.
     * @param sku              The stock keeping unit code (SKU) of the product.
     * @param color            The color variant of the product.
     * @param size             The size variant of the product.
     * @param material         The material variant of the product.
     * @param price            The price of the product.
     * @param discount         The discount of the product.
     * @param stock            The current stock of this product.
     * @param isLowQuantity    Indicates if this product is in low quantity (denormalization field).
     * @param isSoldOut        Indicates if this product is already sold out (denormalization field).
     * @param isEnabled        Indicates if this product variant is enabled.
     */
    constructor(
        public _id:              string                   = '',
        public barcode:          string                   = '',
        public sku:              string                   = '',
        public color:            ColorVariantAttribute    = new ColorVariantAttribute(),
        public size:             SizeVariantAttribute     = new SizeVariantAttribute(),
        public material:         MaterialVariantAttribute = new MaterialVariantAttribute(),
        public price:            number                   = 0,
        public discount:         number                   = 0,
        public stock:            number                   = 0,
        public isLowQuantity:    boolean                  = false,
        public isSoldOut:        boolean                  = false,
        public isEnabled:        boolean                  = true)
    {
    }
}