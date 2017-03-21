/**
 * @file orders.module.ts.
 *
 * @summary The orders module.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 28 2017
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

import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component'

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        OrdersComponent
    ],
    exports: [
        OrdersComponent
    ],
    imports: [
        RouterModule
    ]
})
export class OrdersModule
{
}
