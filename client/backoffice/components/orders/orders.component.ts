/**
 * @file orders.component.ts
 *
 * @summary The orders admin panel.
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

import { Component }       from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './orders.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the orders and their respective status.
 */
@Component({
    selector: 'orders',
    template
})
export class OrdersComponent extends MeteorComponent
{
    /**
     * @summary Initializes a new instance of the OrdersComponent class.
     */
    constructor()
    {
        super();
    }
}
