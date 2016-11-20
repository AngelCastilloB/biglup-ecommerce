/**
 * @file biglup-color-picker-slider-directive.ts
 *
 * @summary The color picker slider directive.
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
         ElementRef,
         Output,
         EventEmitter } from '@angular/core';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary color picker slider directive.
 */
@Directive({
    selector: '[slider]',
    host: {
        '(mousedown)': 'start($event)',
        '(touchstart)': 'start($event)'
    }
})
export class BiglupSliderDirective
{
    @Output('newValue')
    private _newValue = new EventEmitter<any>();
    @Input('slider')
    private _slider: string;
    @Input('rgX')
    private _rgX: number;
    @Input('rgY')
    private _rgY: number;
    private _listenerMove: any;
    private _listenerStop: any;

    /**
     * @summary Initializes a new instance of the BiglupSliderDirective class.
     *
     * @param el The element reference.
     */
    constructor(private el: ElementRef)
    {
        this._listenerMove = (event: any) => { this.move(event); };
        this._listenerStop = () => { this.stop(); };
    }

    /**
     * @summary Sets the slider cursor.
     *
     * @param event The click event.
     */
    public setCursor(event: any)
    {
        let height = this.el.nativeElement.offsetHeight;
        let width  = this.el.nativeElement.offsetWidth;
        let x      = Math.max(0, Math.min(this.getX(event), width));
        let y      = Math.max(0, Math.min(this.getY(event), height));

        if (this._rgX !== undefined && this._rgY !== undefined)
        {
            this._newValue.emit({ s: x / width, v: (1 - y / height), rgX: this._rgX, rgY: this._rgY });
        }
        else if (this._rgX === undefined && this._rgY !== undefined)
        {
            this._newValue.emit({ v: y / height, rg: this._rgY });
        }
        else
        {
            this._newValue.emit({ v: x / width, rg: this._rgX });
        }
    }

    /**
     * @summary Moves the cursor.
     *
     * @param event The click event.
     */
    public move(event: any)
    {
        event.preventDefault();
        this.setCursor(event);
    }

    /**
     * @summary Starts to listen to mosue events.
     *
     * @param event The event.
     */
    public start(event: any)
    {
        this.setCursor(event);
        document.addEventListener('mousemove', this._listenerMove);
        document.addEventListener('touchmove', this._listenerMove);
        document.addEventListener('mouseup', this._listenerStop);
        document.addEventListener('touchend', this._listenerStop);
    }

    /**
     * @summary Stops to listen to mouse event.
     */
    public stop()
    {
        document.removeEventListener('mousemove', this._listenerMove);
        document.removeEventListener('touchmove', this._listenerMove);
        document.removeEventListener('mouseup', this._listenerStop);
        document.removeEventListener('touchend', this._listenerStop);
    }

    /**
     * @summary Gets the X coordinate.
     *
     * @param event The event.
     *
     * @return {number} The x coordinate.
     */
    public getX(event: any): number
    {
        return (
            event.pageX !== undefined ?
                event.pageX :
                event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    }

    /**
     * @summary Gets the Y coordinate.
     *
     * @param event The event.
     *
     * @return {number} The Y coordinate.
     */
    public getY(event: any): number
    {
        return (
            event.pageY !== undefined ?
                event.pageY :
                event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    }
}
