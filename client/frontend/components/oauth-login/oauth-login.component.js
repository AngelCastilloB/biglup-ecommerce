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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// IMPORTS ************************************************************************************************************/
require('reflect-metadata');
var core_1 = require('@angular/core');
var user_auth_service_1 = require('../../../services/user-auth.service');
var router_1 = require('@angular/router');
var meteor_1 = require('meteor/meteor');
// noinspection TypeScriptCheckImport
var oauth_login_component_html_1 = require('./oauth-login.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component allows the user to log in suing different oauth service providers.
 */
var OauthLoginComponent = (function () {
    /**
     * @summary Initializes a new instance of the OauthLoginComponent class.
     *
     * @param _userAuthService The user authentication service.
     * @param _router          The router service.
     */
    function OauthLoginComponent(_userAuthService, _router) {
        this._userAuthService = _userAuthService;
        this._router = _router;
        /**
         * @summary in case of an external service error, this will be fired.
         */
        this.errorEvent = new core_1.EventEmitter();
        this._checkMeteorSettings();
    }
    /**
     * @summary uses Oauth and attempts to login with facebook's help.
     * @private
     */
    OauthLoginComponent.prototype._loginWithFacebook = function () {
        var _this = this;
        this._userAuthService.loginWithFacebook({}, function (err) { return _this._handleLogin(err); });
    };
    /**
     * @summary uses Oauth and attempts to login with google's help.
     * @private
     */
    OauthLoginComponent.prototype._loginWithGoogle = function () {
        var _this = this;
        this._userAuthService.loginWithGoogle({}, function (err) { return _this._handleLogin(err); });
    };
    /**
     * @summary uses Oauth and attempts to login with twitter's help.
     * @private
     */
    OauthLoginComponent.prototype._loginWithTwitter = function () {
        var _this = this;
        this._userAuthService.loginWithTwitter({}, function (err) { return _this._handleLogin(err); });
    };
    /**
     * @summary dispatches the local error event up the chain.
     *
     * @param {Meteor.Error} error The error to be processed/
     * @private
     */
    OauthLoginComponent.prototype._processError = function (error) {
        this.errorEvent.emit(error);
    };
    /**
     * @summary Acts when a login event is completed.
     *
     * @param {Meteor.Error} error The longin error (if any).
     * @private
     */
    OauthLoginComponent.prototype._handleLogin = function (error) {
        if (error)
            return this._processError(error);
        this._router.navigate(['/']);
    };
    /**
     * @summary Updates the flags to show or hide the OAuth buttons.
     * @private
     */
    OauthLoginComponent.prototype._checkMeteorSettings = function () {
        this._hasFacebookSettings = !!meteor_1.Meteor.settings.public['facebook'];
        this._hasGoogleSettings = !!meteor_1.Meteor.settings.public['google'];
        this._hasTwitterSettings = !!meteor_1.Meteor.settings.public['twitter'];
    };
    /**
     * @summary check if at least one setting is loaded to render the form's div wrapper.
     *
     * @returns {boolean}
     * @private
     */
    OauthLoginComponent.prototype._areSettingsLoaded = function () {
        return (this._hasFacebookSettings || this._hasGoogleSettings || this._hasTwitterSettings);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OauthLoginComponent.prototype, "errorEvent", void 0);
    OauthLoginComponent = __decorate([
        core_1.Component({
            selector: 'oauth-login',
            template: oauth_login_component_html_1.default
        }), 
        __metadata('design:paramtypes', [user_auth_service_1.UserAuthService, router_1.Router])
    ], OauthLoginComponent);
    return OauthLoginComponent;
}());
exports.OauthLoginComponent = OauthLoginComponent;
//# sourceMappingURL=oauth-login.component.js.map