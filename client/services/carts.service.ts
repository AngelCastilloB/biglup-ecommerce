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
import { Cart, CartItem, Product }               from '../../common/models';
import { UserAuthService }                       from './user-auth.service';
import { Products }                              from '../../common/collections/product.collection';
import { NodeCrypto }                            from '../../common/helpers/crypto/node-crypto';

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
     * @summary The carts observable stream.
     *
     * @type {BehaviorSubject<Cart[]>}
     * @private
     */
    private _cartsCollectionStream = new BehaviorSubject<Cart[]>(this._carts);

    /**
     * @summary The user cart observable stream.
     *
     * @type {BehaviorSubject<Cart>}
     * @private
     */
    private _userCartStream = new BehaviorSubject<Cart>(null);

    /**
     * @summary The key used in the Storage object accessed by localStorage.
     *
     * @type {string}
     * @private
     */
    private _localStorageCartKey = 'cart';

    /**
     * @summary The crypto class singleton service.
     */
    private _crypto: NodeCrypto = NodeCrypto.getInstance();

    /**
     * @summary Initializes a new instance of the CartComponent class.
     *
     * @param {UserAuthService} _userAuthService The user authentication service.
     */
    constructor(private _userAuthService: UserAuthService)
    {
        this._userAuthService.getUserStream().subscribe(user =>
        {
            let cart: Cart;

            if (!user)
            {
                cart = this._getLocalStorageCart();
            }
            else
            {
                cart = user.cart;

                this._deleteLocalStorageCart();
            }

            this._userCartStream.next(cart);
        });
    }

    /**
     * @summary Observable stream of all carts in the system.
     *
     * @returns {Observable<Cart[]>}
     */
    public getCartsStream(): Observable<Cart[]>
    {
        return this._cartsCollectionStream.distinctUntilChanged();
    }

    /**
     * @summary Observable stream of the current user's cart.
     *
     * @returns {BehaviorSubject<Cart>}
     */
    public getUserCartStream()
    {
        return this._userCartStream;
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
            if (this._isLocalStorageCartInit())
            {
                this._addProductToLocalStorageCart(productId, quantity);
                this._completeSubscription(observer, null, true);
            }
            else
            {
                Meteor.call('addProductToCart', productId, quantity, set, (error, results) =>
                {
                    this._completeSubscription(observer, error, results);
                });
            }
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
            if (this._isLocalStorageCartInit())
            {
                this._removeProductInLocalStorageCart(productId);
                this._completeSubscription(observer, null, true);
            }
            else
            {
                Meteor.call('deleteProductFromCart', userId, productId, (error, results) =>
                {
                    this._completeSubscription(observer, error, results);
                });
            }
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
            if (this._isLocalStorageCartInit())
            {
                this._removeAllProductsInLocalStorageCart();
                this._completeSubscription(observer, null, true);
            }
            else
            {
                Meteor.call('deleteAllProductsFromCart', userId, (error, results) =>
                {
                    this._completeSubscription(observer, error, results);
                });
            }
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
    private _completeSubscription(observer: Observer<any>, error: Meteor.Error, results: any)
    {
        if (error)
        {
            return observer.error(error);
        }

        observer.next(results);
        observer.complete();
    }

    /**
     * @summary Finds the cart inside the local storage object of the user's web browser.
     *
     * @returns {Cart} The cart object.
     * @private
     */
    private _getLocalStorageCart(): Cart
    {
        let cart: any = localStorage.getItem(this._localStorageCartKey);

        if (!cart)
        {
            cart = new Cart();
            this._setLocalStorageCart(cart);
        }
        else
        {
            cart = this._crypto.decryptText(cart);
            cart = JSON.parse(cart);
        }

        return cart;
    }

    /**
     * @summary Puts a cart into the user's local Storage Object.
     *
     * @param {Cart} cart The cart object to add.
     * @private
     */
    private _setLocalStorageCart(cart: Cart)
    {
        const item = this._crypto.encryptText(JSON.stringify(cart));

        localStorage.setItem(this._localStorageCartKey, item);
    }

    /**
     * @summary Removes the cart from the user's web browser Storage object.
     * @private
     */
    private _deleteLocalStorageCart(): void
    {
        localStorage.removeItem(this._localStorageCartKey);
    }

    /**
     * @summary Wrapper around the cart object in Storage.
     *
     * @returns {boolean} True if the cart exist in the user's web browser.
     * @private
     */
    private _isLocalStorageCartInit()
    {
        return !!localStorage.getItem(this._localStorageCartKey);
    }

    /**
     * @summary Adds a new item into the local Storage cart.
     *
     * @param {string} productId The product to be added to the cart.
     * @param {number} quantity The amount of this products that wants to be added.
     * @private
     */
    private _addProductToLocalStorageCart(productId: string, quantity: number): void
    {
        const cart = this._getLocalStorageCart();

        let item: CartItem = cart.items.find(obj => obj.productId === productId);

        if (!item)
        {
            // TODO move product find into its own product service
            const product: Product = Products.findOne({_id: productId});

            item = new CartItem(
                productId,
                quantity,
                product.title,
                product.color,
                product.size,
                product.images[0].url
            );

            cart.items.push(item);
        }
        else
        {
            cart.items.map(obj =>
            {
                if (obj.productId === productId)
                    obj.quantity += quantity;
            });
        }

        this._userCartStream.next(cart);
        this._setLocalStorageCart(cart);
    }

    /**
     * @summary Removes a product from the Storage object cart.
     *
     * @param {string} productId The product to be removed from the cart.
     * @private
     */
    private _removeProductInLocalStorageCart(productId: string)
    {
        const cart = this._getLocalStorageCart();
        cart.items = cart.items.filter(item => item.productId !== productId);

        this._userCartStream.next(cart);
        this._setLocalStorageCart(cart);
    }

    /**
     * @summary Removes all items inside the localStorage Cart.
     *
     * @private
     */
    private _removeAllProductsInLocalStorageCart()
    {
        const cart = this._getLocalStorageCart();
        cart.items = [];

        this._userCartStream.next(cart);
        this._setLocalStorageCart(cart);
    }
}
