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

// IMPORTS ************************************************************************************************************/

import 'reflect-metadata';

import { Validators, FormGroup, FormBuilder}  from '@angular/forms';
import { Component, OnInit, NgZone }          from '@angular/core';
import { ValidationService }                  from '../../../services/validation.service';
import { Router }                             from '@angular/router';
import { _T }                                 from '../../../services/i18n/i18n-singleton.service';
import { UserAuthService }                    from '../../../services/user-auth.service';

// noinspection TypeScriptCheckImport
import template from './password-reset.component.html';

// CONSTANTS **********************************************************************************************************/

const NOT_FOUND = 403;

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows the user to reset its password.
 */
@Component({
    selector: 'password-reset',
    template
})
export class PasswordResetComponent implements OnInit
{
    /**
     * @summary The data and other things associated with the password reset form.
     */
    private _pwResetForm: FormGroup;

    /**
     * @summary The error message the form could have, these are related to Meteor, not angular's form.
     */
    private _error = {message: '', cssClass: ''};

    /**
     * @summary Initializes a new instance of the PasswordResetComponent class.
     *
     * @param _ngZone          The Angular Zone service.
     * @param _formBuilder     The form builder service.
     * @param _router          The router service.
     * @param _userAuthService The user authentication service.
     */
    constructor(
        private _ngZone: NgZone,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userAuthService: UserAuthService)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        this._pwResetForm = this._formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                ValidationService.email
            ])]
        });
    }

    /**
     * @summary Event handler for when the submit button is clicked
     *
     * @param event The click event.
     * @private
     */
    private _onSubmit(event: Event)
    {
        event.preventDefault();

        if (!this._pwResetForm.valid)
            return;

        this._userAuthService.forgotPassword({email: this._pwResetForm.value.email}, error =>
        {
            if (error)
                return this._processError(error);

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
    private _processError(error: Meteor.Error): void
    {
        this._ngZone.run(() =>
        {
            this._error.cssClass = 'text-danger';
            this._pwResetForm.setErrors({'external-related': true});

            switch (error.error) // TODO: Handle all cases.
            {
                case NOT_FOUND:
                    this._error.message = _T('The Email provided did not match our records.')
                    break;
                default:
                    this._error.message = error.reason;
            }
        });
    }
}
