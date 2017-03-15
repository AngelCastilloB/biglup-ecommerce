/**
 * @file wide-slider-entry.component.ts
 *
 * @summary The wide slider entry.
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

import { Component, Input, OnInit } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './wide-slider-entry.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a wide slider in the landing page
 */
@Component({
    selector: 'wide-slider-entry',
    template
})
export class WideSliderEntryComponent implements OnInit
{
    private _config: any = {
        paginationClickable: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        loop: true,
        speed: 1000
    };

    @Input('params')
    private _params: any;

    /**
     * @summary Initializes a new instance of the WideSliderEntryComponent class.
     */
    constructor()
    {
    }


    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        this._config.speed = this._params.speed ? this._params.speed : this._config.speed;
        this._config.autoplay = this._params.autoplay ? this._params.autoplay : this._config.autoplay;
        this._config.loop = this._params.loop ? this._params.loop : this._config.loop;
    }
}
