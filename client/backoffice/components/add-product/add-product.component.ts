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

import 'reflect-metadata';

import { Component,
         OnInit,
         ViewChild }                from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { MeteorComponent }          from 'angular2-meteor';
import { I18nSingletonService, _T } from '../../../services/i18n/i18n-singleton.service';
import { ModalComponent }           from '../modal/modal.component';
import { ProductsService }          from '../../../services/products.service.ts';
import { CategoriesService }        from '../../../services/categories.service';
import { Product }                  from '../../../../common/models';

// Methods
import '../../../../common/methods/product.methods';

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
export class AddProductComponent extends MeteorComponent implements OnInit
{
    private _i18nService:        I18nSingletonService = I18nSingletonService.getInstance();
    private _product:            Product              = new Product();
    private _productTitle:       string               = '';
    private _productDescription: string               = '';
    @ViewChild(ModalComponent)
    private _modal:              ModalComponent;
    private _waitModalResult:    boolean = false;
    private _isEditMode:         boolean = false;
    private _uploadProgress:     number  = 0;

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService)
    {
        super();
        this._productTitle       = '';
        this._productDescription = '';
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
                return;
            }

            this._productsService.getProduct(this._product._id).subscribe(
                (product: Product) =>
                {
                    this._product            = product;
                    this._productTitle       = this._i18nService.getMongoText(this._product.title);
                    this._productDescription = this._i18nService.getMongoText(this._product.description);
                    this._isEditMode         = true;
                });
        });
    }

    /**
     * @summary Event triggered when the title has changed.
     *
     * @param newTitle The new title to be set.
     */
    private _onTitleChange(newTitle: any): void
    {
        this._productTitle  = newTitle;
        this._product.title = [{language: this._i18nService.getLocale(), value: this._productTitle}];
    }

    /**
     * @summary Event triggered when the description has changed.
     *
     * @param newDescription The new description to be set.
     */
    private _onDescriptionChange(newDescription: string): void
    {
        this._productDescription  = newDescription;
        this._product.description = [{language: this._i18nService.getLocale(), value: newDescription}];
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
            {
                this._product.categories.push(id);
            }
        }
        else
        {
            if (index > -1)
            {
                this._product.categories.splice(index, 1);
            }
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
        this._uploadProgress = 0;
        this._productsService.createProduct(this._product).subscribe(
            (progress) =>
            {
                this._uploadProgress = progress;
            },
            (error) =>
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error saving the product'),
                    _T('Error'));

                console.error(error);
            },
            () =>
            {
                this._waitModalResult = true;

                this._modal.show(
                    _T('Product Saved!'),
                    _T('Information'));
            }
        );
    }

    /**
     * @summary Deletes the product in the database.
     */
    private _deleteProduct(): void
    {
        this._productsService.deteleProduct(this._product._id).subscribe(
            (id) =>
            {
                this._product._id     = id;
                this._waitModalResult = true;

                this._modal.show(
                    _T('Product Deleted!'),
                    _T('Information'));
            },
            (error) =>
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error deleting the product'),
                    _T('Error'));

                console.error(error);
            }
        );
    }

    /**
     * @summary Updates the product in the database.
     */
    private _updateProduct(): void
    {
        this._uploadProgress = 0;
        this._productsService.updateProduct(this._product).subscribe(
            (progress) =>
            {
                this._uploadProgress = progress;
            },
            (error) =>
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error updating the product'),
                    _T('Error'));

                console.error(error);
            },
            () =>
            {
                this._waitModalResult = true;

                this._modal.show(
                    _T('Product Updated!'),
                    _T('Information'));
            }
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
}
