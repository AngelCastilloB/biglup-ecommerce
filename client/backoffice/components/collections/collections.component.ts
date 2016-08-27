/**
 * @file collections.component.ts
 *
 * @summary The collections component.
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

import { Component, OnInit }  from '@angular/core';
import { MeteorComponent }    from 'angular2-meteor';
import { Mongo }              from 'meteor/mongo';
import { Categories }         from '../../../../common/collections/category.collection';
import { MongoTranslatePipe } from '../../../pipes/mongo-translate.pipe';
import { TranslatePipe }      from '../../../pipes/translate.pipe';
import { ROUTER_DIRECTIVES }  from '@angular/router';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './collections.component.html';


// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the collections of the site.
 */
@Component({
    selector: 'products',
    template,
    directives: [ROUTER_DIRECTIVES],
    pipes: [MongoTranslatePipe, TranslatePipe]
})
export class CollectionsComponent extends MeteorComponent implements OnInit  {
    private _categories: Mongo.Cursor<Category>;

    /**
     * @summary Initializes a new instance of the CollectionsComponent class.
     */
    constructor() {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {
        this.subscribe('categories', () => {
            this._categories = Categories.find();
        }, true);
    }
}
