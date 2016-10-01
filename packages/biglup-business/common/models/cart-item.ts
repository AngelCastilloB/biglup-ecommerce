/**
 * @file cart-item.ts.
 *
 * @summary The cart item model.
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
 * @summary The cart item model. A cart item represents a product inside the cart.
 */
export class CartItem
{
    /**
     * @summary Initialises a new instance of the CartItem class.
     *
     * @param productId The id of the product that this item represents.
     * @param quantity  The quantity of this product in the cart.
     * @param title     The title of the product (Denormalization field).
     * @param color     The color variant of the product (Denormalization field).
     * @param size      The size variant of the product (Denormalization field).
     * @param image     The main image of the product (Denormalization field).
     * @param updatedAt The last update date to this item. (This field should never be set by the client application).
     */
    constructor(public productId: string            = '',
                public quantity:  number            = 0,
                public title:     Array<I18nString> = Array<I18nString>(),
                public color:     Array<I18nString> = Array<I18nString>(),
                public size:      Array<I18nString> = Array<I18nString>(),
                public image:     string            = '',
                public updatedAt: Date              = new Date())
    {
    }
}
