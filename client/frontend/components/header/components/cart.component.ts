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

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './cart.component.html';

import 'reflect-metadata';

import {
    Component, OnInit, OnDestroy,
    NgZone, style, state,
    animate, transition, trigger
}                          from '@angular/core';
import { Cart, CartItem }  from '../../../../../common/models';
import { Subscription }    from 'rxjs';
import { UserAuthService } from '../../../../services/user-auth.service';
import { CartsService }    from '../../../../services/carts.service';
import { Meteor }          from 'meteor/meteor';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'cart',
    template,
    styleUrls: ['cart.component.css'],
    animations: [
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
    private _user: Meteor.User;

    /**
     * @summary the current user's cart.
     */
    private _cart: Cart;

    /**
     * @summary the cart service subscription.
     */
    private _userSubscription: Subscription;

    /**
     * @summary Controls whether the cart and its items are shown to the user.
     */
    private _isCartVisible: boolean;

    /**
     * @summary the cart component constructor.
     *
     * @param {CartsService}    _cartsService    The carts service.
     * @param {UserAuthService} _userAuthService The user auth service.
     * @param {NgZone}          _ngZone          Ng2 external computation zone.
     */
    constructor(private _cartsService: CartsService,
                private _userAuthService: UserAuthService,
                private _ngZone: NgZone)
    {
    }

    private get _cartItemsCss()
    {
        return {
            top: this._isCartVisible ? 'initial' : '-2000px'
        };
    }

    /**
     * @summary gives the items inside the cart.
     *
     * @returns {CartItem[]}
     * @private
     */
    private get _items(): CartItem[]
    {
        if (this._cart && this._cart.items)
        {
            return this._cart.items;
        }

        this._isCartVisible = false;

        return [];
    }

    /**
     * @summary used in the ng2 creation cycle.
     */
    public ngOnInit()
    {
        this._userSubscription = this._userAuthService
            .getUserStream()
            .subscribe(user =>
            {
                this._user = user;
                this._cart = user ? user.cart : null;
            });
    }

    /**
     * @summary used in the ng2 destroy cycle.
     */
    public ngOnDestroy(): void
    {
        this._userSubscription.unsubscribe();
    }

    /**
     * @summary Gives the current cart's item count
     *
     * @returns {number} The existing item amount in the cart
     * @private
     */
    private _getCartItemCount(): number
    {
        if (this._cart && this._cart.items)
        {
            return this._cart.items.length;
        }

        this._isCartVisible = false;

        return 0;
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
        this._cartsService.removeItem(this._user._id, item.productId).subscribe(
            status =>
            {
                if (!status)
                {
                    console.error(status);
                }

                if (this._items <= 0)
                {
                    return this._isCartVisible = false;
                }
            },
            error => console.log('handle remove item from cart error!', error)
        );
    }
}
