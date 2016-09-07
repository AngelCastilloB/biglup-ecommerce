/**
 * @file ng2-material.module.ts.ts.
 *
 * @summary Angular 2 material design module.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 07 2016
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

import { NgModule }               from '@angular/core';
import { MdToolbarModule }        from '@angular2-material/toolbar';
import { MdButtonModule }         from '@angular2-material/button';
import { MdCardModule }           from '@angular2-material/card';
import { MdButtonToggleModule }   from '@angular2-material/button-toggle';
import { MdCheckboxModule }       from '@angular2-material/checkbox';
import { MdIconModule }           from '@angular2-material/icon';
import { MdGridListModule }       from '@angular2-material/grid-list';
import { MdInputModule }          from '@angular2-material/input';
import { MdRadioModule }          from '@angular2-material/radio';
import { MdSidenavModule }        from '@angular2-material/sidenav';
import { MdSliderModule }         from '@angular2-material/slider';
import { MdTabsModule }           from '@angular2-material/tabs';
import { MdTooltipModule }        from '@angular2-material/tooltip';
import { MdListModule }           from '@angular2-material/list';
import { MdMenuModule }           from '@angular2-material/menu';
import { MdProgressBarModule }    from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';

// EXPORTS ************************************************************************************************************/

@NgModule({
    imports: [
        MdToolbarModule,
        MdButtonModule,
        MdCardModule,
        MdButtonToggleModule,
        MdCheckboxModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdProgressBarModule,
        MdProgressCircleModule,
        MdRadioModule,
        MdSidenavModule,
        MdSliderModule,
        MdTabsModule,
        MdTooltipModule
    ],
    exports: [
        MdToolbarModule,
        MdButtonModule,
        MdCardModule,
        MdButtonToggleModule,
        MdCheckboxModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdProgressBarModule,
        MdProgressCircleModule,
        MdRadioModule,
        MdSidenavModule,
        MdSliderModule,
        MdTabsModule,
        MdTooltipModule
    ]
})
export class Ng2MaterialModule
{
}

