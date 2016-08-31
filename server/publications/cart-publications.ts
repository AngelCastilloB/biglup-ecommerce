/**
 * @file cart-publications.ts
 *
 * @summary The cart collection publication file.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 17 2016
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

import { Carts }  from '../../common/collections/cart.collection';
import { Meteor } from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publishes all carts.
 */
Meteor.publish('carts', function ()
{

    // if (this.user.isAdmin())
    //    return Cart.find(); TODO: [USER-LOGIN] Only the admin can fetch all carts content.

    return Carts.find({userId: this.userId});
});

/**
 * @summary Publishes a cart given a cart id.
 *
 * @param {string} id The cart id.
 */
Meteor.publish('cart', (id: string) => Carts.find({_id: id}));

/**
 * @summary Publishes the cart of the given user id.
 *
 * @param {string} id The user id.
 */
Meteor.publish('user-cart', (userId: string) => Carts.find({userId}));
