/**
 * @file biglup-button.component.ts
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

import { Component, Input } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-button.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated button.
 */
@Component({
    selector: 'biglup-button',
    template
})
export class BiglupButtonComponent
{
    @Input('color')
    private _color: string = 'primary';
    @Input('raised')
    private _raised: boolean = false;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('icon')
    private _icon: string = '';

    /**
     * @brief Initializes a new instance of the BiglupButtonComponent class.
     */
    constructor()
    {
    }
}
