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

import { Validators,
         FormGroup,
         FormBuilder,
         REACTIVE_FORM_DIRECTIVES }  from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { ValidationService }         from '../../../services/validation.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe }             from '../../../pipes/translate.pipe';
import { _T }                        from '../../../services/i18n/i18n-singleton.service';
import { FormErrorComponent }        from '../form-error/form-error.component';
import { UserAuthService }           from '../../../services/user-auth.service';

// noinspection TypeScriptCheckImport
import template                      from './password-reset.component.html';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'password-reset',
    template,
    pipes: [TranslatePipe],
    directives: [FormErrorComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
/**
 * @summary This component allows the user to reset its password.
 */
export class PasswordResetComponent implements OnInit {

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
        private _userAuthService: UserAuthService) {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {

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
    private _onSubmit(event: Event) {
        event.preventDefault();

        if (!this._pwResetForm.valid) {
            return;
        }

        this._userAuthService.forgotPassword({email: this._pwResetForm.value.email}, err => {
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
            this._pwResetForm.setErrors({'external-related': true});

            this._error.message = error.error === 403 ?
                _T('The Email provided did not match our records.') :
                error.reason;
        });
    }
}
