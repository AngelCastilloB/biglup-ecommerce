/**
 * @file add-product-variant.component.ts
 *
 * @summary The add product variant component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   Jan 30 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
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
         AfterViewInit,
         Input }          from '@angular/core';
import { ProductVariant } from 'meteor/biglup:business';
import { InputFilters }   from 'meteor/biglup:ui';
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-product-variant.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows the adding of variants.
 */
@Component({
    selector: 'add-product-variant',
    template
})
export class AddProductVariantComponent implements OnInit, AfterViewInit
{
    @Input('model')
    private _productVariant: ProductVariant = null;
    @Input('trackInventory')
    private _trackInventory: boolean = false;

    // Hack: Make InputFilters enum available in the template.
    private InputFilters: InputFilters = InputFilters;

    /**
     * @summary Initializes a new instance of the AddProductVariantComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
    }
}
