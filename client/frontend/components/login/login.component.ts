/**
 * @file login.component.ts.
 *
 * @summary Allows a user to login using this component's form.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 15 2016
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

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './login.component.html';

import { Component, OnInit }         from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    REACTIVE_FORM_DIRECTIVES,
    Validators
}                                    from '@angular/forms';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { TranslatePipe }             from '../../../pipes/translate.pipe';
import { Meteor }                    from 'meteor/meteor';
import { MeteorComponent }           from 'angular2-meteor';
import { ValidationService }         from '../../../services/validation.service';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component shows the user's login form
 */
@Component({
    selector: 'login-form',
    template,
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [TranslatePipe],
    pipes: [TranslatePipe]
})
export class LoginComponent extends MeteorComponent implements OnInit {

    /**
     * @summary The data and other things associated with the login form.
     */
    private _loginForm: FormGroup;

    /**
     * @summary The error message the form could have.
     */
    private _error = {
        message: '',
        cssClass: '',
        invalid: false
    };

    constructor(private _formBuilder: FormBuilder, private _router: Router, private _translatePipe: TranslatePipe) {
        super();
    }

    /**
     * @summary Initialize the component after data-bounding.
     */
    public ngOnInit() {
        this._loginForm = this._formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                ValidationService.email
            ])],
            password: ['', Validators.required]
        });
    }

    /**
     * @summary process a new login from the html form.
     * @private
     */
    private _onSubmit(event: Event): void {
        event.preventDefault();

        if (!this._loginForm.valid || this._error.invalid) {
            return;
        }

        Meteor.loginWithPassword(this._loginForm.value.email, this._loginForm.value.password, (err) => {
            if (err) {
                return this._processError(err);
            }

            this._router.navigate(['/']);
        });
    }

    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} err
     * @private
     */
    private _processError(err: Error): void {
        this.autorun(() => {
            this._error.cssClass = 'text-danger';
            this._error.invalid  = true;

            if (err.message === 'User not found [403]') {
                this._error.message = this._translatePipe.transform('The credentials provided did not match our records.');
            } else {
                this._error.message = err.message;
            }
        });
    }
}
