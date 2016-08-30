/**
 * @file app.module.ts.
 *
 * @summary The application's main root module.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 26 2016
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

import { NgModule }                    from '@angular/core';
import { APP_BASE_HREF }               from '@angular/common';
import { BrowserModule }               from '@angular/platform-browser';
import { AppComponent }                from './app.component';
import { AppRoutesModule }             from './app.routes';
import { IsUserLoggedGuardService }    from './services/guards/is-user-logged-guard.service';
import { IsUserLoggedOutGuardService } from './services/guards/is-user-logged-out-guard.service';
import { UserAuthService }             from './services/user-auth.service';
import { NewPasswordGuardService }     from './services/guards/new-password-guard.service';
import { MeteorModule }                from 'angular2-meteor';
import { FrontendModule }              from './frontend/frontend.module';
import { BackofficeModule }            from './backoffice/backoffice.module';

// EXPORTS ************************************************************************************************************/

@NgModule({
    providers: [
        IsUserLoggedGuardService,
        IsUserLoggedOutGuardService,
        NewPasswordGuardService,
        UserAuthService,
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MeteorModule,
        FrontendModule,
        BackofficeModule,
        AppRoutesModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
