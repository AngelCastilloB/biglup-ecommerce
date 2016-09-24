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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// IMPORTS ************************************************************************************************************/
require('reflect-metadata');
var core_1 = require('@angular/core');
var frontend_routes_1 = require('./frontend.routes');
var header_component_1 = require('./components/header/header.component');
var oauth_login_component_1 = require('./components/oauth-login/oauth-login.component');
var form_error_component_1 = require('./components/form-error/form-error.component');
var product_images_carousel_1 = require('./components/product/product-images-carousel/product-images-carousel');
var sign_up_component_1 = require('./components/sign-up/sign-up.component');
var product_details_component_1 = require('./components/product/product-details/product-details.component');
var password_reset_component_1 = require('./components/password-reset/password-reset.component');
var new_password_component_1 = require('./components/new-password/new-password.component');
var login_component_1 = require('./components/login/login.component');
var landing_page_component_1 = require('./components/landing-page/landing-page.component');
var category_item_component_1 = require('./components/category-item/category-item.component');
var category_component_1 = require('./components/category/category.component');
var shared_module_1 = require('../shared.module');
var frontend_component_1 = require('./frontend.component');
var categories_service_1 = require('../services/categories.service');
var products_service_1 = require('../services/products.service');
var id_generator_service_ts_1 = require('../services/id-generator.service.ts');
var validation_service_1 = require('../services/validation.service');
var user_auth_service_1 = require('../services/user-auth.service');
var biglup_biglup_ui_1 = require('meteor/biglup:biglup-ui');
// EXPORTS ************************************************************************************************************/
var FrontendModule = (function () {
    function FrontendModule() {
    }
    FrontendModule = __decorate([
        core_1.NgModule({
            declarations: [
                frontend_component_1.FrontendComponent,
                // header (child of frontend)
                header_component_1.HeaderComponent,
                // TODO: refactor into child feature modules
                // auth
                login_component_1.LoginComponent,
                oauth_login_component_1.OauthLoginComponent,
                sign_up_component_1.SignUpComponent,
                new_password_component_1.NewPasswordComponent,
                form_error_component_1.FormErrorComponent,
                // product
                product_images_carousel_1.ProductImagesCarouselComponent,
                product_details_component_1.ProductDetailsComponent,
                password_reset_component_1.PasswordResetComponent,
                // category
                category_component_1.CategoryComponent,
                category_item_component_1.CategoryItemComponent,
                // landing
                landing_page_component_1.LandingPageComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                frontend_routes_1.FrontendRoutesModule,
                biglup_biglup_ui_1.BiglupUiModule
            ],
            providers: [
                categories_service_1.CategoriesService,
                products_service_1.ProductsService,
                validation_service_1.ValidationService,
                user_auth_service_1.UserAuthService,
                id_generator_service_ts_1.IdGeneratorService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FrontendModule);
    return FrontendModule;
}());
exports.FrontendModule = FrontendModule;
//# sourceMappingURL=frontend.module.js.map