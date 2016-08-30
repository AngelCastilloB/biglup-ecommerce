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

import { FormGroup,
         FormBuilder,
         REACTIVE_FORM_DIRECTIVES,
         Validators }                   from '@angular/forms';
import { ROUTER_DIRECTIVES, Router }    from '@angular/router';
import { TranslatePipe }                from '../../../pipes/translate.pipe';
import { _T }                           from '../../../services/i18n/i18n-singleton.service';
import { Meteor }                       from 'meteor/meteor';
import { MeteorComponent }              from 'angular2-meteor';
import { ValidationService }            from '../../../services/validation.service';
import { UserAuthService }              from '../../../services/user-auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }                 from 'rxjs';
import { OauthLoginComponent }          from '../oauth-login/oauth-login.component';
import { FormErrorComponent }           from '../form-error/form-error.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './login.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component shows the user's login form.
 */
@Component({
    selector: 'login-form',
    template,
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        OauthLoginComponent,
        FormErrorComponent
    ],
    pipes: [TranslatePipe]
})
export class LoginComponent extends MeteorComponent implements OnInit, OnDestroy {

    /**
     * @summary The data and other things associated with the login form.
     */
    private _loginForm: FormGroup;

    /**
     * @summary The error message the form could have, these are related to Meteor, not angular's form.
     */
    private _error = {message: '', cssClass: ''};

    /**
     * @summary the UserAuthService login subscription.
     */
    private _loginSubscription: Subscription;

    /**
     * @summary Initializes a new instance of the class LoginComponent.
     *
     * @param {FormBuilder}     _formBuilder     The form builder service.
     * @param {Router}          _router          Angular's router service.
     * @param {UserAuthService} _userAuthService The user authentication service.
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userAuthService: UserAuthService) {

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
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy() {
        if (this._loginSubscription) this._loginSubscription.unsubscribe();
    }

    /**
     * @summary Event handler for the click submit click event.
     *
     * @param {Event} event The click event.
     * @private
     */
    private _onSubmit(event: Event): void {

        event.preventDefault();

        if (!this._loginForm.valid) {
            return;
        }

        const email    = this._loginForm.value.email;
        const password = this._loginForm.value.password;

        this._userAuthService.login(email, password, err => {

            if (err) {
                return this._processError(err);
            }

            this._router.navigate(['/']);
        });
    }

    /**
     * @summary Alters the error to a more human readable form.
     *
     * @param {Error} error The error to be processed.
     * @private
     */
    private _processError(error: Meteor.Error): void {
        this.autorun(() => {
            this._error.cssClass = 'text-danger';
            this._loginForm.setErrors({'external-related': true});

            this._error.message = error.error === 403 ?
                _T ('The credentials provided did not match our records.') :
                error.reason;
        });
    }
}
