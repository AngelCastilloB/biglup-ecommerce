/**
 * @file header.component.ts
 *
 * @summary The header of the application.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
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

import { Component, OnInit }    from '@angular/core';
import { MeteorComponent }      from 'angular2-meteor';
import { Mongo }                from 'meteor/mongo';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { Categories }           from '../../../../common/collections/category.collection.ts';
import { TranslatePipe }        from '../../../pipes/translate.pipe';
import { MongoTranslatePipe }   from '../../../pipes/mongo-translate.pipe';
import { I18nSingletonService } from '../../../services/i18n/i18n-singleton.service';

import '../../../../common/api/cart.methods';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './header.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the application header.
 */
@Component({
    selector: 'header',
    template,
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe, MongoTranslatePipe]
})
export class HeaderComponent extends MeteorComponent implements OnInit {

    private _categories: Mongo.Cursor<Category>;

    /**
     * @summary Initializes a new instance of the Header class.
     */
    constructor() {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        this.subscribe('categories', () => {
            this._categories = Categories.find();
        }, true);
    }

    /**
     * @summary language change event handler
     * @param language
     */
    private languageChanged(language: string) {
        I18nSingletonService.getInstance().setLocale(language);
    }

    private onTest() {
        // Call the Method

        this.call('cart.addProduct', 'YtaMm8BKycZYbYoRb', 10, (error) => {
            if (error) {
                alert(`Failed to add due to ${error}`);
                return;
            }

            alert('User successfully invited.');
        });
    }
}
