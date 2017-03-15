/**
 * @file swiper.component.ts
 *
 * @summary The swiper component class.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   March 02 2017
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

import { Component,Input, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';

let Swiper: any = require('swiper');

// EXPORTS ************************************************************************************************************/

/**
 * @summary _swiper component.
 */
@Component({
    selector: 'swiper',
    template: '<div class="swiper-container"><ng-content></ng-content></div>',
    styles: [
        ':host {display: initial;}',
        '.swiper-container {width: 100%;height: 100%;}'
    ]
})
export class SwiperComponent implements AfterViewChecked, AfterViewInit
{
    private _swiper:           any     = null;
    private _swiperWrapper:    any     = null;
    private _slideCount:       number  = 0;
    private _initialized:      boolean = false;
    private _shouldInitialize: boolean = true;

    @Input('config')
    private _config: Object;

    @Input('initialize')
    set initialize(value: boolean)
    {
        this._shouldInitialize = this._initialized ? false : value ;
    };

    /**
     * @summary Initializes a new instance of the swiper class.
     *
     * @param elementRef The reference to the host element.
     */
    constructor(private elementRef: ElementRef)
    {
    }

    /**
     * Gets the native swiper instance.
     *
     * @return {any} The Swiper instance.
     */
    public getSwiper(): any
    {
        return this._swiper;
    }

    /**
     * @summary Lifecycle hook that is called after a component's view has been fully initialized.
     */
    public ngAfterViewInit()
    {
        if (this._shouldInitialize)
            this._setup();
    }

    /**
     * @summary Lifecycle hook that is called after every check of a component's view..
     */
    public ngAfterViewChecked()
    {
        if(this._shouldInitialize)
            this._setup();

        if (this._swiperWrapper && this._slideCount !== this._swiperWrapper.childElementCount)
        {
            this._slideCount = this._swiperWrapper.childElementCount
            this._swiper.update();
        }
    }

    /**
     * @summary Sets up the swiper instance.
     */
    private _setup()
    {
        if (!this._swiper)
        {
            this._swiperWrapper    = this.elementRef.nativeElement.querySelector('.swiper-wrapper');
            this._slideCount       = this._swiperWrapper.childElementCount;
            this._swiper           = new Swiper(this.elementRef.nativeElement.querySelector('.swiper-container'), this._config);
            this._shouldInitialize = false;
        }
    }
}