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

import { Products }                from '../collections/product.collection';
import { Cart, CartItem, Product } from '../models';
import { Meteor }                  from 'meteor/meteor';
import { getUser }                 from '../helpers/get-user';

// FUNCTIONS **********************************************************************************************************/

/**
 * @summary search for a product inside a cart.
 *
 * @param {Cart}   cart      The cart where the product will be looked for.
 * @param {string} productId The product to be found.
 *
 * @returns {number} The index of the product in the cart index collection.
 */
const findProduct = (cart: Cart, productId: string): number =>
{
    if (!cart.items)
        return -1;

    for (let i = 0; i < cart.items.length; ++i)
    {
        if (cart.items[i].productId === productId)
            return i;
    }

    return -1;
};

// METHODS ************************************************************************************************************/

/**
 * @summary Registers the add to cart method to Meteor's DDP system.
 *
 * @param {string}  productId The product to be added to the cart.
 * @param {number}  quantity  The amount of this products that wants to be added.
 * @param {boolean} set       Indicates if the amount must be increased or changed. (defaults to false).
 * @param {string}  userId    The id of the user's cart to be manipulated. (defaults to current user authenticated).
 *
 * @remark If the resulting new quantity for the cart item is less than one, the element will be deleted from the cart.
 */
Meteor.methods({
    addProductToCart(productId: string, quantity: number, set = false, userId?: string)
    {
        const user = getUser(this.userId);

        if (userId && user.isAdmin)
        {
            check(userId, String);
        }
        else
        {
            userId = this.userId;
        }

        check(productId, String);
        check(quantity, Number);

        const product: Product = Products.findOne(productId);

        if (!product)
        {
            throw new Meteor.Error(
                'AddProductToCart.productNotFound',
                'The product that you are trying to add to the cart does not exist.');
        }

        let item: CartItem = new CartItem(
            productId,
            quantity,
            product.title,
            product.color,
            product.size,
            product.images[0].url
        );

        let selector: Object = {_id: userId};
        let modifier: Object;

        let productIndex: number = findProduct(user.cart, product._id);
        let maxQuantity: number  = product.stock;
        let newQuantity: number  = Math.min(item.quantity, maxQuantity);

        if (productIndex === -1)
        {
            if (newQuantity < 1)
                return;

            modifier = {$push: {'cart.items': item}};
        }
        else
        {
            newQuantity = Math.min(user.cart.items[productIndex].quantity + item.quantity, maxQuantity);

            if (set)
            {
                if (item.quantity < 1)
                {
                    modifier = {$pull: {'cart.items': {productId}}};
                }
                else
                {
                    selector['cart.items.productId'] = productId;

                    modifier = {$set: {'cart.items.$.quantity': item.quantity}};
                }
            }
            else
            {
                if (newQuantity < 1)
                {
                    modifier = {$pull: {'cart.items': {productId}}};
                }
                else
                {
                    selector['cart.items.productId'] = productId;

                    modifier = {$set: {'cart.items.$.quantity': newQuantity}};
                }
            }
        }

        return Meteor.users.update(selector, modifier);
    }
});

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Deletes all products from the given user cart.
 */
Meteor.methods({
    deleteAllProductsFromCart(userId: string)
    {
        if (!getUser(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'cart.deleteAllProducts.unauthorized',
                'You are not authorized to perform this action.');
        }

        return Meteor.users.update({userId}, {$set: {'cart.items': []}});
    }
});

/**
 * @summary Deletes the given product from the given user cart.
 */
Meteor.methods({
    deleteProductFromCart(userId: string, productId: string)
    {
        if (!getUser(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'cart.deleteProduct.unauthorized',
                'You are not authorized to perform this action.');
        }

        return Meteor.users.update({_id: userId}, {$pull: {'cart.items': {productId}}});
    }
});
