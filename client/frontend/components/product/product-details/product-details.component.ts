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

import { Component,
         OnInit,
         OnChanges,
         SimpleChanges }        from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { ProductsService }      from 'meteor/biglup:biglup-business';
import { CategoriesService }    from 'meteor/biglup:biglup-business';
import { I18nSingletonService } from '../../../../services/i18n/i18n-singleton.service';
import { Product, Category }    from 'meteor/biglup:biglup-business';

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
export class ProductDetailsComponent implements OnInit, OnChanges
{
    private _i18nService: I18nSingletonService = I18nSingletonService.getInstance();
    private _product:     Product;
    private _category:    Category;

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

            this._productsService.getProduct(productId).subscribe((product: Product) =>
            {
                this._product = product;
            });

            this._categoriesService.getCategory(categoryId)
                .subscribe((category: Category) => { this._category = category; });
        });
    }

    /**
     * @summary This method is called right after the data-bound properties have been checked and before view and
     * content children are checked if at least one of them has changed.
     *
     * The changes parameter contains an entry for each of the changed data-bound property.
     * The key is the property name and the value is an instance of SimpleChange.
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges)
    {
    }
}
