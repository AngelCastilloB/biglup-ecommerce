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
import { IsUserLoggedGuardService }    from 'meteor/biglup:core';
import { IsUserLoggedOutGuardService } from 'meteor/biglup:core';
import { UserAuthService }             from 'meteor/biglup:business';
import { NewPasswordGuardService }     from 'meteor/biglup:core';
import { BackofficeModule }            from './backoffice.module';
import { METEOR_PROVIDERS }            from 'angular2-meteor';

// EXPORTS ************************************************************************************************************/

@NgModule({
    providers: [
        IsUserLoggedGuardService,
        IsUserLoggedOutGuardService,
        NewPasswordGuardService,
        UserAuthService,
        {
            provide: APP_BASE_HREF,
            useValue: '/'
        },
        [METEOR_PROVIDERS]
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BackofficeModule,
        AppRoutesModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule
{
}
