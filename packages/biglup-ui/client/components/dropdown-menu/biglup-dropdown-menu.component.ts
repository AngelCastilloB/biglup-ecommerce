/**
 * @file biglup-dropdown-menu.component.ts
 *
 * @summary Polymer like dropdown menu component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 27 2016
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

import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-dropdown-menu.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated dropdown menu.
 */
@Component({
    selector: 'biglup-dropdown-menu',
    template
})
export class BiglupDropdownMenuComponent implements AfterViewInit
{
    @Input('value')
    private _value: string = null;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('title')
    private _title: string = '';

    /**
     * @summary Initializes a new instance of the BiglupDropdownMenuComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
    }
}
