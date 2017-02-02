/**
 * @file inventory.methods.ts
 *
 * @summary This is the inventory public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 02 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Products } from '../collections/product.collection';
import { Meteor }   from 'meteor/meteor';

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Registers the increase variant inventory method to Meteor's DDP system. This methods increases (or decreases) the
 * inventory of a given variant product.
 *
 * @param productId The id of the product to increase/decrease.
 * @param variantId The id of the variant to increase/decrease.
 * @param amount The amount to be increased/decreased.
 */
Meteor.methods({
    increaseVariantInventory(productId: string, variantId: string, amount: number)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'createProduct.unauthorized',
         'You are not authorized to perform this action.');
         }
         */
        check(productId, String);
        check(variantId, String);
        check(amount, Number);


        if (Products.find({_id: productId}).count() === 0)
        {
            throw new Meteor.Error(
                'increaseVariantInventory.productDoesNotExist',
                'The product with the given product id does not exist (' + (productId) + ').');
        }

        if (Products.find({_id: productId, 'variantProducts._id': variantId}).count() === 0)
        {
            throw new Meteor.Error(
                'increaseVariantInventory.variantDoesNotExist',
                'The product variant with the given product variantId id does not exist (' + (productId) + ').');
        }


        Products.update({_id: productId, 'variantProducts._id': variantId}, {$inc: { 'variantProducts.$.stock' : amount}});

        return Products
            .findOne({_id: productId})
            .variantProducts
            .find((variant)=> variant._id === variantId)
            .stock;
    }
});

/**
 * @summary Registers the increase product inventory method to Meteor's DDP system. This methods increases (or decreases) the
 * inventory of a given product.
 *
 * @param productId The id of the product to increase/decrease.
 * @param amount The amount to be increased/decreased.
 */
Meteor.methods({
    increaseProductInventory(productId: string, amount: number)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'createProduct.unauthorized',
         'You are not authorized to perform this action.');
         }
         */
        check(productId, String);
        check(amount, Number);


        if (Products.find({_id: productId}).count() === 0)
        {
            throw new Meteor.Error(
                'increaseProductInventory.productDoesNotExist',
                'The product with the given product id does not exist (' + (productId) + ').');
        }

        Products.update({_id: productId}, {$inc: { stock : amount}});

        return Products.findOne({_id: productId}).stock;
    }
});

/**
 * @summary Registers the set variant inventory method to Meteor's DDP system. This methods sets the
 * inventory of a given variant product.
 *
 * @param productId The id of the product.
 * @param variantId The id of the variant.
 * @param amount The amount to be set.
 */
Meteor.methods({
    setVariantInventory(productId: string, variantId: string, amount: number)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'createProduct.unauthorized',
         'You are not authorized to perform this action.');
         }
         */
        check(productId, String);
        check(variantId, String);
        check(amount, Number);


        if (Products.find({_id: productId}).count() === 0)
        {
            throw new Meteor.Error(
                'setVariantInventory.productDoesNotExist',
                'The product with the given product id does not exist (' + (productId) + ').');
        }

        if (Products.find({_id: productId, 'variantProducts._id': variantId}).count() === 0)
        {
            throw new Meteor.Error(
                'setVariantInventory.variantDoesNotExist',
                'The product variant with the given product variantId id does not exist (' + (productId) + ').');
        }


        Products.update({_id: productId, 'variantProducts._id': variantId}, {$set: { 'variantProducts.$.stock' : amount}});

        return Products
            .findOne({_id: productId})
            .variantProducts
            .find((variant)=> variant._id === variantId)
            .stock;
    }
});

/**
 * @summary Registers the set product inventory method to Meteor's DDP system. This methods sets the
 * inventory of a given product.
 *
 * @param productId The id of the product.
 * @param amount The amount to be set.
 */
Meteor.methods({
    setProductInventory(productId: string, amount: number)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'createProduct.unauthorized',
         'You are not authorized to perform this action.');
         }
         */
        check(productId, String);
        check(amount, Number);

        if (Products.find({_id: productId}).count() === 0)
        {
            throw new Meteor.Error(
                'setProductInventory.productDoesNotExist',
                'The product with the given product id does not exist (' + (productId) + ').');
        }

        Products.update({_id: productId}, {$set: { stock : amount}});

        return Products.findOne({_id: productId}).stock;
    }
});