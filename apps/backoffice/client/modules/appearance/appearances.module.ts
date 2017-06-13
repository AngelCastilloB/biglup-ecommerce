/**
 * @file appearances.module.ts.
 *
 * @summary The appearances module.
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

import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';
import { FormsModule }            from '@angular/forms';
import { CommonModule }           from '@angular/common';
import { AppearancesComponent }   from './components/appearances/appearances.component'
import { SlidersComponent }       from './components/sliders/sliders.component'
import { FeaturedComponent }      from './components/featured/featured.component'
import { CollagesComponent }      from './components/collages/collages.component'
import { BiglupI18nModule }       from 'meteor/biglup:i18n';
import { BiglupUiModule }         from 'meteor/biglup:ui';
import { AppearancesService }     from 'meteor/biglup:business';
import { AddAppearanceComponent } from './components/add-appearance/add-appearance.component';
import { I18nModule }             from '../../modules/i18n';
import { DragulaService,
         DragulaModule }          from 'ng2-dragula/ng2-dragula';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        AppearancesComponent,
        AddAppearanceComponent,
        SlidersComponent,
        FeaturedComponent,
        CollagesComponent
    ],
    exports: [
        AppearancesComponent,
        SlidersComponent,
        FeaturedComponent,
        CollagesComponent,
        AddAppearanceComponent
    ],
    providers: [
        AppearancesService,
        DragulaService
    ],
    imports: [
        RouterModule,
        BiglupI18nModule,
        BiglupUiModule,
        FormsModule,
        I18nModule,
        CommonModule,
        DragulaModule
    ]
})
export class AppearancesModule
{
}
