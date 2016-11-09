/**
 * @file products.component.ts
 *
 * @summary The products admin panel.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
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

import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { ProductsService }          from 'meteor/biglup:business';
import { _T, I18nSingletonService } from 'meteor/biglup:i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './products.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the products of the site.
 */
@Component({
    selector: 'products',
    template,
})
export class ProductsComponent
{
    private _dataTableColums: any = {};

    /**
     * @summary Initializes a new instance of the ProductsComponent class.
     */
    constructor(private _router: Router, private _productsService: ProductsService)
    {
        this._buildTableFormat();
        I18nSingletonService.getInstance().getLocaleChangeEmitter().subscribe(() => this._buildTableFormat());
    }

    /**
     * @summary Builds the data table format.
     */
    private _buildTableFormat()
    {
        this._dataTableColums = [
            { name: 'sku', label: _T('SKU') },
            { name: 'title', label: _T('Title'), format: (value) => I18nSingletonService.getInstance().getMongoText(value)},
            { name: 'stock', label: _T('Inventory'), numeric: true },
            { name: 'price',  label: _T('Price'), numeric: true },
            { name: 'categories',  label: _T('Categories'), format:
                (value: any) =>
                {
                    let categories: string  = '';

                    if (value && value.length > 0)
                        value.forEach((category) => categories = categories + ' ' + category);

                    return categories;
                }},
            { name: 'color', label: _T('Color'), format: (value) => I18nSingletonService.getInstance().getMongoText(value) },
            { name: 'size', label: _T('Size'), format: (value) => I18nSingletonService.getInstance().getMongoText(value) }
        ];
    }

    private _logEvent(event)
    {
        console.error(event);
    }
}
