/**
 * @file product.module.ts.
 *
 * @summary The frontend product module.
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

import { RouterModule }                   from '@angular/router';
import { FormsModule }                    from '@angular/forms';
import { CommonModule }                   from '@angular/common';
import { NgModule }                       from '@angular/core';
import { BiglupI18nModule }               from 'meteor/biglup:i18n';
import { CategoriesService,
         ProductsService }                from 'meteor/biglup:business';
import { IdGeneratorService }             from 'meteor/biglup:core';
import { ProductDetailsComponent }        from './components/product-details/product-details.component';
import { ProductImagesCarouselComponent } from './components/product-images-carousel/product-images-carousel';
import { SanitizeHtmlPipe }               from 'meteor/biglup:core';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        ProductDetailsComponent,
        ProductImagesCarouselComponent,
        SanitizeHtmlPipe
    ],
    providers: [
        CategoriesService,
        ProductsService,
        IdGeneratorService,
        BiglupI18nModule
    ],
    imports: [
        FormsModule,
        CommonModule,
        BiglupI18nModule,
        RouterModule
    ],
    exports: [
        ProductDetailsComponent,
        ProductImagesCarouselComponent
    ]
})
export class ProductModule
{
}