/**
 * @file add-appearance.component.ts
 *
 * @summary The add appearance admin panel functionality.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   June 14 2017
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
         ViewChild,
         ChangeDetectorRef }              from '@angular/core';
import { Location }                       from '@angular/common';
import { Router, ActivatedRoute }         from '@angular/router';
import { BiglupModalComponent }           from 'meteor/biglup:ui';
import { Appearance, AppearancesService } from 'meteor/biglup:business';
import { _T }                             from 'meteor/biglup:i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-appearance.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add appearances to the site.
 */
@Component({
    selector: 'add-appearance',
    template
})
export class AddAppearanceComponent implements OnInit, AfterViewInit
{
    private _appearance:            Appearance           = new Appearance();
    @ViewChild(BiglupModalComponent)
    private _modal:                 BiglupModalComponent;
    private _waitModalResult:       boolean              = false;
    private _isEditMode:            boolean              = false;

    /**
     * @summary Initializes a new instance of the AddAppearanceComponent class.
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _changeDetector: ChangeDetectorRef,
        private _appearancesService: AppearancesService,
        private _location: Location)
    {
        this._appearance.style.header.mobileLogo = null;
        this._appearance.style.header.logo       = null;
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._route.params.subscribe((params) =>
        {
            this._appearance._id = params['id'];

            if (!this._appearance._id)
            {
                this._changeDetector.detectChanges();
                return;
            }

            this._appearancesService.getAppearance(this._appearance._id).subscribe(
                (appearance: Appearance) =>
                {
                    this._appearance = appearance;
                    this._isEditMode = true;

                    this._changeDetector.detectChanges();
                });
        });
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
    }

    /**
     * @summary Saves the appearance in the database.
     */
    private _saveAppearance(): void
    {
        let isRequiredMissing: boolean = this._appearance.name === "";

        if (isRequiredMissing)
        {
            this._modal.show(
                _T('Required Field Missing'),
                _T('Appearance Name is required '));

            return;
        }

        this._waitModalResult = true;

        this._modal.showProgressObservable(
            _T('Create Appearance'),
            _T('Creating...'),
            this._appearancesService.createAppearance(this._appearance),
            {
                title:   _T('Create Appearance'),
                message: _T('Appearance Created.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error creating the appearance.')
            },
        );
    }

    /**
     * @summary Deletes the appearance in the database.
     */
    private _deleteAppearance(): void
    {
        this._waitModalResult = true;

        this._modal.showProgressObservable(
            _T('Delete Appearance'),
            _T('Deleting...'),
            this._appearancesService.deleteAppearance(this._appearance._id),
            {
                title:   _T('Delete Appearance'),
                message: _T('Appearance Deleted.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error deleting the appearance.')
            },
        );
    }

    /**
     * @summary Updates the appearance in the database.
     */
    private _updateAppearance(): void
    {
        let isRequiredMissing: boolean = this._appearance.name === "";

        if (isRequiredMissing)
        {
            this._modal.show(
                _T('Required Field Missing'),
                _T('Appearance Name is required '));

            return;
        }

        this._waitModalResult = true;

        this._modal.showProgressObservable(
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

    /**
     * @summary Cancels the operation
     */
    private _onCancel(): void
    {
        this._location.back();
    }

    /**
     * @summary Handles the modal closed event.
     *
     * @param event The modal closed event
     */
    private _onModalClosed(event: any): void
    {
        if (this._waitModalResult)
        {
            this._waitModalResult = false;

            this._router.navigate(['/appearances']);
        }
    }
}
