/**
 * @file product.ts
 *
 * @summary The product collection publication file.
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

import { Products } from '../../common/collections/product.collection';
import { Meteor }   from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publishes all the products.
 */
Meteor.publish('products', function() {
    return Products.find();
});

/**
 * @summary Publishes a product given a product id.
 *
 * @param {string} id The product id.
 */
Meteor.publish('product', function(id: string) {
    return Products.find({_id: id});
});

/**
 * @summary Publishes all the products related to a given category.
 *
 * @param {string} id The category id.
 */
Meteor.publish('category-products', function(categoryId: string) {
    return Products.find({categoryId: { $in: [ categoryId ] }});
});
