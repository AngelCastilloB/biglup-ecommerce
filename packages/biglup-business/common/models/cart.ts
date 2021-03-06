/**
 * @file cart.ts
 *
 * @summary The shopping cart model.
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

import { CartItem } from './';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The shopping cart model. The shopping cart holds all the items the user wants to purchase..
 */
export class Cart
{

    /**
     * @summary Initialises a new instance of the Cart class.
     *
     * @param items  The products inside the cart.
     */
    constructor(public items: Array<CartItem> = Array<CartItem>())
    {
    }
}
