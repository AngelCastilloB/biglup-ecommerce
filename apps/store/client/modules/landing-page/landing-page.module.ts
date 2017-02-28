/**
 * @file lading-page.module.ts.
 *
 * @summary The frontend landing page module.
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

import { CommonModule }              from '@angular/common';
import { NgModule }                  from '@angular/core';
import { LandingPageComponent }      from './components/landing-page/landing-page.component';
import { LandingPageEntryComponent } from './components/internals/components/landing-page-entry/landing-page-entry.component';
import { HelloWorldEntryComponent }  from './components/internals/components/hello-world-entry/hello-world-entry.component';
import { WideSliderEntryComponent }  from './components/internals/components/wide-slider-entry/wide-slider-entry.component';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        LandingPageComponent,
        LandingPageEntryComponent,
        WideSliderEntryComponent,
        HelloWorldEntryComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LandingPageComponent
    ]
})
export class LandingPageModule
{
}
