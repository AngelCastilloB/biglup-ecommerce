/**
 * @file biglup-radio-button.component.ts
 *
 * @summary Polymer like radio button input component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 23 2016
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

import { Component, Input, EventEmitter } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-radio-button.component.html';


// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated radio button.
 */
@Component({
    selector: 'biglup-radio-button',
    template
})
export class BiglupRadioButtonComponent
{
    @Input('selected')
    private _selected: boolean = false;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('value')
    private _value: string = '';
    @Input('name')
    private _name: string = '';
    private _selectedEmitter: any = new EventEmitter();

    /**
     * @summary Initializes a new instance of the BiglupRadioButtonComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Gets the selected emitter.
     */
    public getSelectedEmitter(): EventEmitter
    {
        return this._selectedEmitter;
    }

    /**
     * @summary Sets wether this element is selected or not.
     *
     * @param selected true if the element is selected, otherwise, false.
     */
    public setSelected(selected: boolean)
    {
        this._selected = selected;
    }

    /**
     * @summary Gets wether this element is selected or not.
     *
     * @return {boolean} true if the element is selected, otherwise, false.
     */
    public getSelected(): boolean
    {
        return this._selected;
    }

    /**
     * @summary Gets the value of this component/
     *
     * @return {string} The value.
     */
    public getValue(): string
    {
        return this._value;
    }

    /**
     * @summary Event handler for the on click event.
     *
     * @param event The click event.
     */
    private _onClick(event)
    {
        if (this._isDisabled)
            return;

        if (!this._selected)
        {
            if (this._selectedEmitter)
                this._selectedEmitter.emit(this);

            this._selected = true;
        }

        event.preventDefault();
    }
}
