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

import { Component }       from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { Mongo }           from 'meteor/mongo';
import { ActivatedRoute }  from '@angular/router';
import { Tracker }         from 'meteor/tracker';
import { Products }        from '../../../../common/collections/product.collection.ts';
import { Images }          from '../../../../common/collections/image.collection';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
//noinspection TypeScriptCheckImport
import template from './category.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a list of all the products inside a category.
 */
@Component({
    selector: 'category',
    template
})
export class CategoryComponent extends MeteorComponent {

    private _categoryId:    string;
    private _products:      Mongo.Cursor<Product>;
    private _productImages: Mongo.Cursor<Image>;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private route: ActivatedRoute) {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this._categoryId = params['categoryId'];
            Tracker.autorun(() => {
                this._products = Products.find({category : this._categoryId});
                this._productImages = Images.find();
                console.debug(this._productImages.count() + "");
            });

        });
    }
}