/**
 * @file footer.module.ts.
 *
 * @summary The frontend footer module.
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

import { FormsModule }      from '@angular/forms';
import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';
import { BiglupI18nModule } from 'meteor/biglup:i18n';
import { FooterComponent }  from './components/footer/footer.component';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        FooterComponent
    ],
    providers: [
    ],
    imports: [
        FormsModule,
        CommonModule,
        BiglupI18nModule
    ],
    exports: [
        FooterComponent
    ]
})
export class FooterModule
{
}