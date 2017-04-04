/**
 * @file collages.component.ts
 *
 * @summary The collages admin panel.
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

import { AfterViewInit,
         ViewChild,
         OnDestroy }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Component }                from '@angular/core';
import { AppearancesService,
         Appearance }               from 'meteor/biglup:business';
import { _T, I18nSingletonService } from 'meteor/biglup:i18n';
import { BiglupModalComponent,
         BiglupModalType,
         BiglupModalButtons,
         BiglupModalResult }        from 'meteor/biglup:ui';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './collages.component.html';

let dateFormat = require('dateformat');

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the available collages.
 */
@Component({
    selector: 'collages',
    template
})
export class CollagesComponent implements AfterViewInit, OnDestroy
{
    @ViewChild(BiglupModalComponent)
    private _modal:                BiglupModalComponent;
    private _dataTableColumns:     any = {};
    private _askingForActivation:  boolean = false;
    private _askingForDeletion:    boolean = false;
    private _appearanceToActivate: string = '';
    private _appearancesToDelete:  Array<string>;
    private _i18nSubscription:     any;

    /**
     * @summary Initializes a new instance of the AppearancesComponent class.
     *
     * @param { Router}              _router             Angular 2 routing service.
     * @param { AppearancesService } _appearancesService The Appearances service.
     */
    constructor(private _router: Router, private _appearancesService: AppearancesService)
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
     * @summary This function is called when your component's view has been fully initialized.
     */
    public ngAfterViewInit()
    {
    }

    /**
     * @summary Builds the data table format.
     */
    private _buildTableFormat()
    {
        this._dataTableColumns = [
            { name: 'name', label: _T('Title') },
            { name: 'updatedAt', label: _T('Last Update'), format: (date) => dateFormat(date, "mmmm dS, yyyy, HH:MM:ss")},
            { name: 'isActive', label: _T('Active'), isToggle: true }
        ];
    }

    /**
     * @summary Event handler for when the edit button is clicked.
     * @param event The edit event.
     */
    private _onEdit(event)
    {
        this._router.navigate(['/appearances/edit-appearance', event._id]);
    }

    /**
     * @summary Event handler for when the delete button is clicked.
     */
    private _onDelete(event)
    {
        let hasActive: Appearance = event.find((appearance) => appearance.isActive);

        this._askingForDeletion = false;
        this._askingForActivation = false;

        if (hasActive)
        {
            this._modal.show(
                _T('Delete Appearances'),
                _T('You can not delete an appearance while is still active'),
                BiglupModalType.Warning,
                BiglupModalButtons.Ok);

            return;
        }

        this._appearancesToDelete = event.map((appearance) => appearance._id);

        this._modal.show(
            _T('Delete Appearances'),
            _T('Are you sure you want to delete this appearances?'),
            BiglupModalType.Warning,
            BiglupModalButtons.NoYes);

        this._askingForDeletion = true;
    }

    /**
     * Event handler for when an appearance s toggled.
     *
     * @param event The appearance.
     */
    private _onToggle(event: any)
    {
        if (event.isActive)
            return;

        this._modal.show(
            _T('Activate Appearance'),
            _T('Are you sure you want to change the current appearance of the store?'),
            BiglupModalType.Warning,
            BiglupModalButtons.NoYes);

        this._appearanceToActivate = event._id;
        this._askingForActivation = true;
    }

    /**
     * @summary Event handler for when the modal closes.
     *
     * @param result The modal result.
     */
    private _onModalClose(result: BiglupModalResult)
    {
        if (this._askingForActivation)
        {
            if (result === BiglupModalResult.Yes)
            {
                this._modal.showObservable(
                    _T('Activate Appearance'),
                    _T('Activating...'),
                    this._appearancesService.activateAppearance(this._appearanceToActivate),
                    {
                        title:   _T('Activate Appearance'),
                        message: _T('Appearance Active.')
                    },
                    {
                        title:   _T('Error'),
                        message: _T('There was an error activating the appearance.')
                    },
                );
            }

            this._appearanceToActivate = '';
            this._askingForActivation = false;

            return;
        }

        if (this._askingForDeletion)
        {
            if (result === BiglupModalResult.Yes)
            {
                this._modal.showObservable(
                    _T('Delete Appearances'),
                    _T('Deleting...'),
                    this._appearancesService.deleteAppearances(this._appearancesToDelete),
                    {
                        title:   _T('Delete Appearances'),
                        message: _T('Appearances Deleted.')
                    },
                    {
                        title:   _T('Error'),
                        message: _T('There was an error deleting the appearance.')
                    },
                );
            }
            else
            {
                this._appearancesToDelete.length = 0;
            }

            this._askingForDeletion = false;
            return;
        }
    }

}
