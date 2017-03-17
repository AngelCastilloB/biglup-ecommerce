/**
 * @file biglup-toggle.component.ts
 *
 * @summary Polymer like toggle component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 01 2016
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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IdGeneratorService }                     from 'meteor/biglup:core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-toggle.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a toggle.
 */
@Component({
    selector: 'biglup-toggle',
    template
})
export class BiglupToggleComponent
{
    @Input('toggle')
    private _toggle: boolean;
    @Output('toggleChange')
    private _toggleChange: any = new EventEmitter();
    @Input('disabled')
    private _disabled: boolean;
    private _id: string = "";

    /**
     * @summary Initializes a new instance of the BiglupToggleComponent class.
     *
     * @param {IdGeneratorService} _idGeneratorService The unique  id generator service.
     */
    constructor(_idGeneratorService: IdGeneratorService)
    {
        this._id = _idGeneratorService.generate();
    }
}
