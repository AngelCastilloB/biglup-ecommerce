/**
 * @file cart-api.ts.
 *
 * @summary This is the cart public API.
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

// EXPORTS ************************************************************************************************************/

// UNFINISHED IMPLEMENTATION
export const addProductToCart = {
    name: 'cart.addProduct',

    validate(args) {
        new SimpleSchema({
            productId: { type: String },
            quantity: { type: Number }
        }).validate(args);
    },

    run({ productId, quantity }) {
        const cart = Carts.findOne( { userId: this.userId});
        const product = Products.findOne(productId);

        if (!cart) {
            throw new Meteor.Error('cart.addProduct.notFound',
                'The cart for this user was not found.');
        }

        if (!product) {
            throw new Meteor.Error('cart.addProduct.notFound',
                'The product that you are trying to add to the cart does not exist');
        }

        let item: CartItem  = { productId: productId, quantity: quantity, title: product.title };

        Carts.update(productId, {
            $push: { items: item }
        });
    },

    call(args, callback) {
        const options = {
            returnStubValue: true,
            throwStubExceptions: true
        };

        Meteor.apply(this.name, [args], options, callback);
    }
};

// Actually register the method with Meteor's DDP system
Meteor.methods({
    [addProductToCart.name]: function (args) {
        addProductToCart.validate.call(this, args);
        addProductToCart.run.call(this, args);
    }
});
