/**
 * @file i18n.module.ts.
 *
 * @summary The i18n module.
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
         ReactiveFormsModule }     from '@angular/forms';
import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { I18nInputComponent }      from './components/i18n-input/i18n-input.component'
import { I18nTextEditorComponent } from './components/i18n-text-editor/i18n-text-editor.component'
import { BiglupI18nModule }        from 'meteor/biglup:i18n';
import { BiglupUiModule }          from 'meteor/biglup:ui';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        I18nTextEditorComponent,
        I18nInputComponent
    ],
    exports: [
        I18nTextEditorComponent,
        I18nInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        BiglupUiModule
    ]
})
export class I18nModule
{
}
