/**
 * @file products.module.ts.
 *
 * @summary The products module.
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
import { AddProductVariantComponent }    from './components/add-product-variant/add-product-variant.component'
import { AddProductComponent }           from './components/add-product/add-product.component'
import { ProductsComponent }             from './components/products/products.component';
import { ImageDisplayComponent,
         ImagePreviewComponent,
         ProductImageManagerComponent }  from './components/product-images-manager'
import { FileDropDirective,
         FileSelectDirective}            from 'meteor/biglup:core';
import { BiglupI18nModule }              from 'meteor/biglup:i18n';
import { BiglupUiModule }                from 'meteor/biglup:ui';
import { I18nModule }                    from '../../modules/i18n';
import { DragulaService, DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CategoriesService,
         ProductsService,
         VariantAttributesService,
         ImagesService }                  from 'meteor/biglup:business';
import { IdGeneratorService }             from 'meteor/biglup:core';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        AddProductVariantComponent,
        AddProductComponent,
        ImageDisplayComponent,
        ImagePreviewComponent,
        FileDropDirective,
        FileSelectDirective,
        ProductsComponent,
        ProductImageManagerComponent
    ],
    providers: [
        DragulaService,
        CategoriesService,
        ProductsService,
        VariantAttributesService,
        ImagesService,
        IdGeneratorService
    ],
    exports: [
        AddProductVariantComponent,
        AddProductComponent,
        ImageDisplayComponent,
        ImagePreviewComponent,
        FileDropDirective,
        FileSelectDirective,
        ProductsComponent,
        ProductImageManagerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        BiglupUiModule,
        DragulaModule,
        I18nModule
    ]
})
export class ProductsModule
{
}
