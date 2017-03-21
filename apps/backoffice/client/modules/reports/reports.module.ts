/**
 * @file reports.module.ts.
 *
 * @summary The reports module.
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

import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { ReportsComponent }    from './components/reports/reports.component'
import { BiglupUiModule }      from 'meteor/biglup:ui';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { BiglupToastService }  from 'meteor/biglup:ui';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        ReportsComponent
    ],
    exports: [
        ReportsComponent
    ],
    imports: [
        RouterModule,
        BiglupUiModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        BiglupToastService
    ]
})
export class ReportsModule
{
}
