/**
 * @file category-item.component.ts
 *
 * @summary The category item component definition.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 29 2016
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

import { Component, Input, OnInit } from '@angular/core';
import { Product }                  from 'meteor/biglup:business';
import { CartsService }             from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './category-item.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a given product in the category.
 */
@Component({
    selector: 'category-item',
    template
})
export class CategoryItemComponent implements OnInit
{
    @Input()
    public model: Product;

    @Input()
    public category: string;

    /**
     * @summary Initializes a new instance of the CategoryItemComponent class.
     */
    constructor(private _cartsService: CartsService)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
    }

    /**
     * @brief Adds an item to the cart.
     */
    private _addToCart()
    {
        this._cartsService.addProduct(this.model._id, 1).subscribe(
            () => console.log('handle product added to cart'),
            error => console.error(error)
        );
    }
}
