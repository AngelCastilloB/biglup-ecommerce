/**
 * @file biglup-toolbar.component.ts
 *
 * @summary Polymer like toolbar component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 02 2016
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

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-toolbar.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a simple toolbar.
 */
@Component({
    selector: 'biglup-toolbar',
    template
})
export class BiglupToolbarComponent implements OnChanges
{
    @Input('title')
    private _title:          string  = '';
    private _showleftNavbar: boolean = false;
    @Output('toggleNavbar')
    private _toggleNavbar: any = new EventEmitter();

    /**
     * @summary Initializes a new instance of the BiglupToolbarComponent class.
     */
    constructor()
    {
    }

    public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        console.error(changes);
    }

    /**
     * @summary Event handler for when the menu button is clicked.
     */
    private _onMenuButtonClick()
    {
        this._showleftNavbar = !this._showleftNavbar;

        if (this._toggleNavbar)
            this._toggleNavbar.emit(this._showleftNavbar);
    }
}
