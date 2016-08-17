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

import { Component, OnInit }     from '@angular/core';
import { MeteorComponent }       from 'angular2-meteor';
import { Mongo }                 from 'meteor/mongo';
import { ActivatedRoute }        from '@angular/router';
import { Products }              from '../../../../common/collections/product.collection.ts';
import { CategoryItemComponent } from '../category-item/category-item.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './category.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a list of all the products inside a category.
 */
@Component({
    selector: 'category',
    template,
    directives: [CategoryItemComponent]
})
export class CategoryComponent extends MeteorComponent implements OnInit {
    private _categoryId: string;
    private _products: Mongo.Cursor<Product>;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private route: ActivatedRoute) {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {

        this.route.params.subscribe((params) => {

            this._categoryId = params['categoryId'];

            this.subscribe('category-products', this._categoryId, () => {

                this._products = Products.find({categoryId: this._categoryId});

            }, true);

        });
    }
}
