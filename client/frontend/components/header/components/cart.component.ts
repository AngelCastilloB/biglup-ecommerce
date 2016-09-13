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

import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CartsService }                         from '../../../../services/carts.service';
import { Cart }                                 from '../../../../../common/models';
import { Subscription }                         from 'rxjs';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'cart',
    template,
    styleUrls: ['cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy
{

    /**
     * @summary the current user's cart.
     */
    private _cart: Cart;

    /**
     * @summary the cart service subscription.
     */
    private _cartSubscription: Subscription;

    /**
     * @summary the cart component constructor.
     *
     * @param {CartsService} _cartsService The cart service.
     * @param {NgZone}       _ngZone       Ng2 external computation zone.
     */
    constructor(private _cartsService: CartsService, private _ngZone: NgZone)
    {
    }

    /**
     * @summary used in the ng2 creation cycle.
     */
    public ngOnInit()
    {
        this._ngZone.run(() =>
        {
            this._cartSubscription = this._cartsService
                .getUserCart()
                .subscribe(cart => this._cart = cart);
        });
    }

    /**
     * @summary used in the ng2 destroy cycle.
     */
    public ngOnDestroy(): void
    {
        this._cartSubscription.unsubscribe();
    }
}
