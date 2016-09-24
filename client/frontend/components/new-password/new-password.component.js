/**
 * @file reset-password.component.ts.
 *
 * @summary Creates a new password for the user after he/she ask for it.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 21 2016
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
var router_1 = require('@angular/router');
var user_auth_service_1 = require('../../../services/user-auth.service');
// noinspection TypeScriptCheckImport
var new_password_component_html_1 = require('./new-password.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary Component that allow the user to input a new password.
 */
var NewPasswordComponent = (function () {
    /**
     * @summary Initializes a new instance of the NewPasswordComponent class.
     *
     * @param _ngZone           The angular zone service.
     * @param _formBuilder      The form builder service.
     * @param _router           The router service.
     * @param _userAuthService  The user authentication service.
     * @param _route            The router service.
     */
    function NewPasswordComponent(_ngZone, _formBuilder, _router, _userAuthService, _route) {
        this._ngZone = _ngZone;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this._userAuthService = _userAuthService;
        this._route = _route;
        /**
         * @summary The error message the form could have, these are related to Meteor, not angular's form.
         */
        this._error = { message: '', cssClass: '' };
    }
    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean} True if the control has a confirmation error, otherwise, false.
     * @private
     */
    NewPasswordComponent.hasConfirmationError = function (control) {
        return (control.hasError('notEqual') && control.value.length >= NewPasswordComponent.minPasswordLength);
    };
    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    NewPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) { return _this._token = params['token']; });
        this._newPwForm = this._formBuilder.group({
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(NewPasswordComponent.minPasswordLength),
                    forms_1.Validators.maxLength(NewPasswordComponent.maxPasswordLength)
                ])],
            confirmation: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(NewPasswordComponent.minPasswordLength),
                    forms_1.Validators.maxLength(NewPasswordComponent.maxPasswordLength)
                ])]
        }, { validator: validation_service_1.ValidationService.matchControlGroupsValues('password', 'confirmation') });
    };
    /**
     * @summary Event handler for when the submit button is clicked
     *
     * @param event The click event.
     * @private
     */
    NewPasswordComponent.prototype._onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this._newPwForm.valid)
            return;
        this._userAuthService.resetPassword(this._token, this._newPwForm.value.password, function (error) {
            if (error)
                return _this._processError(error);
            // TODO show user success message after password reset
            _this._router.navigate(['/login']);
        });
    };
    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} error The error to be processed.
     * @private
     */
    NewPasswordComponent.prototype._processError = function (error) {
        var _this = this;
        this._ngZone.run(function () {
            _this._error.cssClass = 'text-danger';
            _this._newPwForm.setErrors({ 'external-related': true });
            _this._error.message = error.reason;
        });
    };
    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean} True if has confirmation, otherwise, false.
     * @private
     */
    NewPasswordComponent.prototype._hasConfirmationError = function () {
        return NewPasswordComponent.hasConfirmationError(this._newPwForm.controls['confirmation']);
    };
    /**
     * @summary the minimum size the password must be to be considered valid.
     */
    NewPasswordComponent.minPasswordLength = 5;
    /**
     * @summary the maximum size the password must be to be considered valid.
     */
    NewPasswordComponent.maxPasswordLength = 20;
    NewPasswordComponent = __decorate([
        core_1.Component({
            selector: 'new-password',
            template: new_password_component_html_1.default
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, forms_1.FormBuilder, router_1.Router, user_auth_service_1.UserAuthService, router_1.ActivatedRoute])
    ], NewPasswordComponent);
    return NewPasswordComponent;
}());
exports.NewPasswordComponent = NewPasswordComponent;
//# sourceMappingURL=new-password.component.js.map