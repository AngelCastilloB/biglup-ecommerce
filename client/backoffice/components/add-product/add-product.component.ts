/**
 * @file add-product.component.ts
 *
 * @summary The add product admin panel functionality.
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
         OnInit,
         ViewChild }                from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { I18nSingletonService, _T } from 'meteor/biglup:i18n';
import { ModalComponent }           from '../modal/modal.component';
import { ProductsService }          from 'meteor/biglup:business';
import { CategoriesService }        from 'meteor/biglup:business';
import { Product }                  from 'meteor/biglup:business';
import { I18nString }               from 'meteor/biglup:i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-product.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add products to the site.
 */
@Component({
    selector: 'add-products',
    template
})
export class AddProductComponent implements OnInit
{
    private _i18nService:           I18nSingletonService = I18nSingletonService.getInstance();
    private _product:               Product              = new Product();
    @ViewChild(ModalComponent)
    private _modal:                 ModalComponent;
    private _waitModalResult:       boolean              = false;
    private _isEditMode:            boolean              = false;
    private _i18nTitleReferenceMap: Object               = {};
    private _i18nDescReferenceMap:  Object               = {};

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._route.params.subscribe((params) =>
        {
            this._product._id = params['id'];

            if (!this._product._id)
            {
                this._i18nService.getSupportedLanguages().forEach((lang) =>
                {
                    let title:       I18nString = new I18nString(lang);
                    let description: I18nString = new I18nString(lang);

                    this._product.title.push(title);
                    this._i18nTitleReferenceMap[lang] = title;

                    this._product.description.push(description);
                    this._i18nDescReferenceMap[lang] = description;
                });

                return;
            }

            this._productsService.getProduct(this._product._id).subscribe(
                (product: Product) =>
                {
                    this._product    = product;
                    this._isEditMode = true;

                    this._i18nService.getSupportedLanguages().forEach((lang) =>
                    {
                        let title: I18nString = this._product.title.find(
                            (i18nString) => i18nString.language === lang);

                        let description: I18nString = this._product.description.find(
                            (i18nString) => i18nString.language === lang);

                        if (!title)
                        {
                            title = new I18nString(lang);
                            this._product.title.push(<I18nString>title);
                        }

                        if (!description)
                        {
                            description = new I18nString(lang);
                            this._product.description.push(<I18nString>description);
                        }

                        this._i18nTitleReferenceMap[lang] = title;
                        this._i18nDescReferenceMap[lang]  = description;
                    });
                });
        });
    }

    /**
     * @summary Event triggered when a category is toggled.
     *
     * @param {string}  id        The id of the category that was toggled.
     * @param {boolean} isChecked True if the toggle was enabled, otherwise, false.
     */
    private _onCategoryToggle(id: string, isChecked: boolean): void
    {
        let index: number = this._product.categories.indexOf(id);

        if (isChecked)
        {
            if (index === -1)
                this._product.categories.push(id);
        }
        else
        {
            if (index > -1)
                this._product.categories.splice(index, 1);
        }
    }

    /**
     * @summary Gets whether the product currently belongs to the given category.
     *
     * @param {string} id The id of the category.
     * @returns {boolean} True if the product belongs to the current category, otherwise, false.
     */
    private _productHasCategory(id: string)
    {
        return this._product.categories.indexOf(id) > -1;
    }

    /**
     * @summary Saves the product in the database.
     */
    private _saveProduct(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Create Product'),
            _T('Creating...'),
            this._productsService.createProduct(this._product),
            {
                title:   _T('Create Product'),
                message: _T('Product Created.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error creating the product.')
            },
        );
    }

    /**
     * @summary Deletes the product in the database.
     */
    private _deleteProduct(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Delete Product'),
            _T('Deleting...'),
            this._productsService.deteleProduct(this._product._id),
            {
                title:   _T('Delete Product'),
                message: _T('Product Deleted.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error deleting the product.')
            },
        );
    }

    /**
     * @summary Updates the product in the database.
     */
    private _updateProduct(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Update Product'),
            _T('Updating...'),
            this._productsService.updateProduct(this._product),
            {
                title:   _T('Update Product'),
                message: _T('Product Updated.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error updating the product.')
            },
        );
    }

    /**
     * @summary Cancels the operation
     */
    private _onCancel(): void
    {
        this._router.navigate(['/admin/products']);
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

            this._router.navigate(['/admin/products']);
        }
    }

    /**
     * @summary Gets the translation for 'Title' for the given language.
     *
     * @returns {string} The translation.
     * @private
     */
    private _getTitleTranslation(): string
    {
        return _T('Title');
    }
}
