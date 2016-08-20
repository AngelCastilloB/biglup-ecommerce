/**
 * @file oauth-login.component.ts.
 *
 * @summary Presents to the user external login options.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 20 2016
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

// noinspection TypeScriptCheckImport
import template from './oauth-login.component.html';

import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatePipe }                   from '../../../pipes/translate.pipe';
import { UserAuthService }                 from '../../../services/user-auth.service';
import { Router }                          from '@angular/router';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'oauth-login',
    template,
    pipes: [TranslatePipe]
})
export class OauthLoginComponent {

    /**
     * @summary in case of an external service error, this will be fired.
     * @type {EventEmitter}
     */
    @Output() public errorEvent = new EventEmitter();

    constructor(private _userAuthService: UserAuthService, private _router: Router) {
    }

    /**
     * @summary uses Oauth and attempts to login with facebook's help.
     * @private
     */
    private _loginWithFacebook() {
        this._userAuthService.loginWithFacebook({}, err => {
            if (err) return this._processError(err);

            this._router.navigate(['/']);
        });
    }

    /**
     * @summary uses Oauth and attempts to login with google's help.
     * @private
     */
    private _loginWithGoogle() {
        console.log('login with google');
    }

    /**
     * @summary uses Oauth and attempts to login with twitter's help.
     * @private
     */
    private _loginWithTwitter() {
        console.log('login with twitter');
    }

    /**
     * @summary dispatches the local error event up the chain.
     *
     * @param {Meteor.Error} err
     * @private
     */
    private _processError(err: Meteor.Error): void {
        this.errorEvent.emit(err);
    }
}
