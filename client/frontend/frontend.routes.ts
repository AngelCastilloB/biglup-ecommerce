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

import { RouterConfig }            from '@angular/router';
import { CategoryComponent }       from './components/category/category.component.ts';
import { LandingPageComponent }    from './components/landing-page/landing-page.component.ts';
import { FrontendComponent }       from './frontend.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';

/* EXPORTS ************************************************************************************************************/

/**
 * @brief This are the front end routes.
 */
export const frontendRoutes: RouterConfig = [
    {
        path: '',
        component: FrontendComponent,
        children: [
            {path: '', component: LandingPageComponent},
            {path: 'login', component: LoginComponent},
            {path: 'category/:categoryId', component: CategoryComponent},
            {path: 'category/:categoryId/product/:productId', component: ProductDetailsComponent},
        ]
    }
];

