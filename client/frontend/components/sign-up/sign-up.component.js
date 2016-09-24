/**
 * @file sign-up.component.ts.
 *
 * @summary Shows the signup form to an user.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 19 2016
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
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var validation_service_1 = require('../../../services/validation.service');
var user_auth_service_1 = require('../../../services/user-auth.service');
var router_1 = require('@angular/router');
var new_password_component_1 = require('../new-password/new-password.component');
// noinspection TypeScriptCheckImport
var sign_up_component_html_1 = require('./sign-up.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component allows the user to sign up to the site.
 */
var SignUpComponent = (function () {
    /**
     * @summary Initializes a new instance of the class SignUpComponent.
     *
     * @param {FormBuilder}     _formBuilder     The form builder service.
     * @param {UserAuthService} _userAuthService The user authentication service.
     * @param {NgZone}          _ngZone          The angular zone service.
     * @param {Router}          _router          The router service.
     */
    function SignUpComponent(_formBuilder, _userAuthService, _ngZone, _router) {
        this._formBuilder = _formBuilder;
        this._userAuthService = _userAuthService;
        this._ngZone = _ngZone;
        this._router = _router;
        /**
         * @summary The error message the form could have, these are related to Meteor, not angular's form.
         */
        this._error = { message: '', cssClass: '' };
        /**
         * @summary the minimum size the password must be to be considered valid.
         */
        this._minPasswordLength = new_password_component_1.NewPasswordComponent.minPasswordLength;
        /**
         * @summary the maximum size the password must be to be considered valid.
         */
        this._maxPasswordLength = new_password_component_1.NewPasswordComponent.maxPasswordLength;
    }
    /**
     * @summary Initialize the component after data-bounding.
     */
    SignUpComponent.prototype.ngOnInit = function () {
        this._signUpForm = this._formBuilder.group({
            email: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    validation_service_1.ValidationService.email])],
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(this._minPasswordLength),
                    forms_1.Validators.maxLength(this._maxPasswordLength)
                ])],
            confirmation: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(this._minPasswordLength),
                    forms_1.Validators.maxLength(this._maxPasswordLength)
                ])]
        }, { validator: validation_service_1.ValidationService.matchControlGroupsValues('password', 'confirmation') });
    };
    /**
     * @summary process a new login from the html form.
     * @private
     */
    SignUpComponent.prototype._onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this._signUpForm.valid) {
            return;
        }
        var email = this._signUpForm.value.email;
        var password = this._signUpForm.value.password;
        this._userAuthService.createUser({ email: email, password: password }, function (error) {
            if (error) {
                return _this._processError(error);
            }
            _this._router.navigate(['/']);
        });
    };
    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean} True if there is a confirmation error, otherwise, false.
     * @private
     */
    SignUpComponent.prototype._hasConfirmationError = function () {
        return new_password_component_1.NewPasswordComponent.hasConfirmationError(this._signUpForm.controls['confirmation']);
    };
    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} error Shows a human readable error.
     * @private
     */
    SignUpComponent.prototype._processError = function (error) {
        var _this = this;
        this._ngZone.run(function () {
            _this._error.cssClass = 'text-danger';
            _this._signUpForm.setErrors({ 'external-related': true });
            _this._error.message = error.reason;
        });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            template: sign_up_component_html_1.default
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, user_auth_service_1.UserAuthService, core_1.NgZone, router_1.Router])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign-up.component.js.map