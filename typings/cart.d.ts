/**
 * @file cart.d
 *
 * @summary The cart type definitions.
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

interface CartItem {
    _id?: string;
    productId: string;
    quantity: number;
    title: string;
    color: string;
    size: string;
}


interface Cart {
    _id?: string;
    userId: string;
    sessionId: number;
    items: [CartItem];
    shipping: string;
    billing: string;
    updatedAt?: Date;
}