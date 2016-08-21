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

// noinspection TypeScriptCheckImport
import template                      from './password-reset.component.html';
import { Component, OnInit, NgZone } from '@angular/core';
import {
    Validators, FormGroup, FormBuilder,
    REACTIVE_FORM_DIRECTIVES
}                                    from '@angular/forms';
import { ValidationService }         from '../../../services/validation.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe }             from '../../../pipes/translate.pipe';
import { FormErrorComponent }        from '../form-error/form-error.component';
import { UserAuthService }           from '../../../services/user-auth.service';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'password-reset',
    template,
    pipes: [TranslatePipe],
    providers: [TranslatePipe],
    directives: [FormErrorComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class PasswordResetComponent implements OnInit {

    /**
     * @summary The data and other things associated with the password reset form.
     */
    private _pwResetForm: FormGroup;

    /**
     * @summary The error message the form could have, these are related to Meteor, not angular's form.
     */
    private _error = {message: '', cssClass: ''};

    constructor(private _ngZone: NgZone,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _translatePipe: TranslatePipe,
        private _userAuthService: UserAuthService) {
    }

    public ngOnInit() {
        this._pwResetForm = this._formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                ValidationService.email
            ])]
        });
    }

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
     * @param {Error} err
     * @private
     */
    private _processError(err: Meteor.Error): void {
        this._ngZone.run(() => {
            this._error.cssClass = 'text-danger';
            this._pwResetForm.setErrors({'external-related': true});

            this._error.message = err.error === 403 ?
                this._translatePipe.transform('The Email provided did not match our records.') :
                err.reason;
        });
    }
}
