/**
 * @file biglup-dropdown-option.component.ts
 *
 * @summary Polymer like dropdown menu component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 29 2016
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
         Output,
         EventEmitter,
         ChangeDetectorRef,
         ViewChild } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-dropdown-option.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated dropdown option.
 */
@Component({
    selector: 'biglup-dropdown-option',
    template
})
export class BiglupDropdownOptionComponent
{
    @ViewChild('textContent')
    private _textContent: any;
    @Input('selected')
    private _selected: boolean = false;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('value')
    private _value: string = '';
    @Output('selectionChange') selectionChange: any = new EventEmitter();
    private _isSubscribed: boolean = false;

    /**
     * @summary Initializes a new instance of the BiglupDropdownOptionComponent class.
     */
    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    /**
     * @summary Sets wether this element is selected or not.
     *
     * @param selected true if the element is selected, otherwise, false.
     */
    public setSelected(selected: boolean)
    {
        this._selected = selected;
        this._changeDetector.detectChanges();
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
     * @summary Gets the inner text of the option element.
     *
     * @return The inner text.
     */
    public getText(): string
    {
        return this._textContent.nativeElement.innerHTML;
    }

    /**
     * @summary Gets the value of this component.
     *
     * @return {string} The value.
     */
    public getValue(): string
    {
        return this._value;
    }

    /**
     * @summary Gets whether the parten already subscribed to this instance.
     *
     * @return {boolean} True if it was already subscribed, otherwise, false.
     */
    public getIsSubscribed(): boolean
    {
        return this._isSubscribed;
    }

    /**
     * @summary Sets this instance as subscribed.
     */
    public setIsSubscribed()
    {
        this._isSubscribed = true;
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

       this.selectionChange.emit(this);
    }
}
