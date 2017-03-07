/**
 * @file frontend.component.ts
 *
 * @summary
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

import { Component, OnDestroy, ViewChild }                   from '@angular/core';
import { CategoriesService, AppearancesService, Appearance } from 'meteor/biglup:business';
import { BiglupModalComponent }                              from './modules/designer';
import { I18nSingletonService, _T }                          from 'meteor/biglup:i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './frontend.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The front end root component.
 */
@Component({template})
export class FrontendComponent implements OnDestroy
{
    private _isDevModeOn:   boolean    = true;
    private _showDrawer:    boolean    = false;
    private _appearance:    Appearance = null;
    private _subscriptions: Array<any> = [];
    @ViewChild(BiglupModalComponent)
    private _modal: BiglupModalComponent;

    constructor(private _categoriesService: CategoriesService, private _appearancesService: AppearancesService)
    {
        this._appearancesService.getActiveAppearance().subscribe(
            (appearance: Appearance) =>
            {
                this._appearance = appearance;
            });
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
        if (this._subscriptions)
            this._subscriptions.forEach((subscribtion) => subscribtion.unsubscribe());
    }

    /**
     * Toggles the designer menu.
     */
    private _onToggleClick()
    {
        this._showDrawer = !this._showDrawer;
    }

    /**
     * @summary Event handler for when the appearance is saved.
     */
    private _onSaveClick()
    {
        this._modal.showObservable(
            _T('Update Appearance'),
            _T('Updating...'),
            this._appearancesService.updateAppearance(this._appearance),
            {
                title:   _T('Update Appearance'),
                message: _T('Appearance Updated.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error updating the appearance.')
            },
        );
    }
}
