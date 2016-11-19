/**
 * @file shared.module.ts.
 *
 * @summary Shared (generic/global) module.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 30 2016
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

import { NgModule }                         from '@angular/core';
import { BiglupI18nModule }                 from 'meteor/biglup:i18n';
import { TruncateStringPipe }               from 'meteor/biglup:core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2MaterialModule }                from './ng2-material.module';
import { BiglupUiModule }                   from 'meteor/biglup:ui';

// EXPORTS ************************************************************************************************************/

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2MaterialModule,
        BiglupI18nModule,
        BiglupUiModule
    ],
    declarations: [
        TruncateStringPipe
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TruncateStringPipe,
        Ng2MaterialModule,
        BiglupI18nModule,
        BiglupUiModule
    ]
})
export class SharedModule
{
}
