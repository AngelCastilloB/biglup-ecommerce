/**
 * @file application
 *
 * @summary Client application entry point.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 16 2016
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

import 'reflect-metadata';
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Categories } from '../../../common/schemas/category.ts';
import { Products } from '../../../common/schemas/product.ts';

import template from './application.html';

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary This the the application root component.
 */
@Component({
    selector: 'application',
    template
})
class Application {

    /**
     * @summary Initializes a new instance of the Application class.
     */
    constructor()
    {
        Categories.insert({
            name: "Ulysses",
            slug: "James Joyce",
            info: "James Joyce",
            image: "James Joyce",
            category: 2}, function(error, result) {

            console.debug(result);
            console.debug(error);
            //The insert will fail, error will be set,
            //and result will be undefined or false because "copies" is required.
            //
            //The list of errors is available on `error.invalidKeys` or by calling Books.simpleSchema().namedContext().invalidKeys()
        });

        Products.insert({
            title: "Ulysses",
            sku: "James Joyce",
            description: "James Joyce",
            color: "James Joyce",
            size: "Perfecto",
            price: 10,
            discount: 10,
            isLowQuantity: true,
            isSoldOut: true,
            isBackorder: true,
            requiresShipping: true,
            hashtags: ['a', 'b'],
            isVisible: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            publishedAt: new Date(),
             }, function(error, result) {

            console.debug(result.title);
            console.debug(error);
            //The insert will fail, error will be set,
            //and result will be undefined or false because "copies" is required.
            //
            //The list of errors is available on `error.invalidKeys` or by calling Books.simpleSchema().namedContext().invalidKeys()
        });
    }
}

bootstrap(Application);