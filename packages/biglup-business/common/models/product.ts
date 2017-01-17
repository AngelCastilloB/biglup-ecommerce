/**
 * @file product.ts
 *
 * @summary The product model.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 05 2016
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

import { I18nString }                   from 'meteor/biglup:i18n';
import { ProductVariant, ProductImage } from './';
import { ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute }     from './variant-attributes';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The product category model.
 */
export class Product
{
    /**
     * @summary Initialises a new instance of the Product class.
     *
     * @param _id              The id of the product on the database.
     * @param slug             The slug url of the product.
     * @param categories       The list of categories this product belongs to.
     * @param title            The title of the product.
     * @param images           The images of the product.
     * @param description      The description of the product.
     * @param barcode          The barcode of the product.
     * @param sku              The stock keeping unit code (SKU) of the product.
     * @param variantProducts  The list of variants for this product.
     * @param price            The price of the product.
     * @param discount         The discount of the product.
     * @param trackInventory   Indicates if the inventory of this product must be tracked.
     * @param stock            The current stock of this product.
     * @param isLowQuantity    Indicates if this product is in low quantity (denormalization field).
     * @param isSoldOut        Indicates if this product is already sold out (denormalization field).
     * @param isBackorder      Indicates if this product can be ordered even if its out of stock.
     * @param requiresShipping Indicates if this product requires shipping.
     * @param hashtags         The hashtags list associated with this product.
     * @param isVisible        Indicates if this product is visible in the store.
     * @param createdAt        The creation date of the product.
     * @param updatedAt        The update date of the product.
     * @param publishedAt      The publication date of the product.
     */
    constructor(
        public _id:              string                   = null,
        public slug:             string                   = '',
        public categories:       Array<string>            = Array<string>(),
        public title:            Array<I18nString>        = Array<I18nString>(),
        public images:           Array<ProductImage>      = Array<ProductImage>(),
        public description:      Array<I18nString>        = Array<I18nString>(),
        public barcode:          string                   = '',
        public sku:              string                   = '',
        public variantProducts:  Array<ProductVariant>    = Array<ProductVariant>(),
        public price:            number                   = 0,
        public discount:         number                   = 0,
        public trackInventory:   boolean                  = false,
        public stock:            number                   = 0,
        public isLowQuantity:    boolean                  = false,
        public isSoldOut:        boolean                  = false,
        public isBackorder:      boolean                  = false,
        public requiresShipping: boolean                  = false,
        public hashtags:         Array<string>            = Array<string>(),
        public isVisible:        boolean                  = false,
        public createdAt:        Date                     = new Date(),
        public updatedAt:        Date                     = new Date(),
        public publishedAt:      Date                     = new Date())
    {
    }
}
