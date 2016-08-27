/**
 * @file product.methods.ts
 *
 * @summary This is the product public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 20 2016
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

import { Products }      from '../collections/product.collection';
import { Categories }    from '../collections/category.collection';
import { ProductSchema } from '../schemas/product.schema';

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Registers the add to cart method to Meteor's DDP system. This methods creates a product and adds it to the
 * list of available products.
 *
 * @param product The product to be added to the database.
 *
 * @return The ID if the newly inserted product.
 */
Meteor.methods({
    'products.createProduct' : function (product: Product) {

        /*
         if (!this.user.IsAdmin) {
             throw new Meteor.Error(
                 'products.createProduct.unauthorized',
                 'You are not authorized to perform this action.');
         }
         */

        check(product, ProductSchema);

        if (product.categoryId) {

            for (let i = 0; i < product.categoryId.length; ++i) {

                if (Categories.find({_id: product.categoryId[i]}).count() === 0) {
                    throw new Meteor.Error(
                        'products.createProduct.categoryDoesNotExist',
                        'One of the categories for this product does not exist (' + (product.categoryId[i]) + ').');
                }
            }
        }

        return Products.insert(product);
    }
});

/**
 * @summary Registers the delete product method to Meteor's DDP system. This method deletes the given product
 * (and all its variants) from the system.
 *
 * @param product The product id of the product to be deleted.
 */
Meteor.methods({
    ['products.deleteProduct']: function (productId: string) {

        /*
         if (!this.user.IsAdmin) {
             throw new Meteor.Error(
                 'products.deleteProduct.unauthorized',
                 'You are not authorized to perform this action.');
             }
         */

        check(productId, String);

        if (Products.find({_id: productId}).count() === 0) {
            throw new Meteor.Error(
                'products.deleteProduct.productDoesNotExist',
                'This product does not exists in the database.');
        }

        Products.remove({_id: productId});
    }
});

/**
 * @summary Registers the update product method to Meteor's DDP system. This method modifies the given product
 * with all the changes.
 *
 * @param product The product to be updated.
 */
Meteor.methods({
    ['products.updateProduct']: function (product: Product) {

        check(product, ProductSchema);
        /*
         if (!this.user.IsAdmin) {
             throw new Meteor.Error(
                 'products.updateProduct.unauthorized',
                 'You are not authorized to perform this action.');
         }
         */

        if (!product._id || product._id === '') {
            throw new Meteor.Error(
                'products.updateProduct.idIsEmpty',
                'The id of this product is empty. You need to provide the id of an existing product in the database.');
        }

        if (Products.find({_id: product._id}).count() === 0) {
            throw new Meteor.Error(
                'products.deleteProduct.productDoesNotExist',
                'This product does not exists in the database.');
        }

        Products.update({_id: product._id}, { $set : product});
    }
});

/**
 * @summary Registers the remove category method to Meteor's DDP system. This method remove a given category from all
 * products.
 *
 * @param id The id of the category to be removed.
 */
Meteor.methods({
    ['products.removeCategory']: function (id: string) {

        check(id, String);

        /*
         if (!this.user.IsAdmin) {
             throw new Meteor.Error(
                 'products.removeCategory.unauthorized',
                 'You are not authorized to perform this action.');
         }
         */

        Products.update({}, { $pull: { categoryId: id }});
    }
});
