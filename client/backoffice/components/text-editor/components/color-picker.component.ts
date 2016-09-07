/**
 * @file color-picker.component.ts
 *
 * @summary A simple color picker component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 04 2016
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

import 'reflect-metadata';

import { Component, EventEmitter, HostListener } from '@angular/core';
import { MeteorComponent }                       from 'angular2-meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './color-picker.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the simple color picker component.
 */
@Component({
    selector: 'color-picker',
    template,
    outputs: ['onClear', 'onColorPicked']
})
export class ColorPickerComponent extends MeteorComponent
{
    public onClear:       EventEmitter<any>    = new EventEmitter<any>();
    public onColorPicked: EventEmitter<string> = new EventEmitter<string>();

    private _location:    { left: number, top: number } = { left: 0, top: 0 };
    private _isShown:     boolean                       = false;
    private _isOpening:   boolean                       = false;

    /**
     * @summary Initializes a new instance of the ColorPickerComponent class.
     */
    constructor()
    {
        super();
    }

    /**
     * @summary Shows the color picker.
     *
     * @param {{left: number, top: number}} location The mouse event that triggered the color picker display.
     */
    public show(location: { left: number, top: number }): void
    {
        this._isOpening = true;

        setTimeout(() => this._isOpening = false, 400);

        this._isShown = true;

        this._location = {
            left: location.left,
            top: location.top,
        };
    }

    /**
     * @summary Hides the color picker menu.
     */
    public hide(): void
    {
        this._isShown = false;
    }

    /**
     * @summary Event handler for the color picked event.
     *
     * @param color The color picked.
     *
     * @private
     */
    private _colorPicked(color: string)
    {
        this.onColorPicked.emit(color);
    }

    /**
     * @summary Event handler for the clear color format event.
     *
     * @private
     */
    private _clear()
    {
        this.onClear.emit({});
    }

    /**
     * @summary Gets the css representation of the mouse location.
     *
     * @returns {{position: string, display: (string|string), left: string, top: string}}
     */
    get locationCss(): any
    {
        return {
            position: 'fixed',
            display: this._isShown ? 'block' : 'none',
            left: this._location.left + 'px',
            top: this._location.top + 'px',
        };
    }

    /**
     * @summary Listen to clicks on the document and hides the color picker once it detects one.
     */
    @HostListener('document:click')
    private _clickedOutside(): void
    {
        if (!this._isOpening)
        {
            this.hide();
        }
    }

}
