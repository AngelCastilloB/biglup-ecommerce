/**
 * @file color-picker-text.directive.ts
 *
 * @summary Color picker text directive.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 21 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPORTS ************************************************************************************************************/

import { Directive,
         Input,
         Output,
         EventEmitter } from '@angular/core';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary Text directive.
 */
@Directive({
    selector: '[text]',
    host: {
        '(input)': 'changeInput($event.target.value)'
    }
})
export class TextDirective
{
    @Output('newValue')
    private _newValue = new EventEmitter<any>();
    @Input('text')
    private _text: any;
    @Input('rg')
    private _rg: number;

    /**
     * @summary Changes the input.
     *
     * @param value The input to be changed.
     */
    public changeInput(value: string)
    {
        if (this._rg === undefined)
        {
            this._newValue.emit(value);
        }
        else
        {
            let numeric = parseFloat(value);

            if (!isNaN(numeric) && numeric >= 0 && numeric <= this._rg)
                this._newValue.emit({ v: numeric, rg: this._rg });
        }
    }
}