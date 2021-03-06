/**
 * @file biglup-left-navbar-layout-content.component.ts
 *
 * @summary Layout responsive left drawer.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 03 2016
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

import { Component } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-left-navbar-layout-content.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The content of the left navbar layout.
 */
@Component({
    selector: 'biglup-left-navbar-layout-content',
    template
})
export class BiglupLeftNavbarLayoutContentComponent
{
    /**
     * @summary Initializes a new instance of the BiglupLeftNavbarLayoutContentComponent class.
     */
    constructor()
    {
    }
}
