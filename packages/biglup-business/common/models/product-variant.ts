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

import { I18nString } from 'meteor/biglup:i18n';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The product variant type.
 */
export class ProductVariant
{
    /**
     * @summary Initialises a new instance of the ProductVariant class.
     *
     * @param color         The color variant of the product.
     * @param size          The size variant of the product.
     * @param isLowQuantity Indicates if this variant is in low quantity (Denormalization field).
     * @param stock         The stock of the product.
     * @param isSoldOut     Indicates if this product is sold out.
     */
    constructor(public color:         Array<I18nString> = Array<I18nString>(),
                public size:          Array<I18nString> = Array<I18nString>(),
                public isLowQuantity: boolean           = false,
                public stock:         number            = 0,
                public isSoldOut:     boolean           = false)
    {
    }
}
