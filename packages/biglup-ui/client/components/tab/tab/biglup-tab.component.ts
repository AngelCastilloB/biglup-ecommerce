/**
 * @file biglup-tab.component.ts
 *
 * @summary Tab component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 13 2016
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

import { Component, Input, ChangeDetectorRef } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-tab.component.html';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'biglup-tab',
    template
})
export class BiglupTabComponent {
    @Input('active')
    public active: boolean = false;
    @Input('title')
    public title: string = '';

    /**
     * @summary Initializes a new instance of the BiglupTabsComponent class.
     */
    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    /**
     * Sets whether this tab is active or not.
     *
     * @param isActive True if the tab is active, otherwise, false.
     */
    public setActive(isActive: boolean): void
    {
        this.active = isActive;
        this._changeDetector.detectChanges();
    }
}
