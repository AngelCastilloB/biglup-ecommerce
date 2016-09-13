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

import { Injectable }                           from '@angular/core';
import { Meteor }                               from 'meteor/meteor';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Cart }                                 from '../../common/models/cart';
import { Carts }                                from '../../common/collections/cart.collection';
import { UserAuthService }                      from './user-auth.service';

// RxJS imports
import 'rxjs/add/operator/distinctUntilChanged';

// EXPORTS ************************************************************************************************************/

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
     * @summary the current user's cart.
     */
    private _userCartStream = new Subject<Cart>();

    /**
     * @summary Controls the number of tries a cart has for creation.
     *
     * @type {number}
     * @private
     */
    private _cartCreationControl = 5;

    /**
     * @summary The meteor subscription to be manipulated.
     */
    private _cartMeteorSubscription: Meteor.SubscriptionHandle;

    constructor(private _userAuthService: UserAuthService)
    {
        Meteor.subscribe('carts', () => this._cartsCollectionStream.next(Carts.find({}).fetch()));

        this._userAuthService.getUserStream().subscribe(user =>
        {
            if (user)
            {
                this._getCurrentUserCart(user._id);
            }
        });
    }

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
     * @summary returns all the carts in the system.
     *
     * @param {string} id The cart id.
     *
     * @returns {Observable<Cart>}
     */
    public getCart(id: string): Observable<Cart>
    {
        return new Observable<Cart>(observer =>
        {
            Meteor.subscribe('cart', id, () =>
            {
                observer.next(Carts.findOne({_id: id}));
                observer.complete();
            });
        });
    }

    /**
     * @summary returns the current users cart stream.
     *
     * @returns {Observable<Cart>}
     */
    public getUserCart(): Observable<Cart>
    {
        return this._userCartStream.distinctUntilChanged();
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
    public addProduct(productId: string, quantity: number, set = false)
    {
        return Observable.create(observer =>
        {
            Meteor.call('addProductToCart', productId, quantity, set, (error, results) =>
            {
                if (error)
                {
                    return observer.error(error);
                }

                observer.next(results);
                observer.complete();
            });
        });
    }

    /**
     * @summary Attempts to create a new cart for the current user.
     *
     * @returns {void}
     */
    private _createCart(): void
    {
        Meteor.call('createCart', (error) =>
        {
            if (error)
            {
                throw error;
            }
        });
    }

    /**
     * @summary Gets the current users cart from the meteor subscription interface.
     *
     * @param {string} userId The user id.
     * @private
     */
    private _getCurrentUserCart(userId: string)
    {
        if (this._cartMeteorSubscription)
        {
            this._cartMeteorSubscription.stop();
        }

        this._cartMeteorSubscription = Meteor.subscribe('user-cart', userId, () =>
        {
            if (this._cartCreationControl === 0)
            {
                throw new Error('The number of attempts of cart creation exceeded.');
            }

            const cart = Carts.findOne({userId});

            if (cart)
            {
                return this._userCartStream.next(cart);
            }

            // we try to create a cart, if for some reason it fails,
            // we give it some chances (max 5) to try again.
            this._cartCreationControl--;
            this._createCart();
            this._getCurrentUserCart(userId);
        });
    }
}
