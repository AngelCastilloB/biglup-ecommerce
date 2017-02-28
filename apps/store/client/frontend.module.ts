/**
 * @file frontend.module.ts.
 *
 * @summary The frontend feature module.
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
import { FrontendRoutesModule }             from './frontend.routes';
import { FrontendComponent }                from './frontend.component';
import { CategoriesService }                from 'meteor/biglup:business';
import { ProductsService }                  from 'meteor/biglup:business';
import { ImagesService }                    from 'meteor/biglup:business';
import { CartsService }                     from 'meteor/biglup:business';
import { AppearancesService }               from 'meteor/biglup:business';
import { BiglupI18nModule }                 from 'meteor/biglup:i18n';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdGeneratorService }               from 'meteor/biglup:core';
import { FooterModule }                     from './modules/footer/footer.module';
import { LandingPageModule }                from './modules/landing-page/landing-page.module';
import { DesignerModule }                   from './modules/designer/designer.module';
import { HeaderModule }                     from './modules/header/header.module';
import { AuthenticationModule }             from './modules/authentication/authentication.module'
import { ProductModule }                    from './modules/product/product.module';
import { CategoryModule }                   from './modules/category/category.module';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        FrontendComponent,
    ],
    imports: [
        FrontendRoutesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        HeaderModule,
        LandingPageModule,
        DesignerModule,
        AuthenticationModule,
        ProductModule,
        FooterModule,
        CategoryModule
    ],
    providers: [
        CategoriesService,
        ProductsService,
        CartsService,
        ImagesService,
        IdGeneratorService,
        AppearancesService,
    ]
})
export class FrontendModule
{
}
