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

import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatePipe }                   from '../../../pipes/translate.pipe';
import { UserAuthService }                 from '../../../services/user-auth.service';
import { Router }                          from '@angular/router';

// noinspection TypeScriptCheckImport
import template from './oauth-login.component.html';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'oauth-login',
    template,
    pipes: [TranslatePipe]
})
/**
 * @summary This component allows the user to log in suing different oauth service providers.
 */
export class OauthLoginComponent {

    /**
     * @summary in case of an external service error, this will be fired.
     */
    @Output()
    public errorEvent = new EventEmitter();

    /**
     * @summary Initializes a new instance of the OauthLoginComponent class.
     *
     * @param _userAuthService The user authentication service.
     * @param _router          The router service.
     */
    constructor(private _userAuthService: UserAuthService, private _router: Router) {
    }

    /**
     * @summary uses Oauth and attempts to login with facebook's help.
     * @private
     */
    private _loginWithFacebook() {
        this._userAuthService.loginWithFacebook({}, err => this._handleLogin(err));
    }

    /**
     * @summary uses Oauth and attempts to login with google's help.
     * @private
     */
    private _loginWithGoogle() {
        this._userAuthService.loginWithGoogle({}, err => this._handleLogin(err));
    }

    /**
     * @summary uses Oauth and attempts to login with twitter's help.
     * @private
     */
    private _loginWithTwitter() {
        this._userAuthService.loginWithTwitter({}, err => this._handleLogin(err));
    }

    /**
     * @summary dispatches the local error event up the chain.
     *
     * @param {Meteor.Error} error The error to be processed/
     * @private
     */
    private _processError(error: Meteor.Error): void {
        this.errorEvent.emit(error);
    }

    /**
     * @summary Acts when a login event is completed.
     *
     * @param {Meteor.Error} error The longin error (if any).
     * @private
     */
    private _handleLogin(error: Meteor.Error) {

        if (error) {
            return this._processError(error);
        }

        this._router.navigate(['/']);
    }
}
