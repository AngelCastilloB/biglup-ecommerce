/**
 * @file biglup-ui.module.ts
 *
 * @summary This module export all the components on this package.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 25 2016
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

import 'reflect-metadata';

import { NgModule }              from '@angular/core';
import { BiglupButtonComponent } from './button/biglup-button.component';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This module export all the biglup user interface components.
 */
@NgModule({
    declarations: [
        BiglupButtonComponent
    ],
    exports: [
        BiglupButtonComponent
    ]
})
export class BiglupUiModule
{
}
