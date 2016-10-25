/**
 * @file biglup-checkbox.component.ts
 *
 * @summary Polymer like checkbox input component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 21 2016
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
import template from './biglup-checkbox.component.html';


// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated checkbox.
 */
@Component({
    selector: 'biglup-checkbox',
    template
})
export class BiglupCheckboxComponent implements AfterViewInit
{
    @Input('checked')
    private _checked: boolean = false;
    @Input('disabled')
    private _isDisabled: boolean = false;
    private _showLabel: boolean = true;
    @ViewChild('reference')
    private _contentWrapper;

    /**
     * @summary Initializes a new instance of the BiglupInputComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._showLabel = this._contentWrapper.nativeElement.childNodes.length > 2;
    }

    /**
     * @summary Event handler for the on click event.
     *
     * @param event The click event.
     */
    private _onClick(event)
    {
        if (this._isDisabled)
            return;

        this._checked = !this._checked;

        event.preventDefault();
    }
}
