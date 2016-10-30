/**
 * @file biglup-i18n.module.ts
 *
 * @summary This module export all the components on this package.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 31 2016
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

import { NgModule }           from '@angular/core';
import { TranslatePipe }      from './pipes/translate.pipe';
import { MongoTranslatePipe } from './pipes/mongo-translate.pipe';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This module export all the biglup internacionalization components.
 */
@NgModule({
    declarations: [
        TranslatePipe,
        MongoTranslatePipe
    ],
    exports: [
        TranslatePipe,
        MongoTranslatePipe
    ]
})
export class BiglupI18nModule
{
}
