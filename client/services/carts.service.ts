/**
 * @file carts.service.ts.
 *
 * @summary Implementation of the carts service.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 08 2016
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

import { Injectable }                            from '@angular/core';
import { Meteor }                                from 'meteor/meteor';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { Cart }                                  from '../../common/models';

// RxJS imports
import 'rxjs/add/operator/distinctUntilChanged';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This service is responsible of all Cart and CartItems related actions and services.
 */
@Injectable()
export class CartsService
{

    /**
     * @summary All the carts an admin can manipulate.
     */
    private _carts: Cart[] = [];

    /**
     * @summary the carts observable stream.
     */
    private _cartsCollectionStream = new BehaviorSubject<Cart[]>(this._carts);

    /**
     * @summary returns all the carts in the system.
     *
     * @returns {Observable<Cart[]>}
     */
    public getCarts(): Observable<Cart[]>
    {
        return this._cartsCollectionStream.distinctUntilChanged();
    }

    /**
     * @summary Adds a new product into the card.
     *
     * @param {string} productId The product to be added to the cart.
     * @param {number} quantity The amount of this products that wants to be added.
     * @param {boolean} set Indicates if the amount must be increased or changed. (defaults to false).
     *
     * @remark If the resulting new quantity for the cart item is less than one, the element will be deleted from the cart.
     */
    public addProduct(productId: string, quantity: number, set = false): Observable<boolean>
    {
        return Observable.create(observer =>
        {
            Meteor.call('addProductToCart', productId, quantity, set, (error, results) =>
            {
                this._completeMeteorSubscription(observer, error, results);
            });
        });
    }

    /**
     * @summary Removes an item from any user's cart.
     *
     * @param {string} userId The id of the user to be manipulated.
     * @param {string} productId The id of the product to be removed.
     *
     * @returns {Observable<boolean>}
     */
    public removeItem(userId: string, productId: string): Observable<boolean>
    {
        return Observable.create(observer =>
        {
            Meteor.call('deleteProductFromCart', userId, productId, (error, results) =>
            {
                this._completeMeteorSubscription(observer, error, results);
            });
        });
    }

    /**
     * @summary Removes all items in the cart associated to an user.
     *
     * @param {string} userId The id of the user to be manipulated.
     *
     * @returns {Observable<boolean>}
     */
    public removeAllItems(userId: string): Observable<boolean>
    {
        return Observable.create(observer =>
        {
            Meteor.call('deleteAllProductsFromCart', userId, (error, results) =>
            {
                this._completeMeteorSubscription(observer, error, results);
            });
        });
    }

    /**
     * @summary handles the generic meteor method calls to the server.
     *
     * @param {Observer} observer The observer object.
     * @param {Meteor.Error} error The error from the server.
     * @param {*} results The results from the server.
     * @private
     */
    private _completeMeteorSubscription(observer: Observer<any>, error: Meteor.Error, results: any)
    {
        if (error)
        {
            return observer.error(error);
        }

        observer.next(results);
        observer.complete();
    }
}
