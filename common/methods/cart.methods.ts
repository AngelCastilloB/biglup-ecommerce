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

import { Carts }                   from '../collections/cart.collection';
import { Products }                from '../collections/product.collection';
import { Cart, CartItem, Product } from '../models';

// METHODS ************************************************************************************************************/

/**
 * @summary Registers the add to cart method to Meteor's DDP system.
 *
 * @param productId The product to be added to the cart.
 * @param quantity  The amount of this products that wants to be added.
 * @param set       Indicates if the amount must be increased or changed. (defaults to false).
 *
 * @remark If the resulting new quantity for the cart item is less than one, the element will be deleted from the cart.
 */
Meteor.methods({
    'cart.addProduct': (productId: string, quantity: number, set = false) =>
    {
        check(productId, String);
        check(quantity, Number);

        const product: Product = Products.findOne(productId);
        const cart:    Cart    = Carts.findOne({userId: this.userId});

        if (!cart)
        {
            throw new Meteor.Error(
                'cart.addProduct.carNotFound',
                'The cart for this user was not found.');
        }

        if (!product)
        {
            throw new Meteor.Error(
                'cart.addProduct.productNotFound',
                'The product that you are trying to add to the cart does not exist.');
        }

        let item:     CartItem = new CartItem(productId, quantity, product.title);
        let selector: Object   = {_id: cart._id, 'items.productId': productId};
        let modifier: Object;

        let productIndex: number = findProduct(cart, product._id);
        let maxQuantity:  number = product.stock;
        let newQuantity:  number = Math.min(item.quantity, maxQuantity);

        if (productIndex === -1)
        {
            if (newQuantity < 1)
            {
                return;
            }

            selector = {_id: cart._id};
            modifier = {$push: {'items': item}};
        }
        else
        {
            newQuantity = Math.min(cart.items[productIndex].quantity + item.quantity, maxQuantity);

            if (set)
            {
                if (item.quantity < 1)
                {
                    Carts.update(selector, {$pull: {items: {productId: productId}}}, {multi: true});

                    return;
                }

                modifier = {$set: {'items.$.quantity': item.quantity}};
            }
            else
            {
                if (newQuantity < 1)
                {
                    Carts.update(selector, {$pull: {items: {productId: productId}}}, {multi: true});

                    return;
                }

                modifier = {$set: {'items.$.quantity': newQuantity}};
            }
        }

        Carts.update(selector, modifier);
    }
});

/**
 * @summary Registers the add cart to user method to Meteor's DDP system.
 */
Meteor.methods({
    ['cart.create']: () =>
    {
        if (Carts.find({userId: this.userId}).count() > 0)
        {
            throw new Meteor.Error(
                'cart.createCart.alreadyExists',
                'This user already have a cart.');
        }

        Carts.insert({});
    }
});

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Deletes the cart for the given user.
 *
 * @param userId The user to remove the cart from.
 */
Meteor.methods({
    ['cart.delete']: (userId: string) =>
    {
        /*
         if (!this.user.IsAdmin) {
         throw new Meteor.Error(
         'cart.delete.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        if (Carts.find({userId: userId}).count() === 0)
        {
            throw new Meteor.Error(
                'cart.delete.doesNotExists',
                'This user does not have a cart.');
        }

        Carts.remove({userId: userId});
    }
});

/**
 * @summary Deletes all products from the given user cart.
 */
Meteor.methods({
    ['cart.deleteAllProducts']: (userId: string) =>
    {
        /*
         if (!this.user.IsAdmin) {
         throw new Meteor.Error(
         'cart.deleteAllProducts.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        if (Carts.find({userId: userId}).count() === 0)
        {
            throw new Meteor.Error(
                'cart.delete.doesNotExists',
                'This user does not have a cart.');
        }

        Carts.update({userId: userId}, {$set: {'items': []}}, {multi: true});
    }
});

/**
 * @summary Deletes the given product from the given user cart.
 */
Meteor.methods({
    ['cart.deleteProduct']: (userId: string, productId: string) =>
    {
        /*
         if (!this.user.IsAdmin) {
         throw new Meteor.Error(
         'cart.deleteProduct.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        if (Carts.find({userId: userId}).count() === 0)
        {
            throw new Meteor.Error(
                'cart.delete.doesNotExists',
                'This user does not have a cart.');
        }

        Carts.update({userId: userId}, {$pull: {items: {productId: productId}}}, {multi: true});
    }
});

// FUNCTIONS **********************************************************************************************************/

/**
 * @summary search for a product inside a cart.
 *
 * @param cart The cart where the product will be looked for.
 * @param productId The product to be found.
 *
 * @returns {number} The index of the product in the cart index collection.
 */
function findProduct(cart: Cart, productId: string): number
{
    if (!cart.items)
        return -1;

    for (let i = 0; i < cart.items.length; ++i)
    {
        if (cart.items[i].productId === productId)
            return i;
    }

    return -1;
}
