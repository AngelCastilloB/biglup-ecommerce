/**
 * @file swiper.module.ts.
 *
 * @summary The swiper product module.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   March 02 2017
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

import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { SwiperComponent } from './components/swiper.component';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Swiper wrapper module.
 */
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SwiperComponent
    ],
    declarations: [
        SwiperComponent
    ],
    providers: []
})
export class SwiperModule {}