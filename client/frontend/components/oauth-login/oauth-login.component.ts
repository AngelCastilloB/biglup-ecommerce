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
import { UserAuthService }                 from '../../../services/user-auth.service';
import { Router }                          from '@angular/router';
import { Meteor }                          from 'meteor/meteor';

// noinspection TypeScriptCheckImport
import template from './oauth-login.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows the user to log in suing different oauth service providers.
 */
@Component({
    selector: 'oauth-login',
    template
})
export class OauthLoginComponent
{
    /**
     * @summary in case of an external service error, this will be fired.
     */
    @Output()
    public errorEvent = new EventEmitter();

    /**
     * @summary this flag signifies the facebook settings are loaded in meteor or not, since they are optional.
     */
    private _hasFacebookSettings: boolean;

    /**
     * @summary this flag signifies the google settings are loaded in meteor or not, since they are optional.
     */
    private _hasGoogleSettings: boolean;

    /**
     * @summary this flag signifies the twitter settings are loaded in meteor or not, since they are optional.
     */
    private _hasTwitterSettings: boolean;

    /**
     * @summary Initializes a new instance of the OauthLoginComponent class.
     *
     * @param _userAuthService The user authentication service.
     * @param _router          The router service.
     */
    constructor(private _userAuthService: UserAuthService, private _router: Router)
    {
        this._checkMeteorSettings();
    }

    /**
     * @summary uses Oauth and attempts to login with facebook's help.
     * @private
     */
    private _loginWithFacebook()
    {
        this._userAuthService.loginWithFacebook({}, err => this._handleLogin(err));
    }

    /**
     * @summary uses Oauth and attempts to login with google's help.
     * @private
     */
    private _loginWithGoogle()
    {
        this._userAuthService.loginWithGoogle({}, err => this._handleLogin(err));
    }

    /**
     * @summary uses Oauth and attempts to login with twitter's help.
     * @private
     */
    private _loginWithTwitter()
    {
        this._userAuthService.loginWithTwitter({}, err => this._handleLogin(err));
    }

    /**
     * @summary dispatches the local error event up the chain.
     *
     * @param {Meteor.Error} error The error to be processed/
     * @private
     */
    private _processError(error: Meteor.Error): void
    {
        this.errorEvent.emit(error);
    }

    /**
     * @summary Acts when a login event is completed.
     *
     * @param {Meteor.Error} error The longin error (if any).
     * @private
     */
    private _handleLogin(error: Meteor.Error)
    {
        if (error)
            return this._processError(error);

        this._router.navigate(['/']);
    }

    /**
     * @summary Updates the flags to show or hide the OAuth buttons.
     * @private
     */
    private _checkMeteorSettings()
    {
        this._hasFacebookSettings = !!Meteor.settings.public['facebook'];
        this._hasGoogleSettings   = !!Meteor.settings.public['google'];
        this._hasTwitterSettings  = !!Meteor.settings.public['twitter'];
    }

    /**
     * @summary check if at least one setting is loaded to render the form's div wrapper.
     *
     * @returns {boolean}
     * @private
     */
    private _areSettingsLoaded()
    {
        return (this._hasFacebookSettings || this._hasGoogleSettings || this._hasTwitterSettings);
    }
}
