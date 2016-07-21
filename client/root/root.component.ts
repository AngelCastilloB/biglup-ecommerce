/**
 * @file application
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

import { provideRouter,
    RouterConfig,
    ROUTER_DIRECTIVES,
    Router }                    from '@angular/router';
import { Component, provide }   from '@angular/core';
import { MeteorComponent }      from 'angular2-meteor';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF }        from '@angular/common';
import { CategoryComponent }    from '../frontend/components/category/category.component.ts';
import { LandingPageComponent } from '../frontend/components/landing-page/landing-page.component.ts';
import { HeaderComponent }      from '../frontend/components//header/header.component.ts'

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
//noinspection TypeScriptCheckImport
import template from './root.component.html';

// BOOTSTRAP COMPONENT ************************************************************************************************/

/**
 * @summary This the application root component.
 */
@Component({
    selector: 'root',
    template,
    directives: [HeaderComponent, ROUTER_DIRECTIVES]
})
class Application extends MeteorComponent{

    private _currentRoute: string;

    /**
     * @summary Initializes a new instance of the Application class.
     */
    constructor(private router: Router) {
        super();
    }

    /**
     * @summary Returns true if the given route is active.
     *
     * @param routePath The route path.
     * @returns {boolean} True if the path is active, otherwise; false.
     */
    routeIsActive(routePath: string) {
        return this.router.url === routePath;
    }
}

// CONSTANTS **********************************************************************************************************/

/**
 * @summary The application route configuration.
 */
const routes: RouterConfig = [
    { path: '', component: LandingPageComponent },
    { path: 'category/:categoryId', component: CategoryComponent },
    { path: 'admin', component: LandingPageComponent },
];

/**
 * @summary The router providers.
 */
const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

bootstrap(Application, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);