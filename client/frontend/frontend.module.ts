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

import 'reflect-metadata';

import { NgModule }                       from '@angular/core';
import { FrontendRoutesModule }           from './frontend.routes';
import { HeaderComponent }                from './components/header/header.component';
import { OauthLoginComponent }            from './components/oauth-login/oauth-login.component';
import { FormErrorComponent }             from './components/form-error/form-error.component';
import { ProductImagesCarouselComponent } from './components/product/product-images-carousel/product-images-carousel';
import { SignUpComponent }                from './components/sign-up/sign-up.component';
import { ProductDetailsComponent }        from './components/product/product-details/product-details.component';
import { PasswordResetComponent }         from './components/password-reset/password-reset.component';
import { NewPasswordComponent }           from './components/new-password/new-password.component';
import { LoginComponent }                 from './components/login/login.component';
import { LandingPageComponent }           from './components/landing-page/landing-page.component';
import { CategoryItemComponent }          from './components/category-item/category-item.component';
import { CategoryComponent }              from './components/category/category.component';
import { SharedModule }                   from '../shared.module';
import { FrontendComponent }              from './frontend.component';
import { CategoriesService }              from '../services/categories.service';
import { ProductsService }                from '../services/products.service';
import { IdGeneratorService }             from '../services/id-generator.service.ts';
import { ValidationService }              from '../services/validation.service';
import { UserAuthService }                from '../services/user-auth.service';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        FrontendComponent,
        // header (child of frontend)
        HeaderComponent,
        // TODO: refactor into child feature modules

        // auth
        LoginComponent,
        OauthLoginComponent,
        SignUpComponent,
        NewPasswordComponent,
        FormErrorComponent,

        // product
        ProductImagesCarouselComponent,
        ProductDetailsComponent,
        PasswordResetComponent,

        // category
        CategoryComponent,
        CategoryItemComponent,

        // landing
        LandingPageComponent
    ],
    imports: [
        SharedModule,
        FrontendRoutesModule
    ],
    providers: [
        CategoriesService,
        ProductsService,
        ValidationService,
        UserAuthService,
        IdGeneratorService
    ]
})
export class FrontendModule
{
}
