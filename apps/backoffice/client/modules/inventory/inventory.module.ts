/**
 * @file inventory.module.ts.
 *
 * @summary The inventory module.
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

import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component'
import { BiglupI18nModule }   from 'meteor/biglup:i18n';
import { BiglupUiModule }     from 'meteor/biglup:ui';
import { ProductsService,
         InventoryService }   from 'meteor/biglup:business';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        InventoryComponent
    ],
    exports: [
        InventoryComponent
    ],
    providers: [
        ProductsService,
        InventoryService
    ],
    imports: [
        RouterModule,
        BiglupI18nModule,
        BiglupUiModule
    ],
})
export class InventoryModule
{
}
