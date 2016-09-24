/**
 * @file password-reset.ts.
 *
 * @summary User's password reset component.
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
var i18n_singleton_service_1 = require('../../../services/i18n/i18n-singleton.service');
var user_auth_service_1 = require('../../../services/user-auth.service');
// noinspection TypeScriptCheckImport
var password_reset_component_html_1 = require('./password-reset.component.html');
// CONSTANTS **********************************************************************************************************/
var NOT_FOUND = 403;
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component allows the user to reset its password.
 */
var PasswordResetComponent = (function () {
    /**
     * @summary Initializes a new instance of the PasswordResetComponent class.
     *
     * @param _ngZone          The Angular Zone service.
     * @param _formBuilder     The form builder service.
     * @param _router          The router service.
     * @param _userAuthService The user authentication service.
     */
    function PasswordResetComponent(_ngZone, _formBuilder, _router, _userAuthService) {
        this._ngZone = _ngZone;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this._userAuthService = _userAuthService;
        /**
         * @summary The error message the form could have, these are related to Meteor, not angular's form.
         */
        this._error = { message: '', cssClass: '' };
    }
    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    PasswordResetComponent.prototype.ngOnInit = function () {
        this._pwResetForm = this._formBuilder.group({
            email: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    validation_service_1.ValidationService.email
                ])]
        });
    };
    /**
     * @summary Event handler for when the submit button is clicked
     *
     * @param event The click event.
     * @private
     */
    PasswordResetComponent.prototype._onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this._pwResetForm.valid) {
            return;
        }
        this._userAuthService.forgotPassword({ email: this._pwResetForm.value.email }, function (error) {
            if (error) {
                return _this._processError(error);
            }
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
    PasswordResetComponent.prototype._processError = function (error) {
        var _this = this;
        this._ngZone.run(function () {
            _this._error.cssClass = 'text-danger';
            _this._pwResetForm.setErrors({ 'external-related': true });
            switch (error.error) {
                case NOT_FOUND:
                    _this._error.message = i18n_singleton_service_1._T('The Email provided did not match our records.');
                    break;
                default:
                    _this._error.message = error.reason;
            }
        });
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            selector: 'password-reset',
            template: password_reset_component_html_1.default
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, forms_1.FormBuilder, router_1.Router, user_auth_service_1.UserAuthService])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;
//# sourceMappingURL=password-reset.component.js.map