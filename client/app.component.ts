/**
 * @file app.component.ts
 *
 * @summary Client application entry point.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 16 2016
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

import {
    provideRouter,
    RouterConfig,
    ROUTER_DIRECTIVES }                from '@angular/router';
import { disableDeprecatedForms,
         provideForms }                from '@angular/forms';
import { Component, provide }          from '@angular/core';
import { MeteorComponent }             from 'angular2-meteor';
import { bootstrap }                   from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF }               from '@angular/common';
import { backofficeRoutes }            from './backoffice/backoffice.routes';
import { frontendRoutes }              from './frontend/frontend.routes';
import { IsUserLoggedGuardService }    from './services/guards/is-user-logged-guard.service';
import { IsUserLoggedOutGuardService } from './services/guards/is-user-logged-out-guard.service';
import { UserAuthService }             from './services/user-auth.service';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './app.component.html';

// BOOTSTRAP COMPONENT ************************************************************************************************/

/**
 * @summary This the application root component.
 */
@Component({
    selector: 'app',
    template,
    directives: [ROUTER_DIRECTIVES]
})
class Application extends MeteorComponent {

    /**
     * @summary Initializes a new instance of the Application class.
     */
    constructor() {
        super();
    }
}

// CONSTANTS **********************************************************************************************************/

/**
 * @summary The routes configurations.
 */
export const routes: RouterConfig = [
    ...backofficeRoutes,
    ...frontendRoutes
];

/**
 * @summary The router providers.
 */
const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

/**
 * @summary the Applications providers.
 */
const APP_PROVIDERS = [
    IsUserLoggedGuardService,
    IsUserLoggedOutGuardService,
    UserAuthService
];

bootstrap(Application, [
    disableDeprecatedForms(),
    provideForms(),
    APP_ROUTER_PROVIDERS,
    APP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'})]);
