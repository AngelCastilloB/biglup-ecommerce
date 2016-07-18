/**
 * @file category.component.ts
 *
 * @summary The category component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
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
import { Products } from '../../../common/collections/product.collection.ts';
import { Images } from '../../../common/collections/image.collection';
import { MeteorComponent } from 'angular2-meteor';
import { Mongo } from 'meteor/mongo';
import { ActivatedRoute } from '@angular/router';
import { Tracker } from 'meteor/tracker';

import template from './category.component.html';

// COMPONENTS *********************************************************************************************************/

@Component({
    selector: 'category',
    template
})
/**
 * @summary This component displays a list of all the products inside a category.
 */
export class CategoryComponent extends MeteorComponent{

    private products: Mongo.Cursor<Product>;
    categoryId: string;
    public productImages: Mongo.Cursor<Image>;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.categoryId = params['categoryId'];
            Tracker.autorun(() => {
                this.products = Products.find({category : this.categoryId});
                this.productImages = Images.find();
                console.debug(this.productImages.count() + "");
            });

        });
    }
}