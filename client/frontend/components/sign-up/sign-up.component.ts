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

import {
    FormGroup, FormBuilder, Validators,
    REACTIVE_FORM_DIRECTIVES
}                                    from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { ValidationService }         from '../../../services/validation.service';
import { TranslatePipe }             from '../../../pipes/translate.pipe';
import { ROUTER_DIRECTIVES }         from '@angular/router';
import { UserAuthService }           from '../../../services/user-auth.service';
import { Router }                    from '@angular/router';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'sign-up',
    template,
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
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
     * @type {number}
     * @private
     */
    private _minPasswordLength = 5;

    /**
     * @summary the maximum size the password must be to be considered valid.
     * @type {number}
     * @private
     */
    private _maxPasswordLength = 20;

    /**
     * @param {FormBuilder} _formBuilder
     * @param {UserAuthService} _userAuthService
     * @param {NgZone} _ngZone
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
                ValidationService.email
            ])],
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
        this._userAuthService.createUser({email, password}, err => {
            if (err) return this._processError(err);

            this._router.navigate(['/login']);
        });
    }

    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean}
     * @private
     */
    private _hasConfirmationError() {
        const control = this._signUpForm.controls['confirmation'];
        return (control.hasError('notEqual') && control.value.length >= this._minPasswordLength);
    }

    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} err
     * @private
     */
    private _processError(err: Meteor.Error): void {
        this._ngZone.run(() => {
            this._error.cssClass = 'text-danger';
            this._signUpForm.setErrors({'external-related': true});
            this._error.message = err.reason;
        });
    }

    private _oAuthFacebook() {
        this._userAuthService.loginWithFacebook({}, err => {
            if (err) return this._processError(err);

            this._router.navigate(['/']);
        });
    }

    private _oAuthGoogle() {
        console.log('signup with google');
    }

    private _oAuthTwitter() {
        console.log('signup with twitter');
    }
}
