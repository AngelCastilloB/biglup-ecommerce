/**
 * @file cart.component.ts.
 *
 * @summary A reusable cart component.
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

import {
    Component,
    OnInit,
    OnDestroy,
    style,
    state,
    animate,
    transition,
    trigger }                   from '@angular/core';
import { Cart, CartItem, User } from 'meteor/biglup:business';
import { Subscription }         from 'rxjs';
import { UserAuthService }      from 'meteor/biglup:business';
import { CartsService }         from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './cart.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the cart and its items with related actions.
 */
@Component({
    selector: 'cart',
    template,
    animations: [
        // gives an animation effect whenever showCart changes.
        // showCart is bound to the _isVisible flag of this component.
        trigger('showCart', [
            state('true', style({
                opacity: 1
            })),
            state('false', style({
                opacity: 0
            })),
            transition('0 => 1', animate('100ms')),
            transition('1 => 0', animate('500ms'))
        ])
    ]
})
export class CartComponent implements OnInit, OnDestroy
{
    /**
     * @summary The current authenticated user.
     */
    private _user: User;

    /**
     * @summary The current user's cart.
     */
    private _cart: Cart;

    /**
     * @summary The user service subscription.
     */
    private _userSubscription: Subscription;

    /**
     * @summary The cart service subscription.
     */
    private _cartSubscription: Subscription;

    /**
     * @summary Controls whether the cart and its items are shown to the user.
     */
    private _isCartVisible = false;

    /**
     * @summary Initializes a new instance of the CartComponent class.
     *
     * @param {CartsService}    _cartsService    The carts service.
     * @param {UserAuthService} _userAuthService The user auth service.
     */
    constructor(private _cartsService: CartsService, private _userAuthService: UserAuthService)
    {
    }

    /**
     * @summary Generates the css needed to hide the html element when is not shown
     * on the view to prevent incorrect behaviour.
     *
     * @returns {{top: string}} The CSS object used by the HTML element.
     * @private
     */
    private get _cartItemsCss()
    {
        return {top: this._isCartVisible ? 'initial' : '-2000px'};
    }

    /**
     * @summary gives the items inside the cart.
     *
     * @returns {CartItem[]} The current set of CartItems.
     * @private
     */
    private get _items(): CartItem[]
    {
        if (!this._cart || !this._cart.items)
        {
            this._isCartVisible = false;

            return [];
        }

        return this._cart.items;
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        this._userSubscription = this._userAuthService
            .getUserStream()
            .subscribe(user => this._user = user);

        this._cartSubscription = this._cartsService
            .getUserCartStream()
            .subscribe(cart => this._cart = cart);
    }

    /**
     * @summary Invoked just before Angular destroys the directive/component.
     */
    public ngOnDestroy(): void
    {
        this._userSubscription.unsubscribe();
        this._cartSubscription.unsubscribe();
    }

    /**
     * @summary Gives the current cart's item count
     *
     * @returns {number} The existing item amount in the cart
     * @private
     */
    private _getCartItemCount(): number
    {
        if (!this._cart || !this._cart.items)
        {
            this._isCartVisible = false;

            return 0;
        }

        return this._cart.items.length;
    }

    /**
     * @summary wrapper around the cart's item count.
     *
     * @returns {boolean}
     * @private
     */
    private _hasItems(): boolean
    {
        return !!this._getCartItemCount();
    }

    /**
     * @summary removes an item from the current cart.
     *
     * @param {CartItem} item The item to be removed.
     * @private
     */
    private _onClickRemoveItem(item: CartItem): void
    {
        const userId = this._user ? this._user._id : null;

        this._cartsService.removeItem(userId, item.productId).subscribe(
            status =>
            {
                if (!status)
                    console.error(status);

                if (this._items.length <= 0)
                    return this._isCartVisible = false;
            },
            error => console.log('handle remove item from cart error!', error)
        );
    }

    /**
     * @summary Changes the visibility status of the cart view.
     *
     * @param {boolean} isVisible Visibility status from the view event.
     * @private
     */
    private _setIsCartVisible(isVisible: boolean)
    {
        this._isCartVisible = isVisible;
    }
}
