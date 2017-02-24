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
import { HeaderComponent }                  from './components/header/header.component';
import { OauthLoginComponent }              from './components/oauth-login/oauth-login.component';
import { FormErrorComponent }               from './components/form-error/form-error.component';
import { ProductImagesCarouselComponent }   from './components/product/product-images-carousel/product-images-carousel';
import { SignUpComponent }                  from './components/sign-up/sign-up.component';
import { ProductDetailsComponent }          from './components/product/product-details/product-details.component';
import { PasswordResetComponent }           from './components/password-reset/password-reset.component';
import { NewPasswordComponent }             from './components/new-password/new-password.component';
import { LoginComponent }                   from './components/login/login.component';
import { LandingPageComponent }             from './components/landing-page/landing-page.component';
import { CategoryItemComponent }            from './components/category-item/category-item.component';
import { CategoryComponent }                from './components/category/category.component';
import { FrontendComponent }                from './frontend.component';
import { CartComponent }                    from './components/header/components/cart/cart.component';
import { CategoriesService }                from 'meteor/biglup:business';
import { ProductsService }                  from 'meteor/biglup:business';
import { ImagesService }                    from 'meteor/biglup:business';
import { CartsService }                     from 'meteor/biglup:business';
import { AppearancesService }               from 'meteor/biglup:business';
import { BiglupI18nModule }                 from 'meteor/biglup:i18n';
import { TruncateStringPipe }               from 'meteor/biglup:core';
import { SanitizeHtmlPipe }                 from 'meteor/biglup:core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdGeneratorService }               from 'meteor/biglup:core';
import { ActionbarComponent }               from './components/header/components/action-bar/action-bar.component';
import { HeaderLogoComponent }              from './components/header/components/logo/logo.component';
import { HeaderNavMenuComponent }           from './components/header/components/nav/nav-menu.component';
import { DesignerComponent }                from './components/designer/designer.component';
import { ColorPickerService }               from './components/designer/services/color-picker/color-picker.service';
import { ColorPickerDirective }             from './components/designer/directives/color-picker/color-picker.directive';
import { DynamicColorPickerModule }         from './components/designer/directives/color-picker/color-picker.directive';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        FrontendComponent,
        // header (child of frontend)
        HeaderComponent,
        ActionbarComponent,
        CartComponent,
        HeaderNavMenuComponent,
        HeaderLogoComponent,
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
        LandingPageComponent,

        TruncateStringPipe,
        SanitizeHtmlPipe,

        // Designer
        DesignerComponent,
        ColorPickerDirective
    ],
    imports: [
        FrontendRoutesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        DynamicColorPickerModule
    ],
    providers: [
        CategoriesService,
        ProductsService,
        CartsService,
        ImagesService,
        IdGeneratorService,
        AppearancesService,
        ColorPickerService
    ]
})
export class FrontendModule
{
}
