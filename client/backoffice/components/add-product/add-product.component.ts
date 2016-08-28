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
         NgZone,
         ViewChild }                from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { MeteorComponent }          from 'angular2-meteor';
import { ROUTER_DIRECTIVES }        from '@angular/router';
import { TranslatePipe }            from '../../../pipes/translate.pipe';
import { ImagesUploader }           from '../images-uploader/images-uploader.component';
import { Categories }               from '../../../../common/collections/category.collection.ts';
import { MongoTranslatePipe }       from '../../../pipes/mongo-translate.pipe';
import { NgForm }                   from '@angular/forms';
import { I18nSingletonService, _T } from '../../../services/i18n/i18n-singleton.service';
import { ModalComponent }           from '../modal/modal.component';
import { Products }                 from '../../../../common/collections/product.collection';

// Methods
import '../../../../common/api/product.methods';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-product.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add products to the site.
 */
@Component({
    selector: 'add-products',
    template,
    pipes: [TranslatePipe, MongoTranslatePipe],
    directives: [ROUTER_DIRECTIVES, ImagesUploader, NgForm, ModalComponent]
})
export class AddProductComponent extends MeteorComponent implements OnInit {
    private _categories:         Mongo.Cursor<Category>;
    private _product:            Product = <Product>{};
    private _productTitle:       string  = '';
    private _productDescription: string  = '';
    private _defaultLocale:      string  = I18nSingletonService.getInstance().getDefaultLocale();
    @ViewChild('imagesUploader')
    private _imagesUploader:     ImagesUploader;
    @ViewChild(ModalComponent)
    private _modal:              ModalComponent;
    private _waitModalResult:    boolean = false;
    private _isEditMode:         boolean = false;

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(private _zone: NgZone, private _router: Router, private _route: ActivatedRoute) {
        super();
        this._product.categoryId       = [];
        this._product.title            = [];
        this._product.images           = [];
        this._product.description      = [];
        this._product.hashtags         = [];
        this._product.createdAt        = new Date();
        this._product.updatedAt        = new Date();
        this._productTitle             = this._getMongoTranslation(this._product.title);
        this._productDescription       = this._getMongoTranslation(this._product.description);
        this._product.price            = 0;
        this._product.discount         = 0;
        this._product.stock            = 0;
        this._product.trackInventory   = false;
        this._product.isVisible        = false;
        this._product.requiresShipping = false;
        this._product.color            = [];
        this._product.size             = [];
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        tinymce.init({
                selector: 'textarea',
                setup: (ed) => {
                    ed.on('keyup change', (param, l) => {
                        this._zone.run(() => {
                            this._productDescription  = tinymce.activeEditor.getContent();
                            this._product.description =
                                [{'language': this._defaultLocale, 'value' : this._productDescription}];
                        });
                    });
                }
            });

        this.subscribe('categories', () => {
            this._categories = Categories.find();
        }, true);

        this._route.params.subscribe((params) => {

            this._product._id = params['id'];

            if (!this._product._id)
                return;

            this.subscribe('products', this._product._id , () => {

                this._product = Products.findOne({_id: this._product._id});

                this._productTitle       = this._getMongoTranslation(this._product.title);
                this._productDescription = this._getMongoTranslation(this._product.description);

                this._zone.run(() => {

                    tinymce.activeEditor.setContent(this._productDescription);
                    tinymce.activeEditor.execCommand('mceRepaint');
                });

                this._isEditMode = true;
            }, true);
        });
    }

    /**
     * @summary Event triggered when the title has changed.
     *
     * @param newTitle The new title to be set.
     */
    private _onTitleChange(newTitle: any): void {
        this._productTitle  = newTitle;
        this._product.title = [{'language': this._defaultLocale, 'value' : this._productTitle}];
    }

    /**
     * @summary Event triggered when a category is toggled.
     *
     * @param {string}   id        The id of the category that was toggled.
     * @param {booblean} isChecked True if the toggle was enabled, otherwise, false.
     */
    private _onCategoryToggle(id: string, isChecked: boolean): void {
        let index: number = this._product.categoryId.indexOf(id);

        if (isChecked) {
            if (index === -1) {
                this._product.categoryId.push(id);
            }
        } else {
            if (index > -1) {
                this._product.categoryId.splice(index, 1);
            }
        }
    }

    /**
     * @summary Gets whether the product currently belongs to the given category.
     *
     * @param {string} id The id of the category.
     * @returns {boolean} True if the product belongs to the current category, otherwise, false.
     */
    private _productHasCategory(id: string) {
        return this._product.categoryId.indexOf(id) > -1;
    }

    /**
     * @summary Gets the correct translation out of a I18nString collection.
     *
     * @param messageCollection The message collection with all the translations.
     *
     * @returns {string} The translation.
     */
    private _getMongoTranslation(messageCollection: I18nString[]): string {

        if (!messageCollection) {
            return '';
        }

        for (let i = 0, l = messageCollection.length; i < l; i++) {
            if (messageCollection[i].language === this._defaultLocale) {
                return messageCollection[i].value;
            }
        }

        return '';
    }

    /**
     * @summary Saves the product in the database.
     */
    private _saveProduct(): void {

        this._imagesUploader.upload(this._product);
    }

    /**
     * @summary Deletes the product in the database.
     */
    private _deleteProduct(): void {

        this.call('products.deleteProduct', this._product._id, (error, result) => {
            if (error) {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error deleting the product'),
                    _T('Error'));

                console.error(error);
            } else {
                this._product._id     = result;
                this._waitModalResult = true;

                this._modal.show(
                    _T('Product Deleted!'),
                    _T('Information'));
            }
        });
    }

    /**
     * @summary Updates the product in the database.
     */
    private _updateProduct(): void {

        this.call('products.updateProduct', this._product, (error, result) => {
            if (error) {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error updating the product'),
                    _T('Error'));

                console.error(error);
            } else {
                this._waitModalResult = true;

                this._modal.show(
                    _T('Product Updated!'),
                    _T('Information'));
            }
        });
    }

    /**
     * @summary Cancels the operation
     *
     * @param event The modal closed event
     */
    private _onCancel(): void {
        this._router.navigate(['/admin/products']);
    }

    /**
     * @summary Event Handler for when image uploading process successfully.
     */
    private _onImagesUploadedSuccessfully(result: any): void {

        this.call('products.createProduct', this._product, (error, result) => {
            if (error) {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error saving the product'),
                    _T('Error'));
            } else {
                this._waitModalResult = true;

                this._modal.show(
                    _T('Product Saved!'),
                    _T('Information'));
            }
        });
    }

    /**
     * @summary Event Handler for when image uploading process fails.
     */
    private _onImagesUploadedFails(error: any): void {
        this._waitModalResult = false;

        this._modal.show(
            _T('There was an error saving the product'),
            _T('Error'));

        // HACK: Remove the product if the uploading of the images fails. This needs to be improved.
        this.call('products.deleteProduct', this._product._id, (deleteError) => {
            if (deleteError) {
                console.error(deleteError);
            }
        });

        this._product._id = '';
    }

    /**
     * @summary Handles the modal closed event.
     *
     * @param event The modal closed event
     */
    private _onModalClosed(event: any): void {
        if (this._waitModalResult) {
            this._waitModalResult = false;

            this._router.navigate(['/admin/products']);
        }
    }
}
