/**
 * @file biglup-paper.component.ts
 *
 * @summary Polymer like paper material component.
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

import { Component, Input } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-paper.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a paper material sheet.
 */
@Component({
    selector: 'biglup-paper',
    template
})
export class BiglupPaperComponent
{
    @Input('elevation')
    private _elevation: string;

    /**
     * @summary Initializes a new instance of the BiglupPaperComponent class.
     */
    constructor()
    {
    }
}
