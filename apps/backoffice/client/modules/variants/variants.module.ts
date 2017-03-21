/**
 * @file variants.module.ts.
 *
 * @summary The variants module.
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

import { FormsModule,
         ReactiveFormsModule }           from '@angular/forms';
import { RouterModule }                  from '@angular/router';
import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { BiglupI18nModule }              from 'meteor/biglup:i18n';
import { BiglupUiModule }                from 'meteor/biglup:ui';
import { I18nModule }                    from '../../modules/i18n';
import { VariantAttributesService }      from 'meteor/biglup:business';
import { AddColorVariantComponent }      from './components/add-color-variant/add-color-variant.component';
import { AddMaterialVariantComponent }   from './components/add-material-variant/add-material-variant.component';
import { AddSizeVariantComponent }       from './components/add-size-variant/add-size-variant.component';
import { VariantsComponent }             from './components/variants/variants.component';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        AddColorVariantComponent,
        AddMaterialVariantComponent,
        AddSizeVariantComponent,
        VariantsComponent
    ],
    providers: [
        VariantAttributesService
    ],
    exports: [
        AddColorVariantComponent,
        AddMaterialVariantComponent,
        AddSizeVariantComponent,
        VariantsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        BiglupUiModule,
        I18nModule
    ]
})
export class VariantsModule
{
}
