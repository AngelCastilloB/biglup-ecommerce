/**
 * @file i18n-input.component.ts
 *
 * @summary Allows to two way bind an i18n string to an input text box.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 12 2016
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

import { Component,
         Input,
         EventEmitter,
         Output,
         ViewChild,
         AfterViewInit }        from '@angular/core';
import { I18nString }           from 'meteor/biglup:i18n';
import { BiglupInputComponent } from 'meteor/biglup:ui';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows to display/edit the internationalization content of a i18n string in an input box.
 */
@Component({
    selector: 'i18n-input',
    template: `<biglup-input
                  [style.width]="'100%'"
                  hint="{{_placeholder}}"
                  floatingHint="true"
                  [(value)]="_model.value"
                  errorMessage="{{ 'The product title is empty' | translate }}">
               </biglup-input>`
})
export class I18nInputComponent implements AfterViewInit
{
    @ViewChild(BiglupInputComponent)
    private _input: BiglupInputComponent;
    @Output('modelChange')
    private _modelUpdate = new EventEmitter();
    @Input('model')
    private _model: I18nString = new I18nString();
    @Input('placeholder')
    private _placeholder: string = '';
    @Input('isRequiered')
    private _isRequiered: boolean = false;
    @Input('language')
    private _language: string     = '';

    /**
     * @summary Initializes a new instance of the I18nInputComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._input.observeValue()
            .distinctUntilChanged()
            .subscribe((value) =>
            {
                if (this._isRequiered && !value)
                {
                    this._input.setInvalid(true);
                }
                else
                {
                    this._input.setInvalid(false);
                }
            });
    }

    /**
     * @summary Gets whther this input field is in a valid state.
     *
     * @return {boolean} True if is valid, otherwise, false.
     */
    public getIsValid(): boolean
    {
        return !!this._input.getValue();
    }

    /**
     * @summary Gets this i18n field language.
     *
     * @return {string} The language.
     */
    public getLanguage(): string
    {
        return this._language;
    }
}
