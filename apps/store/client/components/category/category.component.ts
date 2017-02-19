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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { ProductsService }              from 'meteor/biglup:business';
import { Category, CategoriesService }  from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './category.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a list of all the products inside a category.
 */
@Component({
    selector: 'category',
    template
})
export class CategoryComponent implements OnInit, OnDestroy
{
    private _categoryId:   string;
    private _category:     Category = null;
    private _subscription: any      = null;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private _route: ActivatedRoute, private _productsService: ProductsService, private _categoriesService: CategoriesService)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        this._route.params.subscribe((params) =>
        {
            this._categoryId = params['categoryId'];

            this._subscription = this._categoriesService.getCategory(this._categoryId).subscribe(
                (category) =>
                {
                    this._category = category;
                }
            );
        });
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
        if (this._subscription !== null)
            this._subscription.unsubscribe();
    }
}
