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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { MeteorComponent }              from 'angular2-meteor';
import { ProductsService }              from '../../../../services/products.service';
import { CategoriesService }            from '../../../../services/categories.service';

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
export class ProductDetailsComponent extends MeteorComponent implements OnInit, OnDestroy
{
    private _product:  Product;
    private _category: Category;
    private _productSubscription;
    private _categorySubscription;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     *
     * @param _route             The active route.
     * @param _productsService   The product service.
     * @param _categoriesService The category service.
     */
    constructor(
        private _route: ActivatedRoute,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService)
    {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        this._route.params.subscribe((params) =>
        {
            let categoryId: string = params['categoryId'];
            let productId:  string = params['productId'];

            this._productSubscription = this._productsService.getProduct(productId)
                .subscribe((product: Product) => { this._product = product; });

            this._categorySubscription = this._categoriesService.getCategory(categoryId)
                .subscribe((category: Category) => { this._category = category; });
        });
    }

    /**
     * @summary Cleanup just before Angular destroys the directive/component. Unsubscribe observables and detach event
     * handlers to avoid memory leaks.
     */
    public ngOnDestroy()
    {
        if (this._productSubscription)
            this._productSubscription.unsubscribe();

        if (this._categorySubscription)
            this._categorySubscription.unsubscribe();
    }
}
