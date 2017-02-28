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

import { FormsModule }                      from '@angular/forms';
import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { DesignerComponent }                from './components/designer/designer.component';
import { BiglupModalComponent }             from './components/internals/components/modal/biglup-modal.component';
import { ErrorAnimationComponent }          from './components/internals/components/modal/components/error-animation/error-animation.component';
import { InformationAnimationComponent }    from './components/internals/components/modal/components/information-animation/information-animation.component';
import { SuccessAnimationComponent }        from './components/internals/components/modal/components/success-animation/success-animation.component';
import { WaitingAnimationComponent }        from './components/internals/components/modal/components/waiting-animation/waiting-animation.component';
import { WarningAnimationComponent }        from './components/internals/components/modal/components/warning-animation/warning-animation.component';
import { ColorPickerService }               from './components/internals/services/color-picker/color-picker.service';
import { ColorPickerDirective }             from './components/internals/directives/color-picker/color-picker.directive';
import { DynamicColorPickerModule }         from './components/internals/directives/color-picker/color-picker.directive';
import { BiglupI18nModule }                 from 'meteor/biglup:i18n';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        DesignerComponent,
        BiglupModalComponent,
        ErrorAnimationComponent,
        InformationAnimationComponent,
        SuccessAnimationComponent,
        WaitingAnimationComponent,
        WarningAnimationComponent,
        ColorPickerDirective
    ],
    providers: [
        ColorPickerService
    ],
    imports: [
        FormsModule,
        CommonModule,
        DynamicColorPickerModule,
        BiglupI18nModule
    ],
    exports: [
        DesignerComponent,
        BiglupModalComponent
    ]
})
export class DesignerModule
{
}