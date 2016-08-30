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

import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, NgZone }                           from '@angular/core';
import { ValidationService }                                   from '../../../services/validation.service';
import { Router, ActivatedRoute }                              from '@angular/router';
import { UserAuthService }                                     from '../../../services/user-auth.service';

// noinspection TypeScriptCheckImport
import template from './new-password.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Component that allow the user to input a new password.
 */
@Component({
    selector: 'new-password',
    template
})
export class NewPasswordComponent implements OnInit {

    /**
     * @summary the minimum size the password must be to be considered valid.
     */
    public static minPasswordLength = 5;

    /**
     * @summary the maximum size the password must be to be considered valid.
     */
    public static maxPasswordLength = 20;

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
     * @returns {boolean} True if the control has a confirmation error, otherwise, false.
     * @private
     */
    public static hasConfirmationError(control: AbstractControl): boolean {
        return (control.hasError('notEqual') && control.value.length >= NewPasswordComponent.minPasswordLength);
    }

    /**
     * @summary Initializes a new instance of the NewPasswordComponent class.
     *
     * @param _ngZone           The angular zone service.
     * @param _formBuilder      The form builder service.
     * @param _router           The router service.
     * @param _userAuthService  The user authentication service.
     * @param _route            The router service.
     */
    constructor(
        private _ngZone: NgZone,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userAuthService: UserAuthService,
        private _route: ActivatedRoute) {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {

        this._route.params.subscribe(params => this._token = params['token']);

        this._newPwForm = this._formBuilder.group({

            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(NewPasswordComponent.minPasswordLength),
                Validators.maxLength(NewPasswordComponent.maxPasswordLength)
            ])],

            confirmation: ['', Validators.compose([
                Validators.required,
                Validators.minLength(NewPasswordComponent.minPasswordLength),
                Validators.maxLength(NewPasswordComponent.maxPasswordLength)
            ])]

        }, {validator: ValidationService.matchControlGroupsValues('password', 'confirmation')});
    }

    /**
     * @summary Event handler for when the submit button is clicked
     *
     * @param event The click event.
     * @private
     */
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
     * @param {Error} error The error to be processed.
     * @private
     */
    private _processError(error: Meteor.Error): void {

        this._ngZone.run(() => {
            this._error.cssClass = 'text-danger';
            this._newPwForm.setErrors({'external-related': true});
            this._error.message = error.reason;
        });
    }

    /**
     * @summary checks if the password and confirmation are valid, ignores it when
     * the confirmation is less than the minimum password length.
     *
     * @returns {boolean} True if has confirmation, otherwise, false.
     * @private
     */
    private _hasConfirmationError() {
        return NewPasswordComponent.hasConfirmationError(this._newPwForm.controls['confirmation']);
    }
}
