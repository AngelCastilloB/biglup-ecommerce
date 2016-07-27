/**
 * @file products.component.ts
 *
 * @summary The products admin panel.
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

import { Component }              from '@angular/core';
import { MeteorComponent }        from 'angular2-meteor';
import { ROUTER_DIRECTIVES }      from '@angular/router';
import { Mongo }                  from 'meteor/mongo';
import { Tracker }                from 'meteor/tracker';
import { Products }               from '../../../../common/collections/product.collection';
import { I18nMongoPipe }          from '../../../services/l18n/I18nMongoPipe';
import { I18nPipe }               from '../../../services/l18n/I18nPipe';
import { ActivatedRoute }         from '@angular/router';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
//noinspection TypeScriptCheckImport
import template from './products.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the products of the site.
 */
@Component({
    selector: 'products',
    template,
    directives: [ROUTER_DIRECTIVES],
    pipes: [I18nMongoPipe, I18nPipe]
})
export class ProductsComponent extends MeteorComponent {
    private _products: Mongo.Cursor<Product>;
    /**
     * @summary Initializes a new instance of the ProductsComponent class.
     */
    constructor(private route: ActivatedRoute) {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    ngOnInit() {
        this.route.params.subscribe((params) => {
            Tracker.autorun(() => {
                this._products = Products.find();
            });
        });
    }
}