/**
 * @file biglup-radio-group.component.ts
 *
 * @summary Polymer like radio group component.
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

import { Component,
         Input,
         AfterViewInit,
         ContentChildren,
         Output,
         EventEmitter }               from '@angular/core';
import { BiglupRadioButtonComponent } from './radio-button/biglup-radio-button.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-radio-group.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component is the radio button container.
 */
@Component({
    selector: 'biglup-radio-group',
    template
})
export class BiglupRadioGroupComponent implements AfterViewInit
{
    @Output('valueChange')
    private _valueChange = new EventEmitter();
    @Input('value')
    private _value: string = '';
    @Input('selected')
    private _selected: boolean = false;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('name')
    private _name: string = '';
    @ContentChildren(BiglupRadioButtonComponent)
    private _radioButtons: Array<BiglupRadioButtonComponent>;
    private _selectedRadioButton: BiglupRadioButtonComponent;

    /**
     * @summary Initializes a new instance of the BiglupRadioButtonComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._radioButtons.forEach((radioButton) =>
        {
            if (radioButton.getSelected())
            {
                this._value = radioButton.getValue();
                this._valueChange.emit(this._value);
                this._selectedRadioButton = radioButton;
            }

            radioButton.getSelectedEmitter().subscribe((selected) =>
            {
                if (this._selectedRadioButton)
                    this._selectedRadioButton.setSelected(false);

                this._selectedRadioButton = selected;
                this._value = selected.getValue();
                this._valueChange.emit(this._value);
            });
        });
    }
}
