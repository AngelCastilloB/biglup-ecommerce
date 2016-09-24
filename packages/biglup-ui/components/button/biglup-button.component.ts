/**
 * @file button.component.ts
 *
 * @summary A simple animated button.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 24 2016
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

import { Component } from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated button.
 */
@Component({
    selector: 'biglup-button',
    template: `<button type="button" biglup-button raised class="primary"><ng-content></ng-content></button>`
})
export class BiglupButtonComponent
{
    /**
     * @brief Initializes a new instance of the BiglupButtonComponent class.
     */
    constructor()
    {
    }
}
