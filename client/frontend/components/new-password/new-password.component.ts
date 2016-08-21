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

// IMPORTS ************************************************************************************************************/

// noinspection TypeScriptCheckImport
import template                                      from './new-password.component.html';
import { Component, OnInit, NgZone }                 from '@angular/core';
import {
    Validators, FormGroup, FormBuilder,
    REACTIVE_FORM_DIRECTIVES, AbstractControl
}                                                    from '@angular/forms';
import { ValidationService }                         from '../../../services/validation.service';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { TranslatePipe }                             from '../../../pipes/translate.pipe';
import { FormErrorComponent }                        from '../form-error/form-error.component';
import { UserAuthService }                           from '../../../services/user-auth.service';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'new-password',
    template,
    pipes: [TranslatePipe],
    providers: [TranslatePipe],
    directives: [FormErrorComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class NewPasswordComponent implements OnInit {

    /**
     * @summary the minimum size the password must be to be considered valid.
     * @type {number}
     * @private
     */
    public static _minPasswordLength = 5;

    /**
     * @summary the maximum size the password must be to be considered valid.
     * @type {number}
     * @private
     */
    public static _maxPasswordLength = 20;

    /**
     * @summary The data and other things associated with the password reset form.
     */
    private _newPwForm: FormGroup;

    /**
     * @summary The error message the form could have, these are related to Meteor, not angular's form.
     */
    private _error = {message: '', cssClass: ''};

    /**
     * @summary the password reset auto generated token.
     */
    private _token: string;

    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean}
     * @private
     */
    public static hasConfirmationError(control: AbstractControl): boolean {
        return (control.hasError('notEqual') && control.value.length >= NewPasswordComponent._minPasswordLength);
    }

    constructor(private _ngZone: NgZone,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userAuthService: UserAuthService,
        private _route: ActivatedRoute) {
    }

    public ngOnInit() {
        this._route.params.subscribe(params => this._token = params['token']);

        this._newPwForm = this._formBuilder.group({
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(NewPasswordComponent._minPasswordLength),
                Validators.maxLength(NewPasswordComponent._maxPasswordLength)
            ])],
            confirmation: ['', Validators.compose([
                Validators.required,
                Validators.minLength(NewPasswordComponent._minPasswordLength),
                Validators.maxLength(NewPasswordComponent._maxPasswordLength)
            ])]
        }, {validator: ValidationService.matchControlGroupsValues('password', 'confirmation')});
    }

    private _onSubmit(event: Event) {
        event.preventDefault();

        if (!this._newPwForm.valid) {
            return;
        }

        this._userAuthService.resetPassword(this._token, this._newPwForm.value.password, err => {
            if (err) return this._processError(err);

            // TODO show user success message after password reset
            this._router.navigate(['/login']);
        });
    }

    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} err
     * @private
     */
    private _processError(err: Meteor.Error): void {
        console.error(err);
        this._ngZone.run(() => {
            this._error.cssClass = 'text-danger';
            this._newPwForm.setErrors({'external-related': true});
            this._error.message = err.reason;
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
        return NewPasswordComponent.hasConfirmationError(this._newPwForm.controls['confirmation']);
    }
}
