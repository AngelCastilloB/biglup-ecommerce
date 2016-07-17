/**
 * @file load-mock-data.ts
 *
 * @summary Loads mock data for testing purposes.
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

// IMPORTS ************************************************************************************************************/

import { Categories } from '../common/collections/category.collection.ts';
import { Products } from '../common/collections/product.collection.ts';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Inserts the fake categories.
 */
export function loadCategories() {
    if (Categories.find().count() === 0) {

        var categories = [
            {
                'name': "Shirts",
                'slug': "shirts",
                'info': "All the shirts",
                'image': "shirts.png"
            },
            {
                'name': "Dresses",
                'slug': "dresses",
                'info': "All the dresses",
                'image': "dresses.png"
            },
            {
                'name': "Shoes",
                'slug': "shoes",
                'info': "All the shoes",
                'image': "shoes.png"
            }
        ];

        for (var i = 0; i < categories.length; i++) {
            Categories.insert(categories[i]);
        }
    }
}

/**
 * @summary Inserts the fake products.
 */
export function loadProducts() {
    if (Products.find().count() === 0) {


        var products = [
            {
                'title': "Black Shoe",
                'sku': "blacks086",
                'category': "",
                'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
                " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
                " dolor in exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis" +
                " aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" +
                " pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia" +
                " deserunt mollit anim id est laborum.",
                'color': "black",
                'size': "small",
                'price': 1200,
                'discount': 10,
                'isLowQuantity': false,
                'isSoldOut': false,
                'isBackorder': false,
                'requiresShipping': true,
                'hashtags': ['shoes', 'black', 'sport'],
                'isVisible': true,
                'createdAt': new Date(),
                'updatedAt': new Date(),
                'publishedAt': new Date()
            },
            {
                'title': "Red Dress",
                'sku': "red0019s",
                'category': "",
                'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
                " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
                " dolor in exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis" +
                " aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" +
                " pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia" +
                " deserunt mollit anim id est laborum.",
                'color': "red",
                'size': "medium",
                'price': 2000,
                'discount': 5,
                'isLowQuantity': false,
                'isSoldOut': false,
                'isBackorder': false,
                'requiresShipping': true,
                'hashtags': ['shoes', 'black', 'sport'],
                'isVisible': true,
                'createdAt': new Date(),
                'updatedAt': new Date(),
                'publishedAt': new Date()
            },
            {
                'title': "Pink shirt",
                'sku': "ps9sahk",
                'category': "",
                'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
                " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud" +
                " dolor in exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis" +
                " aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla" +
                " pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia" +
                " deserunt mollit anim id est laborum.",
                'color': "pink",
                'size': "shirt",
                'price': 800,
                'discount': 15,
                'isLowQuantity': false,
                'isSoldOut': false,
                'isBackorder': false,
                'requiresShipping': true,
                'hashtags': ['shirt', 'pink'],
                'isVisible': true,
                'createdAt': new Date(),
                'updatedAt': new Date(),
                'publishedAt': new Date()
            }
        ];

        for (var i = 0; i < products.length; i++) {
            Products.insert(products[i]);
        }
    }
}