/**
 * @file product-details.component.ts
 *
 * @summary Shows to the user the info associated with a particular product.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 28 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// noinspection TypeScriptCheckImport
import template from './product-details.component.html';

// IMPORTS ************************************************************************************************************/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { Products }                     from '../../../../../common/collections/product.collection';
import { Images }                       from '../../../../../common/collections/image.collection';
import { I18nSingletonService }         from '../../../../services/l18n/I18nSingletonService';
import { Subscription }                 from 'rxjs';
import { MeteorComponent }              from 'angular2-meteor/dist/index';
import { Tracker }                      from 'meteor/tracker';
import { MongoTranslatePipe }           from '../../../../pipes/mongo-translate.pipe';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component shows specific details about a product.
 */
@Component({
    selector: 'product-details',
    template,
    pipes: [MongoTranslatePipe]
})
export class ProductDetailsComponent extends MeteorComponent implements OnInit, OnDestroy {

    private _subscription: Subscription;
    private _productId: string;
    private _product: Product;
    private _productImages: Mongo.Cursor<Image>;

    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    constructor(private route: ActivatedRoute) {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this._productId = params['productId'];
            Tracker.autorun(() => {
                this._product       = Products.findOne({_id: this._productId});
                this._productImages = Images.find();
            });
        });

        this._subscription = I18nSingletonService.getInstance().getLocaleChangeEmitter().subscribe();
    }

    /**
     * @summary destroys any subscriptions to avoid memory leaks.
     */
    public ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
