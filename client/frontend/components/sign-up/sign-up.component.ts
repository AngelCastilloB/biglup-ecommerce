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

// IMPORTS ************************************************************************************************************/

// noinspection TypeScriptCheckImport
import template from './sign-up.component.html';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone }          from '@angular/core';
import { ValidationService }                  from '../../../services/validation.service';
import { UserAuthService }                    from '../../../services/user-auth.service';
import { Router }                             from '@angular/router';
import { NewPasswordComponent }               from '../new-password/new-password.component';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows the user to sign up to the site.
 */
@Component({
    selector: 'sign-up',
    template
})
export class SignUpComponent implements OnInit {

    /**
     * @summary The data and other things associated with the login form.
     */
    private _signUpForm: FormGroup;

    /**
     * @summary The error message the form could have, these are related to Meteor, not angular's form.
     */
    private _error = {message: '', cssClass: ''};

    /**
     * @summary the minimum size the password must be to be considered valid.
     */
    private _minPasswordLength = NewPasswordComponent.minPasswordLength;

    /**
     * @summary the maximum size the password must be to be considered valid.
     */
    private _maxPasswordLength = NewPasswordComponent.maxPasswordLength;

    /**
     * @summary Initializes a new instance of the class SignUpComponent.
     *
     * @param {FormBuilder}     _formBuilder     The form builder service.
     * @param {UserAuthService} _userAuthService The user authentication service.
     * @param {NgZone}          _ngZone          The angular zone service.
     * @param {Router}          _router          The router service.
     */
    constructor(private _formBuilder: FormBuilder,
        private _userAuthService: UserAuthService,
        private _ngZone: NgZone,
        private _router: Router) {
    }

    /**
     * @summary Initialize the component after data-bounding.
     */
    public ngOnInit() {

        this._signUpForm = this._formBuilder.group({

            email: ['', Validators.compose([
                Validators.required,
                ValidationService.email])],

            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this._minPasswordLength),
                Validators.maxLength(this._maxPasswordLength)
            ])],

            confirmation: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this._minPasswordLength),
                Validators.maxLength(this._maxPasswordLength)
            ])]

        }, {validator: ValidationService.matchControlGroupsValues('password', 'confirmation')});
    }

    /**
     * @summary process a new login from the html form.
     * @private
     */
    private _onSubmit(event: Event): void {

        event.preventDefault();

        if (!this._signUpForm.valid) {
            return;
        }

        const email    = this._signUpForm.value.email;
        const password = this._signUpForm.value.password;

        this._userAuthService.createUser({email, password}, error => {

            if (error) {
                return this._processError(error);
            }

            this._router.navigate(['/']);
        });
    }

    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean} True if there is a confirmation error, otherwise, false.
     * @private
     */
    private _hasConfirmationError() {
        return NewPasswordComponent.hasConfirmationError(this._signUpForm.controls['confirmation']);
    }

    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} error Shows a human readable error.
     * @private
     */
    private _processError(error: Meteor.Error): void {

        this._ngZone.run(() => {

            this._error.cssClass = 'text-danger';
            this._signUpForm.setErrors({'external-related': true});
            this._error.message = error.reason;
        });
    }
}
