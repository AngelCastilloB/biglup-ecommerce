/**
 * @file frontend.routes.ts
 *
 * @summary The routes definitions for the frontend component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
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
/* IMPORTS ************************************************************************************************************/
var router_1 = require('@angular/router');
var category_component_ts_1 = require('./components/category/category.component.ts');
var landing_page_component_ts_1 = require('./components/landing-page/landing-page.component.ts');
var frontend_component_1 = require('./frontend.component');
var product_details_component_1 = require('./components/product/product-details/product-details.component');
var login_component_1 = require('./components/login/login.component');
var is_user_logged_out_guard_service_1 = require('../services/guards/is-user-logged-out-guard.service');
var sign_up_component_1 = require('./components/sign-up/sign-up.component');
var password_reset_component_1 = require('./components/password-reset/password-reset.component');
var new_password_component_1 = require('./components/new-password/new-password.component');
var new_password_guard_service_1 = require('../services/guards/new-password-guard.service');
/* EXPORTS ************************************************************************************************************/
/**
 * @brief This are the front end routes.
 */
var ROUTES = [
    {
        path: '',
        component: frontend_component_1.FrontendComponent,
        children: [
            { path: '', component: landing_page_component_ts_1.LandingPageComponent },
            { path: 'login', component: login_component_1.LoginComponent, canActivate: [is_user_logged_out_guard_service_1.IsUserLoggedOutGuardService] },
            { path: 'signup', component: sign_up_component_1.SignUpComponent, canActivate: [is_user_logged_out_guard_service_1.IsUserLoggedOutGuardService] },
            { path: 'password-reset', component: password_reset_component_1.PasswordResetComponent, canActivate: [is_user_logged_out_guard_service_1.IsUserLoggedOutGuardService] },
            {
                path: 'reset-password',
                component: new_password_component_1.NewPasswordComponent,
                canActivate: [
                    is_user_logged_out_guard_service_1.IsUserLoggedOutGuardService,
                    new_password_guard_service_1.NewPasswordGuardService
                ]
            },
            { path: 'category/:categoryId', component: category_component_ts_1.CategoryComponent },
            { path: 'category/:categoryId/product/:productId', component: product_details_component_1.ProductDetailsComponent },
        ]
    }
];
/**
 * @summary generates a module object with the app frontend routes.
 *
 * @type {ModuleWithProviders}
 */
exports.FrontendRoutesModule = router_1.RouterModule.forChild(ROUTES);
//# sourceMappingURL=frontend.routes.js.map