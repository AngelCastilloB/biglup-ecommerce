/**
 * @file biglup-breadcrumb.component.ts
 *
 * @summary Custom breadcrumb component..
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 14 2016
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
import template from './biglup-breadcrumb.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a breadcrumb.
 */
@Component({
    selector: 'biglup-breadcrumb',
    template
})
export class BiglupBreadcrumbComponent
{
    /**
     * @summary Initializes a new instance of the BiglupBreadcrumbComponent class.
     */
    constructor()
    {
    }
}
