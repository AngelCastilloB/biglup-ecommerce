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

import { Component, OnInit, NgZone } from '@angular/core';
import { MeteorComponent }           from 'angular2-meteor';
import { ROUTER_DIRECTIVES }         from '@angular/router';
import { TranslatePipe }             from '../../../pipes/translate.pipe';
import { ImagesUploader }            from '../images-uploader/images-uploader.component';
import { Categories }                from '../../../../common/collections/category.collection.ts';
import { MongoTranslatePipe }        from '../../../pipes/mongo-translate.pipe';
import { NgForm }                    from '@angular/forms';
import { I18nSingletonService }      from '../../../services/l18n/I18nSingletonService';

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
    directives: [ROUTER_DIRECTIVES, ImagesUploader, NgForm]
})
export class AddProductComponent extends MeteorComponent implements OnInit {
    private _categories:         Mongo.Cursor<Category>;
    private _product:            Product = <Product>{};
    private _productTitle:       string  = '';
    private _productDescription: string  = '';
    private _defaultLocale:      string  = I18nSingletonService.getInstance().getDefaultLocale();

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(private _zone: NgZone) {
        super();

        this._product.categoryId  = [];
        this._product.title       = [];
        this._product.description = [];
        this._product.hashtags    = [];
        this._product.createdAt   = new Date();
        this._product.updatedAt   = new Date();
        this._productTitle        = this._getMongoTranslation(this._product.title);
        this._productDescription  = this._getMongoTranslation(this._product.description);
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        tinymce.init(
            {
                selector: 'textarea',
                setup: (ed) => {
                    ed.on('keyup change', (param, l) => {
                        this._zone.run(() => {
                            this._productDescription  = tinymce.activeEditor.getContent();
                            this._product.description = [{'language': this._defaultLocale, 'value' : this._productDescription}];
                        });
                    });
                }
            })
        this._categories = Categories.find();
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
     * @param event The toggle category.
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
        console.error(this._product);
    }
}
