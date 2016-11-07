/**
 * @file biglup-vertical-submenu.component.ts
 *
 * @summary Animated vertical submenu.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 04 2016
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
import template from './biglup-vertical-submenu.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an option inside a menu option.
 */
@Component({
    selector: 'biglup-vertical-submenu',
    template
})
export class BiglupVerticalSubmenuComponent
{
    @Input('label')
    private _label:  string  = '';
    @Input('icon')
    private _icon:  string   = '';
    private _isOpen: boolean = false;

    /**
     * @summary Initializes a new instance of the BiglupVerticalSubmenuComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Event handler for when the submenu is clicked.
     * @private
     */
    private _onSubmenuClick()
    {
        this._isOpen = !this._isOpen;
    }
}
