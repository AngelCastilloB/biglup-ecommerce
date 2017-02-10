/**
 * @file add-color-variant.component.ts
 *
 * @summary The add color variant admin panel functionality.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   Jan 15 2017
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
         ViewChildren,
         QueryList,
         ChangeDetectorRef,
         ViewChild }                 from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';
import { I18nSingletonService, _T }  from 'meteor/biglup:i18n';
import { BiglupModalComponent,
         BiglupModalResult }         from 'meteor/biglup:ui';
import { I18nString }                from 'meteor/biglup:i18n';
import { VariantAttributesService,
         ColorVariantAttribute }     from 'meteor/biglup:business';
import { I18nInputComponent }        from '../i18n-input/i18n-input.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-color-variant.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add color variants to the site.
 *
 */
@Component({
    selector: 'add-color-variant',
    template
})
export class AddColorVariantComponent implements OnInit
{
    @ViewChildren(I18nInputComponent)
    private _names:                 QueryList<I18nInputComponent>;
    @ViewChild(BiglupModalComponent)
    private _modal:                 BiglupModalComponent;
    private _variantColor:          ColorVariantAttribute = new ColorVariantAttribute();
    private _i18nService:           I18nSingletonService  = I18nSingletonService.getInstance();
    private _waitModalResult:       boolean               = false;
    private _isEditMode:            boolean               = false;
    private _i18nNameReferenceMap:  Object                = {};

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _variantsService: VariantAttributesService,
        private _changeDetector: ChangeDetectorRef)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._route.params.subscribe((params) =>
        {
            this._variantColor._id = params['id'];

            if (!this._variantColor._id)
            {
                this._i18nService.getSupportedLanguages().forEach((lang) =>
                {
                    let name: I18nString = new I18nString(lang);

                    this._variantColor.name.push(name);
                    this._i18nNameReferenceMap[lang] = name;
                });

                this._changeDetector.detectChanges();
                return;
            }

            this._variantsService.getColor(this._variantColor._id).subscribe(
                (color: ColorVariantAttribute) =>
                {
                    this._variantColor = color;
                    this._isEditMode   = true;

                    this._i18nService.getSupportedLanguages().forEach((lang) =>
                    {
                        let name: I18nString = this._variantColor.name.find((i18nString) => i18nString.language === lang);

                        if (!name)
                        {
                            name = new I18nString(lang);
                            this._variantColor.name.push(name);
                        }

                        this._i18nNameReferenceMap[lang] = name;
                    });

                    this._changeDetector.detectChanges();
                });
        });
    }

    /**
     * @summary Saves the color in the database.
     */
    private _saveColor(): void
    {
        let isRequieredMissing: any = this._names.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Color Name is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        if (isRequieredMissing)
            return;

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Create Color'),
            _T('Creating...'),
            this._variantsService.createColors(this._variantColor),
            {
                title:   _T('Create Color'),
                message: _T('Color Created.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error creating the color.')
            },
        );
    }

    /**
     * @summary Deletes the color in the database.
     */
    private _deleteColor(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Delete Color'),
            _T('Deleting...'),
            this._variantsService.deleteColor(this._variantColor._id),
            {
                title:   _T('Delete Color'),
                message: _T('Color Deleted.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error deleting the color.')
            },
        );
    }

    /**
     * @summary Updates the color in the database.
     */
    private _updateColor(): void
    {
        let isRequieredMissing: any = this._names.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Color Name is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Update Color'),
            _T('Updating...'),
            this._variantsService.updateColor(this._variantColor),
            {
                title:   _T('Update Color'),
                message: _T('Color Updated.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error updating the color.')
            },
        );
    }

    /**
     * @summary Cancels the operation
     */
    private _onCancel(): void
    {
        this._router.navigate(['/products/variants']);
    }

    /**
     * @summary Handles the modal closed event.
     *
     * @param result The modal result.
     */
    private _onModalClosed(result: BiglupModalResult): void
    {
        if (this._waitModalResult)
        {
            this._waitModalResult = false;

            this._router.navigate(['/products/variants']);
        }
    }
}
