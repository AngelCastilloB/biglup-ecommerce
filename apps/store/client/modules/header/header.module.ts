/**
 * @file designer.module.ts.
 *
 * @summary The frontend designer module.
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

import { RouterModule }           from '@angular/router';
import { FormsModule }            from '@angular/forms';
import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { BiglupI18nModule }       from 'meteor/biglup:i18n';
import { HeaderComponent }        from './components/header/header.component'
import { ActionbarComponent }     from './components/internals/action-bar/action-bar.component'
import { CartComponent }          from './components/internals/cart/cart.component'
import { HeaderLogoComponent }    from './components/internals/logo/logo.component'
import { HeaderNavMenuComponent } from './components/internals/nav/nav-menu.component'
import { CategoriesService }      from 'meteor/biglup:business';
import { CartsService }           from 'meteor/biglup:business';
import { AppearancesService }     from 'meteor/biglup:business';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        HeaderComponent,
        ActionbarComponent,
        CartComponent,
        HeaderLogoComponent,
        HeaderNavMenuComponent
    ],
    providers: [
        CategoriesService,
        CartsService,
        AppearancesService
    ],
    imports: [
        FormsModule,
        CommonModule,
        BiglupI18nModule,
        RouterModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule
{
}