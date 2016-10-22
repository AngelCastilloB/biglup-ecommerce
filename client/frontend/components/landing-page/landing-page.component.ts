/**
 * @file lading-page.component.ts
 *
 * @summary Tha landing page of the ecommerce site.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
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

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { InputFilters, BiglupInputComponent }  from 'meteor/biglup:ui';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './landing-page.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the landing page of the site
 */
@Component({
    selector: 'landing-page',
    template,
    styles: [`
        .app-content 
        {
            padding: 20px;
        }
        .app-content md-card 
        {
            margin: 20px;
        }`
    ]
})
export class LandingPageComponent extends AfterViewInit
{
    @ViewChild('validate')
    private _onlyNumericInput: BiglupInputComponent;
    @ViewChild('validate2')
    private _onlyNumericInputFloat: BiglupInputComponent;
    @ViewChild('email')
    private _emailInput: BiglupInputComponent;
    private InputFilters:           InputFilters = InputFilters;

    /**
     * @summary Initializes a new instance of the LandingPageComponent class.
     */
    constructor()
    {
        super();
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._onlyNumericInput.observeValueChanges().subscribe((value) =>
        {
            if (!value)
            {
                this._onlyNumericInput.setInvalid(false);
                return;
            }

            if (!this._isNumber(value))
                this._onlyNumericInput.setInvalid(true);
            else
                this._onlyNumericInput.setInvalid(false);
        });

        this._onlyNumericInputFloat.observeValueChanges().subscribe((value) =>
        {
            if (!value)
            {
                this._onlyNumericInputFloat.setInvalid(false);
                return;
            }

            if (!this._isAlphabet(value))
                this._onlyNumericInputFloat.setInvalid(true);
            else
                this._onlyNumericInputFloat.setInvalid(false);
        });

        this._emailInput.observeValue().subscribe((value) =>
        {
            if (!value)
            {
                this._emailInput.setInvalid(false);
                return;
            }

            if (!this._isEmail(value))
                this._emailInput.setInvalid(true);
            else
                this._emailInput.setInvalid(false);
        });
    }

    /**
     * @summary Gets whether the given value is a number of not.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a number, otherwise, false.
     */
    private _isNumber(value: any)
    {
       return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * @summary Gets whether the given value contains only alphabet characters.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a alphabet, otherwise, false.
     */
    private _isAlphabet(value: any)
    {
        return /^[a-zA-Z]+$/.test(value);
    }

    /**
     * @summary Gets whether the given value is a valid email.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a valid email, otherwise, false.
     */
    private _isEmail(value: any)
    {
        return /^[^@]+@[^@]+$/.test(value);
    }
}
