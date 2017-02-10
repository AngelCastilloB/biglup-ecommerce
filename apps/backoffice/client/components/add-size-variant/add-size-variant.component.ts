/**
 * @file add-size-variant.component.ts
 *
 * @summary The add size variant admin panel functionality.
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
         SizeVariantAttribute }      from 'meteor/biglup:business';
import { I18nInputComponent }        from '../i18n-input/i18n-input.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-size-variant.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add size variants to the site.
 */
@Component({
    selector: 'add-size-variant',
    template
})
export class AddSizeVariantComponent implements OnInit
{
    @ViewChildren(I18nInputComponent)
    private _names:                 QueryList<I18nInputComponent>;
    @ViewChild(BiglupModalComponent)
    private _modal:                 BiglupModalComponent;
    private _variantSize:           SizeVariantAttribute  = new SizeVariantAttribute();
    private _i18nService:           I18nSingletonService  = I18nSingletonService.getInstance();
    private _waitModalResult:       boolean               = false;
    private _isEditMode:            boolean               = false;
    private _i18nSizeReferenceMap:  Object                = {};

    /**
     * @summary Initializes a new instance of the AddSizeVariantComponent class.
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
            this._variantSize._id = params['id'];

            if (!this._variantSize._id)
            {
                this._i18nService.getSupportedLanguages().forEach((lang) =>
                {
                    let sizeName: I18nString = new I18nString(lang);

                    this._variantSize.size.push(sizeName);
                    this._i18nSizeReferenceMap[lang] = sizeName;
                });

                this._changeDetector.detectChanges();
                return;
            }

            this._variantsService.getSize(this._variantSize._id).subscribe(
                (size: SizeVariantAttribute) =>
                {
                    this._variantSize = size;
                    this._isEditMode  = true;

                    this._i18nService.getSupportedLanguages().forEach((lang) =>
                    {
                        let sizeName: I18nString = this._variantSize.size.find((i18nString) => i18nString.language === lang);

                        if (!sizeName)
                        {
                            sizeName = new I18nString(lang);
                            this._variantSize.size.push(sizeName);
                        }

                        this._i18nSizeReferenceMap[lang] = sizeName;
                    });

                    this._changeDetector.detectChanges();
                });
        });
    }

    /**
     * @summary Saves the size in the database.
     */
    private _saveSize(): void
    {
        let isRequieredMissing: any = this._names.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Size name is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        if (isRequieredMissing)
            return;

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Create Size'),
            _T('Creating...'),
            this._variantsService.createSizes(this._variantSize),
            {
                title:   _T('Create Size'),
                message: _T('Size Created.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error creating the size.')
            },
        );
    }

    /**
     * @summary Deletes the size in the database.
     */
    private _deleteSize(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Delete Size'),
            _T('Deleting...'),
            this._variantsService.deleteSize(this._variantSize._id),
            {
                title:   _T('Delete Size'),
                message: _T('Size Deleted.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error deleting the size.')
            },
        );
    }

    /**
     * @summary Updates the size in the database.
     */
    private _updateSize(): void
    {
        let isRequieredMissing: any = this._names.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Size name is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Update Size'),
            _T('Updating...'),
            this._variantsService.updateSize(this._variantSize),
            {
                title:   _T('Update Size'),
                message: _T('Size Updated.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error updating the size.')
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
