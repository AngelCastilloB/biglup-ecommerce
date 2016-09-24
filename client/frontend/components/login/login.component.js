/**
 * @file login.component.ts.
 *
 * @summary Allows a user to login using this component's form.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 15 2016
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var i18n_singleton_service_1 = require('../../../services/i18n/i18n-singleton.service');
var angular2_meteor_1 = require('angular2-meteor');
var validation_service_1 = require('../../../services/validation.service');
var user_auth_service_1 = require('../../../services/user-auth.service');
var core_1 = require('@angular/core');
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var login_component_html_1 = require('./login.component.html');
// CONSTANTS **********************************************************************************************************/
var NOT_FOUND = 403;
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component shows the user's login form.
 */
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    /**
     * @summary Initializes a new instance of the class LoginComponent.
     *
     * @param {FormBuilder}     _formBuilder     The form builder service.
     * @param {Router}          _router          Angular's router service.
     * @param {UserAuthService} _userAuthService The user authentication service.
     */
    function LoginComponent(_formBuilder, _router, _userAuthService) {
        _super.call(this);
        this._formBuilder = _formBuilder;
        this._router = _router;
        this._userAuthService = _userAuthService;
        /**
         * @summary The error message the form could have, these are related to Meteor, not angular's form.
         */
        this._error = { message: '', cssClass: '' };
    }
    /**
     * @summary Initialize the component after data-bounding.
     */
    LoginComponent.prototype.ngOnInit = function () {
        this._loginForm = this._formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.email])],
            password: ['', forms_1.Validators.required]
        });
    };
    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
        }
    };
    /**
     * @summary Event handler for the click submit click event.
     *
     * @param {Event} event The click event.
     * @private
     */
    LoginComponent.prototype._onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this._loginForm.valid) {
            return;
        }
        var email = this._loginForm.value.email;
        var password = this._loginForm.value.password;
        this._userAuthService.login(email, password, function (err) {
            if (err) {
                return _this._processError(err);
            }
            _this._router.navigate(['/']);
        });
    };
    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} error The error to be processed.
     * @private
     */
    LoginComponent.prototype._processError = function (error) {
        var _this = this;
        this.autorun(function () {
            _this._error.cssClass = 'text-danger';
            _this._loginForm.setErrors({ 'external-related': true });
            switch (error.error) {
                case NOT_FOUND:
                    _this._error.message = i18n_singleton_service_1._T('The credentials provided did not match our records.');
                    break;
                default:
                    _this._error.message = error.reason;
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            template: login_component_html_1.default
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, user_auth_service_1.UserAuthService])
    ], LoginComponent);
    return LoginComponent;
}(angular2_meteor_1.MeteorComponent));
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map