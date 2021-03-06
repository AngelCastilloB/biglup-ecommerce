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

import { Products }              from '../collections/product.collection';
import { Categories }            from '../collections/category.collection';
import { Images }                from 'meteor/biglup:images';
import { ProductSchema }         from '../schemas/product.schema';
import { Product, ProductImage } from '../models';
import { Meteor }                from 'meteor/meteor';

// INNER FUNCTIONS ****************************************************************************************************/

/**
 * @summary Removes the images that are not longer in use.
 *
 * @param modifiedProduct The product with the modifications.
 * @param currentProduct  The product as it currently is in the database.
 */
const removeUnusedImages = (modifiedProduct: Product, currentProduct: Product) =>
{
    let modifiedProductIds: Array<String> = modifiedProduct.images.map(orderedImage => orderedImage.id);
    let currentProductIds:  Array<String> = currentProduct.images.map(orderedImage => orderedImage.id);
    let difference:         Array<String> = currentProductIds.filter(id => modifiedProductIds.indexOf(id) < 0);

    for (let i: number = 0; i < difference.length; ++i)
    {
        if (Meteor.settings.public['google-cloud-storage'])
        {
            Meteor.call('deleteGoogleCloudStorageFile', difference[i]);
        }
        else
        {
            Images.remove({_id: difference[i]});
        }
    }
};

/**
 * @summary Removes all the images related to a product.
 *
 * @param images The images to be removed.
 */
const removeAllImages = (images: Array<ProductImage>) =>
{
    for (let i: number = 0; i < images.length; ++i)
    {
        if (Meteor.settings.public['google-cloud-storage'])
        {
            Meteor.call('deleteGoogleCloudStorageFile', images[i].id);
        }
        else
        {
            Images.remove({_id: images[i].id});
        }
    }
};

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
    createProduct(product: Product)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'createProduct.unauthorized',
                'You are not authorized to perform this action.');
        }
        */
        check(product, ProductSchema);

        if (product.categories)
        {
            for (let i = 0; i < product.categories.length; ++i)
            {
                if (Categories.find({_id: product.categories[i]}).count() === 0)
                {
                    throw new Meteor.Error(
                        'createProduct.categoryDoesNotExist',
                        'One of the categories for this product does not exist (' + (product.categories[i]) + ').');
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
    deleteProduct(productId: string)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'deleteProduct.unauthorized',
                'You are not authorized to perform this action.');
        }
        */

        check(productId, String);

        let product: Product = Products.findOne({_id: productId});

        if (!product)
        {
            throw new Meteor.Error(
                'deleteProduct.productDoesNotExist',
                'This product does not exists in the database.');
        }

        // Try to remove the product first since once we start to delete the images there is no way to rollback.
        Products.remove({_id: productId});

        Meteor.defer(()=>
        {
            removeAllImages(product.images);
        });
    }
});

/**
 * @summary Registers the delete products method to Meteor's DDP system. This method deletes the given products
 * (and all its variants) from the system.
 *
 * @param products The collection of products id of the products to be deleted.
 */
Meteor.methods({
    deleteProducts(productsId: Array<string>)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'deleteProducts.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        productsId.forEach(
        (id) =>
        {
            Meteor.call('deleteProduct', id, (error) =>
            {
                if (error)
                    console.error(error);
            });
        });
    }
});

/**
 * @summary Registers the update product method to Meteor's DDP system. This method modifies the given product
 * with all the changes.
 *
 * @param product The product to be updated.
 */
Meteor.methods({
    updateProduct(product: Product)
    {
        check(product, ProductSchema);

        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'updateProduct.unauthorized',
                'You are not authorized to perform this action.');
        }
         */

        if (!product._id || product._id === '')
        {
            throw new Meteor.Error(
                'updateProduct.idIsEmpty',
                'The id of this product is empty. You need to provide the id of an existing product in the database.');
        }

        let currentProductState: Product = Products.findOne({_id: product._id});

        if (!currentProductState)
        {
            throw new Meteor.Error(
                'updateProduct.productDoesNotExist',
                'This product does not exists in the database.');
        }

        Meteor.defer(()=>
        {
            removeUnusedImages(product, currentProductState);
        });

        let id = product._id;

        delete product['_id'];

        Products.update({_id: id}, {$set: product});
    }
});

/**
 * @summary Registers the remove category method to Meteor's DDP system. This method remove a given category from all
 * products.
 *
 * @param id The id of the category to be removed.
 */
Meteor.methods({
    removeCategory(id: string)
    {
        check(id, String);

        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'removeCategory.unauthorized',
                'You are not authorized to perform this action.');
        }
*/

        Products.update({}, {$pull: {categoryId: id}});
    }
});
