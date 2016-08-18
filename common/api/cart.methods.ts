/**
 * @file cart.methods.ts.
 *
 * @summary This is the cart public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 18, 2016
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

import { Carts }    from '../collections/cart.collection';
import { Products } from '../collections/product.collection';

// METHODS ************************************************************************************************************/

/**
 * @summary registers the add to cart method to Meteor's DDP system.
 */
Meteor.methods({
    'cart.addProduct' : function (productId, quantity) {

        // TODO: Product variant support will be left out to a later stage.
        check(productId, String);
        check(quantity, Number);

        const product = Products.findOne(productId);
        const cart    = Carts.findOne({userId : '1'});

        if (!cart) {
            throw new Meteor.Error(
                'cart.addProduct.notFound',
                'The cart for this user was not found.');
        }

        if (!product) {
            throw new Meteor.Error(
                'cart.addProduct.notFound',
                'The product that you are trying to add to the cart does not exist');
        }

        let item: CartItem  = { productId: productId, quantity: quantity, title: product.title };

        Carts.update({_id : cart._id}, {
            $push: { items: item }
        });
    }
});

/**
 * @summary registers the add cart to user method to Meteor's DDP system.
 */
Meteor.methods({
    ['cart.create']: function () {

        if (Carts.find({userId: '1'}).count() > 0) {
            throw new Meteor.Error(
                'cart.createCart.alreadyExists',
                'This user already have a cart.');
        }

        Carts.insert({});
    }
});
