/**
 * @file logo.component.ts
 *
 * @summary The logo section of the header.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 14 2017
 *
 * @copyright Copyright 2014 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Component, OnInit, OnDestroy } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './logo.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the logo section of the header.
 */
@Component({
    selector: 'header-logo',
    template
})
export class HeaderLogoComponent implements OnInit, OnDestroy
{
    /**
     * @summary Initializes a new instance of the HeaderLogoComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
    }
}
