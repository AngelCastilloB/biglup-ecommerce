/**
 * @file product-details.component.ts
 *
 * @summary Shows to the user the info associated with a particular product.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 28 2016
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Products }          from '../../../../../common/collections/product.collection';
import { Images }            from '../../../../../common/collections/image.collection';
import { Categories }        from '../../../../../common/collections/category.collection';
import { MeteorComponent }   from 'angular2-meteor';

// noinspection TypeScriptCheckImport
import template from './product-details.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component shows specific details about a product.
 */
@Component({
    selector: 'product-details',
    template
})
export class ProductDetailsComponent extends MeteorComponent implements OnInit
{
    private _productId:     string;
    private _categoryId:    string;
    private _product:       Product;
    private _productImages: Array<ProductImage> = Array<ProductImage>();
    private _category:      Category;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private route: ActivatedRoute)
    {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {
        this.route.params.subscribe((params) =>
        {
            this._categoryId = params['categoryId'];
            this._productId  = params['productId'];

            this.subscribe('product', this._productId, () =>
            {
                this._product = Products.findOne({_id: this._productId});

                this._product.images.sort(function(lhs, rhs) {
                    return lhs.position - rhs.position;
                });

                this.subscribe('images', () => {

                    for (let i: number = 0; i < this._product.images.length; ++i) {
                        let image: ProductImage = Images.findOne({ _id: this._product.images[i].id });

                        if (image) {
                            this._productImages.push(image);
                        }
                    }

                }, true);
            }, true);

            this.subscribe('category', this._categoryId, () =>
            {
                this._category = Categories.findOne({_id: this._categoryId});
            }, true);
        });
    }
}
