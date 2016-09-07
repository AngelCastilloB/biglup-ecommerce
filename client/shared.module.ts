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
import { TranslatePipe }                    from './pipes/translate.pipe';
import { MongoTranslatePipe }               from './pipes/mongo-translate.pipe';
import { TruncateStringPipe }               from './pipes/truncate-string.pipe';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// EXPORTS ************************************************************************************************************/

@NgModule({
    imports: [
        CommonModule,
        FormsModule, // TODO hunt down the component using template driven form
        ReactiveFormsModule,
    ],
    declarations: [
        TranslatePipe,
        MongoTranslatePipe,
        TruncateStringPipe
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslatePipe,
        MongoTranslatePipe,
        TruncateStringPipe
    ]
})
export class SharedModule
{
}
