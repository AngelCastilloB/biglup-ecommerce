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
import { Component, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HeaderComponent } from '../header/header.component'
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

import template from './root.component.html';

// IMPLEMENTATION *****************************************************************************************************/

@Component({
    selector: 'root',
    template,
    directives: [HeaderComponent, ROUTER_DIRECTIVES]
})
/**
 * @summary This the application root component.
 */
class Application {

    /**
     * @summary Initializes a new instance of the Application class.
     */
    constructor()
    {
    }
}

const routes: RouterConfig = [
    { path: '', component: LandingPageComponent },
    { path: 'category/:categoryId', component: CategoryComponent },
];

const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

bootstrap(Application, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);