/**
 * @file collections.component.ts
 *
 * @summary The collections component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 09 2016
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

import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CategoriesService }               from 'meteor/biglup:business';
import { Router }                          from '@angular/router';
import { _T, I18nSingletonService }        from 'meteor/biglup:i18n';
import { BiglupModalComponent,
         BiglupModalType,
         BiglupModalButtons,
         BiglupModalResult }               from 'meteor/biglup:ui';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './collections.component.html';

// RxJs Operators imports.
import 'rxjs/add/operator/map';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the collections of the site.
 */
@Component({
    selector: 'categories',
    template
})
export class CollectionsComponent implements OnDestroy
{
    @ViewChild(BiglupModalComponent)
    private _modal:            BiglupModalComponent;
    private _dataTableColums:     any = {};
    private _i18nSubscription:    any;
    private _collectionsToDelete: Array<string>;
    private _i18nService:         I18nSingletonService = I18nSingletonService.getInstance();

    /**
     * @summary Initializes a new instance of the CollectionsComponent class.
     *
     * @param _router The router service.
     * @param _categoriesService The category service.
     */
    constructor(private _router: Router, private _categoriesService: CategoriesService)
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
            { name: 'name', label: _T('Name'), format: (value) => I18nSingletonService.getInstance().getMongoText(value)},
            { name: 'info', label: _T('Description'), format: (value) => I18nSingletonService.getInstance().getMongoText(value)}
        ];
    }

    /**
     * @summary Event handler for when the edit button is clicked.
     * @param event The edit event.
     */
    private _onEdit(event)
    {
        this._router.navigate(['/admin/collections/edit-collection', event._id]);
    }

    /**
     * @summary Event handler for when the delete button is clicked.
     * @private
     */
    private _onDelete(event)
    {
        this._collectionsToDelete = event.map((product) => product._id);

        this._modal.show(
            _T('Delete Collections'),
            _T('Are you sure you want to delete this collections?'),
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
                this._categoriesService.deleteCategories(this._collectionsToDelete),
                {
                    title:   _T('Delete Collections'),
                    message: _T('Collections Deleted.')
                },
                {
                    title:   _T('Error'),
                    message: _T('There was an error deleting the collections.')
                },
            );
        }
        else
        {
            this._collectionsToDelete.length = 0;
        }
    }
}
