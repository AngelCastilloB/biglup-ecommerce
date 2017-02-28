/**
 * @file authentication.module.ts.
 *
 * @summary The frontend landing page module.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 28 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { FormsModule,
         ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';
import { FormErrorComponent }     from './components/form-error/form-error.component';
import { LoginComponent }         from './components/login/login.component';
import { NewPasswordComponent }   from './components/new-password/new-password.component';
import { OauthLoginComponent }    from './components/oauth-login/oauth-login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { SignUpComponent }        from './components/sign-up/sign-up.component';
import { IdGeneratorService }     from 'meteor/biglup:core';
import { BiglupI18nModule }       from 'meteor/biglup:i18n';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        FormErrorComponent,
        LoginComponent,
        NewPasswordComponent,
        OauthLoginComponent,
        PasswordResetComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        RouterModule
    ],
    exports: [
        FormErrorComponent,
        LoginComponent,
        NewPasswordComponent,
        OauthLoginComponent,
        PasswordResetComponent,
        SignUpComponent
    ],
    providers: [
        IdGeneratorService,
    ]
})
export class AuthenticationModule
{
}
