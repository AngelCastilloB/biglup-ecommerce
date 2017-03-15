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
import { CategoryComponent }           from './modules/category/components/category/category.component';
import { LandingPageComponent }        from './modules/landing-page';
import { FrontendComponent }           from './frontend.component';
import { ProductDetailsComponent }     from './modules/product/components/product-details/product-details.component';
import { LoginComponent,
         SignUpComponent,
         PasswordResetComponent,
         NewPasswordComponent  }       from './modules/authentication';
import { IsUserLoggedOutGuardService } from 'meteor/biglup:core';
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
            {path: '', component: LandingPageComponent },
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
