/**
 * @file biglup-icon-button.component.ts
 *
 * @summary Polymer like checkbox input component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 25 2016
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
import template from './biglup-icon-button.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated icon button.
 */
@Component({
    selector: 'biglup-icon-button',
    template
})
export class BiglupIconButtonComponent
{
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('icon')
    private _icon: string = '';

    /**
     * @summary Initializes a new instance of the BiglupInputComponent class.
     */
    constructor()
    {
    }
}
