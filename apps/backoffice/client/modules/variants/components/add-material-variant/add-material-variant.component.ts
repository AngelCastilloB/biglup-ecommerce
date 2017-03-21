/**
 * @file add-material-variant.component.ts
 *
 * @summary The add material variant admin panel functionality.
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
         MaterialVariantAttribute }  from 'meteor/biglup:business';
import { I18nInputComponent }        from '../../../../modules/i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-material-variant.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add material variants to the site.
 */
@Component({
    selector: 'add-material-variant',
    template
})
export class AddMaterialVariantComponent implements OnInit
{
    @ViewChildren(I18nInputComponent)
    private _names:                 QueryList<I18nInputComponent>;
    @ViewChild(BiglupModalComponent)
    private _modal:                 BiglupModalComponent;
    private _variantMaterial:       MaterialVariantAttribute  = new MaterialVariantAttribute();
    private _i18nService:           I18nSingletonService  = I18nSingletonService.getInstance();
    private _waitModalResult:       boolean               = false;
    private _isEditMode:            boolean               = false;
    private _i18nNameReferenceMap:  Object                = {};

    /**
     * @summary Initializes a new instance of the AddMaterialVariantComponent class.
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
            this._variantMaterial._id = params['id'];

            if (!this._variantMaterial._id)
            {
                this._i18nService.getSupportedLanguages().forEach((lang) =>
                {
                    let materialName: I18nString = new I18nString(lang);

                    this._variantMaterial.material.push(materialName);
                    this._i18nNameReferenceMap[lang] = materialName;
                });

                this._changeDetector.detectChanges();
                return;
            }

            this._variantsService.getMaterial(this._variantMaterial._id).subscribe(
                (material: MaterialVariantAttribute) =>
                {
                    this._variantMaterial = material;
                    this._isEditMode  = true;

                    this._i18nService.getSupportedLanguages().forEach((lang) =>
                    {
                        let materialName: I18nString = this._variantMaterial.material.find((i18nString) => i18nString.language === lang);

                        if (!materialName)
                        {
                            materialName = new I18nString(lang);
                            this._variantMaterial.material.push(materialName);
                        }

                        this._i18nNameReferenceMap[lang] = materialName;
                    });

                    this._changeDetector.detectChanges();
                });
        });
    }

    /**
     * @summary Saves the material in the database.
     */
    private _saveMaterial(): void
    {
        let isRequieredMissing: any = this._names.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Material name is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        if (isRequieredMissing)
            return;

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Create Material'),
            _T('Creating...'),
            this._variantsService.createMaterials(this._variantMaterial),
            {
                title:   _T('Create Material'),
                message: _T('Material Created.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error creating the material.')
            },
        );
    }

    /**
     * @summary Deletes the material in the database.
     */
    private _deleteMaterial(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Delete Material'),
            _T('Deleting...'),
            this._variantsService.deleteMaterial(this._variantMaterial._id),
            {
                title:   _T('Delete Material'),
                message: _T('Material Deleted.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error deleting the material.')
            },
        );
    }

    /**
     * @summary Updates the material in the database.
     */
    private _updateMaterial(): void
    {
        let isRequieredMissing: any = this._names.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Material name is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Update Material'),
            _T('Updating...'),
            this._variantsService.updateMaterial(this._variantMaterial),
            {
                title:   _T('Update Material'),
                message: _T('Material Updated.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error updating the material.')
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
