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

/* IMPORTS ************************************************************************************************************/

import { Routes, RouterModule }        from '@angular/router';
import { CategoryComponent }           from './components/category/category.component.ts';
import { LandingPageComponent }        from './components/landing-page/landing-page.component.ts';
import { FrontendComponent }           from './frontend.component';
import { ProductDetailsComponent }     from './components/product/product-details/product-details.component';
import { LoginComponent }              from './components/login/login.component';
import { IsUserLoggedOutGuardService } from 'meteor/biglup:core';
import { SignUpComponent }             from './components/sign-up/sign-up.component';
import { PasswordResetComponent }      from './components/password-reset/password-reset.component';
import { NewPasswordComponent }        from './components/new-password/new-password.component';
import { NewPasswordGuardService }     from 'meteor/biglup:core';

/* EXPORTS ************************************************************************************************************/

/**
 * @brief This are the front end routes.
 */
const ROUTES: Routes = [
    {
        path: '',
        component: FrontendComponent,
        children: [
            {path: '', component: LandingPageComponent},
            {path: 'login', component: LoginComponent, canActivate: [IsUserLoggedOutGuardService]},
            {path: 'signup', component: SignUpComponent, canActivate: [IsUserLoggedOutGuardService]},
            {path: 'password-reset', component: PasswordResetComponent, canActivate: [IsUserLoggedOutGuardService]},
            {
                path: 'reset-password',
                component: NewPasswordComponent,
                canActivate: [
                    IsUserLoggedOutGuardService,
                    NewPasswordGuardService
                ]
            },
            {path: 'category/:categoryId', component: CategoryComponent},
            {path: 'category/:categoryId/product/:productId', component: ProductDetailsComponent},
        ]
    }
];

/**
 * @summary generates a module object with the app frontend routes.
 *
 * @type {ModuleWithProviders}
 */
export const FrontendRoutesModule = RouterModule.forChild(ROUTES);
