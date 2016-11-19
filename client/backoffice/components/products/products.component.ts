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

import { Component,
         OnDestroy,
         ViewChild }                from '@angular/core';
import { Router }                   from '@angular/router';
import { ProductsService }          from 'meteor/biglup:business';
import { _T, I18nSingletonService } from 'meteor/biglup:i18n';
import { BiglupModalComponent,
         BiglupModalType,
         BiglupModalButtons,
         BiglupModalResult }        from 'meteor/biglup:ui';

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
export class ProductsComponent implements OnDestroy
{
    @ViewChild(BiglupModalComponent)
    private _modal:            BiglupModalComponent;
    private _dataTableColums:  any = {};
    private _i18nSubscription: any;
    private _productsToDelete: Array<string>;

    /**
     * @summary Initializes a new instance of the ProductsComponent class.
     */
    constructor(private _router: Router, private _productsService: ProductsService)
    {
        this._buildTableFormat();
        this._i18nSubscription = I18nSingletonService.getInstance().getLocaleChangeEmitter().subscribe(() => this._buildTableFormat());
    }

    /**
     * @summary Perform any custom cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy()
    {
        if (this._i18nSubscription)
            this._i18nSubscription.unsubscribe();
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
            { name: 'color', label: _T('Color'), format: (value) => I18nSingletonService.getInstance().getMongoText(value) },
            { name: 'size', label: _T('Size'), format: (value) => I18nSingletonService.getInstance().getMongoText(value) }
        ];
    }

    /**
     * @summary Event handler for when the edit button is clicked.
     * @param event The edit event.
     */
    private _onEdit(event)
    {
        this._router.navigate(['/admin/products/edit-product', event._id]);
    }

    /**
     * @summary Event handler for when the delete button is clicked.
     * @private
     */
    private _onDelete(event)
    {
        this._productsToDelete = event.map((product) => product._id);

        this._modal.show(
            _T('Delete Products'),
            _T('Are you sure you want to delete this products?'),
            BiglupModalType.Warning,
            BiglupModalButtons.NoYes);
    }

    /**
     * @summary Event handler for when the modal closes.
     *
     * @param result The modal result.
     */
    private _onModalClose(result: BiglupModalResult)
    {
        if (result === BiglupModalResult.Yes)
        {
            this._modal.showObservable(
                _T('Delete Products'),
                _T('Deleting...'),
                this._productsService.deteleProducts(this._productsToDelete),
                {
                    title:   _T('Delete Products'),
                    message: _T('Products Deleted.')
                },
                {
                    title:   _T('Error'),
                    message: _T('There was an error deleting the products.')
                },
            );
        }
        else
        {
            this._productsToDelete.length = 0;
        }
    }
}
