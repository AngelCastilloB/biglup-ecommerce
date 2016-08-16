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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component shows the user's login form
 */
@Component({
    selector: 'login-form',
    template,
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LoginComponent implements OnInit {

    private _loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder) {
    }

    public ngOnInit() {
        this._loginForm = this._formBuilder.group({
            email: [],
            password: []
        });
    }
}
