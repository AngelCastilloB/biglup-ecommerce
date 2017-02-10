/**
 * @file inventory.service.ts.
 *
 * @summary Implementation of the inventory service.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February, 2017
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

import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { MeteorReactive } from 'angular2-meteor';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This service handles all the product inventory.
 */
@Injectable()
export class InventoryService extends MeteorReactive
{
    /**
     * @summary Initializes a new instance of the InventoryService class.
     */
    constructor()
    {
        super();
    }

    /**
     * @summary Increases the product inventory.
     *
     * @param productId The id of the product.
     * @param amount The amount to be increased by.
     */
    public increaseProductInventory(productId: string, amount: number): Observable<number>
    {
        return Observable.create(observer => {
            Meteor.call('increaseProductInventory', productId, amount, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    /**
     * @summary Increases the variant inventory.
     *
     * @param productId The id of the product.
     * @param variantId The id of the product variant.
     * @param amount The amount to be increased by.
     */
    public increaseVariantInventory(productId: string, variantId: string, amount: number): Observable<number>
    {
        return Observable.create(observer => {
            Meteor.call('increaseVariantInventory', productId, variantId, amount, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    /**
     * @summary Sets the product inventory.
     *
     * @param productId The id of the product.
     * @param amount The amount to be set.
     */
    public setProductInventory(productId: string, amount: number): Observable<number>
    {
        return Observable.create(observer => {
            Meteor.call('setProductInventory', productId, amount, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    /**
     * @summary Sets the variant inventory.
     *
     * @param productId The id of the product.
     * @param variantId The id of the product variant.
     * @param amount The amount to be set.
     */
    public setVariantInventory(productId: string, variantId: string, amount: number): Observable<number>
    {
        return Observable.create(observer => {
            Meteor.call('setVariantInventory', productId, variantId, amount, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }
}
