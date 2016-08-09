/**
 * @file add-collection.component.ts
 *
 * @summary The add collection admin panel functionality.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 09 2016
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
         NgZone }               from '@angular/core';
import { Router }               from '@angular/router';
import { MeteorComponent }      from 'angular2-meteor';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { TranslatePipe }        from '../../../pipes/translate.pipe';
import { ImagesUploader }       from '../images-uploader/images-uploader.component';
import { MongoTranslatePipe }   from '../../../pipes/mongo-translate.pipe';
import { NgForm }               from '@angular/forms';
import { I18nSingletonService } from '../../../services/l18n/I18nSingletonService';
import { Products }             from '../../../../common/collections/product.collection';
import { ModalComponent }       from '../modal/modal.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-collection.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add collections to the site.
 *
 */
@Component({
    selector: 'add-collection',
    template,
    pipes: [TranslatePipe, MongoTranslatePipe],
    directives: [ROUTER_DIRECTIVES, ImagesUploader, NgForm, ModalComponent]
})
export class AddCollectionComponent extends MeteorComponent implements OnInit {
    private _products:            Mongo.Cursor<Product>;
    private _category:            Category = <Category>{};
    private _categoryName:        string  = '';
    private _categoryDescription: string  = '';
    private _defaultLocale:       string  = I18nSingletonService.getInstance().getDefaultLocale();

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(private _zone: NgZone, private _router: Router) {
        super();

        this._categoryName        = this._getMongoTranslation(this._category.name);
        this._categoryDescription = this._getMongoTranslation(this._category.info);
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
                            this._categoryDescription = tinymce.activeEditor.getContent();
                            this._category.info       = [{'language': this._defaultLocale, 'value' : this._categoryDescription}];
                        });
                    });
                }
            });
        this._products = Products.find();
    }

    /**
     * @summary Event triggered when the title has changed.
     *
     * @param newName The new name to be set.
     */
    private _onNameChange(newName: any): void {
        this._categoryName = newName;
        this._category.name = [{'language': this._defaultLocale, 'value' : this._categoryName}];
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
}
