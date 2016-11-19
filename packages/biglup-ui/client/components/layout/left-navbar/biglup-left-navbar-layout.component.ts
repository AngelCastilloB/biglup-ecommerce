/**
 * @file biglup-left-navbar-layout.component.ts
 *
 * @summary  simple layout with a responsive nav bar at the left side and a fixed toolbar
 * at the top
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

import { Component, Input } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-left-navbar-layout.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a simple layout with a responsive nav bar at the left side and a fixed toolbar
 * at the top.
 */
@Component({
    selector: 'biglup-left-navbar-layout',
    template
})
export class BiglupLeftNavbarLayoutComponent
{
    /**
     * @summary Initializes a new instance of the BiglupLeftNavbarLayoutComponent class.
     */
    constructor()
    {
    }
}
