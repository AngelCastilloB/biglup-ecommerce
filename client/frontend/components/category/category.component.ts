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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ProductsService }   from '../../../services/products.service';

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
export class CategoryComponent implements OnInit {
    private _categoryId: string;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private _route: ActivatedRoute, private _productsService: ProductsService)
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
        });
    }
}
